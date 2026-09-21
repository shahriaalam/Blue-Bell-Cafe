/**
 * ==============================================================================
 * BLUE BELL CAFÉ — RESERVATION PARLOUR & MR. PUDDING ENGINE (reservation.js)
 * ==============================================================================
 * 
 * Architectural Overview:
 * 1. DOM References & State Management
 * 2. Date, Time & Seating Configuration
 * 3. Tasting Tray Pre-Order Ledger Integration
 * 4. Mr. Pudding (Feline Head Host) Reactive Behaviour & Animations
 * 5. Interactive Setting Selection & Dynamic Atmospheric Themes
 * 6. Timeslot Pills & Custom Time Selection Drawer
 * 7. Reservation Confirmation & Paw of Approval Wax Seal
 * 8. Zero-Latency Page Transitions & Navigation Interceptors
 * 
 * @fileoverview Booking portal and host interaction logic for Blue Bell Café.
 * @author Blue Bell Café Engineering Team
 * @version 2.4.0
 * ==============================================================================
 */

'use strict';

/* ------------------------------------------------------------------------------
   1. DOM REFERENCES & ELEMENT CACHE
   ------------------------------------------------------------------------------ */

const resPortal = document.getElementById('reservation-portal');
const portalCloseBtn = document.getElementById('portal-close-btn');
const portalBackdrop = document.getElementById('portal-backdrop');

// Feline Head Host (Mr. Pudding) Elements
const puddingBubble = document.getElementById('barnaby-bubble');
const puddingSpeechText = document.getElementById('barnaby-speech-text');
const puddingCharacter = document.getElementById('barnaby-character');
const purrBtn = document.getElementById('purr-btn');
const purrHearts = document.getElementById('purr-hearts');

// Portal Views & Form Controls
const portalFormView = document.getElementById('portal-form-view');
const portalTicketView = document.getElementById('portal-ticket-view');
const resForm = document.getElementById('reservation-form');
const resDateInput = document.getElementById('res-date');

// Guest Count Controls
const guestCountEl = document.getElementById('guest-count');
const guestMinusBtn = document.getElementById('guest-minus');
const guestPlusBtn = document.getElementById('guest-plus');

// Timeslot Controls
const timeslotPills = document.querySelectorAll('.timeslot-pill');
const customTimePill = document.getElementById('custom-time-pill');
const customTimePickerRow = document.getElementById('custom-time-picker-row');
const resCustomTimeInput = document.getElementById('res-custom-time');
const customTimeStatus = document.getElementById('custom-time-status');
const customPillLabel = document.getElementById('custom-pill-label');
const customPillSub = document.getElementById('custom-pill-sub');

// Table Setting Options & Occasion Tags
const tableOptions = document.querySelectorAll('.table-option');
const occasionTags = document.querySelectorAll('.occasion-tag');
const ticketDoneBtn = document.getElementById('ticket-done-btn');


/* ------------------------------------------------------------------------------
   2. REACTIVE STATE
   ------------------------------------------------------------------------------ */

let currentGuestCount = 2;
let selectedTimeSlot = '8:30 PM';
let customSelectedTime = '7:00 PM';
let selectedOccasion = 'Date Night';
let selectedTable = '';
let puddingActivityIndex = 0;


/* ------------------------------------------------------------------------------
   3. DATE & TIME UTILITIES
   ------------------------------------------------------------------------------ */

/**
 * Initializes the date input with today's date as minimum and default value.
 */
function initializeDateInput() {
  if (!resDateInput) return;
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const dateStr = `${yyyy}-${mm}-${dd}`;
  resDateInput.value = dateStr;
  resDateInput.min = dateStr;
}
initializeDateInput();

/**
 * Converts a 24-hour time string ("HH:MM") into an artisanal 12-hour format ("H:MM AM/PM").
 * @param {string} time24 - 24-hour time string
 * @returns {string} Formatted 12-hour time string
 */
function formatTime12h(time24) {
  if (!time24) return '7:00 PM';
  const parts = time24.split(':');
  let h = parseInt(parts[0], 10);
  const m = parts[1] || '00';
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}


/* ------------------------------------------------------------------------------
   4. TASTING TRAY PERSISTENCE & LEDGER INTEGRATION
   ------------------------------------------------------------------------------ */

/**
 * Reads pre-ordered Tasting Tray items from localStorage.
 * @returns {{items: Array, totalCount: number, totalPrice: number}|null}
 */
