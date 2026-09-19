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
    logo: 'assets/Logo and falcon/logo.png',
    logoOnly: true, // Only show the logo graphic without duplicate text
    href: '#top'
  },

  // Primary Action Button in the Top Bar
  cta: {
    label: 'Reserve a Table',
    href: 'reservation.html' // Smoothly jumps to the final candlelit table service chapter
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
      title: 'The Bean Selection',
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
      title: 'Weighed to Perfection',
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
      title: 'The Artisanal Grind',
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
      title: 'The Masterful Tamp',
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
      title: 'The Golden Extraction',
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
      title: 'Texturing Velvet Milk',
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
      title: 'The Swan Symphony',
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
      title: 'Served With Love',
      body: 'Gracefully placed upon an intimate candlelit marble table beside a rain-swept window, accompanied by warm flaky croissants and a fresh blush rose.',
      tags: ['Candlelight Table', 'Rainy Window', 'Pure Romance'],
      cta: {
        primary: { label: 'Reserve a Table', href: 'reservation.html' },
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

// Auto-scroll to artisanal menu if returning via #cafe-menu
if (window.location.hash === '#cafe-menu') {
  const scrollToMenu = () => {
    setTimeout(() => {
      const menuEl = document.getElementById('cafe-menu');
      if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
    }, 120);
  };
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', scrollToMenu);
  } else {
    scrollToMenu();
  }
}

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

// --- B. Tasting Tray State Management with Dynamic Quantity Controls ---
const tastingTray = {
  items: new Map(),

  add(id, name, price, quantity = 1) {
    if (this.items.has(id)) {
      const existing = this.items.get(id);
      existing.quantity += quantity;
    } else {
      this.items.set(id, { id, name, price: Number(price), quantity });
    }
    this.render();
  },

  setQuantity(id, quantity) {
    if (quantity <= 0) {
      this.remove(id);
      return;
    }
    if (this.items.has(id)) {
      this.items.get(id).quantity = quantity;
      this.render();
    }
  },

  getQuantity(id) {
    return this.items.has(id) ? this.items.get(id).quantity : 0;
  },

  remove(id) {
    this.items.delete(id);
    this.updateCardUI(id, 0);
    this.render();
  },

  updateCardUI(id, qty) {
    const btn = document.querySelector(`.add-to-tray-btn[data-id="${id}"]`);
    if (!btn) return;
    const parentControl = btn.closest('.card-tray-control');
    const stepperValue = parentControl ? parentControl.querySelector('.qty-step-value') : null;

    if (qty > 0) {
      btn.classList.add('is-added');
      btn.innerHTML = '<span>✓ In Tasting Tray</span>';
      if (parentControl) parentControl.classList.add('is-active');
      if (stepperValue) stepperValue.textContent = qty;
    } else {
      btn.classList.remove('is-added');
      btn.innerHTML = '<span>Add to Tasting Tray</span>';
      if (parentControl) parentControl.classList.remove('is-active');
      if (stepperValue) stepperValue.textContent = '1';
    }
  },

  clear() {
    this.items.clear();
    document.querySelectorAll('.card-tray-control').forEach((ctrl) => {
      ctrl.classList.remove('is-active');
      const btn = ctrl.querySelector('.add-to-tray-btn');
      if (btn) {
        btn.classList.remove('is-added');
        btn.innerHTML = '<span>Add to Tasting Tray</span>';
      }
      const val = ctrl.querySelector('.qty-step-value');
      if (val) val.textContent = '1';
    });
    this.render();
  },

  getTotalCount() {
    let count = 0;
    this.items.forEach((item) => {
      count += item.quantity;
    });
    return count;
  },

  getTotalPrice() {
    let sum = 0;
    this.items.forEach((item) => {
      sum += (item.price * item.quantity);
    });
    return sum;
  },

  render() {
    const totalCount = this.getTotalCount();
    const totalPrice = this.getTotalPrice();
    const countLabel = document.getElementById('tray-count-label');
    const totalVal = document.getElementById('tray-total-val');

    if (countLabel) {
      countLabel.textContent = `${totalCount} ${totalCount === 1 ? 'item' : 'items'} selected`;
    }
    if (totalVal) {
      totalVal.textContent = `৳ ${totalPrice.toLocaleString()}`;
    }

    if (tastingTrayEl) {
      if (totalCount > 0) {
        tastingTrayEl.classList.remove('is-hidden');
      } else {
        tastingTrayEl.classList.add('is-hidden');
      }
    }
    updateFloatingControlsDocking();
  }
};

// Wire Add to Tray Buttons & Quantity Steppers
document.querySelectorAll('.card-tray-control').forEach((control) => {
  const btn = control.querySelector('.add-to-tray-btn');
  const minusBtn = control.querySelector('.qty-minus');
  const plusBtn = control.querySelector('.qty-plus');
  const valEl = control.querySelector('.qty-step-value');

  if (!btn) return;

  const id = btn.getAttribute('data-id');
  const name = btn.getAttribute('data-name');
  const price = Number(btn.getAttribute('data-price'));

  // Main Add Button click: toggles In Tasting Tray
  btn.addEventListener('click', () => {
    const currentQty = tastingTray.getQuantity(id);
    if (currentQty === 0) {
      tastingTray.add(id, name, price, 1);
      tastingTray.updateCardUI(id, 1);
    } else {
      // Clicking button again removes from tray
      tastingTray.remove(id);
    }
  });

  // Plus button click: increases quantity
  if (plusBtn) {
    plusBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const currentQty = tastingTray.getQuantity(id);
      const newQty = (currentQty > 0 ? currentQty : 1) + 1;
      tastingTray.setQuantity(id, newQty);
      if (valEl) valEl.textContent = newQty;
    });
  }

  // Minus button click: decreases quantity (or removes if reaching 0)
  if (minusBtn) {
    minusBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const currentQty = tastingTray.getQuantity(id);
      if (currentQty > 1) {
        const newQty = currentQty - 1;
        tastingTray.setQuantity(id, newQty);
        if (valEl) valEl.textContent = newQty;
      } else {
        // Drop to 0 -> remove from tray & close popup
        tastingTray.remove(id);
      }
    });
  }
});

