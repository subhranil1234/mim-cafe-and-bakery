import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Minus,
  Plus,
  Printer,
  RotateCcw,
  Search,
  ShoppingBag,
  Trash2,
  Utensils,
  X,
} from 'lucide-react';
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
  MimHeart,
} from '../components/illustrations/BotanicalMotifs';
import { MenuIntroCurtain } from '../components/menu/MenuIntroCurtain';
import { useAmbience } from '../hooks/useAmbience';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useOrder } from '../context/OrderContext';
import { DailyQuoteBox } from '../components/theme/DailyQuoteBox';
import '../sections/DigitalMenu.css';
import './MenuPage.css';

interface MenuPageProps {
  onBackHome: () => void;
}

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

type FulfillmentType = 'dine-in' | 'pickup' | 'delivery';

interface PlacedOrderTicket {
  ticketId: string;
  createdAt: string;
  fulfillment: FulfillmentType;
  customerName: string;
  phone: string;
  detailLine: string;
  notes: string;
  itemsSummary: string[];
  subtotal: number;
}

export const MenuPage: React.FC<MenuPageProps> = ({ onBackHome }) => {
  const { logoSrc } = useAmbience();
  const reducedMotion = useReducedMotion();
  const {
    items: bagItems,
    totalItems,
    subtotal,
    addItem,
    updateQuantity,
    removeItem,
    clearBag,
    getItemQuantity,
  } = useOrder();

  const [, setCurtainDone] = useState(false);
  const [orderMode, setOrderMode] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<'all' | MenuCategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllPages, setShowAllPages] = useState(false);

  // Order drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [fulfillment, setFulfillment] = useState<FulfillmentType>('dine-in');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [detailLine, setDetailLine] = useState('');
  const [notes, setNotes] = useState('');
  const [formErrors, setFormErrors] = useState<{
    customerName?: string;
    phone?: string;
    detailLine?: string;
  }>({});
  const [placedTicket, setPlacedTicket] = useState<PlacedOrderTicket | null>(null);
  const [copiedTicket, setCopiedTicket] = useState(false);

  const spreadRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const currentPage = BOOKLET_PAGES[pageIndex] ?? BOOKLET_PAGES[0];
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [drawerOpen]);

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
    if (scrollTop && topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const resetAll = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setShowAllPages(false);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof formErrors = {};
    if (!customerName.trim() || customerName.trim().length < 2) {
      errs.customerName = 'Please enter your name.';
    }
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 13) {
      errs.phone = 'Please enter a valid 10–13 digit contact number.';
    }
    if (!detailLine.trim()) {
      errs.detailLine =
        fulfillment === 'dine-in'
          ? 'Please enter your table number or seating area.'
          : fulfillment === 'pickup'
            ? 'Please enter your preferred pickup time.'
            : 'Please enter your Salugara / Siliguri delivery address.';
    }
    setFormErrors(errs);
    if (Object.keys(errs).length > 0 || bagItems.length === 0) return;

    const ticketId = `MIM-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const createdAt = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date());

    const ticket: PlacedOrderTicket = {
      ticketId,
      createdAt,
      fulfillment,
      customerName: customerName.trim(),
      phone: phone.trim(),
      detailLine: detailLine.trim(),
      notes: notes.trim(),
      itemsSummary: bagItems.map(
        (b) =>
          `${b.quantity}× ${b.name}${b.variantLabel ? ` (${b.variantLabel})` : ''} — ₹${(
            b.unitPrice * b.quantity
          ).toLocaleString('en-IN')}`,
      ),
      subtotal,
    };

    try {
      window.localStorage.setItem('mim-last-order', JSON.stringify(ticket));
    } catch {
      // Ignore storage write error
    }

    setPlacedTicket(ticket);
    clearBag();
  };

  const formatTicketCopy = (t: PlacedOrderTicket) => {
    const modeLabel =
      t.fulfillment === 'dine-in'
        ? 'Dine-In'
        : t.fulfillment === 'pickup'
          ? 'Self-Pickup (Salugara)'
          : 'Local Delivery Request';
    return [
      `MIM Bakery & Café — Order Ticket ${t.ticketId}`,
      `Date & Time: ${t.createdAt}`,
      `Order Type: ${modeLabel}`,
      `Name: ${t.customerName}`,
      `Phone: ${t.phone}`,
      `${t.fulfillment === 'dine-in' ? 'Table' : t.fulfillment === 'pickup' ? 'Pickup Time' : 'Address'}: ${t.detailLine}`,
      '--- Items ---',
      ...t.itemsSummary,
      `Menu Subtotal: ₹${t.subtotal.toLocaleString('en-IN')}`,
      t.notes ? `Notes: ${t.notes}` : null,
      'Note: Direct café order summary — final confirmation & any packaging/taxes verified by MIM Salugara.',
    ]
      .filter(Boolean)
      .join('\n');
  };

  const handleCopyTicket = async () => {
    if (!placedTicket) return;
    try {
      await navigator.clipboard.writeText(formatTicketCopy(placedTicket));
      setCopiedTicket(true);
      window.setTimeout(() => setCopiedTicket(false), 2600);
    } catch {
      setCopiedTicket(false);
    }
  };

  return (
    <div className="menu-window-shell">
      <MenuIntroCurtain onDone={() => setCurtainDone(true)} />

      {/* Dedicated Menu Window Top Navigation */}
      <header className="menu-window-topbar">
        <div className="menu-window-topbar-inner">
          <div className="menu-window-left">
            <a
              href="/"
              className="menu-back-link"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                  e.preventDefault();
                  onBackHome();
                }
              }}
            >
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Back to MIM Story</span>
            </a>

            <img
              src={logoSrc}
              alt="MIM Bakery & Café"
              width={594}
              height={395}
              className="menu-window-logo"
            />
          </div>

          <div className="menu-window-right">
            <div className="menu-window-quote">
              <DailyQuoteBox />
            </div>

            <div className="menu-mode-switch" role="group" aria-label="Menu view mode">
              <button
                type="button"
                aria-pressed={orderMode}
                onClick={() => setOrderMode(true)}
                className={`menu-mode-btn ${orderMode ? 'is-active' : ''}`}
              >
                <Utensils size={14} aria-hidden="true" />
                <span>Order Online</span>
              </button>
              <button
                type="button"
                aria-pressed={!orderMode}
                onClick={() => setOrderMode(false)}
                className={`menu-mode-btn ${!orderMode ? 'is-active' : ''}`}
              >
                <BookOpen size={14} aria-hidden="true" />
                <span>Browse Only</span>
              </button>
            </div>

            <button
              type="button"
              className="button button-sm menu-bag-trigger"
              onClick={() => {
                setPlacedTicket(null);
                setDrawerOpen(true);
              }}
              aria-label={`Open order bag (${totalItems} items, ₹${subtotal})`}
            >
              <ShoppingBag size={15} aria-hidden="true" />
              <span>
                Order ({totalItems}) · ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dedicated Menu Studio */}
      <main id="main-content" className="menu-window-main">
        <div ref={topRef} className="menu-folio menu-window-folio">
          <div className="menu-folio-header">
            <div className="menu-brand-strip">
              <div className="menu-mega-lockup">
                <span className="chapter-label">
                  {orderMode ? 'Interactive Menu & Direct Ordering' : 'Printed Menu Booklet'} · Salugara
                </span>
                <h1 className="menu-title-inline">
                  ME<span className="menu-title-slash" aria-hidden="true">/</span>NU
                </h1>
              </div>

              <div className="menu-search-controls">
                <div className="menu-search-box">
                  <Search size={16} className="menu-search-icon" aria-hidden="true" />
                  <label htmlFor="menu-window-search" className="sr-only">
                    Search all 157 menu items
                  </label>
                  <input
                    id="menu-window-search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (e.target.value.trim()) setSelectedCategory('all');
                    }}
                    placeholder="Search coffee, matcha, momo, biscoff..."
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
                  <h2 className="menu-spread-title">Search results for “{searchQuery}”</h2>
                  <span className="menu-spread-count" aria-live="polite">
                    {totalMatches} {totalMatches === 1 ? 'match' : 'matches'} across MIM’s full menu
                  </span>
                </>
              ) : showAllPages ? (
                <>
                  <h2 className="menu-spread-title">Complete Menu Ledger</h2>
                  <span className="menu-spread-count" aria-live="polite">
                    All {totalMatches} items · Prices in ₹
                  </span>
                </>
              ) : (
                <>
                  <h2 className="menu-spread-title">
                    Page {currentPage.number} · {currentPage.title}
                  </h2>
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

          {/* Spread Items */}
          {filteredSections.length === 0 ? (
            <div className="menu-empty-state" role="status">
              <CosmosFlower className="menu-empty-flower" />
              <h2 className="menu-empty-title">No menu items matched “{searchQuery}”.</h2>
              <p className="menu-empty-copy">
                Try another keyword like “Matcha”, “Biscoff”, “Momo”, or “Cheesecake”, or reset
                to browse the booklet.
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
                    aria-labelledby={`win-cat-${category.id}`}
                  >
                    <div className="menu-cat-header">
                      <div>
                        <h3 id={`win-cat-${category.id}`} className="menu-cat-name">
                          {category.label}
                        </h3>
                        {category.variantHeaderNote && (
                          <span className="menu-variant-note">{category.variantHeaderNote}</span>
                        )}
                      </div>
                      <span className="menu-cat-count">{items.length}</span>
                    </div>

                    <hr className="menu-cat-rule" />

                    <ul className="menu-items-list">
                      {items.map((item: MenuItem) => {
                        const singleQty =
                          item.price !== undefined ? getItemQuantity(item.id) : 0;

                        return (
                          <li key={item.id} className="menu-item-row menu-order-row">
                            <div className="menu-item-title-line">
                              <span className="menu-item-name">{item.name}</span>
                              <span className="menu-item-dots" aria-hidden="true" />
                              <span className="menu-item-price">{item.priceDisplay}</span>

                              {orderMode && item.price !== undefined && (
                                <div className="order-item-control">
                                  {singleQty === 0 ? (
                                    <button
                                      type="button"
                                      className="order-add-btn"
                                      onClick={() =>
                                        addItem({
                                          itemId: item.id,
                                          name: item.name,
                                          categoryLabel: category.label,
                                          unitPrice: item.price!,
                                        })
                                      }
                                      aria-label={`Add ${item.name} (₹${item.price}) to order`}
                                    >
                                      <Plus size={13} aria-hidden="true" />
                                      <span>Add</span>
                                    </button>
                                  ) : (
                                    <div className="order-stepper" aria-label={`Quantity for ${item.name}`}>
                                      <button
                                        type="button"
                                        className="order-step-btn"
                                        onClick={() =>
                                          updateQuantity(`${item.id}::standard`, -1)
                                        }
                                        aria-label={`Decrease ${item.name}`}
                                      >
                                        <Minus size={12} aria-hidden="true" />
                                      </button>
                                      <span className="order-step-val">{singleQty}</span>
                                      <button
                                        type="button"
                                        className="order-step-btn"
                                        onClick={() =>
                                          updateQuantity(`${item.id}::standard`, 1)
                                        }
                                        aria-label={`Increase ${item.name}`}
                                      >
                                        <Plus size={12} aria-hidden="true" />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>

                            {item.description && (
                              <p className="menu-item-desc">{item.description}</p>
                            )}

                            {item.variants && item.variants.length > 0 && (
                              orderMode ? (
                                <div className="order-variant-chips">
                                  {item.variants.map((v) => {
                                    const vQty = getItemQuantity(item.id, v.label);
                                    return vQty === 0 ? (
                                      <button
                                        key={v.label}
                                        type="button"
                                        className="order-variant-add"
                                        onClick={() =>
                                          addItem({
                                            itemId: item.id,
                                            name: item.name,
                                            categoryLabel: category.label,
                                            variantLabel: v.label,
                                            unitPrice: v.price,
                                          })
                                        }
                                      >
                                        <Plus size={12} aria-hidden="true" />
                                        <span>
                                          {v.label} · ₹{v.price}
                                        </span>
                                      </button>
                                    ) : (
                                      <div key={v.label} className="order-variant-stepper">
                                        <span className="order-variant-name">{v.label}</span>
                                        <button
                                          type="button"
                                          className="order-step-btn"
                                          onClick={() =>
                                            updateQuantity(`${item.id}::${v.label}`, -1)
                                          }
                                          aria-label={`Decrease ${item.name} (${v.label})`}
                                        >
                                          <Minus size={11} aria-hidden="true" />
                                        </button>
                                        <span className="order-step-val">{vQty}</span>
                                        <button
                                          type="button"
                                          className="order-step-btn"
                                          onClick={() =>
                                            updateQuantity(`${item.id}::${v.label}`, 1)
                                          }
                                          aria-label={`Increase ${item.name} (${v.label})`}
                                        >
                                          <Plus size={11} aria-hidden="true" />
                                        </button>
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <p className="menu-item-variants">
                                  {item.variants.map((v) => `${v.label}: ₹${v.price}`).join(' · ')}
                                </p>
                              )
                            )}
                          </li>
                        );
                      })}
                    </ul>

                    {category.footnote && (
                      <p className="menu-cat-footnote">* {category.footnote}</p>
                    )}
                  </article>
                ))}
              </div>

              <div className="menu-spread-motif" aria-hidden="true">
                {currentPage.motif === 'floral' && <FloralStemPanel className="menu-motif-svg" />}
                {currentPage.motif === 'sprig' && <BotanicalSprig className="menu-motif-svg" />}
                {currentPage.motif === 'cosmos' && <CosmosFlower className="menu-motif-svg" />}
              </div>
            </div>
          )}

          {/* Bottom Page-Turn Bar */}
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
      </main>

      {/* Floating Bottom Order Bar */}
      {totalItems > 0 && !drawerOpen && (
        <div className="order-floating-bar" role="region" aria-label="Active order summary">
          <div className="order-floating-info">
            <MimHeart size={14} />
            <span>
              <strong>
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </strong>{' '}
              selected · Subtotal <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
            </span>
          </div>
          <button
            type="button"
            className="button button-sm"
            onClick={() => {
              setPlacedTicket(null);
              setDrawerOpen(true);
            }}
          >
            <ShoppingBag size={15} aria-hidden="true" />
            <span>Review &amp; Place Order</span>
          </button>
        </div>
      )}

      {/* Slide-Over Online Food Order Drawer */}
      {drawerOpen && (
        <div
          className="order-drawer-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Your MIM Food Order"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDrawerOpen(false);
          }}
        >
          <aside className="order-drawer">
            <div className="order-drawer-head">
              <div>
                <span className="chapter-label">Direct Café Order</span>
                <h2 className="order-drawer-title">Your Order Tray</h2>
              </div>
              <button
                type="button"
                className="order-drawer-close"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close order tray"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {placedTicket ? (
              <div className="order-ticket-panel" aria-live="polite">
                <div className="order-ticket-badge">
                  <MimHeart size={14} />
                  <span>Order Ticket Prepared · {placedTicket.ticketId}</span>
                </div>
                <p className="order-ticket-note">
                  Your order ticket is ready below. Copy or print it to share directly with MIM
                  Bakery &amp; Café in Salugara (live kitchen/payment integration connects once
                  confirmed by MIM).
                </p>

                <pre className="order-ticket-pre">{formatTicketCopy(placedTicket)}</pre>

                <div className="order-ticket-actions">
                  <button type="button" className="button button-sm" onClick={handleCopyTicket}>
                    {copiedTicket ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedTicket ? 'Copied Ticket!' : 'Copy Order Ticket'}</span>
                  </button>
                  <button
                    type="button"
                    className="button button-secondary button-sm"
                    onClick={() => window.print()}
                  >
                    <Printer size={14} />
                    <span>Print Receipt</span>
                  </button>
                </div>
              </div>
            ) : bagItems.length === 0 ? (
              <div className="order-empty-bag">
                <BotanicalSprig className="order-empty-sprig" />
                <p>Your tray is currently empty. Add items from the menu to start an order.</p>
                <button
                  type="button"
                  className="button button-sm"
                  onClick={() => setDrawerOpen(false)}
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <div className="order-drawer-body">
                <ul className="order-bag-list">
                  {bagItems.map((item) => (
                    <li key={item.key} className="order-bag-item">
                      <div className="order-bag-item-info">
                        <strong>{item.name}</strong>
                        <span className="order-bag-meta">
                          {item.variantLabel ? `${item.variantLabel} · ` : ''}₹{item.unitPrice} each
                        </span>
                      </div>

                      <div className="order-bag-controls">
                        <div className="order-stepper">
                          <button
                            type="button"
                            className="order-step-btn"
                            onClick={() => updateQuantity(item.key, -1)}
                            aria-label={`Decrease ${item.name}`}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="order-step-val">{item.quantity}</span>
                          <button
                            type="button"
                            className="order-step-btn"
                            onClick={() => updateQuantity(item.key, 1)}
                            aria-label={`Increase ${item.name}`}
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <span className="order-bag-line-total">
                          ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                        </span>

                        <button
                          type="button"
                          className="order-remove-btn"
                          onClick={() => removeItem(item.key)}
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={14} aria-hidden="true" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="order-subtotal-row">
                  <span>Menu Subtotal ({totalItems} items)</span>
                  <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
                </div>

                <form onSubmit={handlePlaceOrder} className="order-checkout-form" noValidate>
                  <div className="order-fulfillment-tabs" role="radiogroup" aria-label="Order fulfillment type">
                    {(
                      [
                        { id: 'dine-in', label: 'Dine-In' },
                        { id: 'pickup', label: 'Self-Pickup' },
                        { id: 'delivery', label: 'Delivery' },
                      ] as const
                    ).map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        role="radio"
                        aria-checked={fulfillment === opt.id}
                        onClick={() => setFulfillment(opt.id)}
                        className={`order-fulfill-btn ${fulfillment === opt.id ? 'is-active' : ''}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  <div className="order-field">
                    <label htmlFor="order-name">Your name *</label>
                    <input
                      id="order-name"
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Full name"
                    />
                    {formErrors.customerName && (
                      <span className="order-field-err">{formErrors.customerName}</span>
                    )}
                  </div>

                  <div className="order-field">
                    <label htmlFor="order-phone">Contact number *</label>
                    <input
                      id="order-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                    />
                    {formErrors.phone && (
                      <span className="order-field-err">{formErrors.phone}</span>
                    )}
                  </div>

                  <div className="order-field">
                    <label htmlFor="order-detail">
                      {fulfillment === 'dine-in'
                        ? 'Table number / seating spot *'
                        : fulfillment === 'pickup'
                          ? 'Preferred pickup time *'
                          : 'Salugara / Siliguri delivery address *'}
                    </label>
                    <input
                      id="order-detail"
                      type="text"
                      value={detailLine}
                      onChange={(e) => setDetailLine(e.target.value)}
                      placeholder={
                        fulfillment === 'dine-in'
                          ? 'e.g. Window Counter / Table 4'
                          : fulfillment === 'pickup'
                            ? 'e.g. 6:30 PM today'
                            : 'House/flat, street, Salugara landmark...'
                      }
                    />
                    {formErrors.detailLine && (
                      <span className="order-field-err">{formErrors.detailLine}</span>
                    )}
                  </div>

                  <div className="order-field">
                    <label htmlFor="order-notes">Special instructions (optional)</label>
                    <textarea
                      id="order-notes"
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Less ice, spice preference, allergies..."
                    />
                  </div>

                  <div className="order-submit-row">
                    <button
                      type="button"
                      className="button button-secondary button-sm"
                      onClick={clearBag}
                    >
                      Clear Tray
                    </button>
                    <button type="submit" className="button">
                      Confirm Order Ticket · ₹{subtotal.toLocaleString('en-IN')}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
};
