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
let selectedTimeSlot = '7:30 PM';
let customSelectedTime = '7:30 PM';
let selectedOccasion = 'Date Night';
let selectedTable = '';
let puddingActivityIndex = 0;
let isBookingConfirmed = false;


/* ------------------------------------------------------------------------------
   3. DATE & TIME UTILITIES & CAFE OPERATING HOURS
   ------------------------------------------------------------------------------ */

/**
 * Parses YYYY-MM-DD string to local day of week (0 = Sunday, 1 = Monday, ..., 6 = Saturday).
 * Prevents UTC timezone rollback bugs.
 */
function getDayOfWeek(dateStr) {
  if (!dateStr) return new Date().getDay();
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    return new Date(y, m, d).getDay();
  }
  return new Date().getDay();
}

/**
 * Returns the exact opening and closing boundaries for Blue Bell Cafe:
 * - Monday – Friday: 7:30 AM – 11:00 PM (07:30 – 23:00)
 * - Saturday – Sunday: 8:00 AM – 12:30 PM (08:00 – 12:30)
 */
function getCafeHours(dateStr) {
  const day = getDayOfWeek(dateStr);
  const isWeekend = (day === 0 || day === 6);
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = dayNames[day];

  if (isWeekend) {
    return {
      isWeekend: true,
      dayName,
      openTime: '08:00',
      closeTime: '12:30',
      openMinutes: 8 * 60,         // 480
      closeMinutes: 12 * 60 + 30,  // 750
      openFormatted: '8:00 AM',
      closeFormatted: '12:30 PM',
      scheduleText: 'Sat–Sun: 8:00 AM – 12:30 PM'
    };
  } else {
    return {
      isWeekend: false,
      dayName,
      openTime: '07:30',
      closeTime: '23:00',
      openMinutes: 7 * 60 + 30,    // 450
      closeMinutes: 23 * 60,       // 1380
      openFormatted: '7:30 AM',
      closeFormatted: '11:00 PM',
      scheduleText: 'Mon–Fri: 7:30 AM – 11:00 PM'
    };
  }
}

/**
 * Converts a time string ("HH:MM" or "H:MM AM/PM") into total minutes from midnight.
 */
function timeStringToMinutes(timeStr) {
  if (!timeStr) return null;
  const str = String(timeStr).trim();
  if (/AM|PM/i.test(str)) {
    const match = str.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return null;
    let h = parseInt(match[1], 10);
    const m = parseInt(match[2], 10);
    const ampm = match[3].toUpperCase();
    if (ampm === 'PM' && h < 12) h += 12;
    if (ampm === 'AM' && h === 12) h = 0;
    return h * 60 + m;
  } else if (str.includes(':')) {
    const [h, m] = str.split(':').map(Number);
    if (isNaN(h) || isNaN(m)) return null;
    return h * 60 + m;
  }
  return null;
}

/**
 * Synchronizes timeslot pills and custom time picker boundaries with cafe opening hours
 * for the currently chosen reservation date.
 */
