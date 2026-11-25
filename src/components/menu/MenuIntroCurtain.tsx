import React, { useCallback, useEffect, useRef, useState } from 'react';
import { animate, svg } from 'animejs';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { MimHeart } from '../illustrations/BotanicalMotifs';
import './MenuIntroCurtain.css';

interface MenuIntroCurtainProps {
  onDone: () => void;
}

export const MenuIntroCurtain: React.FC<MenuIntroCurtainProps> = ({ onDone }) => {
  const reducedMotion = useReducedMotion();
  const backdropRef = useRef<HTMLDivElement>(null);
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const ruleTopRef = useRef<SVGLineElement>(null);
  const ruleBottomRef = useRef<SVGLineElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLSpanElement>(null);
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

    // 1. Hairline rules draw outward like opening a printed menu card
    if (ruleTopRef.current) {
      anims.push(
        animate(svg.createDrawable(ruleTopRef.current), {
          draw: ['0.5 0.5', '0 1'],
          duration: 620,
          ease: 'outCubic',
        }),
      );
    }
    if (ruleBottomRef.current) {
      anims.push(
        animate(svg.createDrawable(ruleBottomRef.current), {
          draw: ['0.5 0.5', '0 1'],
          delay: 120,
          duration: 620,
          ease: 'outCubic',
        }),
      );
    }

    // 2. Giant Bodoni Moda letters M E / N U rise through baseline masks
    if (backdropRef.current) {
      const glyphs = backdropRef.current.querySelectorAll('.menu-curtain-glyph');
      anims.push(
        animate(glyphs, {
          translateY: ['112%', '0%'],
          opacity: [0, 1],
          delay: (_el, idx) => 120 + (idx ?? 0) * 85,
          duration: 540,
          ease: 'outQuart',
        }),
      );
    }

    if (heartRef.current) {
      anims.push(
        animate(heartRef.current, {
          scale: [0, 1.25, 1],
          opacity: [0, 1],
          delay: 460,
          duration: 420,
          ease: 'outBack',
        }),
      );
    }

    if (subtitleRef.current) {
      anims.push(
        animate(subtitleRef.current, {
          opacity: [0, 1],
          translateY: [10, 0],
          delay: 520,
          duration: 420,
          ease: 'outCubic',
        }),
      );
    }

    // 3. Typographic split: ME rises, NU descends, curtain parts to reveal the Menu Studio
    timers.push(
      window.setTimeout(() => {
        if (topRowRef.current) {
          anims.push(
            animate(topRowRef.current, {
              translateY: ['0%', '-42%'],
              opacity: [1, 0],
              duration: 520,
              ease: 'inOutCubic',
            }),
          );
        }
        if (bottomRowRef.current) {
          anims.push(
            animate(bottomRowRef.current, {
              translateY: ['0%', '42%'],
              opacity: [1, 0],
              duration: 520,
              ease: 'inOutCubic',
            }),
          );
        }
        if (backdropRef.current) {
          anims.push(
            animate(backdropRef.current, {
              opacity: [1, 0],
              delay: 140,
              duration: 460,
              ease: 'inOutQuad',
            }),
          );
        }
      }, 1050),
    );

    timers.push(
      window.setTimeout(() => {
        complete();
      }, 1620),
    );

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      anims.forEach((a) => a.revert());
    };
  }, [reducedMotion, complete]);

  if (hidden) return null;

  return (
    <div
      ref={backdropRef}
      className="menu-curtain"
      role="status"
      aria-label="Opening MIM Menu"
    >
      <div className="menu-curtain-inner">
        <svg viewBox="0 0 320 12" className="menu-curtain-rule-svg" aria-hidden="true">
          <line ref={ruleTopRef} x1="0" y1="6" x2="320" y2="6" className="menu-curtain-rule" />
        </svg>

        <div className="menu-curtain-wordmark" aria-hidden="true">
          <div ref={topRowRef} className="menu-curtain-row">
            <span className="menu-curtain-mask">
              <span className="menu-curtain-glyph">M</span>
            </span>
            <span className="menu-curtain-mask">
              <span className="menu-curtain-glyph">E</span>
            </span>
          </div>
          <div ref={bottomRowRef} className="menu-curtain-row">
            <span className="menu-curtain-mask">
              <span className="menu-curtain-glyph">N</span>
            </span>
            <span className="menu-curtain-mask">
              <span className="menu-curtain-glyph">U</span>
            </span>
          </div>
        </div>

        <svg viewBox="0 0 320 12" className="menu-curtain-rule-svg" aria-hidden="true">
          <line ref={ruleBottomRef} x1="0" y1="6" x2="320" y2="6" className="menu-curtain-rule" />
        </svg>

        <div ref={subtitleRef} className="menu-curtain-sub">
          <span ref={heartRef} className="menu-curtain-heart" aria-hidden="true">
            <MimHeart size={13} />
          </span>
          <span>MIM Bakery &amp; Café · Salugara · Order &amp; Browse</span>
        </div>
      </div>

      <button
        type="button"
        className="menu-curtain-skip"
        onClick={complete}
        aria-label="Skip menu opening animation"
      >
        Skip
      </button>
    </div>
  );
};
