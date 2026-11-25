import React, { useRef } from 'react';
import { ChapterHeader } from '../components/ui/ChapterHeader';
import { BotanicalSprig, MimHeart } from '../components/illustrations/BotanicalMotifs';
import { useParallax } from '../hooks/useParallax';
import './CafeStory.css';

export const CafeStory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const motifRef = useRef<HTMLDivElement>(null);
  const secondaryFrameRef = useRef<HTMLDivElement>(null);

  useParallax(sectionRef, motifRef, 0.18);
  useParallax(sectionRef, secondaryFrameRef, -0.1);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="chapter story-chapter"
      aria-labelledby="story-heading"
    >
      <div className="chapter-inner story-grid">
        {/* Sticky authentic interior photography column */}
        <div className="story-visual-col">
          <div className="story-sticky-stage">
            <figure className="story-primary-frame reveal">
              <img
                src="/images/cafe/interior-day.jpg"
                alt="Inside MIM Bakery & Café: wooden window counter, cream bar stools, dark forest-green window frames, indoor plant, and arched mirror"
                width={1024}
                height={682}
                loading="lazy"
                className="story-photo"
              />
              <figcaption className="story-caption">
                Sunlight across the wooden counter · Salugara, Siliguri
              </figcaption>
            </figure>

            <div ref={secondaryFrameRef} className="story-layered-inset" aria-hidden="true">
              <img
                src="/images/cafe/exterior-night.jpg"
                alt=""
                width={1024}
                height={768}
                loading="lazy"
                className="story-inset-img"
              />
            </div>

            <div ref={motifRef} className="story-botanical-float" aria-hidden="true">
              <BotanicalSprig className="story-sprig-svg" />
            </div>
          </div>
        </div>

        {/* Progressive editorial narrative column */}
        <div className="story-editorial-col">
          <ChapterHeader
            number="02"
            label="Step Inside"
            title="Some places feel like home."
            headingId="story-heading"
          />

          <blockquote className="story-pullquote reveal">
            “A warm cup, a quiet corner, something sweet and a little time for yourself.”
          </blockquote>

          <hr className="editorial-rule" />

          <div className="story-beats">
            <article className="story-beat reveal">
              <span className="story-beat-index">I · The Threshold</span>
              <h3 className="story-beat-title">Beyond the forest-green door</h3>
              <p>
                Cross the checkerboard entrance and the pace of Salugara softens. Dark green
                window frames open onto natural wood counters, cream-toned seating, and
                hand-tended greenery caught in an arched mirror.
              </p>
            </article>

            <article className="story-beat reveal">
              <span className="story-beat-index">II · The Table</span>
              <h3 className="story-beat-title">From unhurried mornings to golden evenings</h3>
              <p>
                Whether you arrive for sunlit espresso and all-day breakfast or stay past dusk
                under warm fairy lights for shared desserts, every corner is arranged for real
                conversation and unhurried comfort.
              </p>
            </article>

            <article className="story-beat reveal">
              <span className="story-beat-index">III · The Studio</span>
              <h3 className="story-beat-title">A neighbourhood café that invites you to make</h3>
              <p>
                Alongside freshly brewed coffee and baked treats, MIM keeps space on the table
                for frostings, air-dry clay, and paintbrushes — a gentle invitation to linger a
                little longer and carry home something made by hand.
              </p>
            </article>
          </div>

          <div className="story-signoff reveal">
            <MimHeart size={15} />
            <span className="hand-note">“A moment to slow down. A chance to create.”</span>
          </div>
        </div>
      </div>
    </section>
  );
};
