import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAmbience } from '../../hooks/useAmbience';
import { DailyQuoteBox } from '../theme/DailyQuoteBox';
import './Navbar.css';

interface NavbarProps {
  onOpenMenu: () => void;
  onOpenBakery: () => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '#home', route: null as 'menu' | 'bakery' | null },
  { label: 'Our Story', href: '#story', route: null },
  { label: 'Menu', href: '/menu', route: 'menu' as const },
  { label: 'Bakery', href: '/bakery', route: 'bakery' as const },
  { label: 'Create', href: '#create', route: null },
  { label: 'Gallery', href: '#gallery', route: null },
  { label: 'Visit', href: '#visit', route: null },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenMenu, onOpenBakery }) => {
  const { logoSrc } = useAmbience();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#home" className="nav-brand" aria-label="MIM Bakery & Café Home">
          <img
            src={logoSrc}
            alt="MIM Bakery & Café"
            width={594}
            height={395}
            className="nav-logo"
          />
        </a>

        <nav className="nav-desktop" aria-label="Primary navigation">
          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav-link"
                  onClick={(e) => {
                    if (link.route && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                      e.preventDefault();
                      if (link.route === 'menu') onOpenMenu();
                      if (link.route === 'bakery') onOpenBakery();
                    }
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <div className="nav-ambience-desktop">
            <DailyQuoteBox />
          </div>
          <a href="#visit" className="button button-sm nav-visit-cta">
            Plan Your Visit
          </a>
          <button
            type="button"
            className="nav-mobile-toggle"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-nav-drawer" className="mobile-drawer" role="dialog" aria-label="Mobile Navigation">
          <nav aria-label="Mobile links">
            <ul className="mobile-nav-links">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="mobile-nav-link"
                    onClick={(e) => {
                      handleLinkClick();
                      if (link.route && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                        e.preventDefault();
                        if (link.route === 'menu') onOpenMenu();
                        if (link.route === 'bakery') onOpenBakery();
                      }
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-drawer-footer">
            <div className="mobile-ambience-wrap">
              <span className="mobile-ambience-label">Today’s Note</span>
              <DailyQuoteBox compact />
            </div>
            <a href="#visit" className="button" onClick={handleLinkClick}>
              Plan Your Visit
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
