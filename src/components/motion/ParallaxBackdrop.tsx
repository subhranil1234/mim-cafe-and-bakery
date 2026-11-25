import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const ParallaxBackdrop: React.FC = () => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const midgroundRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const supportsScrollTimeline =
      typeof CSS !== 'undefined' &&
      typeof CSS.supports === 'function' &&
      CSS.supports('animation-timeline: view()');

    if (supportsScrollTimeline) return;

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));

      if (backdropRef.current) {
        backdropRef.current.style.transform = `translate3d(0, ${(-10 * progress).toFixed(2)}vh, 0)`;
      }
      if (midgroundRef.current) {
        midgroundRef.current.style.transform = `translate3d(0, ${(-30 * progress).toFixed(2)}vh, 0)`;
      }
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reducedMotion]);

  return (
    <>
      <div className="backdrop" ref={backdropRef} aria-hidden="true">
        MIM
      </div>
      <div className="midground" ref={midgroundRef} aria-hidden="true" />
    </>
  );
};
