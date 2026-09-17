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
      title: 'Served With Love',
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
      btn.innerHTML = '<span>♥ In Tasting Tray</span>';
      if (parentControl) parentControl.classList.add('is-active');
      if (stepperValue) stepperValue.textContent = qty;
    } else {
      btn.classList.remove('is-added');
      btn.innerHTML = '<span>♡ Add to Tasting Tray</span>';
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
        btn.innerHTML = '<span>♡ Add to Tasting Tray</span>';
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
      countLabel.textContent = `${totalCount} ${totalCount === 1 ? 'item' : 'items'} selected ♡`;
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
  });
}

/* --------------------------------------------------------------------------
   4. MONSIEUR BARNABY'S INTERACTIVE RESERVATION PARLOUR
   Controls:
   - Full-screen dining room stage opening & closing
   - Tasting Tray pre-order auto-population
   - Monsieur Barnaby's dynamic speech bubble & purring reactions
   - Interactive table selection & time slot picking
   - Paw of Approval wax seal animation & vintage boarding-pass ticket generation
   -------------------------------------------------------------------------- */

const resPortal = document.getElementById('reservation-portal');
const portalCloseBtn = document.getElementById('portal-close-btn');
const portalBackdrop = document.getElementById('portal-backdrop');
const barnabyBubble = document.getElementById('barnaby-bubble');
const barnabySpeechText = document.getElementById('barnaby-speech-text');
const barnabyCharacter = document.getElementById('barnaby-character');
const purrBtn = document.getElementById('purr-btn');
const purrHearts = document.getElementById('purr-hearts');

const portalFormView = document.getElementById('portal-form-view');
const portalTicketView = document.getElementById('portal-ticket-view');
const resForm = document.getElementById('reservation-form');
const resDateInput = document.getElementById('res-date');

const guestCountEl = document.getElementById('guest-count');
const guestMinusBtn = document.getElementById('guest-minus');
const guestPlusBtn = document.getElementById('guest-plus');

let currentGuestCount = 2;
let selectedTimeSlot = '8:30 PM';
let selectedOccasion = 'Date Night ♡';
let selectedTable = '';

// Helper function to dynamically update the atmospheric color theme
function updatePortalTheme(themeClass) {
  if (!resPortal) return;
  resPortal.classList.remove('theme-default', 'theme-rainy', 'theme-cozy', 'theme-sensory', 'theme-lush');
  resPortal.classList.add(themeClass);
}

// Set today's default date (YYYY-MM-DD)
if (resDateInput) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  resDateInput.value = `${yyyy}-${mm}-${dd}`;
  resDateInput.min = `${yyyy}-${mm}-${dd}`;
}

// Function to open the reservation portal
function openReservationPortal() {
  if (!resPortal) return;

  // Reset to form view
  if (portalFormView) portalFormView.classList.remove('is-hidden');
  if (portalTicketView) portalTicketView.classList.add('is-hidden');

  // Maintain selected theme or activate default light aesthetic theme
  if (!selectedTable) {
    updatePortalTheme('theme-default');
  }

  // Populate Tasting Tray order items into Barnaby's Ledger
  const trayItemsContainer = document.getElementById('portal-tray-items');
  const trayTotalEl = document.getElementById('portal-tray-total');

  if (trayItemsContainer && trayTotalEl) {
    if (tastingTray && tastingTray.items.size > 0) {
      let html = '';
      tastingTray.items.forEach((item) => {
        html += `
          <div class="tray-preitem">
            <span class="preitem-name">
              <span>☕ ${item.name}</span>
              <span class="preitem-qty">×${item.quantity}</span>
            </span>
            <span class="preitem-price">৳ ${(item.price * item.quantity).toLocaleString()}</span>
          </div>
        `;
      });
      trayItemsContainer.innerHTML = html;
      trayTotalEl.textContent = `৳ ${tastingTray.getTotalPrice().toLocaleString()}`;

      if (barnabySpeechText) {
        barnabySpeechText.innerHTML = `Ah, magnifique taste! ♡ I have noted your <strong>${tastingTray.getTotalCount()} selected delicacies</strong> on my ledger. I'll personally instruct our barista to pre-warm your cups!`;
      }
    } else {
      trayItemsContainer.innerHTML = '<div class="tray-empty-hint">No pre-order yet — you can order fresh table-side!</div>';
      trayTotalEl.textContent = '৳ 0';

      if (barnabySpeechText) {
        barnabySpeechText.innerHTML = `Bonjour, dear coffee lover! ♡ I am <strong>Monsieur Barnaby</strong>, your maître d'. Allow me to prepare our coziest candlelit nook for your visit!`;
      }
    }
  }

  // Open the portal with animation
  resPortal.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
}