function updateOpeningHoursRules() {
  const dateStr = resDateInput ? resDateInput.value : '';
  const hours = getCafeHours(dateStr);

  // Update header notes & drawer badge
  const hoursNote = document.getElementById('timeslot-hours-note');
  if (hoursNote) {
    hoursNote.textContent = `${hours.dayName}: ${hours.openFormatted} – ${hours.closeFormatted}`;
  }

  const customHoursBadge = document.getElementById('custom-time-hours-badge');
  if (customHoursBadge) {
    customHoursBadge.innerHTML = `<strong>${hours.dayName} Hours:</strong> ${hours.openFormatted} – ${hours.closeFormatted}`;
  }

  // Enforce min & max attributes on custom time input
  if (resCustomTimeInput) {
    resCustomTimeInput.min = hours.openTime;
    resCustomTimeInput.max = hours.closeTime;

    const currentMins = timeStringToMinutes(resCustomTimeInput.value);
    if (currentMins === null || currentMins < hours.openMinutes || currentMins > hours.closeMinutes) {
      // Auto-set to a valid time within open hours
      const defaultTime = hours.isWeekend ? '10:00' : '19:30';
      resCustomTimeInput.value = defaultTime;
      customSelectedTime = formatTime12h(defaultTime);
      if (customTimeStatus) {
        customTimeStatus.innerHTML = `Reserved for: <strong>${customSelectedTime}</strong>`;
      }
      if (customPillLabel && customTimePill && customTimePill.classList.contains('is-active')) {
        customPillLabel.textContent = customSelectedTime;
        selectedTimeSlot = customSelectedTime;
      }
    }
  }

  // Filter & disable pills outside of operating hours
  let activePillIsInvalid = false;
  timeslotPills.forEach((pill) => {
    const timeVal = pill.getAttribute('data-time');
    if (timeVal === 'custom') return;

    const mins = timeStringToMinutes(timeVal);
    if (mins !== null && (mins < hours.openMinutes || mins > hours.closeMinutes)) {
      pill.disabled = true;
      pill.classList.add('is-closed-slot');
      const small = pill.querySelector('small');
      if (small && !small.dataset.origText) {
        small.dataset.origText = small.textContent;
      }
      if (small) small.textContent = 'Closed';
      pill.title = `Closed at this time on ${hours.dayName}s (Open: ${hours.openFormatted} – ${hours.closeFormatted})`;
      if (pill.classList.contains('is-active')) {
        pill.classList.remove('is-active');
        activePillIsInvalid = true;
      }
    } else {
      pill.disabled = false;
      pill.classList.remove('is-closed-slot');
      const small = pill.querySelector('small');
      if (small && small.dataset.origText) {
        small.textContent = small.dataset.origText;
      }
      pill.removeAttribute('title');
    }
  });

  // If the active pill was invalidated, pick the first valid pill
  if (activePillIsInvalid) {
    const firstValid = Array.from(timeslotPills).find((p) => !p.disabled && p.getAttribute('data-time') !== 'custom');
    if (firstValid) {
      firstValid.classList.add('is-active');
      selectedTimeSlot = firstValid.getAttribute('data-time') || '10:00 AM';
    } else if (customTimePill) {
      customTimePill.classList.add('is-active');
      if (customTimePickerRow) customTimePickerRow.classList.remove('is-hidden');
      selectedTimeSlot = customSelectedTime;
    }
  }
}

/**
 * Validates and blocks any custom time outside Blue Bell Cafe's opening hours.
 * If enforceClamp is true, strictly snaps the value to the nearest open hour.
 */
function validateAndSanitizeCustomTime(enforceClamp = false) {
  if (!resCustomTimeInput) return true;
  const dateStr = resDateInput ? resDateInput.value : '';
  const hours = getCafeHours(dateStr);
  const currentVal = resCustomTimeInput.value;
  const currentMins = timeStringToMinutes(currentVal);
  const alertEl = document.getElementById('custom-time-alert');

  if (currentMins === null) return false;

  if (currentMins < hours.openMinutes || currentMins > hours.closeMinutes) {
    // Outside allowable hours!
    resCustomTimeInput.classList.add('is-invalid-time');
    if (alertEl) {
      alertEl.classList.remove('is-hidden');
      alertEl.innerHTML = `⚠️ Closed at ${formatTime12h(currentVal)}. Open <strong>${hours.openFormatted} – ${hours.closeFormatted}</strong> on ${hours.dayName}s.`;
    }
    if (customTimeStatus) {
      customTimeStatus.innerHTML = `<span style="color: #D42E46; font-weight: 700;">⛔ Outside Cafe Hours (${hours.openFormatted} – ${hours.closeFormatted})</span>`;
    }
    if (puddingSpeechText) {
      puddingSpeechText.innerHTML = `Blue Bell Café is only open <strong>${hours.openFormatted} – ${hours.closeFormatted}</strong> on ${hours.dayName}s! Let's choose a time while we're open. ☕`;
    }

    if (enforceClamp) {
      // Strictly clamp to valid boundary
      if (currentMins < hours.openMinutes) {
        resCustomTimeInput.value = hours.openTime;
      } else {
        resCustomTimeInput.value = hours.closeTime;
      }
      resCustomTimeInput.classList.remove('is-invalid-time');
      if (alertEl) alertEl.classList.add('is-hidden');
      customSelectedTime = formatTime12h(resCustomTimeInput.value);
      selectedTimeSlot = customSelectedTime;
      if (customTimeStatus) customTimeStatus.innerHTML = `Reserved for: <strong>${customSelectedTime}</strong>`;
      if (customPillLabel) customPillLabel.textContent = customSelectedTime;
      if (customPillSub) customPillSub.textContent = 'Custom ⏰';
    }
    return false;
  } else {
    // Valid time within open hours
    resCustomTimeInput.classList.remove('is-invalid-time');
    if (alertEl) alertEl.classList.add('is-hidden');
    customSelectedTime = formatTime12h(currentVal);
    selectedTimeSlot = customSelectedTime;
    if (customTimeStatus) customTimeStatus.innerHTML = `Reserved for: <strong>${customSelectedTime}</strong>`;
    if (customPillLabel) customPillLabel.textContent = customSelectedTime;
    if (customPillSub) customPillSub.textContent = 'Custom ⏰';
    return true;
  }
}

