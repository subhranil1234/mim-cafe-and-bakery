import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { animate } from 'animejs';
import { CREATIVE_EXPERIENCES, CreativeExperience } from '../data/experiences';
import { ChapterHeader } from '../components/ui/ChapterHeader';
import { CosmosFlower, StudioIllustration } from '../components/illustrations/BotanicalMotifs';
import { useParallax } from '../hooks/useParallax';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './CreativeStudio.css';

interface CreativeStudioProps {
  onSelectExperience: (id: CreativeExperience['id']) => void;
}

export const CreativeStudio: React.FC<CreativeStudioProps> = ({ onSelectExperience }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageDecorRef = useRef<HTMLDivElement>(null);
  const stageCardBodyRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  useParallax(sectionRef, stageDecorRef, 0.14);

  // Track which creative chapter is active in the viewport during scroll
  useEffect(() => {
    const updateActiveFromScroll = () => {
      const viewportCenter = window.innerHeight * 0.48;
      let bestIdx = 0;
      let bestDist = Number.POSITIVE_INFINITY;

      stepRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const dist = Math.abs(elCenter - viewportCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = idx;
        }
      });

      setActiveIndex((prev) => (prev === bestIdx ? prev : bestIdx));
    };

    let rafId = 0;
    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(() => {
          rafId = 0;
          updateActiveFromScroll();
        });
      }
    };

    updateActiveFromScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Subtle transition inside the sticky stage whenever the active experience changes
  useEffect(() => {
    if (reducedMotion || !stageCardBodyRef.current) return;
    const anim = animate(stageCardBodyRef.current, {
      opacity: [0.35, 1],
      translateY: [12, 0],
      duration: 420,
      ease: 'outCubic',
    });
    return () => {
      anim.revert();
    };
  }, [activeIndex, reducedMotion]);

  const activeExp = CREATIVE_EXPERIENCES[activeIndex] ?? CREATIVE_EXPERIENCES[0];

  const handleEnquireClick = (expId: CreativeExperience['id']) => {
    onSelectExperience(expId);
    const el = document.getElementById('enquire');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="create"
      ref={sectionRef}
      className="chapter studio-chapter"
      aria-labelledby="studio-heading"
    >
      <div className="chapter-inner">
        <ChapterHeader
          number="05"
          label="Creative Studio"
          title="A moment to slow down. A chance to create."
          subtitle="Three tactile studio experiences hosted right at your café table in Salugara."
          headingId="studio-heading"
        />

        <div className="studio-layout">
          {/* Left column: scrolling narrative chapters */}
          <div className="studio-steps-col">
            {CREATIVE_EXPERIENCES.map((exp, idx) => {
              const isActive = idx === activeIndex;
              return (
                <article
                  key={exp.id}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  data-step-index={idx}
                  className={`studio-step ${isActive ? 'is-active' : ''}`}
                  aria-labelledby={`exp-title-${exp.id}`}
                >
                  <div className="studio-step-meta">
                    <span className="studio-step-num">Experience {exp.number}</span>
                    <span className="studio-price-badge">{exp.priceDisplay}</span>
                  </div>

                  <h3 id={`exp-title-${exp.id}`} className="studio-step-title">
                    {exp.title}
                  </h3>

                  <p className="studio-step-copy">“{exp.editorialCopy}”</p>

                  {exp.options && exp.options.length > 0 && (
                    <ul className="studio-options-list">
                      {exp.options.map((opt) => (
                        <li key={opt.name}>
                          <strong>{opt.name}</strong>
                          {opt.detail && <span> — {opt.detail}</span>}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Mobile inline visual preview so phone visitors never miss the illustration */}
                  <div className="studio-mobile-visual" aria-hidden="true">
                    <StudioIllustration
                      type={exp.illustrationType}
                      className="studio-mobile-svg"
                    />
                  </div>

                  <div className="studio-step-actions">
                    <button
                      type="button"
                      className="button button-sm"
                      onClick={() => handleEnquireClick(exp.id)}
                    >
                      <span>Enquire About This Experience</span>
                      <ArrowRight size={15} aria-hidden="true" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Right column (Desktop): Sticky storytelling stage */}
          <aside className="studio-sticky-col" aria-label="Active creative experience preview">
            <div className="studio-sticky-stage">
              <div ref={stageDecorRef} className="studio-stage-cosmos" aria-hidden="true">
                <CosmosFlower className="studio-cosmos-svg" />
              </div>

              <div className="studio-stage-card">
                <div className="studio-stage-topbar">
                  <span className="studio-stage-counter">
                    {activeExp.number} / 0{CREATIVE_EXPERIENCES.length}
                  </span>
                  <span className="studio-stage-price">{activeExp.priceDisplay}</span>
                </div>

                <div ref={stageCardBodyRef} className="studio-stage-animated-body">
                  <div className="studio-illustration-frame">
                    <StudioIllustration
                      type={activeExp.illustrationType}
                      className="studio-stage-svg"
                    />
                  </div>

                  <div className="studio-stage-caption">
                    <span className="studio-stage-kicker">{activeExp.tagline}</span>
                    <h4 className="studio-stage-title">{activeExp.title}</h4>
                    <p className="studio-stage-quote">“{activeExp.editorialCopy}”</p>
                  </div>
                </div>

                <div className="studio-stage-dots" role="tablist" aria-label="Select studio chapter">
                  {CREATIVE_EXPERIENCES.map((exp, idx) => (
                    <button
                      key={exp.id}
                      type="button"
                      role="tab"
                      aria-selected={idx === activeIndex}
                      aria-label={`Preview ${exp.title}`}
                      className={`studio-dot-btn ${idx === activeIndex ? 'is-active' : ''}`}
                      onClick={() => {
                        setActiveIndex(idx);
                        stepRefs.current[idx]?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'center',
                        });
                      }}
                    >
                      <span>{exp.number}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
