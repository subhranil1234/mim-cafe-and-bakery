import React, { useRef } from 'react';
import { ArrowRight, ExternalLink, ShoppingBag } from 'lucide-react';
import { ChapterHeader } from '../components/ui/ChapterHeader';
import { BotanicalSprig } from '../components/illustrations/BotanicalMotifs';
import { useParallax } from '../hooks/useParallax';
import { useOrder } from '../context/OrderContext';
import './Bakery.css';

interface BakeryProps {
  onOpenBakery: () => void;
}

const BAKERY_COLLECTIONS = [
  { name: 'Whole Cakes', note: 'Red Velvet · Lemon · Fudge Brownie · Carrot · Vanilla · Chocolate', range: '₹700 – ₹1,200' },
  { name: 'Whole Cheesecakes', note: 'Basque Burnt · Blueberry · San Sebastian · Nutella San Sebastian', range: '₹1,200 – ₹1,500' },
  { name: 'Loaf Cakes & Cupcakes', note: 'Banana Bread · Carrot Loaf · Red Velvet, Nutella, Pumpkin, Dog & Biscoff', range: '₹70 – ₹700' },
  { name: 'Individual Desserts', note: 'Brownies · Cheesecake Slices · Classic Italian Tiramisu', range: '₹200 – ₹260' },
];

export const Bakery: React.FC<BakeryProps> = ({ onOpenBakery }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const { totalItems, subtotal } = useOrder();

  useParallax(sectionRef, photoRef, 0.12);

  return (
    <section
      id="bakery"
      ref={sectionRef}
      className="chapter chapter-compact bakery-chapter"
      aria-labelledby="bakery-heading"
    >
      <div className="chapter-inner">
        <div className="bakery-hero-grid">
          <div className="bakery-intro-col">
            <ChapterHeader
              number="04"
              label="Indulge · Artisan Bakery"
              title="A little slice of happiness."
              subtitle="Whole cakes, Basque & San Sebastian cheesecakes, loaf cakes, cupcakes, brownies, and tiramisu."
              headingId="bakery-heading"
            />

            <ul className="bakery-summary-list reveal">
              {BAKERY_COLLECTIONS.map((col) => (
                <li key={col.name} className="bakery-summary-item">
                  <div className="bakery-summary-top">
                    <strong>{col.name}</strong>
                    <span>{col.range}</span>
                  </div>
                  <p>{col.note}</p>
                </li>
              ))}
            </ul>

            <div className="bakery-cta-row reveal">
              <a
                href="/bakery"
                className="button"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                    e.preventDefault();
                    onOpenBakery();
                  }
                }}
              >
                <span>Open Bakery &amp; Order Cakes</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>

              <a
                href="/bakery"
                target="_blank"
                rel="noopener noreferrer"
                className="button button-secondary"
              >
                <span>Open in New Window</span>
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            </div>

            {totalItems > 0 && (
              <p className="bakery-bag-hint reveal">
                <ShoppingBag size={14} aria-hidden="true" />
                <span>
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} in your order tray (₹
                  {subtotal.toLocaleString('en-IN')})
                </span>
              </p>
            )}
          </div>

          <div className="bakery-photo-col">
            <div ref={photoRef} className="bakery-photo-wrap">
              <figure className="bakery-frame reveal">
                <img
                  src="/images/bakery/biscoff-cupcakes-blueberry-cheesecake.jpg"
                  alt="Two Lotus Biscoff cupcakes and a slice of blueberry cheesecake served on a white plate at MIM Bakery & Café"
                  width={750}
                  height={500}
                  loading="lazy"
                  className="bakery-photo"
                />
                <figcaption className="bakery-caption">
                  Biscoff cupcakes &amp; blueberry cheesecake at MIM
                </figcaption>
              </figure>
              <BotanicalSprig className="bakery-sprig" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