/**
 * Initializes the date input with today's date as minimum and default value,
 * and sets up dynamic opening hours listeners.
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

  resDateInput.addEventListener('change', () => {
    updateOpeningHoursRules();
    validateAndSanitizeCustomTime(true);
  });
  resDateInput.addEventListener('input', () => {
    updateOpeningHoursRules();
    validateAndSanitizeCustomTime(true);
  });

  updateOpeningHoursRules();
}
initializeDateInput();

/**
 * Enforces phone input: accepts digits with optional leading '+', rejecting letters, spaces, and other characters.
 */
function enforceNumericPhoneInput() {
  const phoneInput = document.getElementById('res-phone');
  if (!phoneInput) return;

  // Real-time input cleaner: retain leading '+' if present, and remove all non-digits
  phoneInput.addEventListener('input', () => {
    const val = phoneInput.value;
    const hasLeadingPlus = val.startsWith('+');
    const digits = val.replace(/\D/g, '');
    phoneInput.value = hasLeadingPlus ? ('+' + digits) : digits;
  });

  // Block forbidden keys on keydown directly
  phoneInput.addEventListener('keydown', (e) => {
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
    if (allowedKeys.includes(e.key)) return;
    if (e.ctrlKey || e.metaKey) return;

    // Allow '+' only at index 0 and if not already present
    if (e.key === '+') {
      const pos = phoneInput.selectionStart || 0;
      if (pos === 0 && !phoneInput.value.includes('+')) {
        return; // Valid leading plus
      }
      e.preventDefault();
      return;
    }

    // Allow numbers 0-9
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  });

  // Sanitize on paste: support optional leading '+'
  phoneInput.addEventListener('paste', (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData('text') || '';
    const trimmed = pasted.trim();
    const hasLeadingPlus = trimmed.startsWith('+');
    const digits = trimmed.replace(/\D/g, '');
    const cleanPasted = hasLeadingPlus ? ('+' + digits) : digits;

    const start = phoneInput.selectionStart || 0;
    const end = phoneInput.selectionEnd || 0;
    const current = phoneInput.value;

    let combined = current.slice(0, start) + cleanPasted + current.slice(end);
    const startsWithPlus = combined.startsWith('+');
    const allDigits = combined.replace(/\D/g, '');
    phoneInput.value = startsWithPlus ? ('+' + allDigits) : allDigits;
  });
}
enforceNumericPhoneInput();

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
 * Saves modified tasting tray back to localStorage.
 * @param {Array} items
 */
function saveTastingTray(items) {
  try {
    if (!items || items.length === 0) {
      localStorage.removeItem('bbc_tasting_tray');
      return;
    }
    const totalCount = items.reduce((sum, it) => sum + (Number(it.quantity) || 1), 0);
    const totalPrice = items.reduce((sum, it) => sum + ((Number(it.price) || 0) * (Number(it.quantity) || 1)), 0);
    const trayData = {
      items: items,
      totalCount: totalCount,
      totalPrice: totalPrice
    };
    localStorage.setItem('bbc_tasting_tray', JSON.stringify(trayData));
  } catch (err) {
    console.warn('[BlueBell] Unable to update tasting tray persistence:', err);
  }
}

