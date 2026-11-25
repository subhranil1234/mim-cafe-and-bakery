import React from 'react';
import { ArrowRight, ExternalLink, ShoppingBag } from 'lucide-react';
import { FloralStemPanel, MimHeart } from '../components/illustrations/BotanicalMotifs';
import { useOrder } from '../context/OrderContext';
import './MenuPortal.css';

interface MenuPortalProps {
  onOpenMenu: () => void;
}

const CHAPTER_PREVIEWS = [
  { num: '01', name: 'Beverages & Matcha', detail: 'Hot & Cold Coffee · Shakes · Coolers · Matcha' },
  { num: '02', name: 'Morning & Appetizers', detail: 'All-Day Breakfast · Add-ons · Appetizers' },
  { num: '03', name: 'Soul Food & Pastas', detail: 'Momos · Ramen · Pasta · Shawarma · Fried Rice' },
  { num: '04', name: 'Mains, Burgers & Pizzas', detail: 'Mains · Burgers · Quesadillas · Pizzas · Sandwiches' },
  { num: '05', name: 'Bakery, Desserts & Studio', detail: 'Whole Cakes · Cheesecakes · Brownies · Tiramisu' },
];

export const MenuPortal: React.FC<MenuPortalProps> = ({ onOpenMenu }) => {
  const { totalItems, subtotal } = useOrder();

  return (
    <section
      id="menu"
      className="chapter chapter-compact menu-portal-chapter"
      aria-labelledby="menu-portal-heading"
    >
      <div className="chapter-inner">
        <div className="menu-portal-card reveal">
          <FloralStemPanel className="menu-portal-floral" />

          <div className="menu-portal-left">
            <span className="chapter-label">Printed Menu &amp; Online Ordering</span>
            <h2 id="menu-portal-heading" className="menu-portal-wordmark" aria-label="Full Menu">
              <span aria-hidden="true">ME</span>
              <span aria-hidden="true">NU</span>
            </h2>
            <p className="menu-portal-copy">
              Step into MIM’s dedicated menu studio to flip through all 27 printed categories,
              search all 157 dishes, or order directly for table service, pickup, or local
              delivery.
            </p>

            <div className="menu-portal-actions">
              <a
                href="/menu"
                className="button"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                    e.preventDefault();
                    onOpenMenu();
                  }
                }}
              >
                <span>Open Menu &amp; Order Online</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>

              <a
                href="/menu"
                target="_blank"
                rel="noopener noreferrer"
                className="button button-secondary"
              >
                <span>Open in New Window</span>
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            </div>

            {totalItems > 0 && (
              <p className="menu-portal-bag-hint">
                <ShoppingBag size={14} aria-hidden="true" />
                <span>
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} in your order bag (₹
                  {subtotal.toLocaleString('en-IN')})
                </span>
              </p>
            )}
          </div>

          <div className="menu-portal-right">
            <div className="menu-portal-index-head">
              <MimHeart size={13} />
              <span>Inside the Menu Studio · 157 Items</span>
            </div>
            <ul className="menu-portal-chapters">
              {CHAPTER_PREVIEWS.map((ch) => (
                <li key={ch.num}>
                  <a
                    href="/menu"
                    className="menu-portal-chapter-link"
                    onClick={(e) => {
                      if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                        e.preventDefault();
                        onOpenMenu();
                      }
                    }}
                  >
                    <span className="menu-portal-ch-num">{ch.num}</span>
                    <div className="menu-portal-ch-body">
                      <strong>{ch.name}</strong>
                      <span>{ch.detail}</span>
                    </div>
                    <ArrowRight size={15} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
