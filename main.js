/**
 * BLUE BELL CAFÉ — MAIN CLIENT ORCHESTRATOR (main.js)
 * Seamlessly mounts modular story & menu sub-files into index.html
 */
'use strict';

(function() {


  // 2. Smooth navigation & Hash scrolling for #cafe-menu
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

  // 3. Page Transition Veil Crossfading
  function smoothNavigateTo(url) {
    const veil = document.getElementById('page-transition-veil');
    if (veil) {
      veil.classList.add('is-active');
    }
    setTimeout(() => {
      window.location.href = url;
    }, 25);
  }

  document.addEventListener('click', (e) => {
    const link = e.target.closest && e.target.closest('a[href*="reservation"]');
    if (link && !link.target && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      if (window.tastingTray && typeof window.tastingTray.saveToStorage === 'function') {
        window.tastingTray.saveToStorage();
      }
      smoothNavigateTo(link.getAttribute('href') || 'reservation/reservation.html');
    }
  });

  window.addEventListener('pageshow', () => {
    const veil = document.getElementById('page-transition-veil');
    if (veil) {
      veil.classList.remove('is-active');
    }
  });
})();