/**
 * Populates Mr. Pudding's pre-order ledger with selected tray items
 * and provides interactive quantity adjustment and item removal.
 */
function populateTastingTrayLedger() {
  const trayItemsContainer = document.getElementById('portal-tray-items');
  const trayTotalEl = document.getElementById('portal-tray-total');
  const clearAllBtn = document.getElementById('tray-clear-all-btn');
  if (!trayItemsContainer || !trayTotalEl) return;

  const savedTray = getSavedTastingTray();
  if (savedTray && savedTray.items && savedTray.items.length > 0) {
    if (clearAllBtn) {
      if (resPortal && resPortal.classList.contains('is-confirmed')) {
        clearAllBtn.classList.add('is-hidden');
      } else {
        clearAllBtn.classList.remove('is-hidden');
        clearAllBtn.onclick = () => {
          saveTastingTray([]);
          populateTastingTrayLedger();
        };
      }
    }

    const isConfirmed = Boolean(resPortal && resPortal.classList.contains('is-confirmed'));

    let html = '';
    savedTray.items.forEach((item, index) => {
      const itemKey = item.id || `item_${index}`;
      const qty = Number(item.quantity) || 1;
      const unitPrice = Number(item.price) || 0;
      const rowTotal = unitPrice * qty;

      html += `
        <div class="tray-preitem" data-key="${itemKey}">
          <div class="preitem-info">
            <span class="preitem-title" title="${item.name}">☕ ${item.name}</span>
          </div>
          <div class="preitem-actions">
            <div class="preitem-stepper" role="group" aria-label="Quantity for ${item.name}">
              <button type="button" class="preitem-btn btn-minus" data-key="${itemKey}" title="Decrease quantity" aria-label="Decrease quantity">−</button>
              <span class="preitem-qty-val">${isConfirmed ? `×${qty}` : qty}</span>
              <button type="button" class="preitem-btn btn-plus" data-key="${itemKey}" title="Increase quantity" aria-label="Increase quantity">+</button>
            </div>
            <span class="preitem-price">৳ ${rowTotal.toLocaleString()}</span>
            <button type="button" class="preitem-remove-btn" data-key="${itemKey}" title="Remove ${item.name}" aria-label="Remove item">✕</button>
          </div>
        </div>
      `;
    });
    trayItemsContainer.innerHTML = html;
    trayTotalEl.textContent = `৳ ${savedTray.totalPrice.toLocaleString()}`;

    // Wire click events for plus, minus, and remove buttons
    wireTrayLedgerControls(savedTray.items);

    if (!isConfirmed && puddingSpeechText) {
      puddingSpeechText.innerHTML = `Ah, magnificent taste! I have noted your <strong>${savedTray.totalCount} selected ${savedTray.totalCount === 1 ? 'delicacy' : 'delicacies'}</strong> on my ledger. I'll personally instruct our barista to pre-warm your cups!`;
    }
  } else {
    if (clearAllBtn) clearAllBtn.classList.add('is-hidden');
    trayItemsContainer.innerHTML = '<div class="tray-empty-hint">No pre-order yet — you can order fresh table-side!</div>';
    trayTotalEl.textContent = '৳ 0';

    if (!Boolean(resPortal && resPortal.classList.contains('is-confirmed')) && puddingSpeechText) {
      puddingSpeechText.innerHTML = `Welcome, dear coffee lover! I am <strong>Mr. Pudding</strong>, your head host. Allow me to prepare our coziest candlelit nook for your visit!`;
    }
  }
}

/**
 * Attaches event listeners for quantity changes and item removal in the ledger.
 * @param {Array} items - The current list of items in the tasting tray
 */
