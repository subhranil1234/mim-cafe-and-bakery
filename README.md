# MIM Bakery & Café — Living Storytelling Demo

**“A moment to slow down. A chance to create.”**  
Location: **Salugara, Siliguri, West Bengal, India**

A responsive, editorial parallax storytelling website for **MIM Bakery & Café**, built with React, TypeScript, Vite, CSS Scroll-Driven Animations, Anime.js, and SunCalc.

---

## 1. Installation & Commands

### Prerequisites
- Node.js 20+ and npm

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```

### Type-check
```bash
npm run lint
```

### Production build
```bash
npm run build
```

### Preview production build locally
```bash
npm run preview
```

---

## 2. Deploying to Vercel

This project includes `vercel.json` with SPA rewrites and immutable image cache headers.

1. Push the repository to GitHub/GitLab/Bitbucket, or install the Vercel CLI (`npm i -g vercel`).
2. In Vercel, select **Framework Preset: Vite**, **Build Command: `npm run build`**, **Output Directory: `dist`**.
3. Deploy with `vercel --prod` or connect the Git repository for automatic deployments.

---

## 3. Signature Feature: MIM Living Ambience (`src/utils/solarTime.ts` & `src/context/AmbienceContext.tsx`)

The website's global atmosphere automatically mirrors **Siliguri's local solar cycle** rather than the visitor's system dark mode or browser location:

- **Coordinates & Timezone:** Approximate Siliguri coordinates (`26.7271° N, 88.3953° E`) in `Asia/Kolkata` (IST). No browser geolocation permission is requested.
- **Solar Calculation:** `computeSiliguriSolarSnapshot()` computes IST calendar components via `Intl.DateTimeFormat`, builds local solar noon for that exact Siliguri calendar day, and calls `SunCalc.getTimes()` to compare actual UTC timestamps against Siliguri sunrise and sunset.
- **Phases & Transitions:**
  - Before sunrise / after sunset → **MIM by Night** (`#17382F` forest green, `#202622` charcoal ink, `#F5F0E6` warm ivory, `#EBC58B` warm golden light, night exterior hero photo, fairy-light glow).
  - Sunrise to sunset → **MIM by Day** (`#F5F0E6` warm ivory, `#D4E2DA` soft botanical mint, `#17382F` heritage forest green, `#202622` charcoal ink, sunlit interior hero photo).
  - Within ~35 minutes of sunrise or sunset → subtle transitional golden/oak radial lighting (`data-solar-phase="sunrise-transition"` / `"sunset-transition"`).
- **Live Updates & Fallback:** Checks every 60 seconds and immediately on tab visibility change. If astronomical calculation fails, falls back to 6:00 AM – 6:00 PM IST.
- **Manual Override:** Visitors can toggle **Auto / Day / Night** in the navigation bar; preference persists in `localStorage` under `mim-ambience-preference`.

---

## 4. Editing Menu Data (`src/data/menu.ts`)

All 27 menu categories and items are stored in `src/data/menu.ts`.

- `MENU_CATEGORIES`: defines category IDs, display labels, top-level section groups (`Beverages`, `Kitchen`, `Bakery & Desserts`, `Creative Studio`), variant header notes, and footnotes.
- `MENU_ITEMS`: each entry includes `id`, `category`, `name`, `price` (when single-tier), `priceDisplay`, optional `variants` array, optional `description`, and optional `dietary` (only where confirmed on the menu).
- Creative Studio activities live in `src/data/experiences.ts`.
- Business details and confirmation notes live in `src/data/business.ts`.

---

## 5. Replacing or Adding Authentic Assets (`public/images/`)

- `public/images/brand/`: `mim-logo-original.png` (supplied raster logo) plus transparent `mim-logo-day.png` and `mim-logo-night.png` derived directly from the original pixels.
- `public/images/cafe/`: `exterior-night.jpg`, `interior-day.jpg`.
- `public/images/food/`: `burger-fries-window.jpg`, `falafel-hummus-platter.jpg`.
- `public/images/bakery/`: `biscoff-cupcakes-blueberry-cheesecake.jpg`.
- `public/images/menu/`: reference photographs of the physical printed menu cards.

Keep the same filenames to swap images seamlessly, or update paths in the corresponding section component.

---

## 6. Information Requiring Client Confirmation

1. **Opening hours** (daily hours / weekly holidays).
2. **Official phone / WhatsApp number** (to wire up live WhatsApp enquiry deep-links in `ExperienceEnquiry.tsx` and `Bakery.tsx`).
3. **Official Instagram / social handles**.
4. **Exact street landmark & pin** (currently links to Google Maps search for *Mim Bakery and Cafe Salugara Siliguri*).
5. **Sandwiches menu bottom item:** One line below *Chicken & Bacon Sandwich (₹320)* is cropped at the bottom edge of the supplied menu photo and was intentionally omitted rather than guessed.
6. **Soup variant labels:** *Manchow Soup* and *Hot & Sour Soup* list `180 / 200` on the menu without printed variant labels (likely Veg / Chicken — flagged for confirmation).
7. **Hot Coffee Espresso (`90/100`) & Americano (`100/110`):** Exact tier labels (e.g., Single / Double or Regular / Large) pending confirmation.
8. **Creative Studio per-guest pricing unit & availability:** Demo enquiry forms display the listed prices (`₹350`, `₹300`, `₹200`) without multiplying by guest count.
9. **Bakery fulfilment:** Custom cake ordering, advance notice periods, and delivery/pickup policies are not claimed until confirmed.

---

## 7. Testing & Known Limitations

- Verified with `tsc --noEmit` and `vite build` for clean TypeScript compilation and bundle output.
- Solar time engine verified across night, sunrise transition, day, sunset transition, and post-sunset timestamps in `Asia/Kolkata`.
- **Known limitation:** This is a static frontend demo; enquiry forms validate inputs and generate copyable summaries in demo mode rather than submitting to a backend or messaging API.
