import React from 'react';
import { ExternalLink } from 'lucide-react';
import { BUSINESS } from '../data/business';
import { MimHeart } from '../components/illustrations/BotanicalMotifs';
import './Footer.css';

interface FooterProps {
  onOpenMenu?: () => void;
  onOpenBakery?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenMenu, onOpenBakery }) => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand-col">
            <img
              src="/images/brand/mim-logo-night.png"
              alt="MIM Bakery & Café"
              width={594}
              height={395}
              className="footer-logo"
            />
            <p className="footer-tagline">{BUSINESS.tagline}</p>
            <p className="footer-address">{BUSINESS.location.displayAddress}</p>
          </div>

          <nav className="footer-nav-col" aria-label="Footer navigation">
            <h3>Explore</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#story">Our Story</a></li>
              <li>
                <a
                  href="/menu"
                  onClick={(e) => {
                    if (onOpenMenu && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                      e.preventDefault();
                      onOpenMenu();
                    }
                  }}
                >
                  Full Menu &amp; Order
                </a>
              </li>
              <li>
                <a
                  href="/bakery"
                  onClick={(e) => {
                    if (onOpenBakery && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                      e.preventDefault();
                      onOpenBakery();
                    }
                  }}
                >
                  Bakery &amp; Cakes
                </a>
              </li>
              <li><a href="#gallery">Gallery</a></li>
            </ul>
          </nav>

          <div className="footer-nav-col">
            <h3>Creative Studio</h3>
            <ul>
              <li><a href="#create">Cake Decorating · ₹350</a></li>
              <li><a href="#create">Clay Studio · ₹300</a></li>
              <li><a href="#create">Canvas Painting · ₹200</a></li>
              <li><a href="#enquire">Experience Enquiry</a></li>
            </ul>
          </div>

          <div className="footer-nav-col">
            <h3>Visit</h3>
            <ul>
              <li>
                <a
                  href={BUSINESS.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-map-link"
                >
                  <span>Google Maps Directions</span>
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              </li>
              <li><a href="#visit">Location Details</a></li>
            </ul>
          </div>
        </div>

        <hr className="footer-rule" />

        <div className="footer-bottom">
          <p className="footer-love">
            <span>Made with a little love.</span>
            <span className="heart-pulse footer-heart-wrap" aria-hidden="true">
              <MimHeart size={15} />
            </span>
          </p>
          <p className="footer-meta">
            MIM Bakery &amp; Café · Salugara, Siliguri · Living Storytelling Demo
          </p>
        </div>
      </div>
    </footer>
  );
};
