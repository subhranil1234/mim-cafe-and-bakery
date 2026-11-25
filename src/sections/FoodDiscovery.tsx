import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { ChapterHeader } from '../components/ui/ChapterHeader';
import { BotanicalSprig, FloralStemPanel } from '../components/illustrations/BotanicalMotifs';
import { useParallax } from '../hooks/useParallax';
import './FoodDiscovery.css';

interface DiscoveryCategory {
  number: string;
  title: string;
  items: { name: string; price: string }[];
  note: string;
}

const DISCOVERY_CATEGORIES: DiscoveryCategory[] = [
  {
    number: '01',
    title: 'The Coffee Corner',
    items: [
      { name: 'Cappuccino', price: '₹130' },
      { name: 'Biscoff Latte', price: '₹200' },
      { name: 'Affogato', price: '₹160' },
    ],
    note: 'Hot espresso classics and chilled lattes.',
  },
  {
    number: '02',
    title: 'Matcha Moments',
    items: [
      { name: 'Matcha Strawberry', price: '₹250' },
      { name: 'Matcha Coconut Cloud', price: '₹250' },
      { name: 'Matcha Latte (Hot / Cold)', price: '₹200' },
    ],
    note: 'Fruit-infused and classic matcha pours.',
  },
  {
    number: '03',
    title: 'Slow Breakfasts',
    items: [
      { name: 'Tiramisu French Toast', price: '₹300' },
      { name: 'English Breakfast', price: '₹450' },
      { name: 'French Toast', price: '₹250' },
    ],
    note: 'Served all day with customizable add-ons.',
  },
  {
    number: '04',
    title: 'Comfort Food',
    items: [
      { name: 'Chicken Jhol Momo', price: '₹200' },
      { name: 'Pesto Pasta', price: '₹300 / ₹330' },
      { name: 'Falafel Wrap', price: '₹170' },
    ],
    note: 'From Himalayan soul food to pasta, burgers, and platters.',
  },
  {
    number: '05',
    title: 'Sweet Indulgences',
    items: [
      { name: 'Classic Italian Tiramisu', price: '₹230' },
      { name: 'Blueberry Cheesecake', price: '₹220' },
      { name: 'Lotus Biscoff Brownie', price: '₹230' },
    ],
    note: 'Small-plate desserts alongside whole bakery cakes.',
  },
];

interface FoodDiscoveryProps {
  onOpenMenu: () => void;
}

export const FoodDiscovery: React.FC<FoodDiscoveryProps> = ({ onOpenMenu }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const photoWrapRef = useRef<HTMLDivElement>(null);
  const floralWrapRef = useRef<HTMLDivElement>(null);

  useParallax(sectionRef, photoWrapRef, 0.12);
  useParallax(sectionRef, floralWrapRef, -0.15);

  return (
    <section
      id="savour"
      ref={sectionRef}
      className="chapter savour-chapter"
      aria-labelledby="savour-heading"
    >
      <div className="chapter-inner">
        <div className="savour-top-row">
          <ChapterHeader
            number="03"
            label="Savour"
            title="Made to be savoured."
            subtitle="From morning coffee and all-day breakfast plates to comforting momos, handmade pastas, and evening desserts."
            headingId="savour-heading"
          />
          <div className="savour-top-cta reveal">
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
              <span>Explore the Full Menu</span>
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="savour-layout">
          {/* Authentic MIM food photography diptych */}
          <div className="savour-photos-col">
            <div ref={photoWrapRef} className="savour-photo-stack">
              <figure className="savour-photo-card reveal">
                <img
                  src="/images/food/burger-fries-window.jpg"
                  alt="Crafted burger and golden fries served in a ceramic dish by MIM's dark green window frames"
                  width={768}
                  height={1024}
                  loading="lazy"
                  className="savour-img"
                />
                <figcaption className="savour-caption">
                  Burgers &amp; fries by the window table
                </figcaption>
              </figure>

              <figure className="savour-photo-card savour-photo-offset reveal">
                <img
                  src="/images/food/falafel-hummus-platter.jpg"
                  alt="Crisp falafel served alongside olive-oil drizzled hummus and sumac onions inside MIM Bakery & Café"
                  width={607}
                  height={1280}
                  loading="lazy"
                  className="savour-img"
                />
                <figcaption className="savour-caption">
                  Fresh from the kitchen inside MIM
                </figcaption>
              </figure>
            </div>

            <div ref={floralWrapRef} className="savour-botanical-accent" aria-hidden="true">
              <FloralStemPanel className="savour-floral-svg" />
            </div>
          </div>

          {/* Staggered editorial category list */}
          <div className="savour-categories-col">
            {DISCOVERY_CATEGORIES.map((cat) => (
              <article key={cat.number} className="savour-cat-row reveal">
                <div className="savour-cat-head">
                  <span className="savour-cat-num">{cat.number}</span>
                  <h3 className="savour-cat-title">{cat.title}</h3>
                </div>
                <p className="savour-cat-note">{cat.note}</p>
                <ul className="savour-cat-items">
                  {cat.items.map((item) => (
                    <li key={item.name} className="savour-item-line">
                      <span>{item.name}</span>
                      <span className="savour-dots" aria-hidden="true" />
                      <span className="savour-item-price">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}

            <div className="savour-footer-callout reveal">
              <BotanicalSprig className="savour-inline-sprig" />
              <p>
                Every item and price listed below matches the physical printed menu at our
                Salugara café.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
