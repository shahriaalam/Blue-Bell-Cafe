/* ==========================================================================
   BLUE BELL CAFÉ — APPLICATION LOGIC (main.js)
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. MOUNT SCROLL-SCRUBBED CINEMATIC WORLD
   Initializes the camera flight engine on the #world element.
   Defines:
   - Brand logo & top links
   - Top call-to-action ("Reserve a Table")
   - Scroll distance, crossfade curves, and atmospheric particles
   - 8 sequential artisanal coffee scenes from bean selection to table service
   -------------------------------------------------------------------------- */
mountLetsScroll(document.getElementById('world'), {
  // Brand Header Configuration (Horizontal logo inside white capsule)
  brand: {
    name: 'Blue Bell Café',
    logo: 'assets/logo.png',
    logoOnly: true, // Only show the logo graphic without duplicate text
    href: '#top'
  },

  // Primary Action Button in the Top Bar
  cta: {
    label: 'Reserve a Table',
    href: '#service' // Smoothly jumps to the final candlelit table service chapter
  },

  // Initial prompt displayed to the visitor
  hint: 'scroll to explore',

  // Cinematic scroll timing parameters
  diveScroll: 2.2,   // Scroll distance for each camera flight scene
  crossfade: 0.52,    // Smoothness of video transitions between scenes
  connScroll: 0.85,   // Transition duration between scene connects
  atmosphere: true,   // Subtle floating golden dust particles & warm ambient glow

  // ------------------------------------------------------------------------
  // STORY SECTIONS (The 8 Chapters of Artisanal Coffee Craftsmanship)
  // ------------------------------------------------------------------------
  sections: [
    // Act I: Handpicking the roasted coffee beans
    {
      id: 'selection',
      label: 'I. Selection',
      still: 'assets/01_selection.png',
      clip: 'assets/vid/01_selection.mp4',
      scroll: 2.2,
      linger: 0.22,
      accent: '#A45D3B', // Roasted terracotta
      eyebrow: 'Act I — Pure Origin',
      title: 'The Bean Selection.',
      body: 'Behind the sunlit oak counter, our barista handpicks glistening, dark-roasted Arabica beans, awakening delicate notes of dark chocolate and hazelnut.',
      tags: ['Single Origin', 'Sun-Kissed Roast', 'Handpicked']
    },

    // Act II: Weighing beans on the brass scale
    {
      id: 'dosing',
      label: 'II. Dosing',
      still: 'assets/02_dosing.png',
      clip: 'assets/vid/02_dosing.mp4',
      scroll: 1.8,
      linger: 0.22,
      accent: '#B57C48', // Antique brass amber
      eyebrow: 'Act II — Golden Precision',
      title: 'Weighed to Perfection.',
      body: 'Every single gram matters. The roasted beans are weighed on a vintage brass scale before entering the gleaming glass hopper.',
      tags: ['Precision Scale', 'Artisanal Ratio', 'Brass Details']
    },

    // Act III: Precision burr grinding
    {
      id: 'grinding',
      label: 'III. Grinding',
      still: 'assets/03_grinding.png',
      clip: 'assets/vid/03_grinding.mp4',
      scroll: 1.9,
      linger: 0.22,
      accent: '#8C5230', // Deep hazelnut mocha
      eyebrow: 'Act III — Awakening the Aroma',
      title: 'The Artisanal Grind.',
      body: 'Crushed gently between precision burrs, fresh coffee falls like dark velvet silk into the heavy brass portafilter, perfuming the morning air.',
      tags: ['Velvet Powder', 'Aromatic Bloom', 'Burr Precision']
    },

    // Act IV: Rosewood tamping
    {
      id: 'tamping',
      label: 'IV. Tamping',
      still: 'assets/04_tamping.png',
      clip: 'assets/vid/04_tamping.mp4',
      scroll: 2.2,
      linger: 0.22,
      accent: '#9E5B38', // Warm polished wood
      eyebrow: 'Act IV — The Precise Ritual',
      title: 'The Masterful Tamp.',
      body: 'With steady hands and a polished rosewood tamper, the coffee bed is compacted into a perfectly smooth, mirror-level surface ready for pressure.',
      tags: ['Rosewood Tamper', 'Level Bed', 'Craft Technique']
    },

    // Act V: Espresso extraction under 9 bars of pressure
    {
      id: 'extraction',
      label: 'V. Extraction',
      still: 'assets/05_extraction.png',
      clip: 'assets/vid/05_extraction.mp4',
      scroll: 1.5,
      linger: 0.22,
      accent: '#C47D3B', // Golden espresso crema
      eyebrow: 'Act V — Liquid Gold',
      title: 'The Golden Extraction.',
      body: 'Locked into the vintage copper and brass espresso machine, nine bars of pressure coax dual streams of rich tiger-striped crema into warm ceramic cups.',
      tags: ['9-Bar Pressure', 'Tiger Crema', 'Liquid Gold']
    },

    // Act VI: Steaming and microfoaming milk
    {
      id: 'steaming',
      label: 'VI. Steaming',
      still: 'assets/06_steaming.png',
      clip: 'assets/vid/06_steaming.mp4',
      scroll: 1.6,
      linger: 0.22,
      accent: '#D4A373', // Silky warm milk
      eyebrow: 'Act VI — Silky Steam',
      title: 'Texturing Velvet Milk.',
      body: 'Cold fresh milk is swirled into a glossy vortex under gentle steam, transforming into dense, microfoam silk with a natural sweet sheen.',
      tags: ['Velvet Microfoam', 'Glossy Texture', 'Silky Vortex']
    },

    // Act VII: Handcrafted swan latte art
    {
      id: 'swan',
      label: 'VII. The Swan',
      still: 'assets/07_swan.png',
      clip: 'assets/vid/07_swan.mp4',
      scroll: 1.8,
      linger: 0.22,
      accent: '#C95D63', // Romantic dusky rose
      eyebrow: 'Act VII — The Swan Symphony',
      title: 'The Swan Symphony.',
      body: 'With rhythmic, practiced wrist motions, the barista pours velvety white microfoam across golden crema — painting a majestic swan in full flight.',
      tags: ['Swan Latte Art', 'Master Pour', 'Pure Romance']
    },

    // Act VIII: Candlelit table for two with croissants and rose
    {
      id: 'service',
      label: 'VIII. Service',
      still: 'assets/08_service.png',
      clip: 'assets/vid/08_service.mp4',
      scroll: 1.4,
      linger: 0.22,
      accent: '#B85D64', // Warm ruby rose
      eyebrow: 'Act VIII — Your Table Awaits',
      title: 'Served for Two.',
      body: 'Gracefully placed upon an intimate candlelit marble table beside a rain-swept window, accompanied by warm flaky croissants and a fresh blush rose.',
      tags: ['Candlelight Table', 'Rainy Window', 'Pure Romance'],
      cta: {
        primary: { label: 'Reserve a Table', href: '#service' },
        secondary: { label: 'Explore the Menu', href: '#cafe-menu' }
      }
    }
  ],
  connectors: []
});