function getSavedTastingTray() {
  try {
    const raw = localStorage.getItem('bbc_tasting_tray');
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || !data.items) return null;
    const items = Array.isArray(data.items) ? data.items : Object.values(data.items);
    return {
      items: items,
      totalCount: data.totalCount || items.reduce((sum, it) => sum + (it.quantity || 1), 0),
      totalPrice: data.totalPrice || items.reduce((sum, it) => sum + (it.price * (it.quantity || 1)), 0)
    };
  } catch (err) {
    console.warn('[BlueBell] Unable to access tasting tray persistence:', err);
    return null;
  }
}

/**
 * Populates Mr. Pudding's pre-order ledger with selected tray items.
 */
function populateTastingTrayLedger() {
  const trayItemsContainer = document.getElementById('portal-tray-items');
  const trayTotalEl = document.getElementById('portal-tray-total');
  if (!trayItemsContainer || !trayTotalEl) return;

  const savedTray = getSavedTastingTray();
  if (savedTray && savedTray.items && savedTray.items.length > 0) {
    let html = '';
    savedTray.items.forEach((item) => {
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
    trayTotalEl.textContent = `৳ ${savedTray.totalPrice.toLocaleString()}`;

    if (puddingSpeechText) {
      puddingSpeechText.innerHTML = `Ah, magnificent taste! I have noted your <strong>${savedTray.totalCount} selected delicacies</strong> on my ledger. I'll personally instruct our barista to pre-warm your cups!`;
    }
  } else {
    trayItemsContainer.innerHTML = '<div class="tray-empty-hint">No pre-order yet — you can order fresh table-side!</div>';
    trayTotalEl.textContent = '৳ 0';

    if (puddingSpeechText) {
      puddingSpeechText.innerHTML = `Welcome, dear coffee lover! I am <strong>Mr. Pudding</strong>, your head host. Allow me to prepare our coziest candlelit nook for your visit!`;
    }
  }
}


/* ------------------------------------------------------------------------------
   5. MR. PUDDING INTERACTION ENGINE
   Handles feline speech rotation, purring animations, and particle bursts.
   ------------------------------------------------------------------------------ */

const puddingActivities = [
  {
    msg: `Voila! 🛎️ <em>*Lifts silver cloche*</em> A fresh pour-over bloom prepared with our signature roast just for your table!`,
    badge: '🛎️ (Serving!)',
    isServing: true
  },
  {
    msg: `Purrrr... ♡ The finest chin scratches in Gulshan! Your reservation is receiving my five-star feline care.`,
    badge: '🐾 (Purring!)',
    isServing: false
  },
  {
    msg: `Ding! 🥐 Our French hazelnut pastries just came out of the oven! I will whisper to the barista to set one aside for you.`,
    badge: '✨ (Delighted!)',
    isServing: true
  },
  {
    msg: `Meow! 🐾 High paw! My ears perk up whenever guests book their dream candlelit nook. You're in wonderful hands!`,
    badge: '🐾 (High Paw!)',
    isServing: false
  }
];

/**
 * Spawns floating sparkle particles above Mr. Pudding.
 */
function spawnPuddingSparkles() {
  if (!puddingCharacter) return;
  const emojis = ['🐾', '☕', '✨', '💛', '🌟', '🥐'];
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const p = document.createElement('span');
      p.className = 'pudding-click-particle';
      p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      const offsetX = (Math.random() - 0.5) * 80;
      p.style.left = `calc(50% + ${offsetX}px)`;
      p.style.bottom = '110px';
      puddingCharacter.appendChild(p);
      setTimeout(() => p.remove(), 1200);
    }, i * 140);
  }
}

/**
 * Triggers Mr. Pudding's purr reaction, dialogue change, and serving cloche animation.
 */
function triggerPuddingPurr() {
  if (!puddingCharacter) return;

  const current = puddingActivities[puddingActivityIndex % puddingActivities.length];
  puddingActivityIndex++;

  puddingCharacter.classList.add('is-purring');
  if (current.isServing) {
    puddingCharacter.classList.add('is-serving');
  }

  if (puddingSpeechText) {
    puddingSpeechText.innerHTML = current.msg;
  }
  if (purrHearts) {
    purrHearts.textContent = current.badge;
  }

  spawnPuddingSparkles();

  setTimeout(() => {
    puddingCharacter.classList.remove('is-purring');
    puddingCharacter.classList.remove('is-serving');
    if (purrHearts) purrHearts.textContent = '';
  }, 2800);
}

if (puddingCharacter) puddingCharacter.addEventListener('click', triggerPuddingPurr);
if (purrBtn) purrBtn.addEventListener('click', triggerPuddingPurr);


/* ------------------------------------------------------------------------------
   6. ATMOSPHERIC THEME SWITCHER & TABLE SETTINGS
   ------------------------------------------------------------------------------ */

