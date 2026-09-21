# Blue Bell Café — Artisanal Roastery & Cinematic Lounge
**Gulshan-2, Dhaka, Bangladesh**

A luxury digital coffee house and reservation experience built with vanilla web technologies, featuring an 8-act scroll-scrubbed cinematic camera flight, a 17-creation artisanal menu across 5 categories, an interactive real-time Tasting Tray, and an atmospheric table reservation parlour hosted by **Mr. Pudding**.

---

## ☕ Key Architectural Features

### 1. 8-Act Cinematic Camera Flight (`scrub-engine.js`)
* **Scroll-driven video scrubbing** with frame interpolation and synchronized camera choreographies.
* Dual-stream caching with high-priority preloads for sub-second first-paint.
* Responsive fallbacks for reduced-motion preferences (`prefers-reduced-motion: reduce`) and touch devices.

### 2. The Artisanal Menu (`index.html` & `main.js`)
* **17 Handcrafted Creations** categorized into 5 distinct culinary offerings:
  * **Signature Pour-Overs** (3 single-origin micro-lots)
  * **Espresso & Milk Craft** (3 specialty espresso brews)
  * **Cold Drip & Elixirs** (3 slow-extraction cold coffees)
  * **Bistro & Kitchen** (4 savory items: American Breakfast, Tuscan Slow-Baked Lasagna, Truffle Fettuccine Alfredo, Artisan Café Club Sandwich)
  * **Bakery & Desserts** (4 French and Italian delicacies: Pistachio Flaky Brioche, Valrhona Chocolate Tart, Burnt Basque Cheesecake, Venetian Espresso Tiramisu)
* Dynamic category filtering with staggered CSS entrance transitions.
* **Interactive Tasting Tray Dock**:
  * Real-time item count and order subtotal in Bangladeshi Taka (৳).
  * In-card quantity steppers (`−` / `+`).
  * Collision-free dynamic docking that floats gracefully above the site footer.
  * LocalStorage synchronization with the table reservation ledger.

### 3. Mr. Pudding's Reservation Parlour (`reservation.html` & `reservation.js`)
* **Feline Head Host Interaction**: Animated reactions, purring sound bites, speech bubble guidance, and particle bursts.
* **Atmospheric Seating Themes**: 4 distinct dining atmospheres (Rainy Window Alcove, Intimate Velvet Booth, Barista Bar, Botanical Glasshouse) that shift the portal's backdrop and color palette in real-time.
* **Flexible Time Picker**: 4 curated evening seatings plus an on-demand custom time selector.
* **Wax Seal Paw of Approval**: Physical stamp slam animation and personalized booking confirmation certificate.

---

## 🛠️ Technology Stack

| Layer | Implementation | Details |
| :--- | :--- | :--- |
| **Markup** | HTML5 Semantic Living Standard | Accessible ARIA attributes, Schema.org JSON-LD, Open Graph, Twitter Cards |
| **Styling** | Vanilla CSS (Custom Design System) | Modern CSS custom properties, HSL color tokens, Fraunces & DM Sans typography |
| **Logic** | Vanilla JavaScript (ES2022) | Strict mode (`'use strict'`), defensive state stores, JSDoc documentation |
| **Hosting** | Vercel Static Edge | Optimized caching, HTTP security headers, and byte-range media streaming |

---

## 📁 Repository Structure

```text
├── assets/
│   ├── Logo and falcon/        # Brand marks and favicons
│   ├── menu/                   # High-resolution culinary food & beverage photography
│   ├── settings/               # Atmospheric table ambiance backdrops
│   ├── stills/                 # First-frame fallback images for video acts
│   └── vid/                    # Optimized MP4 cinematic flight clips (01-08)
├── index.html                  # Main sanctuary & 17-item artisanal menu
├── style.css                   # Global design tokens, menu layout, & footer styling
├── main.js                     # Story initialization & Tasting Tray state engine
├── reservation.html            # Mr. Pudding's reservation parlour & booking flow
├── reservation.css             # Parlour atmosphere themes, wax seal, & stepper UI
├── reservation.js              # Reservation logic, table preferences, & ledger sync
├── scrub-engine.js             # Canvas / video camera flight choreography engine
├── vercel.json                 # Production caching, security headers, & routing
└── README.md                   # Project documentation
```

---

## 🚀 Deployment on Vercel

This repository is pre-configured with `vercel.json` for zero-configuration, production-grade deployment on **Vercel**:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy Blue Bell Cafe"
   git push origin main
   ```
2. **Import into Vercel**:
   * Navigate to [vercel.com/new](https://vercel.com/new).
   * Select your GitHub repository (`Blue-Bell-Cafe`).
   * Framework Preset: **Other** (Static Site).
   * Root Directory: `./`
   * Click **Deploy**.

### Built-in Vercel Optimizations
* **Instant HTML Invalidation**: `max-age=0, must-revalidate` ensures new git deployments reflect immediately.
* **Long-lived Media Caching**: Video clips and menu images are cached with `max-age=31536000, immutable` and `Accept-Ranges: bytes` for seamless scrubbing.
* **Enterprise Security Headers**: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`.

---

## 📜 License & Credits

* **Curated & Developed by**: B. M. Shahria Alam
* **Copyright**: © 2026 Blue Bell Café. All rights reserved.