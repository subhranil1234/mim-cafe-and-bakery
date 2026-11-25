import { useEffect, RefObject } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Applies smooth scroll-driven vertical parallax translation to an inner wrapper element
 * relative to its container's viewport position.
 * Keep CSS animations off the target ref so transforms never compete.
 */
export function useParallax(
  containerRef: RefObject<HTMLElement | null>,
  targetRef: RefObject<HTMLElement | null>,
  speed: number = 0.14,
) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const target = targetRef.current;
    if (!container || !target) return;

    if (reducedMotion) {
      target.style.transform = '';
      return;
    }

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const centerOffset = rect.top + rect.height / 2 - viewportHeight / 2;
      // Clamp offset so layers remain framed cleanly
      const maxShift = window.innerWidth < 768 ? 22 : 68;
      const shift = Math.max(-maxShift, Math.min(maxShift, -centerOffset * speed));
      target.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
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
      target.style.transform = '';
    };
  }, [containerRef, targetRef, speed, reducedMotion]);
}