/**
 * Updates portal color theme matching the selected dining setting.
 * @param {string} themeClass - CSS theme class name
 */
function updatePortalTheme(themeClass) {
  if (!resPortal) return;
  resPortal.classList.remove('theme-default', 'theme-rainy', 'theme-cozy', 'theme-sensory', 'theme-lush');
  resPortal.classList.add(themeClass);
}

// Table Options selection
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
    if (resPortal && tableId) {
      resPortal.classList.add('has-setting-selected');
      resPortal.classList.remove('setting-window', 'setting-candlelit', 'setting-barista', 'setting-glasshouse');
      resPortal.classList.add(`setting-${tableId}`);
    }

    if (tableId === 'window') {
      updatePortalTheme('theme-rainy');
      if (puddingSpeechText) {
        puddingSpeechText.innerHTML = `Ah, the <strong>Rainy Window Alcove</strong>! Watching raindrops trickling on the glass with hot single-origin pour-over... pure romance!`;
      }
    } else if (tableId === 'candlelit') {
      updatePortalTheme('theme-cozy');
      if (puddingSpeechText) {
        puddingSpeechText.innerHTML = `Ooh, the <strong>Intimate Velvet Booth</strong>! Very cozy and secluded. I will personally light a fresh honeyed beeswax candle for you!`;
      }
    } else if (tableId === 'barista') {
      updatePortalTheme('theme-sensory');
      if (puddingSpeechText) {
        puddingSpeechText.innerHTML = `Front-row at the <strong>Barista Bar</strong>! You will witness manual V60 bloom magic and smell freshly ground Geisha first!`;
      }
    } else if (tableId === 'glasshouse') {
      updatePortalTheme('theme-lush');
      if (puddingSpeechText) {
        puddingSpeechText.innerHTML = `The <strong>Botanical Glasshouse</strong>! Surrounded by exotic monsteras, fresh garden greenery, and gentle acoustic jazz... so calming!`;
      }
    }
  });
});


/* ------------------------------------------------------------------------------
   7. TIMESLOT PILLS & CUSTOM TIME DRAWER
   ------------------------------------------------------------------------------ */

timeslotPills.forEach((pill) => {
  pill.addEventListener('click', () => {
    timeslotPills.forEach((p) => p.classList.remove('is-active'));
    pill.classList.add('is-active');

    const dataTime = pill.getAttribute('data-time');
    if (dataTime === 'custom') {
      if (customTimePickerRow) customTimePickerRow.classList.remove('is-hidden');
      if (resCustomTimeInput) {
        customSelectedTime = formatTime12h(resCustomTimeInput.value);
        selectedTimeSlot = customSelectedTime;
        if (customTimeStatus) customTimeStatus.innerHTML = `Reserved for: <strong>${customSelectedTime}</strong>`;
        if (customPillLabel) customPillLabel.textContent = customSelectedTime;
        if (customPillSub) customPillSub.textContent = 'Custom ⏰';
      }
    } else {
      if (customTimePickerRow) customTimePickerRow.classList.add('is-hidden');
      selectedTimeSlot = dataTime || '8:30 PM';
      if (customPillLabel) customPillLabel.textContent = 'Custom ⏰';
      if (customPillSub) customPillSub.textContent = 'Pick Time';
    }
  });
});

if (resCustomTimeInput) {
  resCustomTimeInput.addEventListener('input', () => {
    customSelectedTime = formatTime12h(resCustomTimeInput.value);
    selectedTimeSlot = customSelectedTime;
    if (customTimeStatus) customTimeStatus.innerHTML = `Reserved for: <strong>${customSelectedTime}</strong>`;
    if (customPillLabel) customPillLabel.textContent = customSelectedTime;
    if (customPillSub) customPillSub.textContent = 'Custom ⏰';

    // Highlight custom pill
    timeslotPills.forEach((p) => p.classList.remove('is-active'));
    if (customTimePill) customTimePill.classList.add('is-active');
  });
}


/* ------------------------------------------------------------------------------
   8. GUEST STEPPER & OCCASION SELECTION
   ------------------------------------------------------------------------------ */

if (guestMinusBtn && guestPlusBtn && guestCountEl) {
  guestMinusBtn.addEventListener('click', () => {
    if (currentGuestCount > 1) {
      currentGuestCount--;
      guestCountEl.textContent = `${currentGuestCount} ${currentGuestCount === 1 ? 'Guest' : 'Guests'}`;
    }
  });

  guestPlusBtn.addEventListener('click', () => {
    if (currentGuestCount < 12) {
      currentGuestCount++;
      guestCountEl.textContent = `${currentGuestCount} Guests`;
    }
  });
}

