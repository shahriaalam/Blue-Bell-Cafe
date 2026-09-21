/* --------------------------------------------------------------------------
   4. MR. PUDDING'S INTERACTIVE RESERVATION PARLOUR
   Controls:
   - Full-screen dining room stage opening & closing
   - Tasting Tray pre-order auto-population
   - Mr. Pudding's dynamic speech bubble & purring reactions
   - Interactive table selection & time slot picking
   - Paw of Approval wax seal confirmation
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
let selectedOccasion = 'Date Night';
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

// Helper to load Tasting Tray items saved from index.html via localStorage
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
    console.warn('Could not read saved tasting tray from localStorage:', err);
    return null;
  }
}

// Function to open the reservation portal
function openReservationPortal() {
  if (!resPortal) return;

  // Reset to form view
  if (portalFormView) portalFormView.classList.remove('is-hidden');
  if (portalTicketView) portalTicketView.classList.add('is-hidden');
  if (customTimePickerRow) customTimePickerRow.classList.add('is-hidden');

  // Maintain selected theme or activate default light aesthetic theme
  if (!selectedTable) {
    updatePortalTheme('theme-default');
    if (resPortal) {
      resPortal.classList.remove('has-setting-selected', 'setting-window', 'setting-candlelit', 'setting-barista', 'setting-glasshouse');
    }
  }

  // Populate Tasting Tray order items into Mr. Pudding's Ledger
  const trayItemsContainer = document.getElementById('portal-tray-items');
  const trayTotalEl = document.getElementById('portal-tray-total');

  if (trayItemsContainer && trayTotalEl) {
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

      if (barnabySpeechText) {
        barnabySpeechText.innerHTML = `Ah, magnificent taste! I have noted your <strong>${savedTray.totalCount} selected delicacies</strong> on my ledger. I'll personally instruct our barista to pre-warm your cups!`;
      }
    } else {
      trayItemsContainer.innerHTML = '<div class="tray-empty-hint">No pre-order yet — you can order fresh table-side!</div>';
      trayTotalEl.textContent = '৳ 0';

      if (barnabySpeechText) {
        barnabySpeechText.innerHTML = `Welcome, dear coffee lover! I am <strong>Mr. Pudding</strong>, your head host. Allow me to prepare our coziest candlelit nook for your visit!`;
      }
    }
  }

  // Open the portal with animation
  resPortal.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
}

function returnToCafeHome(targetUrl = 'index.html') {
  try {
    sessionStorage.setItem('bbc_return_to_top', 'true');
  } catch (e) { }
  const veil = document.getElementById('page-transition-veil');
  if (veil) {
    veil.classList.add('is-active');
  }
  setTimeout(() => {
    window.location.href = targetUrl;
  }, 25);
}

// Fade out transition veil once parlour is mounted
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

// Smooth intercept for all return links
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href*="index.html"]');
  if (link && !link.target && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
    e.preventDefault();
    const dest = link.getAttribute('href') || 'index.html';
    returnToCafeHome(dest);
  }
});

// Wire Close / Return Triggers (explicit close button only, not outer backdrop)
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

// Interactive Mr. Pudding 3D Doll Activities & Purring
let puddingActivityIndex = 0;
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

function spawnPuddingSparkle() {
  if (!barnabyCharacter) return;
  const emojis = ['🐾', '☕', '✨', '💛', '🌟', '🥐'];
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const p = document.createElement('span');
      p.className = 'pudding-click-particle';
      p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      const offsetX = (Math.random() - 0.5) * 80;
      p.style.left = `calc(50% + ${offsetX}px)`;
      p.style.bottom = '110px';
      barnabyCharacter.appendChild(p);
      setTimeout(() => p.remove(), 1200);
    }, i * 140);
  }
}

function triggerBarnabyPurr() {
  if (!barnabyCharacter) return;

  const current = puddingActivities[puddingActivityIndex % puddingActivities.length];
  puddingActivityIndex++;

  barnabyCharacter.classList.add('is-purring');
  if (current.isServing) {
    barnabyCharacter.classList.add('is-serving');
  }

  if (barnabySpeechText) {
    barnabySpeechText.innerHTML = current.msg;
  }
  if (purrHearts) {
    purrHearts.textContent = current.badge;
  }

  spawnPuddingSparkle();

  setTimeout(() => {
    barnabyCharacter.classList.remove('is-purring');
    barnabyCharacter.classList.remove('is-serving');
    if (purrHearts) purrHearts.textContent = '';
  }, 2800);
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
    if (resPortal && tableId) {
      resPortal.classList.add('has-setting-selected');
      resPortal.classList.remove('setting-window', 'setting-candlelit', 'setting-barista', 'setting-glasshouse');
      resPortal.classList.add(`setting-${tableId}`);
    }

    if (tableId === 'window') {
      updatePortalTheme('theme-rainy');
      if (barnabySpeechText) {
        barnabySpeechText.innerHTML = `Ah, the <strong>Rainy Window Alcove</strong>! Watching raindrops trickling on the glass with hot single-origin pour-over... pure romance!`;
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

// Timeslot Pills & Custom Time Selection
const timeslotPills = document.querySelectorAll('.timeslot-pill');
const customTimePill = document.getElementById('custom-time-pill');
const customTimePickerRow = document.getElementById('custom-time-picker-row');
const resCustomTimeInput = document.getElementById('res-custom-time');
const customTimeStatus = document.getElementById('custom-time-status');
const customPillLabel = document.getElementById('custom-pill-label');
const customPillSub = document.getElementById('custom-pill-sub');

let customSelectedTime = '7:00 PM';

function formatTime12h(time24) {
  if (!time24) return '7:00 PM';
  const parts = time24.split(':');
  let h = parseInt(parts[0], 10);
  const m = parts[1] || '00';
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}

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

    // Ensure custom pill is selected
    timeslotPills.forEach((p) => p.classList.remove('is-active'));
    if (customTimePill) customTimePill.classList.add('is-active');
  });
}

// Guest Stepper
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

// Occasion Tags selection
const occasionTags = document.querySelectorAll('.occasion-tag');
occasionTags.forEach((tag) => {
  tag.addEventListener('click', () => {
    occasionTags.forEach((t) => t.classList.remove('is-active'));
    tag.classList.add('is-active');
    selectedOccasion = tag.getAttribute('data-occasion') || 'Date Night';
  });
});

// Form Submission & Paw of Approval Ticket Generation
if (resForm) {
  resForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!selectedTable) {
      if (barnabySpeechText) {
        barnabySpeechText.innerHTML = `Please choose your preferred <strong>Dream Setting</strong> above so I can prepare the ideal nook for you!`;
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

    // Dynamic subtitle tailored to the guest's selected table setting and chosen time
    const ticketCongratsSub = document.querySelector('.ticket-congrats-sub');
    if (ticketCongratsSub && selectedTable) {
      ticketCongratsSub.textContent = `Mr. Pudding has reserved your ${selectedTable} for ${selectedTimeSlot} on ${dateVal} and notified the baristas.`;
    }

    // Mr. Pudding's congratulations speech
    if (barnabySpeechText) {
      barnabySpeechText.innerHTML = `Congratulations, <strong>${guestName}</strong>! Your table at the <strong>${selectedTable}</strong> is officially reserved for <strong>${selectedTimeSlot}</strong> with my <strong>Paw of Approval</strong>. We eagerly await your arrival at Blue Bell Café!`;
    }
  });
}

// Done Action Button: Clear Tray & Return to Home / 1st portion of Cafe Experience
const ticketDoneBtn = document.getElementById('ticket-done-btn');
if (ticketDoneBtn) {
  ticketDoneBtn.addEventListener('click', () => {
    try {
      localStorage.removeItem('bbc_tasting_tray');
      sessionStorage.setItem('bbc_return_to_top', 'true');
    } catch (e) { }
    returnToCafeHome('index.html');
  });
}

// Auto-initialize the reservation parlour on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', openReservationPortal);
} else {
  openReservationPortal();
}

