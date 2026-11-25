import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, RotateCcw, Search, X } from 'lucide-react';
import { animate } from 'animejs';
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  MenuCategoryId,
  MenuItem,
} from '../data/menu';
import {
  BotanicalSprig,
  CosmosFlower,
  FloralStemPanel,
} from '../components/illustrations/BotanicalMotifs';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './DigitalMenu.css';

interface BookletPage {
  id: 'beverages' | 'morning-bites' | 'soul-plates' | 'mains-burgers' | 'bakery-studio';
  number: string;
  title: string;
  subtitle: string;
  categories: MenuCategoryId[];
  motif: 'floral' | 'sprig' | 'cosmos';
}

const BOOKLET_PAGES: BookletPage[] = [
  {
    id: 'beverages',
    number: '01',
    title: 'Beverages & Matcha',
    subtitle: 'Hot & cold espresso, shakes, teas, coolers, and matcha pours.',
    categories: ['hot-coffee', 'cold-coffee', 'shakes', 'non-coffee', 'coolers', 'matcha'],
    motif: 'floral',
  },
  {
    id: 'morning-bites',
    number: '02',
    title: 'Morning & Appetizers',
    subtitle: 'All-day breakfast plates, customizable add-ons, and crispy starters.',
    categories: ['all-day-breakfast', 'breakfast-add-ons', 'appetizers'],
    motif: 'sprig',
  },
  {
    id: 'soul-plates',
    number: '03',
    title: 'Soul Food & Pastas',
    subtitle: 'Momos, ramen, handmade pastas, shawarma wraps, soups, and woks.',
    categories: ['soul-food', 'pasta', 'shawarma', 'soup', 'fried-rice-chowmein'],
    motif: 'sprig',
  },
  {
    id: 'mains-burgers',
    number: '04',
    title: 'Mains, Burgers & Pizzas',
    subtitle: 'Hearty platters, burgers, quesadillas, stone-baked pizzas, and sandwiches.',
    categories: ['quesadillas', 'pizzas', 'mains', 'burgers', 'sandwiches'],
    motif: 'floral',
  },
  {
    id: 'bakery-studio',
    number: '05',
    title: 'Bakery, Desserts & Studio',
    subtitle: 'Whole cakes, cheesecakes, cupcakes, brownies, tiramisu, and creative sessions.',
    categories: [
      'cakes',
      'loaf-cakes',
      'whole-cheesecakes',
      'cupcakes',
      'brownies',
      'cheesecake-desserts',
      'tiramisu',
      'creative-experiences',
    ],
    motif: 'cosmos',
  },
];

