/**
 * BLUE BELL CAFÉ — STORY CONTROLLER (story/story.js)
 * 8-Act Cinematic Scroll-Scrubbed Journey
 */
'use strict';

function initStoryEngine() {
  const worldContainer = document.getElementById('world');
  if (!worldContainer) return;

  const inSubfolder = window.location.pathname.includes('/story/') || window.location.pathname.includes('/menu/') || window.location.pathname.includes('/reservation/');
  const resolvePath = (p) => (inSubfolder ? `../${p}` : p);

  mountLetsScroll(worldContainer, {
    brand: {
      name: 'Blue Bell Café',
      logo: resolvePath('assets/Logo and falcon/logo.png'),
      logoOnly: true,
      href: resolvePath('#top')
    },

    cta: {
      label: 'Reserve a Table',
      href: resolvePath('reservation/reservation.html')
    },

    hint: 'scroll to explore',
    diveScroll: 2.2,
    crossfade: 0.52,
    connScroll: 0.85,
    atmosphere: true,

    sections: [
      {
        id: 'selection',
        label: 'I. Selection',
        still: resolvePath('assets/stills/01_selection.png'),
        clip: resolvePath('assets/vid/01_selection.mp4'),
        scroll: 2.2,
        linger: 0.22,
        accent: '#A45D3B',
        eyebrow: 'Act I — Pure Origin',
        title: 'The Bean Selection',
        body: 'Behind the sunlit oak counter, our barista handpicks glistening, dark-roasted Arabica beans, awakening delicate notes of dark chocolate and hazelnut.',
        tags: ['Single Origin', 'Sun-Kissed Roast', 'Handpicked']
      },
      {
        id: 'dosing',
        label: 'II. Dosing',
        still: resolvePath('assets/stills/02_dosing.png'),
        clip: resolvePath('assets/vid/02_dosing.mp4'),
        scroll: 1.8,
        linger: 0.22,
        accent: '#B57C48',
        eyebrow: 'Act II — Golden Precision',
        title: 'Weighed to Perfection',
        body: 'Every single gram matters. The roasted beans are weighed on a vintage brass scale before entering the gleaming glass hopper.',
        tags: ['Precision Scale', 'Artisanal Ratio', 'Brass Details']
      },
      {
        id: 'grinding',
        label: 'III. Grinding',
        still: resolvePath('assets/stills/03_grinding.png'),
        clip: resolvePath('assets/vid/03_grinding.mp4'),
        scroll: 1.9,
        linger: 0.22,
        accent: '#8C5230',
        eyebrow: 'Act III — Awakening the Aroma',
        title: 'The Artisanal Grind',
        body: 'The heavy brass burr grinder pulverizes each bean into a velvety, aromatic powder, releasing a cloud of cocoa aroma that fills the room.',
        tags: ['Burr Grinder', 'Fine Particle Distribution', 'Aromatic Bloom']
      },
      {
        id: 'tamping',
        label: 'IV. Tamping',
        still: resolvePath('assets/stills/04_tamping.png'),
        clip: resolvePath('assets/vid/04_tamping.mp4'),
        scroll: 1.7,
        linger: 0.22,
        accent: '#7A3F20',
        eyebrow: 'Act IV — The Compression',
        title: 'Polished & Levelled',
        body: 'With steady hands and sixty pounds of calibrated pressure, the coffee bed is tamped perfectly flat, ready for high-pressure extraction.',
        tags: ['Calibrated Tamp', 'Mirror Polish', 'Zero Channeling']
      },
      {
        id: 'extraction',
        label: 'V. Extraction',
        still: resolvePath('assets/stills/05_extraction.png'),
        clip: resolvePath('assets/vid/05_extraction.mp4'),
        scroll: 2.1,
        linger: 0.24,
        accent: '#C47E3B',
        eyebrow: 'Act V — Liquid Gold',
        title: 'The Golden Extraction',
        body: 'Under 9 bars of heated pressure, two thick streams of hazelnut crema drip like warm honey into ceramic cups, capturing the roaster\'s soul.',
        tags: ['9-Bar Pressure', 'Velvety Crema', 'Heart of Espresso']
      },
      {
        id: 'steaming',
        label: 'VI. Steaming',
        still: resolvePath('assets/stills/06_steaming.png'),
        clip: resolvePath('assets/vid/06_steaming.mp4'),
        scroll: 1.8,
        linger: 0.22,
        accent: '#B88652',
        eyebrow: 'Act VI — Silken Texture',
        title: 'The Microfoam Vortex',
        body: 'Cold fresh organic milk is spun in the copper jug, folding in air until it gleams with the glossy texture of liquid porcelain.',
        tags: ['Glossy Microfoam', 'Steamed Milk', '65°C Sweet Spot']
      },
      {
        id: 'pour',
        label: 'VII. Pouring',
        still: resolvePath('assets/stills/07_swan.png'),
        clip: resolvePath('assets/vid/07_swan.mp4'),
        scroll: 2.0,
        linger: 0.25,
        accent: '#D4AF37',
        eyebrow: 'Act VII — Fluid Elegance',
        title: 'The Barista’s Canvas',
        body: 'A graceful wrist movement weaves silky milk across the amber surface, drawing an intricate swan with feather-light precision.',
        tags: ['Free-Pour Art', 'Swan Rosetta', 'Silky Symmetry']
      },
      {
        id: 'service',
        label: 'VIII. Service',
        still: resolvePath('assets/stills/08_service.png'),
        clip: resolvePath('assets/vid/08_service.mp4'),
        scroll: 2.4,
        linger: 0.35,
        accent: '#E2A76F',
        eyebrow: 'Act VIII — Warm Hospitality',
        title: 'Your Candlelit Table',
        body: 'Served on warm marble, beside the soft glow of candlelight and fresh pastries. Here, time slows down and every sip tells our story.',
        tags: ['Marble Table', 'Warm Sanctuary', 'Feline Host Mr. Pudding'],
        cta: {
          primary: { label: 'Reserve a Table', href: resolvePath('reservation/reservation.html') },
          secondary: { label: 'Explore the Menu', href: resolvePath('#cafe-menu') }
        }
      }
    ],
    connectors: []
  });
}

// Auto-run if #world is present in DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStoryEngine);
} else {
  initStoryEngine();
}