function wireTrayLedgerControls(items) {
  const trayItemsContainer = document.getElementById('portal-tray-items');
  if (!trayItemsContainer) return;
  if (resPortal && resPortal.classList.contains('is-confirmed')) return;

  // Plus button: increase item quantity
  trayItemsContainer.querySelectorAll('.btn-plus').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const key = btn.getAttribute('data-key');
      const item = items.find((it, idx) => (it.id || `item_${idx}`) === key);
      if (item) {
        item.quantity = (Number(item.quantity) || 1) + 1;
        saveTastingTray(items);
        populateTastingTrayLedger();
      }
    });
  });

  // Minus button: decrease item quantity or remove if at 1
  trayItemsContainer.querySelectorAll('.btn-minus').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const key = btn.getAttribute('data-key');
      const index = items.findIndex((it, idx) => (it.id || `item_${idx}`) === key);
      if (index !== -1) {
        if (Number(items[index].quantity) > 1) {
          items[index].quantity = Number(items[index].quantity) - 1;
        } else {
          items.splice(index, 1);
        }
        saveTastingTray(items);
        populateTastingTrayLedger();
      }
    });
  });

  // Remove button: instantly delete the item
  trayItemsContainer.querySelectorAll('.preitem-remove-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const key = btn.getAttribute('data-key');
      const index = items.findIndex((it, idx) => (it.id || `item_${idx}`) === key);
      if (index !== -1) {
        items.splice(index, 1);
        saveTastingTray(items);
        populateTastingTrayLedger();
      }
    });
  });
}

/**
 * Attaches interactive click event handlers to Chef's Table Signatures quick-order cards.
 */
function wireQuickAddFavorites() {
  const addButtons = document.querySelectorAll('.fav-add-btn');
  addButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (resPortal && resPortal.classList.contains('is-confirmed')) return;

      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      const price = Number(btn.getAttribute('data-price')) || 0;

      let savedTray = getSavedTastingTray();
      let items = savedTray && savedTray.items ? [...savedTray.items] : [];
      const existing = items.find((it, idx) => (it.id || `item_${idx}`) === id);

      if (existing) {
        existing.quantity = (Number(existing.quantity) || 1) + 1;
      } else {
        items.push({ id, name, price, quantity: 1 });
      }

      saveTastingTray(items);
      populateTastingTrayLedger();

      // Tactile button reaction: "✓ Added"
      const originalHTML = btn.innerHTML;
      btn.classList.add('is-added');
      btn.innerHTML = '<span class="fav-add-icon">✓</span><span>Added</span>';
      setTimeout(() => {
        btn.classList.remove('is-added');
        btn.innerHTML = originalHTML;
      }, 1400);

      // Mr. Pudding reactive purr, particle burst & speech
      if (typeof spawnPuddingSparkles === 'function') {
        spawnPuddingSparkles();
      }

      if (puddingCharacter) {
        puddingCharacter.classList.add('is-purring');
        setTimeout(() => puddingCharacter.classList.remove('is-purring'), 850);
      }

      if (puddingSpeechText) {
        puddingSpeechText.innerHTML = `Purrfect choice! I've placed <strong>${name}</strong> on your table order ledger. 🐾`;
      }
    });
  });
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
    if (pill.disabled || pill.classList.contains('is-closed-slot')) return;

    timeslotPills.forEach((p) => p.classList.remove('is-active'));
    pill.classList.add('is-active');

    const dataTime = pill.getAttribute('data-time');
    if (dataTime === 'custom') {
      if (customTimePickerRow) customTimePickerRow.classList.remove('is-hidden');
      if (resCustomTimeInput) {
        validateAndSanitizeCustomTime(true);
        if (customPillSub) customPillSub.textContent = 'Custom ⏰';
      }
    } else {
      if (customTimePickerRow) customTimePickerRow.classList.add('is-hidden');
      selectedTimeSlot = dataTime || '7:30 PM';
      if (customPillLabel) customPillLabel.textContent = 'Custom ⏰';
      if (customPillSub) customPillSub.textContent = 'Pick Time';
    }
  });
});

