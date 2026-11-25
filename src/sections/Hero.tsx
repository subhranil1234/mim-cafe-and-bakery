import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { animate } from 'animejs';
import { useAmbience } from '../hooks/useAmbience';
import { useParallax } from '../hooks/useParallax';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { BotanicalSprig, MimHeart } from '../components/illustrations/BotanicalMotifs';
import './Hero.css';

interface HeroProps {
  ready: boolean;
}

export const Hero: React.FC<HeroProps> = ({ ready }) => {
  const { activeTheme, solar } = useAmbience();
  const reducedMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const farLayerRef = useRef<HTMLDivElement>(null);
  const midLayerRef = useRef<HTMLDivElement>(null);
  const foreLayerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Three independently moving parallax depth layers
  useParallax(sectionRef, farLayerRef, 0.08);
  useParallax(sectionRef, midLayerRef, 0.2);
  useParallax(sectionRef, foreLayerRef, -0.06);

  useEffect(() => {
    if (!ready || reducedMotion || !contentRef.current) return;
    const targets = contentRef.current.querySelectorAll('.hero-stagger');
    animate(targets, {
      opacity: [0, 1],
      translateY: [22, 0],
      delay: (_el, idx) => (idx ?? 0) * 95,
      duration: 720,
      ease: 'outCubic',
    });
  }, [ready, reducedMotion]);

  const heroImage =
    activeTheme === 'night'
      ? '/images/cafe/exterior-night.jpg'
      : '/images/cafe/exterior-day.jpg';

  const heroAlt =
    activeTheme === 'night'
      ? 'MIM Bakery & Café exterior at night in Salugara, Siliguri with illuminated Mim sign, dark green façade, fairy lights, and checkerboard entrance'
      : 'MIM Bakery & Café daytime exterior in Salugara, Siliguri with sunlit forest-green façade, dappled tree shadows, and checkerboard patio';

  return (
    <section
      id="home"
      ref={sectionRef}
      className="chapter hero-chapter"
      aria-labelledby="hero-headline"
    >
      {/* Layer 1: Far Background (Authentic Café Photograph + Atmospheric Editorial Wordmark) */}
      <div className="hero-far-clip" aria-hidden="true">
        <div ref={farLayerRef} className="hero-far-layer">
          <img
            src={heroImage}
            alt={heroAlt}
            className="hero-bg-photo"
            fetchPriority="high"
            width={1024}
            height={768}
          />
          <div className="hero-scrim" />
          <span className="hero-far-watermark">ARRIVAL</span>
        </div>
      </div>

      {/* Layer 2: Midground (Botanical Silhouettes & Ambient Light) */}
      <div ref={midLayerRef} className="hero-mid-layer" aria-hidden="true">
        <div className="hero-ambient-aura" />
        {activeTheme === 'night' && (
          <div className="hero-fairy-lights">
            <span className="fairy-bulb fairy-bulb-1" />
            <span className="fairy-bulb fairy-bulb-2" />
            <span className="fairy-bulb fairy-bulb-3" />
            <span className="fairy-bulb fairy-bulb-4" />
          </div>
        )}
        <BotanicalSprig className="hero-botanical hero-botanical-left" />
        <BotanicalSprig className="hero-botanical hero-botanical-right" />
      </div>

      {/* Layer 3: Foreground (Headline, Supporting Copy, CTAs, Scroll Invitation) */}
      <div ref={foreLayerRef} className="hero-fore-layer">
        <div ref={contentRef} className="hero-content">
          <div className="hero-meta-row hero-stagger">
            <span className="chapter-label">Chapter 01 · Arrival</span>
            <span className="hero-ambience-pill">
              <MimHeart size={12} />
              <span>
                {activeTheme === 'night' ? 'MIM by Night' : 'MIM by Day'} · Siliguri ({solar.localTimeFormatted})
              </span>
            </span>
          </div>

          <h1 id="hero-headline" className="title headline-hero hero-stagger">
            A moment to slow down.
          </h1>

          <p className="prose-lead hero-supporting hero-stagger">
            A bakery, a café, and a little space to create.
          </p>

          <div className="hero-ctas hero-stagger">
            <a href="#story" className="button">
              Discover MIM
            </a>
            <a href="#create" className="button button-secondary">
              Explore Experiences
            </a>
          </div>

          <a href="#story" className="hero-scroll-invite hero-stagger">
            <span>Scroll to step inside.</span>
            <ArrowDown size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};