// Wire Clear Tray Button
const clearTrayBtn = document.getElementById('tray-clear-btn');
if (clearTrayBtn) {
  clearTrayBtn.addEventListener('click', () => {
    tastingTray.clear();
    try {
      localStorage.removeItem('bbc_tasting_tray');
    } catch (e) { }
  });
}

// Smooth page transition helper with steaming coffee loader
function smoothNavigateTo(url) {
  const veil = document.getElementById('page-transition-veil');
  if (veil) {
    veil.classList.add('is-active');
  }
  // Instant navigation trigger
  setTimeout(() => {
    window.location.href = url;
  }, 25);
}

// Pre-warm / prefetch reservation page on hover or touch for instant navigation
document.addEventListener('pointerenter', (e) => {
  const link = e.target.closest && e.target.closest('a[href*="reservation.html"]');
  if (link && !link._prefetched) {
    link._prefetched = true;
    const pre = document.createElement('link');
    pre.rel = 'prefetch';
    pre.href = link.getAttribute('href') || 'reservation.html';
    document.head.appendChild(pre);
  }
}, true);

// Reset transition veil on page show (handles Back button & bfcache)
window.addEventListener('pageshow', () => {
  const veil = document.getElementById('page-transition-veil');
  if (veil) {
    veil.classList.remove('is-active');
  }
});

// Intercept all reservation navigation links for silky-smooth crossfade
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href*="reservation.html"]');
  if (link && !link.target && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
    e.preventDefault();
    smoothNavigateTo(link.getAttribute('href') || 'reservation.html');
  }
});

// Wire Proceed to Booking Button in Tasting Tray Dock
const trayOrderBtn = document.getElementById('tray-order-btn');
if (trayOrderBtn) {
  trayOrderBtn.addEventListener('click', (e) => {
    e.preventDefault();
    try {
      const itemsList = Array.from(tastingTray.items.values());
      const trayData = {
        items: itemsList,
        totalCount: tastingTray.getTotalCount(),
        totalPrice: tastingTray.getTotalPrice()
      };
      localStorage.setItem('bbc_tasting_tray', JSON.stringify(trayData));
    } catch (err) {
      console.warn('Could not save tasting tray state to localStorage:', err);
    }
    smoothNavigateTo('reservation.html');
  });
}