if (resCustomTimeInput) {
  resCustomTimeInput.addEventListener('input', () => {
    validateAndSanitizeCustomTime(false);
    // Highlight custom pill
    timeslotPills.forEach((p) => p.classList.remove('is-active'));
    if (customTimePill) customTimePill.classList.add('is-active');
  });

  resCustomTimeInput.addEventListener('change', () => {
    validateAndSanitizeCustomTime(true);
    timeslotPills.forEach((p) => p.classList.remove('is-active'));
    if (customTimePill) customTimePill.classList.add('is-active');
  });

  resCustomTimeInput.addEventListener('blur', () => {
    validateAndSanitizeCustomTime(true);
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

    const phoneInput = document.getElementById('res-phone');
    const rawPhone = phoneInput ? phoneInput.value.trim() : '';
    const digitsOnly = rawPhone.replace(/\D/g, '');
    if (!rawPhone || digitsOnly.length < 6 || !/^\+?[0-9]{6,16}$/.test(rawPhone)) {
      if (puddingSpeechText) {
        puddingSpeechText.innerHTML = `Please provide a valid <strong>phone number</strong> (numbers with optional leading +) so we can text your table confirmation! 📱`;
      }
      if (phoneInput) {
        phoneInput.focus();
        phoneInput.style.borderColor = '#D42E46';
        phoneInput.style.boxShadow = '0 0 12px rgba(212, 46, 70, 0.35)';
        setTimeout(() => {
          phoneInput.style.borderColor = '';
          phoneInput.style.boxShadow = '';
        }, 1800);
      }
      return;
    }

    // Verify arrival time is within cafe operating hours for the selected date
    const hours = getCafeHours(resDateInput ? resDateInput.value : '');
    const chosenMins = timeStringToMinutes(selectedTimeSlot);
    if (chosenMins === null || chosenMins < hours.openMinutes || chosenMins > hours.closeMinutes) {
      if (puddingSpeechText) {
        puddingSpeechText.innerHTML = `Blue Bell Café is only open <strong>${hours.openFormatted} – ${hours.closeFormatted}</strong> on ${hours.dayName}s! Please adjust your arrival time. ⏰`;
      }
      if (customTimePickerRow) customTimePickerRow.classList.remove('is-hidden');
      if (resCustomTimeInput) {
        resCustomTimeInput.focus();
        validateAndSanitizeCustomTime(true);
      }
      return;
    }

    // Check pre-ordered food in tasting tray before resetting
    const savedTray = getSavedTastingTray();
    const hasFood = Boolean(savedTray && savedTray.items && savedTray.items.length > 0 && savedTray.totalCount > 0);
    const foodCount = hasFood ? savedTray.totalCount : 0;
    const foodTotal = hasFood ? savedTray.totalPrice : 0;

    isBookingConfirmed = true;

    // Switch view to confirmation celebration
    if (portalFormView) portalFormView.classList.add('is-hidden');
    if (portalTicketView) {
      portalTicketView.classList.remove('is-hidden');
      portalTicketView.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Lock left bar in confirmed mode so guest cannot add or remove items/quantities
    if (resPortal) {
      resPortal.classList.add('is-confirmed');
    }

    // Keep the order visible in the ledger on this confirmation page
    populateTastingTrayLedger();

    // Trigger logo stamp animation
    const brandStampEl = document.getElementById('brand-stamp') || document.getElementById('paw-stamp');
    if (brandStampEl) {
      brandStampEl.style.animation = 'none';
      requestAnimationFrame(() => {
        brandStampEl.style.animation = 'brandStampDrop 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      });
    }

    const ticketTitle = document.getElementById('ticket-congrats-title');
    const ticketCongratsSub = document.getElementById('ticket-congrats-sub');
    const ticketFoodBadge = document.getElementById('ticket-food-badge');

    if (hasFood) {
      // Customer chose food during reservation -> Table reserved + total number of ordered food
      const itemNoun = foodCount === 1 ? 'Food Item' : 'Food Items';
      if (ticketTitle) {
        ticketTitle.textContent = `Table & ${foodCount} ${itemNoun} Reserved!`;
      }
      if (ticketCongratsSub) {
        ticketCongratsSub.textContent = `Mr. Pudding has reserved your ${selectedTable} for ${selectedTimeSlot} on ${dateVal}, along with your pre-order of ${foodCount} ${itemNoun.toLowerCase()} (Total: ৳${foodTotal.toLocaleString()}).`;
      }
      if (ticketFoodBadge) {
        ticketFoodBadge.className = 'ticket-food-badge has-food';
        ticketFoodBadge.innerHTML = `<span class="badge-icon">🍽️</span><span><strong>${foodCount} ${itemNoun} Pre-Ordered</strong> • Pre-order Total: <strong>৳ ${foodTotal.toLocaleString()}</strong></span>`;
      }
      if (puddingSpeechText) {
        puddingSpeechText.innerHTML = `Congratulations, <strong>${guestName}</strong>! Your table at the <strong>${selectedTable}</strong> is officially reserved for <strong>${selectedTimeSlot}</strong> along with your <strong>${foodCount} pre-ordered ${foodCount === 1 ? 'delicacy' : 'delicacies'}</strong>. We eagerly await your arrival at Blue Bell Café!`;
      }
    } else {
      // No food ordered during reservation -> Show only table booked
      if (ticketTitle) {
        ticketTitle.textContent = 'Table Booked!';
      }
      if (ticketCongratsSub) {
        ticketCongratsSub.textContent = `Mr. Pudding has reserved your ${selectedTable} for ${selectedTimeSlot} on ${dateVal} and notified the baristas.`;
      }
      if (ticketFoodBadge) {
        ticketFoodBadge.className = 'ticket-food-badge no-food';
        ticketFoodBadge.innerHTML = `<span class="badge-icon">🛎️</span><span><strong>Table Only Booked</strong> • Fresh table-side ordering available upon arrival</span>`;
      }
      if (puddingSpeechText) {
        puddingSpeechText.innerHTML = `Congratulations, <strong>${guestName}</strong>! Your table at the <strong>${selectedTable}</strong> is officially booked for <strong>${selectedTimeSlot}</strong>. We eagerly await your arrival at Blue Bell Café!`;
      }
    }
  });
}


/* ------------------------------------------------------------------------------
   10. NAVIGATION & LIFECYCLE MANAGEMENT
   ------------------------------------------------------------------------------ */

/**
 * Smoothly transitions back to the main coffee sanctuary with a crossfade veil.
 * Resets the tasting tray if booking was confirmed.
 * @param {string} [targetUrl='index.html'] - Destination URL
 */
function returnToCafeHome(targetUrl = '../index.html') {
  try {
    if (isBookingConfirmed) {
      localStorage.removeItem('bbc_tasting_tray');
    }
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

// Reset tray if navigating away after booking confirmation (Back button, refresh, or tab switch)
window.addEventListener('beforeunload', () => {
  if (isBookingConfirmed) {
    try {
      localStorage.removeItem('bbc_tasting_tray');
    } catch (e) {}
  }
});

window.addEventListener('pagehide', () => {
  if (isBookingConfirmed) {
    try {
      localStorage.removeItem('bbc_tasting_tray');
    } catch (e) {}
  }
});

window.addEventListener('popstate', () => {
  if (isBookingConfirmed) {
    try {
      localStorage.removeItem('bbc_tasting_tray');
    } catch (e) {}
  }
});

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
    const dest = link.getAttribute('href') || '../index.html';
    returnToCafeHome(dest);
  }
});

// Explicit close button trigger
if (portalCloseBtn) {
  portalCloseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (isBookingConfirmed) {
      try {
        localStorage.removeItem('bbc_tasting_tray');
      } catch (err) {}
    }
    returnToCafeHome('../index.html');
  });
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (isBookingConfirmed) {
      try {
        localStorage.removeItem('bbc_tasting_tray');
      } catch (err) {}
    }
    returnToCafeHome('../index.html');
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
    returnToCafeHome('../index.html');
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
  resPortal.classList.remove('is-confirmed');

  if (!selectedTable) {
    updatePortalTheme('theme-default');
    resPortal.classList.remove('has-setting-selected', 'setting-window', 'setting-candlelit', 'setting-barista', 'setting-glasshouse');
  }

  populateTastingTrayLedger();
  wireQuickAddFavorites();
  resPortal.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', openReservationPortal);
} else {
  openReservationPortal();
}
