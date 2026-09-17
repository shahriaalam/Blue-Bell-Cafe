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
        primary: { label: 'Reserve a Table', href: '#book' },
        secondary: { label: 'Explore the Menu', href: '#menu' }
      }
    }
  ],
  connectors: []
});

/* --------------------------------------------------------------------------
   2. GENERATIVE AMBIENT AUDIO ENGINE (Web Audio API)
   Generates a cozy, warm Parisian cafe soundscape with gentle vinyl rumble
   and soft cafe crackle entirely in real-time without external audio files.
   -------------------------------------------------------------------------- */
let audioCtx = null;
let isPlaying = false;
let noiseNode = null;
let gainNode = null;

const audioBtn = document.getElementById('audio-toggle');
const audioLabel = document.getElementById('audio-label');

// Click listener to toggle audio on and off
audioBtn.addEventListener('click', () => {
  // Initialize the Web Audio context on the first user interaction
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  // If currently silent, start synthesizing warm audio
  if (!isPlaying) {
    audioCtx.resume();

    // 1. Create a 2-second looped noise buffer
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;

    // 2. Generate pink/brown noise for warm cafe vinyl texture
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;

    // 3. Lowpass filter to cut harsh high frequencies and produce a cozy room rumble
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 450;

    // 4. Smooth volume control
    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);

    // 5. Connect audio graph: Noise -> Filter -> Gain -> Audio Output
    noiseNode.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    noiseNode.start();

    // Update button UI to 'On' state
    isPlaying = true;
    audioLabel.textContent = 'Ambience: On ♫';
    audioBtn.classList.add('is-active');
  } else {
    // If currently playing, smoothly fade out volume and stop
    if (gainNode) {
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
      setTimeout(() => {
        if (noiseNode) noiseNode.stop();
        isPlaying = false;
        audioLabel.textContent = 'Ambience: Off';
        audioBtn.classList.remove('is-active');
      }, 500);
    }
  }
});

// --- Dynamic Audio Button Positioning: Dock Always Above Footer ---
const footerElement = document.querySelector('.site-footer');
let audioDockTicking = false;

function updateAudioButtonDocking() {
  if (!audioBtn) return;
  const baseMargin = 24; // 24px from bottom of viewport normally
  if (footerElement) {
    const footerRect = footerElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    // When the top of the footer enters the viewport:
    if (footerRect.top < windowHeight) {
      const footerOverlap = windowHeight - footerRect.top;
      // Keep button strictly 24px above the footer top border
      audioBtn.style.bottom = `${footerOverlap + 24}px`;
      return;
    }
  }
  audioBtn.style.bottom = `${baseMargin}px`;
}

function handleAudioDockScroll() {
  if (!audioDockTicking) {
    audioDockTicking = true;
    requestAnimationFrame(() => {
      updateAudioButtonDocking();
      audioDockTicking = false;
    });
  }
}

window.addEventListener('scroll', handleAudioDockScroll, { passive: true });
window.addEventListener('resize', updateAudioButtonDocking);
// Initialize on page load
updateAudioButtonDocking();

/* --------------------------------------------------------------------------
   3. ARTISANAL FOOTER LOGIC
   Controls:
   - Reserve Table button (interactive camera jump to Act VIII: Served for Two)
   -------------------------------------------------------------------------- */

// --- A. Reserve a Table Link in Footer ---
const footerBookBtn = document.getElementById('footer-book-btn');
if (footerBookBtn) {
  footerBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (window.scrollEngine && typeof window.scrollEngine.jumpTo === 'function') {
      window.scrollEngine.jumpTo(7); // Jump to Act VIII: Served for Two
    }
  });
}

