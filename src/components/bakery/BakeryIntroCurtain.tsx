import React, { useCallback, useEffect, useRef, useState } from 'react';
import { animate, svg } from 'animejs';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { MimHeart } from '../illustrations/BotanicalMotifs';
import './BakeryIntroCurtain.css';

interface BakeryIntroCurtainProps {
  onDone: () => void;
}

export const BakeryIntroCurtain: React.FC<BakeryIntroCurtainProps> = ({ onDone }) => {
  const reducedMotion = useReducedMotion();
  const veilRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cakePathRef = useRef<SVGPathElement>(null);
  const ribbonLeftRef = useRef<SVGPathElement>(null);
  const ribbonRightRef = useRef<SVGPathElement>(null);
  const heartRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);
  const doneRef = useRef(false);

  const complete = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setHidden(true);
    onDone();
  }, [onDone]);

  useEffect(() => {
    if (reducedMotion) {
      complete();
      return;
    }

    const anims: { revert: () => void }[] = [];
    const timers: number[] = [];

    // 1. Hand-piped cake stand & pastry ribbon strokes draw gently
    if (cakePathRef.current) {
      anims.push(
        animate(svg.createDrawable(cakePathRef.current), {
          draw: ['0 0', '0 1'],
          duration: 720,
          ease: 'inOutCubic',
        }),
      );
    }

    if (ribbonLeftRef.current) {
      anims.push(
        animate(svg.createDrawable(ribbonLeftRef.current), {
          draw: ['0 0', '0 1'],
          delay: 180,
          duration: 580,
          ease: 'outCubic',
        }),
      );
    }

    if (ribbonRightRef.current) {
      anims.push(
        animate(svg.createDrawable(ribbonRightRef.current), {
          draw: ['0 0', '0 1'],
          delay: 180,
          duration: 580,
          ease: 'outCubic',
        }),
      );
    }

    if (heartRef.current) {
      anims.push(
        animate(heartRef.current, {
          scale: [0, 1.24, 1],
          opacity: [0, 1],
          delay: 420,
          duration: 460,
          ease: 'outBack',
        }),
      );
    }

    if (titleRef.current) {
      const items = titleRef.current.querySelectorAll('.bakery-curtain-item');
      anims.push(
        animate(items, {
          opacity: [0, 1],
          translateY: [14, 0],
          delay: (_el, idx) => 320 + (idx ?? 0) * 110,
          duration: 480,
          ease: 'outCubic',
        }),
      );
    }

    // 2. Pastry-box circular iris bloom outward from center (distinct from ME/NU split)
    timers.push(
      window.setTimeout(() => {
        if (contentRef.current) {
          anims.push(
            animate(contentRef.current, {
              opacity: [1, 0],
              scale: [1, 1.08],
              duration: 420,
              ease: 'inOutQuad',
            }),
          );
        }
        if (veilRef.current) {
          anims.push(
            animate(veilRef.current, {
              clipPath: [
                'circle(120% at 50% 50%)',
                'circle(0% at 50% 50%)',
              ],
              delay: 100,
              duration: 620,
              ease: 'inOutQuart',
            }),
          );
        }
      }, 1080),
    );

    timers.push(
      window.setTimeout(() => {
        complete();
      }, 1780),
    );

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      anims.forEach((a) => a.revert());
    };
  }, [reducedMotion, complete]);

  if (hidden) return null;

  return (
    <div
      ref={veilRef}
      className="bakery-curtain"
      role="status"
      aria-label="Opening MIM Artisan Bakery"
    >
      <div ref={contentRef} className="bakery-curtain-inner">
        <div className="bakery-curtain-emblem" aria-hidden="true">
          <svg viewBox="0 0 260 150" className="bakery-curtain-svg" fill="none">
            {/* Scalloped cake tier & pedestal */}
            <path
              ref={cakePathRef}
              d="M 52,118 L 208,118 M 130,118 L 130,136 M 96,138 C 114,132 146,132 164,138 M 78,118 L 78,66 C 90,76 102,76 112,66 C 122,76 138,76 148,66 C 158,76 170,76 182,66 L 182,118"
              className="bakery-curtain-stroke"
            />
            {/* Unfurling pastry ribbon wings */}
            <path
              ref={ribbonLeftRef}
              d="M 116,50 C 90,34 52,44 36,68"
              className="bakery-curtain-ribbon"
            />
            <path
              ref={ribbonRightRef}
              d="M 144,50 C 170,34 208,44 224,68"
              className="bakery-curtain-ribbon"
            />
          </svg>
          <span ref={heartRef} className="bakery-curtain-heart">
            <MimHeart size={18} />
          </span>
        </div>

        <div ref={titleRef} className="bakery-curtain-text">
          <span className="bakery-curtain-item bakery-curtain-eyebrow">
            MIM Artisan Bakery · Salugara
          </span>
          <span className="bakery-curtain-item bakery-curtain-title">
            A little slice of happiness.
          </span>
        </div>
      </div>

      <button
        type="button"
        className="bakery-curtain-skip"
        onClick={complete}
        aria-label="Skip bakery opening animation"
      >
        Skip
      </button>
    </div>
  );
};
