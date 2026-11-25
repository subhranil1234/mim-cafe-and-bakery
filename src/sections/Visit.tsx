import React from 'react';
import { ExternalLink, MapPin } from 'lucide-react';
import { BUSINESS } from '../data/business';
import { ChapterHeader } from '../components/ui/ChapterHeader';
import { BotanicalSprig, MimHeart } from '../components/illustrations/BotanicalMotifs';
import './Visit.css';

export const Visit: React.FC = () => {
  return (
    <section
      id="visit"
      className="chapter visit-chapter"
      aria-labelledby="visit-heading"
    >
      <div className="chapter-inner">
        <div className="visit-grid">
          <div className="visit-info-col">
            <ChapterHeader
              number="07"
              label="Visit Us"
              title="There’s a little corner waiting for you."
              headingId="visit-heading"
            />

            <div className="visit-address-block reveal">
              <div className="visit-pin-row">
                <span className="visit-heart-pin" aria-hidden="true">
                  <MimHeart size={18} />
                </span>
                <div>
                  <h3 className="visit-name">{BUSINESS.name}</h3>
                  <p className="visit-place">{BUSINESS.location.displayAddress}</p>
                </div>
              </div>

              <div className="visit-actions">
                <a
                  href={BUSINESS.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button"
                >
                  <MapPin size={17} aria-hidden="true" />
                  <span>Open Directions in Google Maps</span>
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
                <a href="#enquire" className="button button-secondary">
                  Plan Your Visit · Studio Enquiry
                </a>
              </div>
            </div>

            <div className="visit-details-grid reveal">
              <div className="visit-detail-card">
                <h4>Location</h4>
                <p>Salugara, Siliguri, West Bengal, India</p>
              </div>
              <div className="visit-detail-card">
                <h4>Opening Hours &amp; Direct Contact</h4>
                <p>
                  Opening hours, phone/WhatsApp contact, and official social handles will be
                  published here once confirmed directly with MIM Bakery &amp; Café.
                </p>
              </div>
            </div>
          </div>

          <div className="visit-visual-col reveal">
            <div className="visit-map-card">
              <BotanicalSprig className="visit-botanical" />
              <div className="visit-card-inner">
                <span className="visit-card-eyebrow">Destination</span>
                <div className="visit-heart-crest" aria-hidden="true">
                  <MimHeart size={28} />
                </div>
                <p className="visit-card-title">MIM Bakery &amp; Café</p>
                <p className="visit-card-sub">Salugara · Siliguri · West Bengal</p>
                <a
                  href={BUSINESS.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="visit-map-link"
                >
                  <span>Search on Google Maps</span>
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
