import SunCalc from 'suncalc';
import { BUSINESS } from '../data/business';

export type AmbienceTheme = 'day' | 'night';
export type AmbiencePreference = 'auto' | AmbienceTheme;
export type SolarPhase = 'night-early' | 'sunrise-transition' | 'day' | 'sunset-transition' | 'night-late';

export interface SiliguriSolarSnapshot {
  theme: AmbienceTheme;
  phase: SolarPhase;
  localDateKey: string;
  localTimeFormatted: string;
  sunriseFormatted: string;
  sunsetFormatted: string;
  sunriseMs: number;
  sunsetMs: number;
  usedFallback: boolean;
}

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
const TRANSITION_WINDOW_MS = 35 * 60 * 1000; // 35-minute soft transitional glow around sunrise/sunset

/**
 * Extracts calendar components (year, month 1-12, day, hour, minute) in Asia/Kolkata
 * regardless of the visitor's browser timezone.
 */
export function getSiliguriClockParts(date: Date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: BUSINESS.ambienceCoordinates.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const pick = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((p) => p.type === type)?.value ?? '0');

  const year = pick('year');
  const month = pick('month');
  const day = pick('day');
  const rawHour = pick('hour');
  const hour = rawHour === 24 ? 0 : rawHour;
  const minute = pick('minute');

  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    year,
    month,
    day,
    hour,
    minute,
    dateKey: `${year}-${pad(month)}-${pad(day)}`,
  };
}

/**
 * Constructs a Date representing local solar noon in Siliguri for the given IST calendar date.
 * Passing IST solar noon into SunCalc ensures sunrise/sunset are always computed for that
 * exact Siliguri calendar day without off-by-one UTC date boundary bugs.
 */
function buildSiliguriNoonDate(year: number, month: number, day: number): Date {
  // 12:00 IST == 06:30 UTC
  const utcNoonMs = Date.UTC(year, month - 1, day, 12, 0, 0) - IST_OFFSET_MS;
  return new Date(utcNoonMs);
}

export function formatIstTime(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: BUSINESS.ambienceCoordinates.timezone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

export function computeSiliguriSolarSnapshot(now: Date = new Date()): SiliguriSolarSnapshot {
  const clock = getSiliguriClockParts(now);
  const nowMs = now.getTime();

  try {
    const noonForSiliguri = buildSiliguriNoonDate(clock.year, clock.month, clock.day);
    const times = SunCalc.getTimes(
      noonForSiliguri,
      BUSINESS.ambienceCoordinates.latitude,
      BUSINESS.ambienceCoordinates.longitude,
    );

    const sunriseMs = times.sunrise?.getTime();
    const sunsetMs = times.sunset?.getTime();

    if (Number.isFinite(sunriseMs) && Number.isFinite(sunsetMs) && sunsetMs > sunriseMs) {
      const isDay = nowMs >= sunriseMs && nowMs < sunsetMs;
      let phase: SolarPhase;

      if (!isDay) {
        phase = nowMs < sunriseMs ? 'night-early' : 'night-late';
      } else if (nowMs - sunriseMs <= TRANSITION_WINDOW_MS) {
        phase = 'sunrise-transition';
      } else if (sunsetMs - nowMs <= TRANSITION_WINDOW_MS) {
        phase = 'sunset-transition';
      } else {
        phase = 'day';
      }

      return {
        theme: isDay ? 'day' : 'night',
        phase,
        localDateKey: clock.dateKey,
        localTimeFormatted: formatIstTime(now),
        sunriseFormatted: formatIstTime(new Date(sunriseMs)),
        sunsetFormatted: formatIstTime(new Date(sunsetMs)),
        sunriseMs,
        sunsetMs,
        usedFallback: false,
      };
    }
  } catch {
    // Fall through to 6 AM - 6 PM Siliguri fallback
  }

  // Fallback: 06:00 to 18:00 IST
  const fallbackSunriseMs = Date.UTC(clock.year, clock.month - 1, clock.day, 6, 0, 0) - IST_OFFSET_MS;
  const fallbackSunsetMs = Date.UTC(clock.year, clock.month - 1, clock.day, 18, 0, 0) - IST_OFFSET_MS;
  const isDay = clock.hour >= 6 && clock.hour < 18;

  return {
    theme: isDay ? 'day' : 'night',
    phase: isDay ? 'day' : clock.hour < 6 ? 'night-early' : 'night-late',
    localDateKey: clock.dateKey,
    localTimeFormatted: formatIstTime(now),
    sunriseFormatted: '6:00 am',
    sunsetFormatted: '6:00 pm',
    sunriseMs: fallbackSunriseMs,
    sunsetMs: fallbackSunsetMs,
    usedFallback: true,
  };
}