// Smooth scroll listener for menu links
document.addEventListener('click', (e) => {
  const target = e.target.closest('a[href="#cafe-menu"]');
  if (target) {
    e.preventDefault();
    const menuEl = document.getElementById('cafe-menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

/* --------------------------------------------------------------------------
   2. DYNAMIC FLOATING CONTROLS DOCKING
   Ensures bottom floating elements (Tasting Tray) dock gracefully above the footer.
   -------------------------------------------------------------------------- */
const footerElement = document.querySelector('.site-footer');
const tastingTrayEl = document.getElementById('tasting-tray');
let dockTicking = false;

function updateFloatingControlsDocking() {
  const windowHeight = window.innerHeight;
  const baseTrayMargin = 24;

  if (footerElement) {
    const footerRect = footerElement.getBoundingClientRect();
    if (footerRect.top < windowHeight) {
      const footerOverlap = windowHeight - footerRect.top;
      if (tastingTrayEl) {
        tastingTrayEl.style.bottom = `${footerOverlap + baseTrayMargin}px`;
      }
      return;
    }
  }

  if (tastingTrayEl) {
    tastingTrayEl.style.bottom = `${baseTrayMargin}px`;
  }
}

function handleFloatingControlsScroll() {
  if (!dockTicking) {
    dockTicking = true;
    requestAnimationFrame(() => {
      updateFloatingControlsDocking();
      dockTicking = false;
    });
  }
}

window.addEventListener('scroll', handleFloatingControlsScroll, { passive: true });
window.addEventListener('resize', updateFloatingControlsDocking);
// Initialize on page load
updateFloatingControlsDocking();

/* --------------------------------------------------------------------------
   3. ARTISANAL CAFÉ MENU INTERACTION
   - Category Filter Navigation
   - Tasting Tray Selection & Real-Time Total
   - 1-Click Reservation Jump with Intent
   -------------------------------------------------------------------------- */

// --- A. Category Filter Tabs ---
const filterButtons = document.querySelectorAll('.menu-filter-btn');
const menuCards = document.querySelectorAll('.menu-card');

if (filterButtons.length > 0) {
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      // Update active tab button
      filterButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      // Filter cards with smooth entrance
      menuCards.forEach((card) => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.classList.remove('is-filtered-out');
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          requestAnimationFrame(() => {
            card.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.classList.add('is-filtered-out');
        }
      });
    });
  });
}

