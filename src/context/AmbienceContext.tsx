import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import {
  AmbiencePreference,
  AmbienceTheme,
  SiliguriSolarSnapshot,
  computeSiliguriSolarSnapshot,
} from '../utils/solarTime';

interface AmbienceContextValue {
  preference: AmbiencePreference;
  activeTheme: AmbienceTheme;
  solar: SiliguriSolarSnapshot;
  setPreference: (pref: AmbiencePreference) => void;
  logoSrc: string;
}

export const AmbienceContext = createContext<AmbienceContextValue | null>(null);

function readUrlPreviewTheme(): AmbienceTheme | null {
  try {
    const param = new URLSearchParams(window.location.search).get('ambience');
    if (param === 'day' || param === 'night') return param;
  } catch {
    // Ignore URL parsing errors
  }
  return null;
}

export const AmbienceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [urlOverride] = useState<AmbienceTheme | null>(readUrlPreviewTheme);
  // Automatically follow Siliguri's live sunrise/sunset solar cycle unless preview query is provided
  const preference: AmbiencePreference = urlOverride ?? 'auto';
  const [solar, setSolar] = useState<SiliguriSolarSnapshot>(() => computeSiliguriSolarSnapshot());

  const refreshSolar = useCallback(() => {
    setSolar(computeSiliguriSolarSnapshot(new Date()));
  }, []);

  const setPreference = useCallback(
    (_next: AmbiencePreference) => {
      refreshSolar();
    },
    [refreshSolar],
  );

  // Recalculate every 60 seconds and immediately when the browser tab becomes visible
  useEffect(() => {
    const interval = window.setInterval(refreshSolar, 60_000);
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refreshSolar();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [refreshSolar]);

  const activeTheme: AmbienceTheme = preference === 'auto' ? solar.theme : preference;

  // Apply root attributes cleanly without full page reload
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', activeTheme);
    root.setAttribute('data-ambience-mode', preference);
    root.setAttribute(
      'data-solar-phase',
      preference === 'auto' ? solar.phase : activeTheme,
    );
    root.style.colorScheme = activeTheme === 'night' ? 'dark' : 'light';

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', activeTheme === 'night' ? '#17382F' : '#F5F0E6');
    }
  }, [activeTheme, preference, solar.phase]);

  const value = useMemo<AmbienceContextValue>(
    () => ({
      preference,
      activeTheme,
      solar,
      setPreference,
      logoSrc:
        activeTheme === 'night'
          ? '/images/brand/mim-logo-night.png'
          : '/images/brand/mim-logo-day.png',
    }),
    [preference, activeTheme, solar, setPreference],
  );

  return <AmbienceContext.Provider value={value}>{children}</AmbienceContext.Provider>;
};