function closeReservationPortal() {
  if (!resPortal) return;
  resPortal.classList.add('is-hidden');
  document.body.style.overflow = '';
}

// Wire Close Triggers
if (portalCloseBtn) portalCloseBtn.addEventListener('click', closeReservationPortal);
if (portalBackdrop) portalBackdrop.addEventListener('click', closeReservationPortal);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && resPortal && !resPortal.classList.contains('is-hidden')) {
    closeReservationPortal();
  }
});

// Interactive Barnaby Petting / Purring
function triggerBarnabyPurr() {
  if (!barnabyCharacter) return;
  barnabyCharacter.classList.add('is-purring');
  if (barnabySpeechText) {
    barnabySpeechText.innerHTML = `Purrrr... ♡ You give the most delightful chin scratches! Rest assured, your table is in the most caring paws.`;
  }
  if (purrHearts) {
    purrHearts.textContent = '♡ (Purring!) ♡';
  }
  setTimeout(() => {
    barnabyCharacter.classList.remove('is-purring');
    if (purrHearts) purrHearts.textContent = '♡ ♡';
  }, 2500);
}

if (barnabyCharacter) barnabyCharacter.addEventListener('click', triggerBarnabyPurr);
if (purrBtn) purrBtn.addEventListener('click', triggerBarnabyPurr);

// Table Options selection & dynamic theme switcher across 5 atmospheric scenarios
const tableOptions = document.querySelectorAll('.table-option');
tableOptions.forEach((option) => {
  option.addEventListener('click', () => {
    tableOptions.forEach((opt) => opt.classList.remove('is-selected'));
    option.classList.add('is-selected');

    const radio = option.querySelector('input[type="radio"]');
    if (radio) {
      radio.checked = true;
      selectedTable = radio.value;
    }

    const tableId = option.getAttribute('data-table-id');
    if (tableId === 'window') {
      updatePortalTheme('theme-rainy');
      if (barnabySpeechText) {
        barnabySpeechText.innerHTML = `Ah, the <strong>Rainy Window Alcove</strong>! Watching raindrops trickling on the glass with hot single-origin pour-over... pure romance! ♡`;
      }
    } else if (tableId === 'candlelit') {
      updatePortalTheme('theme-cozy');
      if (barnabySpeechText) {
        barnabySpeechText.innerHTML = `Ooh, the <strong>Intimate Velvet Booth</strong>! Very cozy and secluded. I will personally light a fresh honeyed beeswax candle for you!`;
      }
    } else if (tableId === 'barista') {
      updatePortalTheme('theme-sensory');
      if (barnabySpeechText) {
        barnabySpeechText.innerHTML = `Front-row at the <strong>Barista Bar</strong>! You will witness manual V60 bloom magic and smell freshly ground Geisha first!`;
      }
    } else if (tableId === 'glasshouse') {
      updatePortalTheme('theme-lush');
      if (barnabySpeechText) {
        barnabySpeechText.innerHTML = `The <strong>Botanical Glasshouse</strong>! Surrounded by exotic monsteras, fresh garden greenery, and gentle acoustic jazz... so calming!`;
      }
    }
  });
});

// Timeslot Pills selection
const timeslotPills = document.querySelectorAll('.timeslot-pill');
timeslotPills.forEach((pill) => {
  pill.addEventListener('click', () => {
    timeslotPills.forEach((p) => p.classList.remove('is-active'));
    pill.classList.add('is-active');
    selectedTimeSlot = pill.getAttribute('data-time') || '8:30 PM';
  });
});

// Guest Stepper
if (guestMinusBtn && guestPlusBtn && guestCountEl) {
  guestMinusBtn.addEventListener('click', () => {
    if (currentGuestCount > 1) {
      currentGuestCount--;
      guestCountEl.textContent = `${currentGuestCount} ${currentGuestCount === 1 ? 'Guest' : 'Guests'} ${currentGuestCount === 2 ? '♡' : ''}`;
    }
  });

  guestPlusBtn.addEventListener('click', () => {
    if (currentGuestCount < 12) {
      currentGuestCount++;
      guestCountEl.textContent = `${currentGuestCount} Guests ${currentGuestCount === 2 ? '♡' : ''}`;
    }
  });
}

// Occasion Tags selection
const occasionTags = document.querySelectorAll('.occasion-tag');
occasionTags.forEach((tag) => {
  tag.addEventListener('click', () => {
    occasionTags.forEach((t) => t.classList.remove('is-active'));
    tag.classList.add('is-active');
    selectedOccasion = tag.getAttribute('data-occasion') || 'Date Night ♡';
  });
});