// --- B. Tasting Tray State Management ---
const tastingTray = {
  items: new Map(),

  add(id, name, price) {
    this.items.set(id, { id, name, price: Number(price) });
    this.render();
  },

  remove(id) {
    this.items.delete(id);
    this.render();
  },

  toggle(id, name, price) {
    if (this.items.has(id)) {
      this.remove(id);
      return false;
    } else {
      this.add(id, name, price);
      return true;
    }
  },

  clear() {
    this.items.clear();
    this.render();
    // Reset all add buttons
    document.querySelectorAll('.add-to-tray-btn').forEach((btn) => {
      btn.classList.remove('is-added');
      btn.innerHTML = '<span>♡ Add to Tasting Tray</span>';
    });
  },

  getTotal() {
    let sum = 0;
    this.items.forEach((item) => {
      sum += item.price;
    });
    return sum;
  },

  render() {
    const count = this.items.size;
    const total = this.getTotal();
    const countLabel = document.getElementById('tray-count-label');
    const totalVal = document.getElementById('tray-total-val');

    if (countLabel) {
      countLabel.textContent = `${count} ${count === 1 ? 'item' : 'items'} selected ♡`;
    }
    if (totalVal) {
      totalVal.textContent = `৳ ${total.toLocaleString()}`;
    }

    if (tastingTrayEl) {
      if (count > 0) {
        tastingTrayEl.classList.remove('is-hidden');
      } else {
        tastingTrayEl.classList.add('is-hidden');
      }
    }
    updateFloatingControlsDocking();
  }
};

// Wire Add to Tray Buttons
document.querySelectorAll('.add-to-tray-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-id');
    const name = btn.getAttribute('data-name');
    const price = btn.getAttribute('data-price');

    const isAdded = tastingTray.toggle(id, name, price);

    if (isAdded) {
      btn.classList.add('is-added');
      btn.innerHTML = '<span>♥ In Tasting Tray</span>';
    } else {
      btn.classList.remove('is-added');
      btn.innerHTML = '<span>♡ Add to Tasting Tray</span>';
    }
  });
});

// Wire Clear Tray Button
const clearTrayBtn = document.getElementById('tray-clear-btn');
if (clearTrayBtn) {
  clearTrayBtn.addEventListener('click', () => {
    tastingTray.clear();
  });
}

// Function to smoothly jump to Act VIII: Table Service / Reservation
function jumpToServiceChapter() {
  if (window.scrollEngine && typeof window.scrollEngine.jumpTo === 'function') {
    window.scrollEngine.jumpTo(7); // Jump to Act VIII: Served for Two
  } else {
    const worldSection = document.getElementById('world');
    if (worldSection) {
      worldSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// Wire Tasting Tray Order / Reserve Button
const trayOrderBtn = document.getElementById('tray-order-btn');
if (trayOrderBtn) {
  trayOrderBtn.addEventListener('click', () => {
    jumpToServiceChapter();
  });
}


/* --------------------------------------------------------------------------
   4. ARTISANAL FOOTER LOGIC
   Controls:
   - Reserve Table button in footer
   -------------------------------------------------------------------------- */

// --- A. Reserve a Table Link in Footer ---
const footerBookBtn = document.getElementById('footer-book-btn');
if (footerBookBtn) {
  footerBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    jumpToServiceChapter();
  });
}

