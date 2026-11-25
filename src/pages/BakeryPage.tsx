import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Check,
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
import { MENU_CATEGORIES, MENU_ITEMS, MenuCategoryId, MenuItem } from '../data/menu';
import { BotanicalSprig, CosmosFlower, MimHeart } from '../components/illustrations/BotanicalMotifs';
import { BakeryIntroCurtain } from '../components/bakery/BakeryIntroCurtain';
import { DailyQuoteBox } from '../components/theme/DailyQuoteBox';
import { useAmbience } from '../hooks/useAmbience';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useOrder } from '../context/OrderContext';
import '../sections/DigitalMenu.css';
import '../pages/MenuPage.css';
import './BakeryPage.css';

interface BakeryPageProps {
  onBackHome: () => void;
}

const BAKERY_CATEGORY_IDS: MenuCategoryId[] = [
  'cakes',
  'whole-cheesecakes',
  'loaf-cakes',
  'cupcakes',
  'brownies',
  'cheesecake-desserts',
  'tiramisu',
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

export const BakeryPage: React.FC<BakeryPageProps> = ({ onBackHome }) => {
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
  const [selectedCategory, setSelectedCategory] = useState<'all' | MenuCategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Shared Order Tray Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [fulfillment, setFulfillment] = useState<FulfillmentType>('pickup');
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

  // Cake Enquiry Demo Modal
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryItem, setEnquiryItem] = useState('Whole Cake — Red Velvet (₹850)');
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryDate, setEnquiryDate] = useState('');
  const [enquiryNote, setEnquiryNote] = useState('');
  const [enquiryError, setEnquiryError] = useState('');
  const [enquiryPreview, setEnquiryPreview] = useState('');
  const [copiedEnquiry, setCopiedEnquiry] = useState(false);

  const spreadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    if (!drawerOpen && !enquiryOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
        setEnquiryOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [drawerOpen, enquiryOpen]);

  const bakeryCategories = useMemo(
    () => MENU_CATEGORIES.filter((c) => BAKERY_CATEGORY_IDS.includes(c.id)),
    [],
  );

  const bakeryItems = useMemo(
    () => MENU_ITEMS.filter((i) => BAKERY_CATEGORY_IDS.includes(i.category)),
    [],
  );

  const enquiryOptions = useMemo(
    () =>
      bakeryItems
        .filter((i) =>
          ['cakes', 'whole-cheesecakes', 'loaf-cakes', 'cupcakes'].includes(i.category),
        )
        .map((i) => `${i.name} (${i.priceDisplay})`),
    [bakeryItems],
  );

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredSections = useMemo(() => {
    return bakeryCategories
      .filter((cat) => selectedCategory === 'all' || cat.id === selectedCategory)
      .map((cat) => {
        const items = bakeryItems.filter((item) => {
          if (item.category !== cat.id) return false;
          if (!normalizedQuery) return true;
          const haystack = [item.name, item.description ?? '', cat.label]
            .join(' ')
            .toLowerCase();
          return haystack.includes(normalizedQuery);
        });
        return { category: cat, items };
      })
      .filter((sec) => sec.items.length > 0);
  }, [bakeryCategories, bakeryItems, selectedCategory, normalizedQuery]);

  const totalMatches = useMemo(
    () => filteredSections.reduce((sum, sec) => sum + sec.items.length, 0),
    [filteredSections],
  );

  useEffect(() => {
    if (reducedMotion || !spreadRef.current) return;
    const anim = animate(spreadRef.current, {
      opacity: [0.4, 1],
      translateY: [10, 0],
      duration: 360,
      ease: 'outCubic',
    });
    return () => {
      anim.revert();
    };
  }, [selectedCategory, reducedMotion]);

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
      // Ignore storage error
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

  const handleGenerateEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName.trim()) {
      setEnquiryError('Please enter your name to prepare the cake enquiry preview.');
      return;
    }
    setEnquiryError('');
    setEnquiryPreview(
      [
        'MIM Bakery & Café — Bakery Enquiry (Demo Preview)',
        `Item of interest: ${enquiryItem}`,
        `Name: ${enquiryName.trim()}`,
        enquiryDate ? `Preferred date: ${enquiryDate}` : null,
        enquiryNote.trim() ? `Notes: ${enquiryNote.trim()}` : null,
        'Note: Availability & pickup confirmation to be verified directly with MIM Salugara.',
      ]
        .filter(Boolean)
        .join('\n'),
    );
  };

  return (
    <div className="menu-window-shell">
      <BakeryIntroCurtain onDone={() => setCurtainDone(true)} />

      {/* Top Navigation Bar */}
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

            <div className="menu-mode-switch" role="group" aria-label="Bakery view mode">
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
              className="button button-sm"
              onClick={() => {
                setPlacedTicket(null);
                setDrawerOpen(true);
              }}
              aria-label={`Open order tray (${totalItems} items, ₹${subtotal})`}
            >
              <ShoppingBag size={15} aria-hidden="true" />
              <span>
                Order ({totalItems}) · ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dedicated Bakery Studio */}
      <main id="main-content" className="menu-window-main">
        <div className="menu-folio bakery-window-folio">
          {/* Editorial Photo + Title Banner */}
          <div className="bakery-window-hero">
            <div className="bakery-window-intro">
              <span className="chapter-label">Artisan Bakery &amp; Desserts · Salugara</span>
              <h1 className="title headline-chapter" style={{ margin: '0.4rem 0 0.6rem' }}>
                A little slice of happiness.
              </h1>
              <p className="bakery-window-lead">
                Whole cakes, Basque &amp; San Sebastian cheesecakes, loaf cakes, cupcakes, warm
                brownies, and classic Italian tiramisu. Whole cakes &amp; cheesecakes are listed
                separately from individual dessert slices.
              </p>

              <div className="bakery-window-ctas">
                <button
                  type="button"
                  className="button button-secondary button-sm"
                  onClick={() => {
                    setEnquiryPreview('');
                    setEnquiryError('');
                    setEnquiryOpen(true);
                  }}
                >
                  Prepare Cake Enquiry (Demo)
                </button>
              </div>
            </div>

            <figure className="bakery-window-photo-frame">
              <img
                src="/images/bakery/biscoff-cupcakes-blueberry-cheesecake.jpg"
                alt="Lotus Biscoff cupcakes and blueberry cheesecake at MIM Bakery & Café"
                width={750}
                height={500}
                className="bakery-window-photo"
              />
            </figure>
          </div>

          <hr className="editorial-rule" />

          {/* Search & Category Filter Bar */}
          <div className="menu-spread-bar" style={{ paddingTop: '1.35rem' }}>
            <div className="menu-search-box" style={{ maxWidth: '380px' }}>
              <Search size={16} className="menu-search-icon" aria-hidden="true" />
              <label htmlFor="bakery-window-search" className="sr-only">
                Search bakery &amp; dessert items
              </label>
              <input
                id="bakery-window-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cheesecake, biscoff, brownie, cake..."
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

            <div className="menu-category-pills" role="group" aria-label="Filter bakery categories">
              <button
                type="button"
                aria-pressed={selectedCategory === 'all'}
                onClick={() => setSelectedCategory('all')}
                className={`menu-cat-pill ${selectedCategory === 'all' ? 'is-active' : ''}`}
              >
                All ({bakeryItems.length})
              </button>
              {bakeryCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={selectedCategory === cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`menu-cat-pill ${selectedCategory === cat.id ? 'is-active' : ''}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Items Grid */}
          {filteredSections.length === 0 ? (
            <div className="menu-empty-state" role="status">
              <CosmosFlower className="menu-empty-flower" />
              <h2 className="menu-empty-title">No bakery items matched “{searchQuery}”.</h2>
              <p className="menu-empty-copy">
                Try searching for “Red Velvet”, “San Sebastian”, “Biscoff”, or “Tiramisu”.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="button button-sm"
              >
                <RotateCcw size={14} aria-hidden="true" />
                <span>Reset Filters</span>
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
                    aria-labelledby={`bake-cat-${category.id}`}
                  >
                    <div className="menu-cat-header">
                      <div>
                        <h2 id={`bake-cat-${category.id}`} className="menu-cat-name">
                          {category.label}
                        </h2>
                        {category.variantHeaderNote && (
                          <span className="menu-variant-note">{category.variantHeaderNote}</span>
                        )}
                      </div>
                      <span className="menu-cat-count">{items.length}</span>
                    </div>

                    <hr className="menu-cat-rule" />

                    <ul className="menu-items-list">
                      {items.map((item: MenuItem) => {
                        const qty = item.price !== undefined ? getItemQuantity(item.id) : 0;
                        return (
                          <li key={item.id} className="menu-item-row menu-order-row">
                            <div className="menu-item-title-line">
                              <span className="menu-item-name">{item.name}</span>
                              <span className="menu-item-dots" aria-hidden="true" />
                              <span className="menu-item-price">{item.priceDisplay}</span>

                              {orderMode && item.price !== undefined && (
                                <div className="order-item-control">
                                  {qty === 0 ? (
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
                                      aria-label={`Add ${item.name} (${item.priceDisplay}) to order`}
                                    >
                                      <Plus size={13} aria-hidden="true" />
                                      <span>Add</span>
                                    </button>
                                  ) : (
                                    <div className="order-stepper">
                                      <button
                                        type="button"
                                        className="order-step-btn"
                                        onClick={() => updateQuantity(`${item.id}::standard`, -1)}
                                        aria-label={`Decrease ${item.name}`}
                                      >
                                        <Minus size={12} aria-hidden="true" />
                                      </button>
                                      <span className="order-step-val">{qty}</span>
                                      <button
                                        type="button"
                                        className="order-step-btn"
                                        onClick={() => updateQuantity(`${item.id}::standard`, 1)}
                                        aria-label={`Increase ${item.name}`}
                                      >
                                        <Plus size={12} aria-hidden="true" />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </article>
                ))}
              </div>
              <BotanicalSprig className="menu-spread-motif" />
            </div>
          )}

          <div className="menu-folio-footer">
            <div className="menu-pager">
              <span className="menu-pager-status">
                Showing {totalMatches} bakery &amp; dessert selections · Prices in ₹
              </span>
              <span className="hand-note">Listed menu selections only · Salugara</span>
            </div>
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
              in tray · Subtotal <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
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

      {/* Order Tray Drawer */}
      {drawerOpen && (
        <div
          className="order-drawer-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Your MIM Order Tray"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDrawerOpen(false);
          }}
        >
          <aside className="order-drawer">
            <div className="order-drawer-head">
              <div>
                <span className="chapter-label">Direct Bakery &amp; Café Order</span>
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
                  Bakery &amp; Café in Salugara.
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
                <p>Your tray is empty. Add cakes, cupcakes, or desserts to start an order.</p>
                <button
                  type="button"
                  className="button button-sm"
                  onClick={() => setDrawerOpen(false)}
                >
                  Browse Bakery
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
                    <label htmlFor="bake-order-name">Your name *</label>
                    <input
                      id="bake-order-name"
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
                    <label htmlFor="bake-order-phone">Contact number *</label>
                    <input
                      id="bake-order-phone"
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
                    <label htmlFor="bake-order-detail">
                      {fulfillment === 'dine-in'
                        ? 'Table number / seating spot *'
                        : fulfillment === 'pickup'
                          ? 'Preferred pickup time *'
                          : 'Salugara / Siliguri delivery address *'}
                    </label>
                    <input
                      id="bake-order-detail"
                      type="text"
                      value={detailLine}
                      onChange={(e) => setDetailLine(e.target.value)}
                      placeholder={
                        fulfillment === 'dine-in'
                          ? 'e.g. Table 4'
                          : fulfillment === 'pickup'
                            ? 'e.g. Tomorrow 5:00 PM'
                            : 'House/flat, street, Salugara landmark...'
                      }
                    />
                    {formErrors.detailLine && (
                      <span className="order-field-err">{formErrors.detailLine}</span>
                    )}
                  </div>

                  <div className="order-field">
                    <label htmlFor="bake-order-notes">Notes (optional)</label>
                    <textarea
                      id="bake-order-notes"
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Preferences or questions for MIM..."
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

      {/* Cake Enquiry Demo Modal */}
      {enquiryOpen && (
        <div
          className="bakery-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cake-win-enquiry-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setEnquiryOpen(false);
          }}
        >
          <div className="bakery-modal">
            <div className="bakery-modal-head">
              <div>
                <span className="chapter-label">Demo Mode · No Order Placed</span>
                <h3 id="cake-win-enquiry-title" className="bakery-modal-title">
                  Bakery Enquiry Preview
                </h3>
              </div>
              <button
                type="button"
                className="bakery-modal-close"
                aria-label="Close bakery enquiry dialog"
                onClick={() => setEnquiryOpen(false)}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleGenerateEnquiry} className="bakery-modal-form" noValidate>
              <div className="bakery-field">
                <label htmlFor="bake-enq-select">Select bakery item</label>
                <select
                  id="bake-enq-select"
                  value={enquiryItem}
                  onChange={(e) => setEnquiryItem(e.target.value)}
                >
                  {enquiryOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bakery-field-row">
                <div className="bakery-field">
                  <label htmlFor="bake-enq-name">Your name *</label>
                  <input
                    id="bake-enq-name"
                    type="text"
                    value={enquiryName}
                    onChange={(e) => setEnquiryName(e.target.value)}
                    placeholder="e.g. Ananya Roy"
                  />
                </div>
                <div className="bakery-field">
                  <label htmlFor="bake-enq-date">Preferred date (optional)</label>
                  <input
                    id="bake-enq-date"
                    type="date"
                    value={enquiryDate}
                    onChange={(e) => setEnquiryDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="bakery-field">
                <label htmlFor="bake-enq-note">Notes or questions (optional)</label>
                <textarea
                  id="bake-enq-note"
                  rows={2}
                  value={enquiryNote}
                  onChange={(e) => setEnquiryNote(e.target.value)}
                  placeholder="Ask about availability at the Salugara café..."
                />
              </div>

              {enquiryError && (
                <p className="bakery-form-error" role="alert">
                  {enquiryError}
                </p>
              )}

              <div className="bakery-modal-actions">
                <button type="submit" className="button button-sm">
                  Generate Enquiry Preview
                </button>
              </div>
            </form>

            {enquiryPreview && (
              <div className="bakery-preview-box" aria-live="polite">
                <div className="bakery-preview-head">
                  <span>Demo Enquiry Text — Not yet sent</span>
                  <button
                    type="button"
                    className="bakery-copy-btn"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(enquiryPreview);
                        setCopiedEnquiry(true);
                        window.setTimeout(() => setCopiedEnquiry(false), 2500);
                      } catch {
                        setCopiedEnquiry(false);
                      }
                    }}
                  >
                    {copiedEnquiry ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedEnquiry ? 'Copied' : 'Copy text'}</span>
                  </button>
                </div>
                <pre className="bakery-preview-pre">{enquiryPreview}</pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