// Form Submission & Paw of Approval Ticket Generation
if (resForm) {
  resForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!selectedTable) {
      if (barnabySpeechText) {
        barnabySpeechText.innerHTML = `Please choose your preferred <strong>Dream Setting</strong> above so I can prepare the ideal nook for you! ♡`;
      }
      const grid = document.querySelector('.table-options-grid');
      if (grid) {
        grid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        grid.classList.add('pulse-highlight');
        setTimeout(() => grid.classList.remove('pulse-highlight'), 1200);
      }
      return;
    }

    const nameInput = document.getElementById('res-name');
    const guestName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Valued Guest';
    const dateVal = resDateInput ? resDateInput.value : 'Today';

    // Generate random booking reference
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `#BBC-${randomCode}`;

    // Populate ticket
    const ticketIdEl = document.getElementById('ticket-pass-id');
    const ticketGuestEl = document.getElementById('ticket-guest-name');
    const ticketTableEl = document.getElementById('ticket-table-name');
    const ticketDatetimeEl = document.getElementById('ticket-datetime');
    const ticketPartyEl = document.getElementById('ticket-party');
    const ticketOrderValEl = document.getElementById('ticket-order-val');

    if (ticketIdEl) ticketIdEl.textContent = bookingId;
    if (ticketGuestEl) ticketGuestEl.textContent = guestName;
    if (ticketTableEl) ticketTableEl.textContent = selectedTable;
    if (ticketDatetimeEl) ticketDatetimeEl.textContent = `${dateVal} • ${selectedTimeSlot}`;
    if (ticketPartyEl) ticketPartyEl.textContent = `${currentGuestCount} ${currentGuestCount === 1 ? 'Guest' : 'Guests'} • ${selectedOccasion}`;

    if (ticketOrderValEl) {
      if (tastingTray && tastingTray.items.size > 0) {
        const itemNames = [];
        tastingTray.items.forEach((item) => {
          itemNames.push(`${item.quantity}x ${item.name}`);
        });
        ticketOrderValEl.textContent = itemNames.join(', ');
      } else {
        ticketOrderValEl.textContent = 'Fresh table-side ordering upon arrival';
      }
    }

    // Switch view to ticket
    if (portalFormView) portalFormView.classList.add('is-hidden');
    if (portalTicketView) portalTicketView.classList.remove('is-hidden');

    // Trigger stamp animation
    const stampEl = document.getElementById('paw-stamp');
    if (stampEl) {
      stampEl.style.animation = 'none';
      requestAnimationFrame(() => {
        stampEl.style.animation = 'stampSlam 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      });
    }

    // Barnaby's congratulations speech
    if (barnabySpeechText) {
      barnabySpeechText.innerHTML = `Félicitations, <strong>${guestName}</strong>! ♡ Your reservation is officially sealed with my <strong>Paw of Approval</strong>. We eagerly await your arrival at Blue Bell Café!`;
    }
  });
}

