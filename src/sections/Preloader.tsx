import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { animate, svg } from 'animejs';
import { useAmbience } from '../hooks/useAmbience';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { getSiliguriClockParts, SolarPhase } from '../utils/solarTime';
import { MimHeart } from '../components/illustrations/BotanicalMotifs';
import './Preloader.css';

interface PreloaderProps {
  onComplete: () => void;
}

type DayPeriod = 'pre-dawn' | 'sunrise' | 'morning' | 'afternoon' | 'sunset' | 'night';

function resolveDayPeriod(phase: SolarPhase): DayPeriod {
  if (phase === 'sunrise-transition') return 'sunrise';
  if (phase === 'sunset-transition') return 'sunset';
  if (phase === 'night-early') return 'pre-dawn';
  if (phase === 'night-late') return 'night';
  const { hour } = getSiliguriClockParts(new Date());
  return hour < 12 ? 'morning' : 'afternoon';
}

const PERIOD_MESSAGES: Record<
  DayPeriod,
  { greeting: string; scene: string; curtain: 'doors' | 'sunlift' | 'horizon' }
> = {
  'pre-dawn': {
    greeting: 'Before dawn in Salugara',
    scene: 'Quiet lights warming behind the green door.',
    curtain: 'doors',
  },
  sunrise: {
    greeting: 'Sunrise over Siliguri',
    scene: 'First golden light across the wooden counter.',
    curtain: 'sunlift',
  },
  morning: {
    greeting: 'Morning in Salugara',
    scene: 'Fresh brew, open windows, an unhurried start.',
    curtain: 'sunlift',
  },
  afternoon: {
    greeting: 'Afternoon in Siliguri',
    scene: 'Soft daylight, a quiet corner, something sweet.',
    curtain: 'sunlift',
  },
  sunset: {
    greeting: 'Golden hour in Salugara',
    scene: 'Warm oak shadows turning into evening glow.',
    curtain: 'horizon',
  },
  night: {
    greeting: 'Evening in Salugara',
    scene: 'Fairy lights glowing above the forest-green door.',
    curtain: 'doors',
  },
};

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const { logoSrc, solar } = useAmbience();
  const reducedMotion = useReducedMotion();

  const overlayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const logoRevealRef = useRef<HTMLDivElement>(null);
  const penPathRef = useRef<SVGPathElement>(null);
  const penFlourishRef = useRef<SVGPathElement>(null);
  const penNibRef = useRef<SVGCircleElement>(null);
  const heartBurstRef = useRef<HTMLSpanElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const sunLiftRef = useRef<HTMLDivElement>(null);
  const horizonTopRef = useRef<HTMLDivElement>(null);
  const horizonBottomRef = useRef<HTMLDivElement>(null);

  const [hidden, setHidden] = useState(false);
  const heroSignaledRef = useRef(false);

  // Capture initial part-of-day on mount so the opening sequence stays cohesive
  const [period] = useState<DayPeriod>(() => resolveDayPeriod(solar.phase));
  const periodMeta = useMemo(() => PERIOD_MESSAGES[period], [period]);
  const sceneWords = useMemo(() => periodMeta.scene.split(' '), [periodMeta.scene]);

  const signalHero = useCallback(() => {
    if (heroSignaledRef.current) return;
    heroSignaledRef.current = true;
    onComplete();
  }, [onComplete]);

  const skipIntro = useCallback(() => {
    signalHero();
    setHidden(true);
  }, [signalHero]);

  useEffect(() => {
    if (reducedMotion) {
      skipIntro();
      return;
    }

    const anims: { revert: () => void }[] = [];
    const timers: number[] = [];

    // 1. Calligraphic pen stroke traces across the Mim handwriting flow
    if (penPathRef.current && penNibRef.current) {
      const drawable = svg.createDrawable(penPathRef.current);
      const motionPath = svg.createMotionPath(penPathRef.current);

      anims.push(
        animate(drawable, {
          draw: ['0 0', '0 1'],
          duration: 1180,
          ease: 'inOutSine',
        }),
      );

      anims.push(
        animate(penNibRef.current, {
          ...motionPath,
          opacity: [0, 1, 1, 0],
          duration: 1220,
          ease: 'inOutSine',
        }),
      );

      anims.push(
        animate(penPathRef.current, {
          opacity: [0.85, 0.85, 0],
          delay: 760,
          duration: 540,
          ease: 'outQuad',
        }),
      );
    }

    // 2. Expressive ink flourish beneath the name
    if (penFlourishRef.current) {
      const flourishDrawable = svg.createDrawable(penFlourishRef.current);
      anims.push(
        animate(flourishDrawable, {
          draw: ['0 0', '0 1'],
          delay: 780,
          duration: 620,
          ease: 'outCubic',
        }),
      );
    }

    // 3. Synchronized pen-reveal clip wipe of the authentic HD Mim logo
    if (logoRevealRef.current) {
      anims.push(
        animate(logoRevealRef.current, {
          clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
          opacity: [0.35, 1],
          delay: 140,
          duration: 1180,
          ease: 'inOutCubic',
        }),
      );
    }

    // 4. Signature red heart blooms above the "i"
    if (heartBurstRef.current) {
      anims.push(
        animate(heartBurstRef.current, {
          scale: [0.25, 1.32, 1],
          opacity: [0, 1, 0],
          delay: 880,
          duration: 660,
          ease: 'outBack',
        }),
      );
    }

    // 5. Part-of-day poetic text reveals word-by-word
    if (textGroupRef.current) {
      const words = textGroupRef.current.querySelectorAll('.preloader-word');
      anims.push(
        animate(words, {
          opacity: [0, 1],
          translateY: [10, 0],
          delay: (_el, idx) => 960 + (idx ?? 0) * 55,
          duration: 440,
          ease: 'outCubic',
        }),
      );
    }

    // 6. Dissolve calligraphy stage & open the website in accordance with the part of day
    timers.push(
      window.setTimeout(() => {
        if (stageRef.current) {
          anims.push(
            animate(stageRef.current, {
              opacity: [1, 0],
              scale: [1, 0.97],
              duration: 360,
              ease: 'inOutQuad',
            }),
          );
        }

        if (periodMeta.curtain === 'doors' && leftDoorRef.current && rightDoorRef.current) {
          anims.push(
            animate(leftDoorRef.current, {
              translateX: ['0%', '-104%'],
              duration: 780,
              ease: 'inOutQuart',
            }),
          );
          anims.push(
            animate(rightDoorRef.current, {
              translateX: ['0%', '104%'],
              duration: 780,
              ease: 'inOutQuart',
            }),
          );
        } else if (
          periodMeta.curtain === 'horizon' &&
          horizonTopRef.current &&
          horizonBottomRef.current
        ) {
          anims.push(
            animate(horizonTopRef.current, {
              translateY: ['0%', '-104%'],
              duration: 780,
              ease: 'inOutCubic',
            }),
          );
          anims.push(
            animate(horizonBottomRef.current, {
              translateY: ['0%', '104%'],
              duration: 780,
              ease: 'inOutCubic',
            }),
          );
        } else if (sunLiftRef.current) {
          anims.push(
            animate(sunLiftRef.current, {
              translateY: ['0%', '-104%'],
              duration: 780,
              ease: 'inOutCubic',
            }),
          );
        }
      }, 1820),
    );

    timers.push(
      window.setTimeout(() => {
        signalHero();
      }, 2050),
    );

    timers.push(
      window.setTimeout(() => {
        setHidden(true);
      }, 2640),
    );

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      anims.forEach((a) => a.revert());
    };
  }, [reducedMotion, periodMeta.curtain, signalHero, skipIntro]);

  if (hidden) return null;

  return (
    <div
      ref={overlayRef}
      className={`preloader preloader-${period}`}
      aria-label="Opening MIM Bakery & Café"
      role="status"
    >
      {/* Part-of-Day Opening Curtains */}
      {periodMeta.curtain === 'doors' && (
        <div className="preloader-curtains" aria-hidden="true">
          <div ref={leftDoorRef} className="preloader-door preloader-door-left" />
          <div ref={rightDoorRef} className="preloader-door preloader-door-right" />
        </div>
      )}

      {periodMeta.curtain === 'sunlift' && (
        <div ref={sunLiftRef} className="preloader-sunlift" aria-hidden="true" />
      )}

      {periodMeta.curtain === 'horizon' && (
        <div className="preloader-curtains" aria-hidden="true">
          <div ref={horizonTopRef} className="preloader-horizon preloader-horizon-top" />
          <div ref={horizonBottomRef} className="preloader-horizon preloader-horizon-bottom" />
        </div>
      )}

      {/* Calligraphic Pen-Writing Stage */}
      <div ref={stageRef} className="preloader-stage">
        <div className="preloader-calligraphy-box">
          <div ref={logoRevealRef} className="preloader-logo-reveal">
            <img
              src={logoSrc}
              alt="MIM Bakery & Café"
              width={594}
              height={395}
              className="preloader-logo"
            />
          </div>

          <svg
            viewBox="0 0 360 150"
            className="preloader-pen-svg"
            fill="none"
            aria-hidden="true"
          >
            <path
              ref={penPathRef}
              d="M 28,118 C 36,36 62,22 76,94 C 92,38 118,22 132,108 C 148,114 166,72 178,64 C 174,104 192,114 212,90 C 228,64 242,66 248,98 C 264,64 286,66 294,98 C 308,66 328,70 338,100 C 344,108 352,96 354,84"
              className="preloader-pen-stroke"
            />
            <path
              ref={penFlourishRef}
              d="M 64,138 C 132,144 234,144 302,136"
              className="preloader-pen-flourish"
            />
            <circle
              ref={penNibRef}
              cx="0"
              cy="0"
              r="4.2"
              className="preloader-pen-nib"
            />
          </svg>

          <span ref={heartBurstRef} className="preloader-heart-burst" aria-hidden="true">
            <MimHeart size={18} />
          </span>
        </div>

        <div ref={textGroupRef} className="preloader-copy">
          <span className="preloader-word preloader-greeting">
            {periodMeta.greeting}
          </span>
          <p className="preloader-scene">
            {sceneWords.map((word, idx) => (
              <span key={`${word}-${idx}`} className="preloader-word">
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>

      <button
        type="button"
        className="preloader-skip"
        onClick={skipIntro}
        aria-label="Skip intro animation"
      >
        Skip intro
      </button>
    </div>
  );
};
