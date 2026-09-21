<div align="center">

# ☕ Blue Bell Café
### *Cinematic Micro-Roastery, Artisanal Kitchen & Dining Sanctuary*
**Gulshan-2, Dhaka, Bangladesh**

[![Status](https://img.shields.io/badge/Status-Production%20Ready-2D6A4F?style=for-the-badge)](https://github.com/shahriaalam/Blue-Bell-Cafe)
[![Vercel](https://img.shields.io/badge/Deployment-Vercel%20Edge-000000?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Tech](https://img.shields.io/badge/Stack-Vanilla%20HTML5%20%2F%20CSS3%20%2F%20ES2022-C27854?style=for-the-badge)](https://developer.mozilla.org)
[![A11y](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-4A3528?style=for-the-badge)](https://www.w3.org/WAI/standards-guidelines/wcag/)

<br />

<p align="center">
  <em>"Where vintage copper and brass meet the slow ritual of roasted Arabica, Tuscan culinary comfort, and the warm welcome of our feline host, Mr. Pudding."</em>
</p>

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Experience Architecture](#-experience-architecture)
  - [1. 8-Act Scroll-Scrubbed Camera Flight](#1-8-act-scroll-scrubbed-camera-flight)
  - [2. The Artisanal Menu (17 Creations across 5 Categories)](#2-the-artisanal-menu)
  - [3. Interactive Floating Tasting Tray](#3-interactive-floating-tasting-tray)
  - [4. Mr. Pudding's Reservation Parlour](#4-mr-puddings-reservation-parlour)
- [Design System & Aesthetics](#-design-system--aesthetics)
- [Technical Stack & Performance](#-technical-stack--performance)
- [Project Directory Structure](#-project-directory-structure)
- [Vercel Edge Deployment & Caching](#-vercel-edge-deployment--caching)
- [Local Development Setup](#-local-development-setup)
- [Accessibility & SEO](#-accessibility--seo)
- [Author & Credits](#-author--credits)

---

## 🌟 Overview

**Blue Bell Café** is an artisanal digital hospitality platform designed from the ground up without heavy JavaScript frameworks. Built with standard-compliant HTML5, modular CSS3 tokens, and modern vanilla JavaScript (ES2022), it delivers an instantaneous, cinematic experience with zero compile steps, zero hydration lag, and 60 FPS video scrubbing.

Visitors embark on a continuous, uninterrupted camera flight through the cafe's roasting process, explore a curated 17-item culinary menu with interactive quantity steppers and real-time ledger synchronization, and book candlelit table seatings hosted by the resident feline concierge, **Mr. Pudding**.

---

## 🎬 Experience Architecture

### 1. 8-Act Scroll-Scrubbed Camera Flight
*Powered by [`scrub-engine.js`](scrub-engine.js)*

The homepage features a framework-agnostic scroll-scrub engine that maps the user's scroll position directly to pre-rendered 60 FPS video choreography without cuts:

| Act | Ritual Phase | Focus & Camera Choreography | Primary Accent |
| :---: | :--- | :--- | :--- |
| **I** | **The Bean Selection** | Handpicking glistening Arabica beans behind the oak counter | `#A45D3B` (Roasted Terracotta) |
| **II** | **Weighed to Perfection** | Vintage brass scale weighing beans before the glass hopper | `#B57C48` (Antique Amber) |
| **III** | **The Artisanal Grind** | Precision burrs crushing beans into dark aromatic velvet powder | `#8C5230` (Mocha Hazelnut) |
| **IV** | **The Masterful Tamp** | Polished rosewood tamper leveling the coffee bed under pressure | `#9E5B38` (Polished Rosewood) |
| **V** | **The Golden Extraction** | 9-bar pressure dual streams of tiger-striped crema | `#C47D3B` (Espresso Crema) |
| **VI** | **Texturing Velvet Milk** | Cold fresh milk swirling into dense microfoam silk | `#D4A373` (Silky Foam) |
| **VII** | **The Swan Symphony** | Free-pour latte art painting a majestic swan across golden crema | `#C95D63` (Dusky Rose) |
| **VIII** | **Served With Love** | Intimate candlelit marble table by a rainy window with croissants | `#B85D64` (Warm Ruby) |

---

### 2. The Artisanal Menu
*Located in [`index.html`](index.html#cafe-menu) and driven by [`main.js`](main.js)*

The menu features **17 culinary and coffee creations**, complete with terroir origins, tasting notes, metric balance meters (Body, Acidity, Sweetness, Richness, Flakiness), pairing recommendations, and in-card quantity controls:

```
☕ All Creations (17)
├── 🫗 Signature Pour-Overs (3)
│   ├── Ethiopian Yirgacheffe G1 (৳420) • Floral jasmine, bergamot & sweet lemon candy
│   ├── Panama Geisha Jasmine Reserve (৳680) • White peach, wild jasmine & lemongrass bloom
│   └── Colombian Pink Bourbon Honey (৳490) • Red currant, raw sugarcane & pink grapefruit
│
├── ☕ Espresso & Milk Craft (3)
│   ├── Blue Bell Saffron Latte (৳460) • Saffron infusion, Sundarbans honey & double ristretto
│   ├── Cinnamon Spiced Flat White (৳420) • Ceylon cinnamon bark, roasted almond & microfoam
│   └── Smoked Maple Cortado (৳390) • Vermont maple smoke, dark cacao & equal milk cut
│
├── 🧊 Cold Drip & Elixirs (3)
│   ├── 18-Hour Kyoto Cold Drip (৳480) • Dutch drip tower, winey dark berry & baker's chocolate
│   ├── Cascara & Orange Tonic (৳440) • Sun-dried cascara tea, Seville orange & botanical tonic
│   └── Nitro Velvet Float (৳550) • Nitrogen-charged cold brew & Madagascar vanilla gelato
│
├── 🍳 Bistro & Kitchen (4)
│   ├── The Roastery American Breakfast (৳750) • Farm eggs, crispy bacon, herbed sausages, hash browns & sourdough
│   ├── Tuscan Slow-Baked Lasagna (৳780) • Fresh egg pasta, 8-hour Bolognese ragù, béchamel & Parmigiano
│   ├── Truffle Fettuccine Alfredo (৳690) • Bronze-cut fettuccine, Normandy butter & black truffle cream
│   └── Artisan Café Club Sandwich (৳580) • Triple-decker brioche, smoked chicken, turkey bacon & avocado
│
└── 🍰 Bakery & Desserts (4)
    ├── Pistachio Flaky Brioche (৳380) • 72-hr laminated pastry with roasted Bronte pistachio cream
    ├── Dark Chocolate Cardamom Tart (৳420) • 70% Valrhona ganache, green cardamom & sable shell
    ├── Burnt Basque Cheesecake (৳460) • Charred caramel crust, molten core & wild honey drizzle
    └── Venetian Espresso Tiramisu (৳480) • Savoiardi ladyfingers, single-origin espresso soak & sabayon
```

*Hero Feature Spotlight*: **The Sanctuary Tasting Flight for Two** (৳950) — Dual single-origin pour-overs paired with warm brioche and raw honeycomb.

---

### 3. Interactive Floating Tasting Tray
*Managed reactively in [`main.js`](main.js)*

* **Dynamic In-Card Quantity Stepper**: Clicking "Add to Tasting Tray" reveals interactive decrement (`−`) and increment (`+`) stepper controls directly on each culinary card.
* **Collision-Free Docking**: A throttled `requestAnimationFrame` observer constantly monitors the site footer position to dock the floating tray dynamically above the footer without obscuring links or copyrights.
* **Persistent Cart State**: Cart selections, unit prices, and quantities are serialized to `localStorage` (`bbc_tasting_tray`), ensuring zero-friction handoff to the table reservation parlour.

---

### 4. Mr. Pudding's Reservation Parlour
*Located in [`reservation.html`](reservation.html) and driven by [`reservation.js`](reservation.js)*

A full-screen interactive reservation sanctuary hosted by **Mr. Pudding**, the cafe's feline head host:

* **Interactive Cat Host Reactions**: Clicking Mr. Pudding triggers animated ear twitches, purring dialogue cycles, silver cloche reveals, and floating particle bursts.
* **4 Atmospheric Dining Presets**:
  1. *Rainy Window Alcove* (`theme-rainy`): Mood lighting with raindrops trickling against glass.
  2. *Intimate Velvet Booth* (`theme-cozy`): Deep crimson velvet with honeyed beeswax candlelight.
  3. *Barista Bar Experience* (`theme-sensory`): Front-row pour-over brewing aromas and brass details.
  4. *Botanical Glasshouse* (`theme-lush`): Exotic monstera foliage, acoustic jazz, and warm natural light.
* **Custom Time Selection Drawer**: 4 quick-pick evening seatings (`6:30 PM`, `7:30 PM`, `8:30 PM`, `9:30 PM`) plus an on-demand custom time picker with automatic 24h-to-12h conversion.
* **Paw of Approval Wax Seal**: Submitting the booking generates a gold-and-terracotta wax seal stamp animation with a personalized booking certificate (`#BBC-XXXX`).

---

## 🎨 Design System & Aesthetics

| Token Category | Specification | Implementation |
| :--- | :--- | :--- |
| **Display Typography** | *Fraunces Variable* (Optical Size 9–144, Weights 300–800) | Editorial headlines, luxury prices, card titles |
| **Body Typography** | *DM Sans* (Weights 300–700) | Clean legible descriptions, terroir labels, button copy |
| **Primary Palette** | Deep Espresso (`#231610`), Warm Cream (`#FAF6F0`), Terracotta (`#C27854`) | High-contrast, warm, cafe-ambient backdrop |
| **Secondary Accents** | Roasted Terracotta (`#A45D3B`), Antique Brass (`#B57C48`), Sage Bistro (`#2D6A4F`) | Badges, buttons, hover states, wax seals |
| **Motion Curves** | `cubic-bezier(0.16, 1, 0.3, 1)` | Natural deceleration curve on modals, cards, and stamps |
| **Hardware Acceleration** | `transform: translateZ(0)` & `will-change` on dynamic layers | 60 FPS smooth scrolling without repaints |

---

## ⚙️ Technical Stack & Performance

```text
Frontend Architecture:
┌────────────────────────────────────────────────────────┐
│                      HTML5 + ARIA                      │
│     Semantic Scaffolding • Schema.org JSON-LD • SEO    │
├────────────────────────────────────────────────────────┤
│                       Vanilla CSS                      │
│     Custom Properties • Flexbox/Grid • 0 Frameworks    │
├────────────────────────────────────────────────────────┤
│                   JavaScript (ES2022)                  │
│       Strict Mode • Reactive Stores • Zero Bloat       │
├────────────────────────────────────────────────────────┤
│                    Vercel Edge CDN                     │
│     Immutable Caching • Byte-Ranges • Security Headers │
└────────────────────────────────────────────────────────┘
```

* **Zero Build Overhead**: No webpack, Vite, or bundle step needed. Edit code and preview instantly.
* **Zero Layout Shift (CLS = 0)**: All image containers and cards utilize fixed aspect-ratio boxes and width/height hints to prevent layout jumping while assets load.
* **Prefetch Acceleration**: High-priority links utilize `<link rel="prefetch">` and pointer-hover prefetchers to preload the reservation flow ahead of time.

---

## 📁 Project Directory Structure

```text
d:\Blue Bell Cafe/
│
├── assets/
│   ├── Logo and falcon/
│   │   ├── Falcon.jpg               # High-res favicon and brand icon
│   │   └── logo.png                 # Horizontal primary wordmark
│   │
│   ├── menu/                        # 18 High-res culinary & beverage photos
│   │   ├── american_breakfast.jpg   # The Roastery American Breakfast
│   │   ├── basque_cheesecake.jpg    # Burnt Basque Honey Cheesecake
│   │   ├── cascara_tonic.jpg        # Cascara & Seville Orange Tonic
│   │   ├── chocolate_tart.jpg       # Valrhona Dark Chocolate Cardamom Tart
│   │   ├── cinnamon_flatwhite.jpg   # Cinnamon Spiced Flat White
│   │   ├── club_sandwich.jpg        # Artisan Café Club Sandwich
│   │   ├── fettuccine_alfredo.jpg   # Truffle Fettuccine Alfredo
│   │   ├── flight_for_two.jpg       # Sanctuary Tasting Flight for Two
│   │   ├── kyoto_cold_drip.jpg      # 18-Hour Kyoto Cold Drip
│   │   ├── lasagna.jpg              # Tuscan Slow-Baked Lasagna
│   │   ├── maple_cortado.jpg        # Smoked Maple Cortado
│   │   ├── nitro_float.jpg          # Nitro Velvet Float
│   │   ├── panama_geisha.jpg        # Panama Geisha Jasmine Reserve
│   │   ├── pink_bourbon.jpg         # Colombian Pink Bourbon Honey
│   │   ├── pistachio_brioche.jpg    # Pistachio Flaky Brioche
│   │   ├── saffron_latte.jpg        # Blue Bell Saffron Latte
│   │   ├── tiramisu.jpg             # Venetian Espresso Tiramisu
│   │   └── yirgacheffe_v60.jpg      # Ethiopian Yirgacheffe G1
│   │
│   ├── settings/                    # 4 Atmospheric seating backdrops
│   │   ├── barista_bar.jpg          # Front-row barista bar
│   │   ├── botanical_glasshouse.jpg # Lush conservatory greenhouse
│   │   ├── rainy_window.jpg         # Raindrops on glass window alcove
│   │   └── velvet_booth.jpg         # Candlelit intimate booth
│   │
│   ├── stills/                      # First-frame fallback images (Acts 01–08)
│   └── vid/                         # High-efficiency MP4 video clips (Acts 01–08)
│
├── index.html                       # Main landing page & 17-item menu
├── style.css                        # Design system tokens & menu layout
├── main.js                          # Story orchestrator & Tasting Tray state engine
├── reservation.html                 # Mr. Pudding's table reservation parlour
├── reservation.css                  # Parlour themes, custom time picker, wax seal
├── reservation.js                   # Booking form logic & ledger synchronization
├── scrub-engine.js                  # Video scrub & 3D camera choreography engine
├── vercel.json                      # Edge routing, caching & enterprise security
└── README.md                        # Documentation & architecture handbook
```

---

## 🚀 Vercel Edge Deployment & Caching

The project is pre-configured with a production-grade [`vercel.json`](vercel.json):

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "cleanUrls": true,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    },
    {
      "source": "/(.*)\\.html",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" },
        { "key": "Accept-Ranges", "value": "bytes" }
      ]
    }
  ]
}
```

### Steps to Deploy
1. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Deploy Blue Bell Cafe"
   git push origin main
   ```
2. Navigate to [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New Project**.
3. Import your GitHub repository (`Blue-Bell-Cafe`).
4. Keep the default root directory (`./`) and framework as **Other**.
5. Click **Deploy**. Your site will be live on Vercel's global Edge CDN within seconds.

---

## 💻 Local Development Setup

No node modules or build tools are required. Any local HTTP server can serve the project:

### Using Python 3
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in any web browser.

### Using VS Code Live Server
1. Open the project folder in VS Code.
2. Right-click [`index.html`](index.html) and select **Open with Live Server**.

---

## ♿ Accessibility & SEO

* **Semantic HTML5**: Native `<header>`, `<nav>`, `<section>`, `<article>`, `<aside>`, and `<footer>` landmarks.
* **WCAG 2.1 AA Keyboard Navigation**: Focus indicators (`:focus-visible`) for all interactive buttons, steppers, and inputs.
* **Screen Reader Support**: All icons and decoration graphics carry `aria-hidden="true"` or descriptive `aria-label` tags.
* **Rich Snippets (JSON-LD)**: Search engines index the cafe as a `CafeOrCoffeeShop` with menu items, opening hours, and location data.

---

## 👨‍💻 Author & Credits

* **Curated & Developed by**: **B. M. Shahria Alam**
* **Location**: Gulshan-2, Dhaka, Bangladesh
* **Feline Head Host**: Mr. Pudding 🐾
* **Copyright**: © 2026 Blue Bell Café. All rights reserved.

<div align="center">
  <sub>Handcrafted with passion, specialty coffee, and meticulous attention to detail.</sub>
</div>