export const DigitalMenu: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const spreadRef = useRef<HTMLDivElement>(null);
  const ledgerTopRef = useRef<HTMLDivElement>(null);

  const [pageIndex, setPageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<'all' | MenuCategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllPages, setShowAllPages] = useState(false);

  const currentPage = BOOKLET_PAGES[pageIndex] ?? BOOKLET_PAGES[0];
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;

  // Categories belonging to the active booklet spread (or all when viewing full menu)
  const pageCategories = useMemo(() => {
    if (showAllPages || isSearching) return MENU_CATEGORIES;
    return MENU_CATEGORIES.filter((cat) => currentPage.categories.includes(cat.id));
  }, [currentPage, showAllPages, isSearching]);

  const filteredSections = useMemo(() => {
    const baseCategories =
      isSearching || showAllPages
        ? MENU_CATEGORIES
        : MENU_CATEGORIES.filter((c) => currentPage.categories.includes(c.id));

    return baseCategories
      .filter((cat) => selectedCategory === 'all' || cat.id === selectedCategory)
      .map((cat) => {
        const items = MENU_ITEMS.filter((item) => {
          if (item.category !== cat.id) return false;
          if (!normalizedQuery) return true;
          const haystack = [
            item.name,
            item.description ?? '',
            cat.label,
            item.dietary ?? '',
          ]
            .join(' ')
            .toLowerCase();
          return haystack.includes(normalizedQuery);
        });
        return { category: cat, items };
      })
      .filter((section) => section.items.length > 0);
  }, [currentPage, selectedCategory, normalizedQuery, isSearching, showAllPages]);

  const totalMatches = useMemo(
    () => filteredSections.reduce((sum, sec) => sum + sec.items.length, 0),
    [filteredSections],
  );

  // Gentle page-turn animation when switching booklet pages
  useEffect(() => {
    if (reducedMotion || !spreadRef.current || isSearching) return;
    const anim = animate(spreadRef.current, {
      opacity: [0.35, 1],
      translateY: [10, 0],
      duration: 380,
      ease: 'outCubic',
    });
    return () => {
      anim.revert();
    };
  }, [pageIndex, selectedCategory, showAllPages, isSearching, reducedMotion]);

  const selectPage = (idx: number, scrollTop = false) => {
    setShowAllPages(false);
    setSelectedCategory('all');
    setPageIndex(idx);
    if (scrollTop && ledgerTopRef.current) {
      ledgerTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const resetAll = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setShowAllPages(false);
  };

  return (
    <section
      id="menu"
      className="chapter chapter-compact menu-chapter"
      aria-labelledby="menu-heading"
    >
      <div className="chapter-inner">
        <div ref={ledgerTopRef} className="menu-folio">
          {/* Compact Editorial Header + Global Search */}
          <div className="menu-folio-header">
            <div className="menu-brand-strip">
              <div className="menu-mega-lockup">
                <span className="chapter-label">Interactive Menu Booklet</span>
                <h2 id="menu-heading" className="menu-title-inline">
                  ME<span className="menu-title-slash" aria-hidden="true">/</span>NU
                </h2>
              </div>

              <div className="menu-search-controls">
                <div className="menu-search-box">
                  <Search size={16} className="menu-search-icon" aria-hidden="true" />
                  <label htmlFor="menu-search-input" className="sr-only">
                    Search all 157 menu items
                  </label>
                  <input
                    id="menu-search-input"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (e.target.value.trim()) setSelectedCategory('all');
                    }}
                    placeholder="Search all 157 items (matcha, momo, biscoff...)"
                    className="menu-search-input"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="menu-clear-btn"
                      aria-label="Clear search query"
                    >
                      <X size={15} aria-hidden="true" />
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowAllPages((prev) => !prev);
                    setSelectedCategory('all');
                  }}
                  aria-pressed={showAllPages}
                  className={`menu-expand-btn ${showAllPages ? 'is-active' : ''}`}
                >
                  <BookOpen size={14} aria-hidden="true" />
                  <span>{showAllPages ? 'Back to Booklet' : 'View All 27 Categories'}</span>
                </button>
              </div>
            </div>

            {/* Booklet Page Tabs (5 compact printed-menu spreads) */}
            {!isSearching && (
              <div className="menu-booklet-tabs" role="tablist" aria-label="Menu booklet pages">
                {BOOKLET_PAGES.map((page, idx) => {
                  const active = !showAllPages && idx === pageIndex;
                  return (
                    <button
                      key={page.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => selectPage(idx)}
                      className={`menu-page-tab ${active ? 'is-active' : ''}`}
                    >
                      <span className="menu-page-tab-num">{page.number}</span>
                      <span>{page.title}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Active Spread Metadata & Quick Category Pills */}
          <div className="menu-spread-bar">
            <div className="menu-spread-summary">
              {isSearching ? (
                <>
                  <h3 className="menu-spread-title">
                    Search results for “{searchQuery}”
                  </h3>
                  <span className="menu-spread-count" aria-live="polite">
                    {totalMatches} {totalMatches === 1 ? 'match' : 'matches'} across MIM’s full menu
                  </span>
                </>
              ) : showAllPages ? (
                <>
                  <h3 className="menu-spread-title">Complete Menu Ledger</h3>
                  <span className="menu-spread-count" aria-live="polite">
                    All {totalMatches} items · Prices in ₹
                  </span>
                </>
              ) : (
                <>
                  <h3 className="menu-spread-title">
                    Page {currentPage.number} · {currentPage.title}
                  </h3>
                  <span className="menu-spread-count" aria-live="polite">
                    {currentPage.subtitle} · {totalMatches} items
                  </span>
                </>
              )}
            </div>

            {!isSearching && !showAllPages && (
              <div className="menu-category-pills" role="group" aria-label="Filter categories on this page">
                <button
                  type="button"
                  aria-pressed={selectedCategory === 'all'}
                  onClick={() => setSelectedCategory('all')}
                  className={`menu-cat-pill ${selectedCategory === 'all' ? 'is-active' : ''}`}
                >
                  All on page
                </button>
                {pageCategories.map((cat) => {
                  const active = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`menu-cat-pill ${active ? 'is-active' : ''}`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Booklet Spread Content */}
          {filteredSections.length === 0 ? (
            <div className="menu-empty-state" role="status">
              <CosmosFlower className="menu-empty-flower" />
              <h3 className="menu-empty-title">No menu items matched “{searchQuery}”.</h3>
              <p className="menu-empty-copy">
                Try another keyword like “Matcha”, “Biscoff”, “Momo”, or “Cheesecake”, or return
                to the menu booklet.
              </p>
              <button type="button" onClick={resetAll} className="button button-sm">
                <RotateCcw size={14} aria-hidden="true" />
                <span>Reset Search</span>
              </button>
            </div>
          ) : (
            <div ref={spreadRef} className="menu-spread-body">
              <div
                className={`menu-sections-grid ${
                  filteredSections.length === 1 ? 'is-single-col' : ''
                }`}
              >
                {filteredSections.map(({ category, items }) => (
                  <article
                    key={category.id}
                    className="menu-category-block"
                    aria-labelledby={`cat-heading-${category.id}`}
                  >
                    <div className="menu-cat-header">
                      <div>
                        <h4 id={`cat-heading-${category.id}`} className="menu-cat-name">
                          {category.label}
                        </h4>
                        {category.variantHeaderNote && (
                          <span className="menu-variant-note">{category.variantHeaderNote}</span>
                        )}
                      </div>
                      <span className="menu-cat-count">{items.length}</span>
                    </div>

                    <hr className="menu-cat-rule" />

                    <ul className="menu-items-list">
                      {items.map((item: MenuItem) => (
                        <li key={item.id} className="menu-item-row">
                          <div className="menu-item-title-line">
                            <span className="menu-item-name">{item.name}</span>
                            <span className="menu-item-dots" aria-hidden="true" />
                            <span className="menu-item-price">{item.priceDisplay}</span>
                          </div>
                          {item.description && (
                            <p className="menu-item-desc">{item.description}</p>
                          )}
                          {item.variants && item.variants.length > 0 && (
                            <p className="menu-item-variants">
                              {item.variants.map((v) => `${v.label}: ₹${v.price}`).join(' · ')}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>

                    {category.footnote && (
                      <p className="menu-cat-footnote">* {category.footnote}</p>
                    )}
                  </article>
                ))}
              </div>

              {/* Corner Botanical Illustration matching the active spread */}
              <div className="menu-spread-motif" aria-hidden="true">
                {currentPage.motif === 'floral' && <FloralStemPanel className="menu-motif-svg" />}
                {currentPage.motif === 'sprig' && <BotanicalSprig className="menu-motif-svg" />}
                {currentPage.motif === 'cosmos' && <CosmosFlower className="menu-motif-svg" />}
              </div>
            </div>
          )}

          {/* Bottom Page-Turn Navigation */}
          <div className="menu-folio-footer">
            {!isSearching && !showAllPages ? (
              <div className="menu-pager">
                <button
                  type="button"
                  className="menu-pager-btn"
                  disabled={pageIndex === 0}
                  onClick={() => selectPage(Math.max(0, pageIndex - 1), true)}
                >
                  <ChevronLeft size={16} aria-hidden="true" />
                  <span>Previous Page</span>
                </button>

                <span className="menu-pager-status">
                  Page {currentPage.number} of 0{BOOKLET_PAGES.length} · Exact printed menu prices (₹)
                </span>

                <button
                  type="button"
                  className="menu-pager-btn"
                  disabled={pageIndex === BOOKLET_PAGES.length - 1}
                  onClick={() =>
                    selectPage(Math.min(BOOKLET_PAGES.length - 1, pageIndex + 1), true)
                  }
                >
                  <span>Next Page</span>
                  <ChevronRight size={16} aria-hidden="true" />
                </button>
              </div>
            ) : (
              <div className="menu-pager">
                <span className="menu-pager-status">
                  Exact printed menu prices (₹) · Salugara, Siliguri
                </span>
                <button type="button" className="menu-pager-btn" onClick={resetAll}>
                  <RotateCcw size={14} aria-hidden="true" />
                  <span>Return to Booklet View</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
