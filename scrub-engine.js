

function mountLetsScroll(container, config) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Phone detection. `coarse` is captured once (input type doesn't change mid-session);
  // the ≤860px query is read live via isMobile() so a desktop resize/DevTools toggle
  // switches sources and seek behaviour without a reload.
  const coarse = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  const smallMQ = window.matchMedia('(max-width: 860px)');
  const isMobile = () => coarse || smallMQ.matches;
  const SECTIONS = config.sections || [];
  const CONNECTORS = config.connectors || [];
  const CONNECTORS_M = config.connectorsMobile || [];
  const DIVE_W = config.diveScroll || 1.3;
  const CONN_W = config.connScroll || 0.9;
  const CROSSFADE = (config.crossfade != null) ? config.crossfade : 0.45;  // wide cinematic dissolve window
  const N = SECTIONS.length;
  if (!N) return;

  // Custom 3D cinematic camera choreography per scene:
  const CAMERA_TRACK = [
    { sS: 1.02, eS: 1.15, sX: 0, eX: -2.5, sY: 0, eY: -1.2 },    // Scene 1: Gentle push into hands, glide towards scale
    { sS: 1.04, eS: 1.16, sX: 2.5, eX: -1.5, sY: 0, eY: 0.8 },    // Scene 2: Lateral counter track into the digital scale
    { sS: 1.03, eS: 1.18, sX: 2.0, eX: 0, sY: -1.2, eY: 1.5 },    // Scene 3: Glide into portafilter under grinder chute
    { sS: 1.05, eS: 1.18, sX: 0, eX: 0, sY: -2.0, eY: 2.0 },      // Scene 4: Vertical firm push into the tamping mat
    { sS: 1.03, eS: 1.16, sX: -1.0, eX: 1.5, sY: 1.8, eY: -1.5 }, // Scene 5: Rise towards the double golden espresso streams
    { sS: 1.04, eS: 1.20, sX: -1.5, eX: 1.2, sY: -1.0, eY: 2.0 }, // Scene 6: Tilt into the swirling milk vortex and steam
    { sS: 1.03, eS: 1.24, sX: -1.0, eX: 0.8, sY: 1.0, eY: -0.5 }, // Scene 7: Deep focus push directly into the swan latte art
    { sS: 1.15, eS: 1.02, sX: 1.5, eX: -1.2, sY: -1.0, eY: 0.5 }  // Scene 8: Pull back reveal of the romantic candlelit table
  ];

  injectCSS();
  container.classList.add('sw-root');

  // ---- build the interleaved segment chain: dive0, conn0, dive1, … diveN-1 ----
  const SEGMENTS = [];
  SECTIONS.forEach((s, i) => {
    const dive = {
      kind: 'dive', si: i, clip: s.clip, clipM: s.clipMobile, still: s.still, stillM: s.stillMobile,
      accent: s.accent, w: s.scroll || DIVE_W, linger: s.linger || 0
    };
    SEGMENTS.push(dive);
    s._seg = dive;
    if (i < N - 1 && CONNECTORS[i]) {
      SEGMENTS.push({
        kind: 'conn', si: i, clip: CONNECTORS[i], clipM: CONNECTORS_M[i],
        still: SECTIONS[i + 1].still, stillM: SECTIONS[i + 1].stillMobile,
        accent: SECTIONS[i + 1].accent, w: CONN_W
      });
    }
  });
  const NSEG = SEGMENTS.length;

  // ---- DOM ----
  const sky = el('div', 'sw-sky');
  if (config.atmosphere !== false) {
    sky.appendChild(el('div', 'sw-sky__grad'));
    sky.appendChild(el('div', 'sw-sky__glow'));
  }
  const particles = el('div', 'sw-particles'); sky.appendChild(particles);

  const scrollbar = el('div', 'sw-scrollbar');
  const scrollbarFill = el('span'); scrollbar.appendChild(scrollbarFill);

  const topbar = el('div', 'sw-topbar');
  if (config.brand) {
    const brand = el('a', 'sw-brand'); brand.href = (config.brand.href || '#');
    if (config.brand.name) {
      brand.setAttribute('aria-label', config.brand.name);
      brand.setAttribute('title', config.brand.name);
    }
    if (config.brand.logo) {
      const wrap = el('span', 'sw-brand__logo-wrap');
      const img = el('img', 'sw-brand__logo');
      img.src = config.brand.logo;
      img.alt = config.brand.name || 'Logo';
      img.onerror = () => { wrap.style.display = 'none'; };
      wrap.appendChild(img);
      brand.appendChild(wrap);
    } else {
      brand.appendChild(el('span', 'sw-brand__mark'));
    }
    if (config.brand.name && !config.brand.logoOnly) {
      const nm = el('span', 'sw-brand__name'); nm.textContent = config.brand.name || ''; brand.appendChild(nm);
    }
    topbar.appendChild(brand);
  }
  const nav = el('nav', 'sw-nav'); if (config.nav !== false) topbar.appendChild(nav);
  if (config.cta && config.cta.label) {
    const c = el('a', 'sw-topcta'); c.href = config.cta.href || '#';
    const words = (config.cta.label || '').split(' ');
    if (words.length > 1) {
      c.innerHTML = `<span class="sw-topcta__main">${esc(words[0])}</span><span class="sw-topcta__sub"> ${esc(words.slice(1).join(' '))}</span>`;
    } else {
      c.textContent = config.cta.label;
    }
    if (config.cta.href && config.cta.href.startsWith('#')) {
      const targetId = config.cta.href.slice(1);
      const targetIdx = SECTIONS.findIndex(s => s.id === targetId);
      if (targetIdx !== -1) {
        c.addEventListener('click', (e) => {
          e.preventDefault();
          jumpTo(targetIdx);
        });
      }
    }
    topbar.appendChild(c);
  }

  const stage = el('div', 'sw-stage');
  const copylayer = el('div', 'sw-copylayer');
  const route = el('div', 'sw-route');
  const hint = el('div', 'sw-hint');
  const hintText = el('span'); hintText.textContent = config.hint || 'scroll'; hint.appendChild(hintText);
  hint.appendChild(el('i'));
  const track = el('div', 'sw-track');

  [sky, scrollbar, topbar, stage, copylayer, route, hint, track].forEach(n => container.appendChild(n));

  // segment scenes
  SEGMENTS.forEach(s => {
    const scene = el('div', 'sw-scene'); scene.style.setProperty('--sw-accent', s.accent || '');
    const img = el('img', 'sw-scene__still'); img.alt = ''; img.decoding = 'async'; img.loading = 'lazy';
    const poster = (isMobile() && s.stillM) ? s.stillM : s.still;
    if (poster) img.src = poster;
    scene.appendChild(img); stage.appendChild(scene);
    s.el = scene; s.img = img; s.video = null; s.hasClip = false;
    s.loading = false; s.ready = false; s.cur = 0; s.target = 0; s.visible = false;
  });

  // per-section copy / route / nav
  const copies = [], dots = [];
  SECTIONS.forEach((s, i) => {
    const c = el('article', 'sw-copy'); c.style.setProperty('--sw-accent', s.accent || '');
    c.innerHTML =
      `<span class="sw-copy__num">${pad(i + 1)} / ${pad(N)}</span>` +
      (s.eyebrow ? `<span class="sw-copy__eyebrow">${esc(s.eyebrow)}</span>` : '') +
      (s.title ? `<h2 class="sw-copy__title">${esc(s.title)}</h2>` : '') +
      (s.body ? `<p class="sw-copy__body">${esc(s.body)}</p>` : '') +
      (s.tags && s.tags.length ? `<ul class="sw-copy__tags">${s.tags.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : '') +
      (s.cta ? `<div class="sw-copy__cta">${ctaBtns(s.cta)}</div>` : '');
    copylayer.appendChild(c); copies.push(c);

    const dot = el('button', 'sw-route__dot'); dot.style.setProperty('--sw-accent', s.accent || '');
    dot.innerHTML = `<span class="sw-route__label">${esc(s.label || '')}</span><i></i>`;
    dot.addEventListener('click', () => jumpTo(i)); route.appendChild(dot); dots.push(dot);

    if (config.nav !== false) {
      const b = el('button', 'sw-nav__item');
      const labelStr = s.label || '';
      const dotIdx = labelStr.indexOf('. ');
      if (dotIdx !== -1) {
        const num = labelStr.slice(0, dotIdx);
        const name = labelStr.slice(dotIdx + 2);
        b.innerHTML = `<span class="sw-nav__num">${esc(num)}</span><span class="sw-nav__sep">. </span><span class="sw-nav__name">${esc(name)}</span>`;
      } else {
        b.innerHTML = `<span class="sw-nav__name">${esc(labelStr)}</span>`;
      }
      b.setAttribute('title', labelStr);
      b.setAttribute('aria-label', labelStr);
      b.addEventListener('click', () => jumpTo(i));
      nav.appendChild(b);
    }
  });

  // ---- math ----
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const smooth = x => { x = clamp(x); return x * x * (3 - 2 * x); };
  // Per-section dwell: monotone remap of scroll→time so the camera settles mid-scene
  // (where the copy peaks) and moves quicker near the seams. L=0 linear, L=1 full
  // mid-scene pause. f(0)=0, f(1)=1 always, so seam frames are untouched.
  const lingerEase = (x, L) => { L = clamp(L); const c = x - 0.5; return (1 - L) * x + L * (4 * c * c * c + 0.5); };
  let vh = window.innerHeight, stageX = 0, totalW = 0, activeIndex = -1, ticking = false;
  let laidOutW = window.innerWidth;   // width the current layout was computed at (see onResize)

  function layout() {
    vh = window.innerHeight;
    laidOutW = window.innerWidth;
    stageX = window.innerWidth > 860 ? 4 : 0;
    let off = 0;
    SEGMENTS.forEach(s => { s.start = off * vh; off += s.w; s.end = off * vh; });
    totalW = off;
    track.style.height = (totalW * vh + vh) + 'px';   // +1vh so the last flight completes
    read();
  }

  function jumpTo(i) {
    const seg = SECTIONS[i]._seg;
    window.scrollTo({ top: seg.start + (seg.end - seg.start) * 0.5, behavior: reduce ? 'auto' : 'smooth' });
  }

  function loadClip(s) {
    if (reduce || s.loading || !s.clip) return;
    s.loading = true;
    const url = (isMobile() && s.clipM) ? s.clipM : s.clip;

    function attachVideo(videoSrc) {
      if (s.video) return;
      const v = document.createElement('video');
      v.className = 'sw-scene__video';
      v.muted = true;
      v.playsInline = true;
      v.preload = 'auto';
      v.setAttribute('muted', '');
      v.setAttribute('playsinline', '');
      v.setAttribute('webkit-playsinline', '');
      v.src = videoSrc;
      v.addEventListener('loadedmetadata', () => {
        s.ready = true;
        read();
      });
      const onFrameReady = () => { s.el.classList.add('has-clip'); };
      v.addEventListener('canplay', onFrameReady, { once: true });
      v.addEventListener('seeked', onFrameReady, { once: true });
      v.addEventListener('loadeddata', () => {
        onFrameReady();
        try { v.pause(); } catch (e) { }
        if (userReady) primeVideo(v);
      });
      s.el.appendChild(v);
      s.video = v;
      s.hasClip = true;
    }

    if (window.location.protocol === 'file:') {
      attachVideo(url);
    } else {
      fetch(url)
        .then(r => r.ok ? r.blob() : Promise.reject(new Error('Fetch status ' + r.status)))
        .then(blob => attachVideo(URL.createObjectURL(blob)))
        .catch(() => attachVideo(url));
    }
  }

  let lastY = 0;
  let lastTime = performance.now();
  let scrollVelocity = 0;

  function read() {
    const y = window.scrollY || window.pageYOffset;
    const now = performance.now();
    const dt = Math.max(1, now - lastTime);
    scrollVelocity = Math.min(6, Math.abs(y - lastY) / dt * 1.5);
    lastY = y;
    lastTime = now;

    const halfFade = (CROSSFADE * vh) * 0.5;
    let ci = 0;
    for (let i = 0; i < NSEG; i++) if (y >= SEGMENTS[i].start) ci = i;

    for (let i = 0; i < NSEG; i++) {
      const s = SEGMENTS[i];

      // Extended video playhead domain:
      // Video begins in motion during entry fade and finishes smoothly during exit fade
      const vStart = (i === 0) ? 0 : s.start - halfFade;
      const vEnd = (i === NSEG - 1) ? totalW * vh : s.end + halfFade;
      const local = clamp((y - vStart) / (vEnd - vStart), 0, 1);
      s.target = s.linger ? lingerEase(local, s.linger) : local;

      // Solid Base Cross-Dissolve:
      // Overlapping scene dissolves smoothly on top of a solid base.
      // Zero dark dip, zero background leak, 100% solid video blend throughout.
      let op = 1.0;
      let visible = false;
      const visStart = (i === 0) ? -Infinity : s.start - halfFade;
      const visEnd = (i === NSEG - 1) ? Infinity : s.end + halfFade;

      if (y >= visStart && y <= visEnd) {
        visible = true;
        if (i > 0 && y < s.start + halfFade) {
          // Entry fade: smooth cubic ramp up from 0 to 1
          const tIn = (y - (s.start - halfFade)) / (2 * halfFade);
          op = smooth(clamp(tIn, 0, 1));
        } else {
          // Stays 1.0 while incoming scene i+1 dissolves on top with higher z-index
          op = 1.0;
        }
      } else {
        op = 0.0;
        visible = false;
      }

      s.el.style.opacity = op.toFixed(4);
      s.el.style.visibility = visible ? 'visible' : 'hidden';
      s.visible = visible;

      // Deterministic hierarchical z-index: incoming higher scene cleanly dissolves on top
      s.el.style.zIndex = String(10 + i * 2);

      if (!s.hasClip || !s.ready) {
        const cam = CAMERA_TRACK[s.si] || { sS: 1.02, eS: 1.15, sX: 0, eX: 0, sY: 0, eY: 0 };
        const progress = s.target;
        const curScale = cam.sS + (cam.eS - cam.sS) * progress;
        const curX = cam.sX + (cam.eX - cam.sX) * progress;
        const curY = cam.sY + (cam.eY - cam.sY) * progress;
        const motionBlur = reduce ? 0 : Math.min(scrollVelocity * 0.7, 2.5);
        s.img.style.transform = `translate3d(${curX.toFixed(2)}vw, ${curY.toFixed(2)}vh, 0) scale(${curScale.toFixed(3)})`;
        s.img.style.filter = motionBlur > 0.3 ? `blur(${motionBlur.toFixed(1)}px)` : 'none';
      }
    }

    for (let i = 0; i < N; i++) {
      const seg = SECTIONS[i]._seg;
      const pr = clamp((y - seg.start) / (seg.end - seg.start), 0, 1);
      const before = y < seg.start, after = y > seg.end;
      let cop;
      if (i === 0) cop = after ? 0 : smooth(1 - pr / 0.62);            // greets on landing
      else if (i === N - 1) cop = before ? 0 : smooth(pr / 0.4);       // holds CTA at the end
      else cop = (before || after) ? 0 : smooth(1 - Math.abs(pr - 0.5) / 0.5);
      const c = copies[i];
      c.style.opacity = cop;
      c.style.transform = reduce ? 'none' : `translateY(${(0.5 - pr) * 3}vh)`;
      c.style.pointerEvents = cop > 0.5 ? 'auto' : 'none';
    }

    const cur = SEGMENTS[ci];
    const near = clamp(cur.kind === 'dive' ? cur.si
      : (((y - cur.start) / (cur.end - cur.start)) > 0.5 ? cur.si + 1 : cur.si), 0, N - 1);
    if (near !== activeIndex) {
      activeIndex = near;
      dots.forEach((d, k) => d.classList.toggle('is-active', k === near));
      const navItems = nav.querySelectorAll('.sw-nav__item');
      navItems.forEach((n, k) => n.classList.toggle('is-active', k === near));
      const activeNav = navItems[near];
      if (activeNav && typeof activeNav.scrollIntoView === 'function') {
        activeNav.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
      container.style.setProperty('--sw-accent', SECTIONS[near].accent || '');
    }
    scrollbarFill.style.transform = `scaleX(${clamp(y / (totalW * vh))})`;
    hint.style.opacity = clamp(1 - y / (0.5 * vh));
    if (particles) particles.style.transform = `translate3d(0, ${-y * 0.05}px, 0)`;
    ticking = false;
  }

  function raf() {
    const isCoarse = isMobile();
    const eps = isCoarse ? 0.02 : 0.005;
    const lerpRate = reduce ? 1 : 0.22;

    for (let i = 0; i < NSEG; i++) {
      const s = SEGMENTS[i];
      if (!s.hasClip || !s.ready || !s.video) continue;

      // Always advance s.cur toward s.target every frame (never blocked by seeking)
      s.cur += (s.target - s.cur) * lerpRate;

      // Only seek if video element is visible or near visible
      if (!s.visible && Math.abs(s.cur - s.target) < 0.001) continue;

      // If decoder is currently busy with a seek, wait for it to finish
      if (s.video.seeking) continue;

      const dur = s.video.duration || 1;
      const t = clamp(s.cur, 0, 0.999) * dur;
      if (Math.abs(s.video.currentTime - t) > eps) {
        try {
          if (typeof s.video.fastSeek === 'function' && scrollVelocity > 0.7) {
            s.video.fastSeek(t);
          } else {
            s.video.currentTime = t;
          }
        } catch (e) { }
      }
    }
    requestAnimationFrame(raf);
  }

  // iOS needs a user gesture before a muted video will decode/paint reliably. On the
  // first touch we prime every loaded clip (muted play→pause) so the first seek is
  // instant instead of showing a blank frame. `userReady` also makes freshly-loaded
  // clips prime themselves (see loadClip).
  let userReady = false;
  function primeVideo(v) {
    if (!isMobile() || !v) return;
    try { const p = v.play(); if (p && p.then) p.then(() => { try { v.pause(); } catch (e) { } }).catch(() => { }); }
    catch (e) { }
  }
  function onFirstGesture() {
    if (userReady) return;
    userReady = true;
    SEGMENTS.forEach(s => primeVideo(s.video));
  }
  window.addEventListener('pointerdown', onFirstGesture, { once: true, passive: true });
  window.addEventListener('touchstart', onFirstGesture, { once: true, passive: true });

  // Particles are a per-frame cost we can't afford alongside video scrubbing on a phone.
  seedParticles(particles, reduce || coarse);
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(read); } }, { passive: true });
  function onResize() {
    if (coarse && window.innerWidth === laidOutW) return;
    layout();
  }
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', layout);
  window.addEventListener('load', layout);
  layout();
  // Preload all clips in parallel so every scene is buffered and ready on demand
  SEGMENTS.forEach(s => loadClip(s));
  requestAnimationFrame(raf);

  // ---- helpers ----
  function el(tag, cls) { const n = document.createElement(tag); if (cls) n.className = cls; return n; }
  function pad(n) { return String(n).padStart(2, '0'); }
  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  function ctaBtns(cta) {
    let h = '';
    if (cta.primary) h += `<a class="sw-btn sw-btn--primary" href="${esc(cta.primary.href || '#')}">${esc(cta.primary.label)}</a>`;
    if (cta.secondary) h += `<a class="sw-btn sw-btn--ghost" href="${esc(cta.secondary.href || '#')}">${esc(cta.secondary.label)}</a>`;
    return h;
  }

  const engineApi = { jumpTo, getSections: () => SECTIONS, layout };
  container._scrollEngine = engineApi;
  window.scrollEngine = engineApi;
  return engineApi;
}

function seedParticles(host, reduce) {
  if (!host || reduce) return;
  const kinds = ['dot', 'dot', 'ring'];
  const seeds = [7, 23, 41, 58, 71, 88, 12, 34, 52, 66, 83, 95, 18, 29, 47, 63, 77, 91, 5, 38, 55, 69, 82, 97];
  for (let k = 0; k < 20; k++) {
    const s = document.createElement('span');
    s.className = 'sw-pt sw-pt--' + kinds[k % kinds.length];
    s.style.left = seeds[k % seeds.length] + 'vw';
    s.style.top = ((seeds[(k * 3) % seeds.length] * 1.3) % 100) + 'vh';
    s.style.setProperty('--sw-sc', (0.5 + ((seeds[(k * 5) % seeds.length] % 60) / 60) * 1.1).toFixed(2));
    const dur = 14 + (seeds[(k * 7) % seeds.length] % 22);
    s.style.animationDuration = dur + 's';
    s.style.animationDelay = (-(seeds[(k * 2) % seeds.length] % dur)) + 's';
    host.appendChild(s);
  }
}

function injectCSS() {
  if (document.getElementById('sw-css')) return;
  const css = `
  .sw-root{--sw-bg:#F5EDE0;--sw-ink:#241d2b;--sw-ink-soft:#6a6072;--sw-accent:#8a7bb5;
    --sw-font-display:ui-rounded,"SF Pro Rounded","Segoe UI",system-ui,sans-serif;
    --sw-font-body:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,system-ui,sans-serif;
    color:var(--sw-ink);font-family:var(--sw-font-body);}
  html,body{margin:0;background:var(--sw-bg,#F5EDE0);overflow-x:hidden;}
  .sw-sky{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;background:var(--sw-bg);}
  .sw-sky__grad{position:absolute;inset:-10%;background:linear-gradient(178deg,color-mix(in srgb,var(--sw-accent) 12%,var(--sw-bg)) 0%,var(--sw-bg) 55%,color-mix(in srgb,var(--sw-accent) 6%,var(--sw-bg)) 100%);}
  .sw-sky__glow{position:absolute;inset:0;background:radial-gradient(60% 42% at 74% 16%,color-mix(in srgb,var(--sw-accent) 22%,transparent),transparent 70%),radial-gradient(46% 34% at 50% 50%,color-mix(in srgb,#fff 45%,transparent),transparent 70%);}
  .sw-particles{position:absolute;inset:-6% -2%;will-change:transform;}
  .sw-pt{position:absolute;width:13px;height:13px;transform:scale(var(--sw-sc,1));opacity:0;animation:sw-drift linear infinite;}
  .sw-pt::before{content:"";position:absolute;inset:0;border-radius:50%;}
  .sw-pt--dot::before{background:radial-gradient(circle at 34% 30%,color-mix(in srgb,var(--sw-accent) 60%,#000),#000 82%);}
  .sw-pt--ring::before{background:transparent;border:2px solid color-mix(in srgb,var(--sw-accent) 55%,transparent);}
  @keyframes sw-drift{0%{opacity:0;transform:scale(var(--sw-sc)) translate(0,12vh) rotate(0)}12%{opacity:.5}88%{opacity:.45}100%{opacity:0;transform:scale(var(--sw-sc)) translate(4vw,-22vh) rotate(210deg)}}
  .sw-scrollbar{position:fixed;top:0;left:0;right:0;height:3px;z-index:60;background:color-mix(in srgb,var(--sw-accent) 14%,transparent);}
  .sw-scrollbar span{display:block;height:100%;width:100%;transform-origin:0 50%;transform:scaleX(0);background:var(--sw-accent);}
  .sw-topbar{position:fixed;top:0;left:0;right:0;z-index:50;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:clamp(14px,2.4vw,26px) clamp(18px,5vw,64px);}
  .sw-brand{display:inline-flex;align-items:center;text-decoration:none;color:var(--sw-ink);transition:all .3s ease;}
  .sw-brand:hover{transform:translateY(-2px);}
  .sw-brand__mark{width:24px;height:28px;border-radius:7px 7px 10px 10px;background:linear-gradient(160deg,var(--sw-accent),color-mix(in srgb,var(--sw-accent) 60%,#000));box-shadow:0 6px 14px color-mix(in srgb,var(--sw-accent) 40%,transparent);}
  .sw-brand__logo-wrap{display:inline-flex;align-items:center;justify-content:center;padding:7px 18px;background:#fff;border-radius:999px;border:1.5px solid rgba(226,167,111,.45);box-shadow:0 4px 18px rgba(0,0,0,.35),0 0 16px rgba(226,167,111,.2);backdrop-filter:blur(12px);transition:all .3s ease;}
  .sw-brand:hover .sw-brand__logo-wrap{border-color:var(--sw-accent);box-shadow:0 8px 26px rgba(0,0,0,.45),0 0 22px rgba(226,167,111,.45);transform:scale(1.02);}
  .sw-brand__logo{height:clamp(30px,3.5vw,40px);width:auto;max-width:clamp(110px,15vw,160px);object-fit:contain;display:block;}
  .sw-brand__name{font-family:var(--sw-font-display);font-weight:700;font-size:1.12rem;white-space:nowrap;color:#F9F5F0;}
  .sw-nav{display:flex;gap:4px;padding:5px;background:rgba(18,13,10,.85);backdrop-filter:blur(16px);border:1px solid rgba(226,167,111,.35);border-radius:999px;box-shadow:0 8px 32px rgba(0,0,0,.45);}
  .sw-nav__item{font:inherit;font-size:.82rem;font-weight:600;letter-spacing:.02em;color:#EDE4DC;border:0;background:transparent;cursor:pointer;padding:7px 14px;border-radius:999px;transition:color .25s,background .25s,transform .2s;}
  .sw-nav__item:hover{color:#fff;background:rgba(255,255,255,.14);transform:translateY(-1px);} .sw-nav__item.is-active{color:#fff;background:var(--sw-accent);font-weight:700;box-shadow:0 4px 14px color-mix(in srgb,var(--sw-accent) 55%,transparent);}
  .sw-topcta{display:inline-flex;align-items:center;gap:8px;padding:9px 20px;font-family:var(--sw-font-body);font-size:.84rem;font-weight:700;letter-spacing:.02em;text-decoration:none;color:#1A100B;background:linear-gradient(135deg,#FBE0C3 0%,#E2A76F 52%,#C47D3B 100%);border:1px solid rgba(255,255,255,.65);border-radius:999px;box-shadow:0 4px 18px rgba(226,167,111,.45),inset 0 1px 1px rgba(255,255,255,.8);backdrop-filter:blur(12px);transition:all .3s cubic-bezier(.16,1,.3,1);white-space:nowrap;cursor:pointer;}
  .sw-topcta::after{content:"→";font-size:.92rem;font-weight:700;transition:transform .25s ease;}
  .sw-topcta:hover{transform:translateY(-2px) scale(1.02);color:#120D0A;background:linear-gradient(135deg,#FFF0DB 0%,#EDB784 50%,#CF8441 100%);box-shadow:0 8px 26px rgba(226,167,111,.65);border-color:rgba(255,255,255,.9);}
  .sw-topcta:hover::after{transform:translateX(3px);}
  .sw-topcta:active{transform:translateY(0) scale(.98);box-shadow:0 2px 8px rgba(226,167,111,.3);}
  .sw-stage{position:fixed;inset:0;z-index:10;pointer-events:none;}
  .sw-scene{position:absolute;inset:0;opacity:0;overflow:hidden;will-change:opacity;}
  .sw-scene__video,.sw-scene__still{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 42%;}
  .sw-scene__still{will-change:transform,opacity,filter;transition:opacity 0.5s ease-out, filter 0.12s ease-out;} .sw-scene.has-clip .sw-scene__still{opacity:0;pointer-events:none;} .sw-scene__video{z-index:1;}
  .sw-copylayer{position:fixed;inset:0;z-index:20;pointer-events:none;}
  .sw-copylayer::before{content:"";position:absolute;inset:0;width:min(58vw,780px);background:linear-gradient(90deg,var(--sw-bg) 0%,color-mix(in srgb,var(--sw-bg) 82%,transparent) 34%,color-mix(in srgb,var(--sw-bg) 40%,transparent) 62%,transparent 100%);}
  .sw-copy{position:absolute;left:clamp(18px,5vw,64px);top:50%;transform:translateY(-50%);width:min(42vw,460px);opacity:0;will-change:opacity,transform;}
  .sw-copy__num{font-family:ui-monospace,Menlo,monospace;font-size:.74rem;letter-spacing:.12em;color:var(--sw-ink-soft);}
  .sw-copy__eyebrow{display:block;margin-top:18px;font-family:var(--sw-font-display);font-weight:700;font-size:.8rem;letter-spacing:.16em;text-transform:uppercase;color:var(--sw-accent);}
  .sw-copy__title{font-family:var(--sw-font-display);font-weight:700;color:var(--sw-ink);font-size:clamp(2rem,4.4vw,3.5rem);line-height:1.03;margin:12px 0 0;letter-spacing:-.01em;text-shadow:0 2px 20px color-mix(in srgb,var(--sw-bg) 70%,transparent);}
  .sw-copy__body{margin-top:18px;font-size:clamp(1rem,1.25vw,1.14rem);line-height:1.55;color:color-mix(in srgb,var(--sw-ink) 78%,var(--sw-ink-soft));max-width:40ch;text-shadow:0 1px 12px color-mix(in srgb,var(--sw-bg) 90%,transparent);}
  .sw-copy__tags{list-style:none;display:flex;flex-wrap:wrap;gap:8px;margin:24px 0 0;padding:0;}
  .sw-copy__tags li{font-size:.82rem;font-weight:600;color:color-mix(in srgb,var(--sw-accent) 70%,#000);padding:7px 14px;border-radius:999px;background:color-mix(in srgb,var(--sw-accent) 14%,#fff);border:1px solid color-mix(in srgb,var(--sw-accent) 30%,transparent);}
  .sw-copy__cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px;pointer-events:auto;}
  .sw-btn{text-decoration:none;font-weight:600;font-size:.95rem;padding:13px 24px;border-radius:999px;transition:transform .2s;}
  .sw-btn--primary{color:#1A100B;background:linear-gradient(135deg,#FBE0C3 0%,#E2A76F 52%,#C47D3B 100%);} .sw-btn--primary:hover{transform:translateY(-2px);}
  .sw-btn--ghost{color:#FAF5EE;background:rgba(20,14,10,.85);border:1.5px solid rgba(226,167,111,.55);box-shadow:0 4px 20px rgba(0,0,0,.45);} .sw-btn--ghost:hover{transform:translateY(-2px);border-color:#E2A76F;}
  .sw-route{position:fixed;right:clamp(14px,2.4vw,30px);top:50%;z-index:40;transform:translateY(-50%);display:flex;flex-direction:column;gap:22px;padding:18px 10px;}
  .sw-route::before{content:"";position:absolute;left:50%;top:22px;bottom:22px;width:2px;transform:translateX(-50%);background:var(--sw-accent);opacity:.45;}
  .sw-route__dot{position:relative;border:0;background:transparent;cursor:pointer;width:14px;height:14px;display:grid;place-items:center;}
  .sw-route__dot i{width:9px;height:9px;border-radius:50%;background:color-mix(in srgb,var(--sw-accent) 60%,transparent);transition:transform .3s,background .3s,box-shadow .3s;}
  .sw-route__dot:hover i{transform:scale(1.25);background:var(--sw-accent);}
  .sw-route__dot.is-active i{background:var(--sw-accent);transform:scale(1.4);box-shadow:0 0 0 5px color-mix(in srgb,var(--sw-accent) 30%,transparent);}
  .sw-route__label{position:absolute;right:26px;top:50%;transform:translateY(-50%) translateX(6px);white-space:nowrap;font-size:.8rem;font-weight:700;letter-spacing:.02em;color:#F9F5F0;background:rgba(18,13,10,.92);backdrop-filter:blur(14px);padding:6px 14px;border-radius:999px;opacity:0;pointer-events:none;transition:opacity .25s,transform .25s;border:1px solid rgba(226,167,111,.4);box-shadow:0 4px 18px rgba(0,0,0,.5);}
  .sw-route__dot:hover .sw-route__label,.sw-route__dot.is-active .sw-route__label{opacity:1;transform:translateY(-50%) translateX(0);}
  .sw-hint{position:fixed;left:50%;bottom:26px;z-index:30;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:10px;font-size:.76rem;letter-spacing:.14em;text-transform:uppercase;color:var(--sw-ink-soft);transition:opacity .3s;}
  .sw-hint i{width:22px;height:34px;border-radius:12px;border:2px solid color-mix(in srgb,var(--sw-ink) 28%,transparent);position:relative;}
  .sw-hint i::after{content:"";position:absolute;left:50%;top:7px;width:4px;height:7px;border-radius:2px;background:var(--sw-accent);transform:translateX(-50%);animation:sw-wheel 1.7s ease-in-out infinite;}
  @keyframes sw-wheel{0%{opacity:0;top:6px}40%{opacity:1}100%{opacity:0;top:17px}}
  .sw-track{position:relative;z-index:1;width:100%;pointer-events:none;}
  @media (max-width:860px){
    .sw-copylayer::before{width:100%;height:60%;top:auto;bottom:0;background:linear-gradient(0deg,var(--sw-bg) 8%,color-mix(in srgb,var(--sw-bg) 70%,transparent) 46%,transparent 100%);}
    /* Anchor copy to the bottom, clear of the home indicator / collapsing URL bar.
       dvh + env() are progressive: browsers that lack them keep the vh fallback line. */
    .sw-copy{left:clamp(18px,5vw,64px);right:clamp(18px,5vw,64px);top:auto;bottom:clamp(64px,14vh,120px);transform:none;width:auto;max-width:560px;}
    .sw-copy{bottom:calc(clamp(56px,12dvh,110px) + env(safe-area-inset-bottom));}
    .sw-copy__title{font-size:clamp(1.9rem,7.5vw,2.7rem);}
    .sw-copy__body{max-width:none;font-size:clamp(.98rem,3.6vw,1.1rem);} .sw-scene__video,.sw-scene__still{object-position:center 46%;}
    .sw-hint{bottom:calc(20px + env(safe-area-inset-bottom));}
    .sw-route{gap:16px;right:6px;} .sw-route__label{display:none;}
  }
  /* Portrait phones crop a 16:9 clip hard; keep the framing centred so the focal
     subject (which the camera dives toward) stays in view. */
  @media (max-width:860px) and (orientation:portrait){
    .sw-scene__video,.sw-scene__still{object-position:center 44%;}
  }
  /* Touch: give the route dots a finger-sized hit area without growing the visible dot. */
  @media (hover:none) and (pointer:coarse){
    .sw-route{padding:14px 6px;}
    .sw-route__dot{width:28px;height:28px;}
    .sw-btn{padding:15px 26px;}
  }
  @media (prefers-reduced-motion:reduce){ .sw-hint i::after{animation:none;} .sw-pt{display:none;} }
  `;
  // Wrap in a cascade layer so the page's own theme tokens (unlayered
  // :root / .sw-root { --sw-bg / --sw-ink / --sw-accent … }) always win over
  // these defaults, regardless of injection order. Enables clean dark themes.
  const style = document.createElement('style'); style.id = 'sw-css';
  style.textContent = '@layer sw {\n' + css + '\n}';
  document.head.appendChild(style);
}

// Expose for module + global use.
if (typeof module !== 'undefined' && module.exports) module.exports = { mountLetsScroll };
if (typeof window !== 'undefined') window.mountLetsScroll = mountLetsScroll;