occasionTags.forEach((tag) => {
  tag.addEventListener('click', () => {
    occasionTags.forEach((t) => t.classList.remove('is-active'));
    tag.classList.add('is-active');
    selectedOccasion = tag.getAttribute('data-occasion') || 'Date Night';
  });
});


/* ------------------------------------------------------------------------------
   9. FORM SUBMISSION & PAW OF APPROVAL TICKET GENERATION
   ------------------------------------------------------------------------------ */

if (resForm) {
  resForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!selectedTable) {
      if (puddingSpeechText) {
        puddingSpeechText.innerHTML = `Please choose your preferred <strong>Dream Setting</strong> above so I can prepare the ideal nook for you!`;
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

    // Switch view to confirmation celebration
    if (portalFormView) portalFormView.classList.add('is-hidden');
    if (portalTicketView) {
      portalTicketView.classList.remove('is-hidden');
      portalTicketView.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Trigger stamp animation
    const stampEl = document.getElementById('paw-stamp');
    if (stampEl) {
      stampEl.style.animation = 'none';
      requestAnimationFrame(() => {
        stampEl.style.animation = 'stampSlam 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      });
    }

    // Dynamic subtitle tailored to guest setting and chosen time
    const ticketCongratsSub = document.querySelector('.ticket-congrats-sub');
    if (ticketCongratsSub && selectedTable) {
      ticketCongratsSub.textContent = `Mr. Pudding has reserved your ${selectedTable} for ${selectedTimeSlot} on ${dateVal} and notified the baristas.`;
    }

    // Mr. Pudding congratulations speech
    if (puddingSpeechText) {
      puddingSpeechText.innerHTML = `Congratulations, <strong>${guestName}</strong>! Your table at the <strong>${selectedTable}</strong> is officially reserved for <strong>${selectedTimeSlot}</strong> with my <strong>Paw of Approval</strong>. We eagerly await your arrival at Blue Bell Café!`;
    }
  });
}


/* ------------------------------------------------------------------------------
   10. NAVIGATION & LIFECYCLE MANAGEMENT
   ------------------------------------------------------------------------------ */

/**
 * Smoothly transitions back to the main coffee sanctuary with a crossfade veil.
 * @param {string} [targetUrl='index.html'] - Destination URL
 */
function returnToCafeHome(targetUrl = 'index.html') {
  try {
    sessionStorage.setItem('bbc_return_to_top', 'true');
  } catch (e) {
    /* Safe ignore */
  }
  const veil = document.getElementById('page-transition-veil');
  if (veil) {
    veil.classList.add('is-active');
  }
  setTimeout(() => {
    window.location.href = targetUrl;
  }, 25);
}

/**
 * Fades out the transition veil when parlour mounts.
 */
function dismissVeil() {
  const veil = document.getElementById('page-transition-veil');
  if (veil) {
    requestAnimationFrame(() => {
      veil.classList.remove('is-active');
    });
  }
}
window.addEventListener('DOMContentLoaded', dismissVeil);
window.addEventListener('pageshow', dismissVeil);

// Intercept return links for silky-smooth transition
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href*="index.html"]');
  if (link && !link.target && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
    e.preventDefault();
    const dest = link.getAttribute('href') || 'index.html';
    returnToCafeHome(dest);
  }
});

// Explicit close button trigger
if (portalCloseBtn) {
  portalCloseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    returnToCafeHome('index.html');
  });
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    returnToCafeHome('index.html');
  }
});

// Done Action Button: Clear Tray & Return Home
if (ticketDoneBtn) {
  ticketDoneBtn.addEventListener('click', () => {
    try {
      localStorage.removeItem('bbc_tasting_tray');
      sessionStorage.setItem('bbc_return_to_top', 'true');
    } catch (e) {
      /* Safe ignore */
    }
    returnToCafeHome('index.html');
  });
}

/**
 * Mounts the reservation parlour on page load.
 */
function openReservationPortal() {
  if (!resPortal) return;

  if (portalFormView) portalFormView.classList.remove('is-hidden');
  if (portalTicketView) portalTicketView.classList.add('is-hidden');
  if (customTimePickerRow) customTimePickerRow.classList.add('is-hidden');

  if (!selectedTable) {
    updatePortalTheme('theme-default');
    resPortal.classList.remove('has-setting-selected', 'setting-window', 'setting-candlelit', 'setting-barista', 'setting-glasshouse');
  }

  populateTastingTrayLedger();
  resPortal.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', openReservationPortal);
} else {
  openReservationPortal();
}
