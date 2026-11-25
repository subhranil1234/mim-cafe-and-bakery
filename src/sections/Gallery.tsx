import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ChapterHeader } from '../components/ui/ChapterHeader';
import { BotanicalSprig } from '../components/illustrations/BotanicalMotifs';
import { useParallax } from '../hooks/useParallax';
import './Gallery.css';

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  annotation: string;
  caption: string;
  aspect: 'landscape' | 'portrait' | 'square';
  tilt: string;
  speed: number;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'exterior',
    src: '/images/cafe/exterior-night.jpg',
    alt: 'MIM Bakery & Café exterior at night with illuminated Mim signage, warm fairy lights, dark green doors, and checkerboard entrance',
    annotation: 'evening lights at the entrance',
    caption: 'MIM Bakery & Café exterior by night · Salugara, Siliguri',
    aspect: 'landscape',
    tilt: '-1.5deg',
    speed: 0.08,
  },
  {
    id: 'interior',
    src: '/images/cafe/interior-day.jpg',
    alt: 'MIM interior featuring wooden window counter, cream bar stools, indoor green plant, and arched mirror',
    annotation: 'sunlight by the green frames',
    caption: 'Wooden counter, cream chairs & arched mirror inside MIM',
    aspect: 'landscape',
    tilt: '1.2deg',
    speed: -0.09,
  },
  {
    id: 'burger',
    src: '/images/food/burger-fries-window.jpg',
    alt: 'Burger and fries served in a blue-and-white ceramic dish on a wooden table at MIM',
    annotation: 'from the kitchen window',
    caption: 'Burger & fries at the window counter',
    aspect: 'portrait',
    tilt: '-1deg',
    speed: 0.12,
  },
  {
    id: 'biscoff-cheesecake',
    src: '/images/bakery/biscoff-cupcakes-blueberry-cheesecake.jpg',
    alt: 'Two Lotus Biscoff cupcakes and blueberry cheesecake served on a white platter at MIM',
    annotation: 'baked in small batches',
    caption: 'Biscoff cupcakes & blueberry cheesecake',
    aspect: 'landscape',
    tilt: '1.4deg',
    speed: -0.07,
  },
  {
    id: 'falafel',
    src: '/images/food/falafel-hummus-platter.jpg',
    alt: 'Falafel with hummus and dressed onions served inside MIM Bakery & Café',
    annotation: 'shared across the table',
    caption: 'Falafel & hummus inside MIM',
    aspect: 'portrait',
    tilt: '-0.8deg',
    speed: 0.1,
  },
];

const GalleryFrame: React.FC<{
  item: GalleryItem;
  index: number;
  containerRef: React.RefObject<HTMLElement | null>;
  onOpen: (index: number) => void;
}> = ({ item, index, containerRef, onOpen }) => {
  const frameRef = useRef<HTMLDivElement>(null);
  useParallax(containerRef, frameRef, item.speed);

  return (
    <div ref={frameRef} className={`gallery-cell gallery-cell-${index}`}>
      <button
        type="button"
        className="gallery-card reveal"
        style={{ '--card-tilt': item.tilt } as React.CSSProperties}
        onClick={() => onOpen(index)}
        aria-label={`View larger photograph: ${item.caption}`}
      >
        <div className={`gallery-img-box aspect-${item.aspect}`}>
          <img
            src={item.src}
            alt={item.alt}
            loading="lazy"
            className="gallery-img"
          />
        </div>
        <span className="gallery-annotation">{item.annotation}</span>
      </button>
    </div>
  );
};

export const Gallery: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const openLightbox = (idx: number) => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setLightboxIndex(idx);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    window.setTimeout(() => {
      lastFocusedRef.current?.focus();
    }, 0);
  };

  useEffect(() => {
    if (lightboxIndex === null) return;
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? 0 : (prev + 1) % GALLERY_ITEMS.length,
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? 0 : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length,
        );
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex]);

  const activeItem = lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="chapter gallery-chapter"
      aria-labelledby="gallery-heading"
    >
      <div className="chapter-inner">
        <div className="gallery-head-row">
          <ChapterHeader
            number="06"
            label="Connect · Authentic Moments"
            title="Life between the little things."
            subtitle="Real corners, plates, and evening lights from MIM Bakery & Café in Salugara — no staged stock photos."
            headingId="gallery-heading"
          />
          <BotanicalSprig className="gallery-sprig" />
        </div>

        <div className="gallery-masonry">
          {GALLERY_ITEMS.map((item, idx) => (
            <GalleryFrame
              key={item.id}
              item={item}
              index={idx}
              containerRef={sectionRef}
              onOpen={openLightbox}
            />
          ))}
        </div>
      </div>

      {/* Accessible Lightbox */}
      {activeItem && lightboxIndex !== null && (
        <div
          className="lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo lightbox: ${activeItem.caption}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          <div className="lightbox-frame">
            <div className="lightbox-topbar">
              <span className="lightbox-counter">
                {lightboxIndex + 1} / {GALLERY_ITEMS.length}
              </span>
              <button
                ref={closeBtnRef}
                type="button"
                className="lightbox-icon-btn"
                onClick={closeLightbox}
                aria-label="Close lightbox"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="lightbox-media-wrap">
              <button
                type="button"
                className="lightbox-nav-btn"
                aria-label="Previous photograph"
                onClick={() =>
                  setLightboxIndex(
                    (lightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length,
                  )
                }
              >
                <ChevronLeft size={22} aria-hidden="true" />
              </button>

              <figure className="lightbox-figure">
                <img
                  src={activeItem.src}
                  alt={activeItem.alt}
                  className="lightbox-img"
                />
                <figcaption className="lightbox-caption">
                  {activeItem.caption}
                </figcaption>
              </figure>

              <button
                type="button"
                className="lightbox-nav-btn"
                aria-label="Next photograph"
                onClick={() =>
                  setLightboxIndex((lightboxIndex + 1) % GALLERY_ITEMS.length)
                }
              >
                <ChevronRight size={22} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