// Ticket Action Buttons: High-Res PNG Download & 1-Page Print
function downloadTicketAsImage() {
  const passId = document.getElementById('ticket-pass-id')?.innerText.trim() || '#BBC-7892';
  const guestName = document.getElementById('ticket-guest-name')?.innerText.trim() || 'Valued Guest';
  const tableName = document.getElementById('ticket-table-name')?.innerText.trim() || 'Rainy Window Alcove';
  const dateTime = document.getElementById('ticket-datetime')?.innerText.trim() || 'Today • 8:30 PM';
  const partyOccasion = document.getElementById('ticket-party')?.innerText.trim() || '2 Guests • Date Night ♡';
  const orderVal = document.getElementById('ticket-order-val')?.innerText.trim() || 'None pre-ordered (Table-side ordering)';

  // 2x Retina Resolution for ultra-sharp text and graphics
  const scale = 2;
  const width = 500;
  const height = 370;
  const canvas = document.createElement('canvas');
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);

  // Card Background
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.roundRect(0, 0, width, height, 18);
  ctx.fill();

  // Card Outer Border
  ctx.strokeStyle = '#2D4C3A';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(0, 0, width, height, 18);
  ctx.stroke();

  // Header Banner Background
  ctx.fillStyle = '#F4F8F5';
  ctx.beginPath();
  ctx.roundRect(0, 0, width, 68, [18, 18, 0, 0]);
  ctx.fill();

  ctx.strokeStyle = '#D5E2D9';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, 68);
  ctx.lineTo(width, 68);
  ctx.stroke();

  // Crest Icon
  ctx.font = '22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('☕', 20, 42);

  // Café Name
  ctx.font = 'bold 16px Georgia, "Times New Roman", Times, serif';
  ctx.fillStyle = '#1B3324';
  ctx.fillText('BLUE BELL CAFÉ', 52, 35);

  ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#557560';
  ctx.fillText('Gulshan 2 Sanctuary • Table Booking Pass', 52, 53);

  // Pass ID Pill
  ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#2D6A4F';
  ctx.textAlign = 'right';
  ctx.fillText(passId, width - 22, 42);
  ctx.textAlign = 'left';

  // Dashed Cutout Notch Row
  const notchY = 82;
  ctx.beginPath();
  ctx.setLineDash([5, 4]);
  ctx.strokeStyle = '#C4D6CB';
  ctx.lineWidth = 1.5;
  ctx.moveTo(18, notchY);
  ctx.lineTo(width - 18, notchY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Left Notch Cutout
  ctx.fillStyle = '#F0F5F2';
  ctx.beginPath();
  ctx.arc(0, notchY, 9, -Math.PI / 2, Math.PI / 2);
  ctx.fill();
  ctx.strokeStyle = '#2D4C3A';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Right Notch Cutout
  ctx.fillStyle = '#F0F5F2';
  ctx.beginPath();
  ctx.arc(width, notchY, 9, Math.PI / 2, 3 * Math.PI / 2);
  ctx.fill();
  ctx.strokeStyle = '#2D4C3A';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Details Grid Fields
  function drawField(label, val, x, y, isHighlight = false) {
    ctx.font = 'bold 10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#6E8A78';
    ctx.fillText(label, x, y);

    if (isHighlight) {
      ctx.font = 'bold 16px Georgia, "Times New Roman", Times, serif';
      ctx.fillStyle = '#2D6A4F';
    } else {
      ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = '#1B3324';
    }
    ctx.fillText(val, x, y + 18);
  }

  const col1 = 24;
  const col2 = 260;
  drawField('GUEST', guestName, col1, 114);
  drawField('TABLE ASSIGNMENT', tableName, col2, 114, true);

  drawField('DATE & TIME', dateTime, col1, 166);
  drawField('PARTY & OCCASION', partyOccasion, col2, 166);

  drawField('CURATED ORDER PRE-CHECK', orderVal, col1, 218);

  // Footer Banner Background
  const footerY = 308;
  ctx.fillStyle = '#F4F8F5';
  ctx.beginPath();
  ctx.roundRect(0, footerY, width, height - footerY, [0, 0, 18, 18]);
  ctx.fill();

  ctx.strokeStyle = '#D5E2D9';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, footerY);
  ctx.lineTo(width, footerY);
  ctx.stroke();

  // Barcode Graphic Text
  ctx.font = '16px monospace';
  ctx.fillStyle = '#557560';
  ctx.fillText('||| | |||| | ||||| ||| |||| | ||', 24, footerY + 38);

  // Status Badge Pill
  const pillText = '✓ Status: Paw-Approved';
  ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const pillW = ctx.measureText(pillText).width + 20;
  const pillH = 26;
  const pillX = width - pillW - 22;
  const pillY = footerY + 18;

  ctx.fillStyle = '#E8F5EC';
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, 13);
  ctx.fill();

  ctx.strokeStyle = '#2D6A4F';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, 13);
  ctx.stroke();

  ctx.fillStyle = '#2D6A4F';
  ctx.fillText(pillText, pillX + 10, pillY + 17);

  // Trigger Download Link
  const safeId = passId.replace(/[^a-zA-Z0-9_-]/g, '');
  const downloadLink = document.createElement('a');
  downloadLink.download = `Blue-Bell-Cafe-Pass-${safeId}.png`;
  downloadLink.href = canvas.toDataURL('image/png');
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

const ticketDownloadBtn = document.getElementById('ticket-download-btn');
if (ticketDownloadBtn) {
  ticketDownloadBtn.addEventListener('click', downloadTicketAsImage);
}

const ticketPrintBtn = document.getElementById('ticket-print-btn');
if (ticketPrintBtn) {
  ticketPrintBtn.addEventListener('click', () => {
    window.print();
  });
}

const ticketDoneBtn = document.getElementById('ticket-done-btn');
if (ticketDoneBtn) {
  ticketDoneBtn.addEventListener('click', () => {
    closeReservationPortal();
  });
}

// Intercept All Reservation Links & Buttons across the page
document.addEventListener('click', (e) => {
  const target = e.target.closest('a[href="#service"], a[href="#reserve"], #tray-order-btn, #footer-book-btn, .sw-topbar-cta');
  if (target) {
    e.preventDefault();
    openReservationPortal();
  }
});

