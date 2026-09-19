/* --------------------------------------------------------------------------
   4. MR. BARNABY'S INTERACTIVE RESERVATION PARLOUR
   Controls:
   - Full-screen dining room stage opening & closing
   - Tasting Tray pre-order auto-population
   - Mr. Barnaby's dynamic speech bubble & purring reactions
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

  // Maintain selected theme or activate default light aesthetic theme
  if (!selectedTable) {
    updatePortalTheme('theme-default');
  }

  // Populate Tasting Tray order items into Barnaby's Ledger
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
        barnabySpeechText.innerHTML = `Ah, magnificent taste! ♡ I have noted your <strong>${savedTray.totalCount} selected delicacies</strong> on my ledger. I'll personally instruct our barista to pre-warm your cups!`;
      }
    } else {
      trayItemsContainer.innerHTML = '<div class="tray-empty-hint">No pre-order yet — you can order fresh table-side!</div>';
      trayTotalEl.textContent = '৳ 0';

      if (barnabySpeechText) {
        barnabySpeechText.innerHTML = `Hello, dear coffee lover! ♡ I am <strong>Mr. Barnaby</strong>, your head host. Allow me to prepare our coziest candlelit nook for your visit!`;
      }
    }
  }

  // Open the portal with animation
  resPortal.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
}

function returnToCafeHome() {
  window.location.href = 'index.html';
}

// Wire Close / Return Triggers
if (portalCloseBtn) {
  portalCloseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    returnToCafeHome();
  });
}
if (portalBackdrop) {
  portalBackdrop.addEventListener('click', () => {
    returnToCafeHome();
  });
}
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    returnToCafeHome();
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
      const savedTray = getSavedTastingTray();
      if (savedTray && savedTray.items && savedTray.items.length > 0) {
        const itemNames = savedTray.items.map((item) => `${item.quantity}x ${item.name}`);
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
      barnabySpeechText.innerHTML = `Congratulations, <strong>${guestName}</strong>! ♡ Your reservation is officially sealed with my <strong>Paw of Approval</strong>. We eagerly await your arrival at Blue Bell Café!`;
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
    try {
      localStorage.removeItem('bbc_tasting_tray');
    } catch (e) {}
    window.location.href = 'index.html';
  });
}

// Auto-initialize the reservation parlour on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', openReservationPortal);
} else {
  openReservationPortal();
}

