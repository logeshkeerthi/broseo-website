/* ==========================================================================
   BROSEO — CONTINUOUS SCROLL-DRIVEN COLOUR TRANSFORMATION & KINETIC ENGINE
   Approved Carbon & Volt 6-Stop Scroll Progression:
   0.00 -> #111315 (Carbon)
   0.20 -> #292E32 (Graphite)
   0.40 -> #66736A (Muted Green)
   0.60 -> #E9EEE8 (Soft Sage)
   0.80 -> #FFFFFF (Pure White)
   1.00 -> #FFFFFF (Pure White)
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     EXACT 6-STOP BACKGROUND & FOREGROUND CONTRAST KEYFRAMES (CARBON & VOLT)
     Every stop is contrast-tested so primary, secondary, muted, and accent
     typography remain legible across dark, mid-transition, and pure white.
     ------------------------------------------------------------------------ */
  const SCROLL_STOPS = [
    {
      /* Stage 0: 0% Scroll — Hero (Carbon #111315) */
      p: 0.00,
      bg:      { r: 17,  g: 19,  b: 21  }, // #111315 Carbon
      text:    { r: 255, g: 255, b: 255 }, // #FFFFFF Pure White
      subtext: { r: 233, g: 238, b: 232 }, // #E9EEE8 Soft Sage
      muted:   { r: 233, g: 238, b: 232 }, // #E9EEE8 Soft Sage
      accent:  { r: 199, g: 241, b: 105 }, // #C7F169 Volt Lime
      border:  { r: 233, g: 238, b: 232, a: 0.20 },
      surface: { r: 41,  g: 46,  b: 50,  a: 0.36 },
      glow:    1.0
    },
    {
      /* Stage 1: 20% Scroll — Introduction (Graphite #292E32) */
      p: 0.20,
      bg:      { r: 41,  g: 46,  b: 50  }, // #292E32 Graphite
      text:    { r: 255, g: 255, b: 255 }, // #FFFFFF Pure White
      subtext: { r: 233, g: 238, b: 232 }, // #E9EEE8 Soft Sage
      muted:   { r: 233, g: 238, b: 232 }, // #E9EEE8 Soft Sage
      accent:  { r: 199, g: 241, b: 105 }, // #C7F169 Volt Lime
      border:  { r: 233, g: 238, b: 232, a: 0.24 },
      surface: { r: 17,  g: 19,  b: 21,  a: 0.28 },
      glow:    0.75
    },
    {
      /* Stage 2: 40% Scroll — Services Transition (Muted Green #66736A) */
      p: 0.40,
      bg:      { r: 102, g: 115, b: 106 }, // #66736A Muted Green
      text:    { r: 255, g: 255, b: 255 }, // #FFFFFF Pure White
      subtext: { r: 233, g: 238, b: 232 }, // #E9EEE8 Soft Sage
      muted:   { r: 233, g: 238, b: 232 }, // #E9EEE8 Soft Sage
      accent:  { r: 199, g: 241, b: 105 }, // #C7F169 Volt Lime
      border:  { r: 233, g: 238, b: 232, a: 0.26 },
      surface: { r: 17,  g: 19,  b: 21,  a: 0.22 },
      glow:    0.40
    },
    {
      /* Stage 3: 60% Scroll — Individual Service Storytelling (Soft Sage #E9EEE8) */
      p: 0.60,
      bg:      { r: 233, g: 238, b: 232 }, // #E9EEE8 Soft Sage
      text:    { r: 17,  g: 19,  b: 21  }, // #111315 Carbon
      subtext: { r: 41,  g: 46,  b: 50  }, // #292E32 Graphite
      muted:   { r: 78,  g: 89,  b: 82  }, // #4E5952 Dark Muted Green
      accent:  { r: 41,  g: 46,  b: 50  }, // #292E32 Graphite
      border:  { r: 17,  g: 19,  b: 21,  a: 0.16 },
      surface: { r: 255, g: 255, b: 255, a: 0.48 },
      glow:    0.15
    },
    {
      /* Stage 4: 80% Scroll — Work / Portfolio (Pure White #FFFFFF) */
      p: 0.80,
      bg:      { r: 255, g: 255, b: 255 }, // #FFFFFF Pure White
      text:    { r: 17,  g: 19,  b: 21  }, // #111315 Carbon
      subtext: { r: 41,  g: 46,  b: 50  }, // #292E32 Graphite
      muted:   { r: 78,  g: 89,  b: 82  }, // #4E5952 Dark Muted Green
      accent:  { r: 41,  g: 46,  b: 50  }, // #292E32 Graphite
      border:  { r: 17,  g: 19,  b: 21,  a: 0.14 },
      surface: { r: 233, g: 238, b: 232, a: 0.45 },
      glow:    0.05
    },
    {
      /* Stage 5: 100% Scroll — Final Sections & Bottom (Pure White #FFFFFF) */
      p: 1.00,
      bg:      { r: 255, g: 255, b: 255 }, // #FFFFFF Pure White
      text:    { r: 17,  g: 19,  b: 21  }, // #111315 Carbon
      subtext: { r: 41,  g: 46,  b: 50  }, // #292E32 Graphite
      muted:   { r: 78,  g: 89,  b: 82  }, // #4E5952 Dark Muted Green
      accent:  { r: 41,  g: 46,  b: 50  }, // #292E32 Graphite
      border:  { r: 17,  g: 19,  b: 21,  a: 0.14 },
      surface: { r: 233, g: 238, b: 232, a: 0.55 },
      glow:    0.0
    }
  ];

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function lerpRGB(c1, c2, t) {
    return {
      r: Math.round(lerp(c1.r, c2.r, t)),
      g: Math.round(lerp(c1.g, c2.g, t)),
      b: Math.round(lerp(c1.b, c2.b, t))
    };
  }

  function lerpRGBA(c1, c2, t) {
    return {
      r: Math.round(lerp(c1.r, c2.r, t)),
      g: Math.round(lerp(c1.g, c2.g, t)),
      b: Math.round(lerp(c1.b, c2.b, t)),
      a: lerp(c1.a, c2.a, t)
    };
  }

  function toHexByte(n) {
    const h = clamp(Math.round(n), 0, 255).toString(16);
    return h.length === 1 ? '0' + h : h;
  }

  function rgbToHex(c) {
    return '#' + (toHexByte(c.r) + toHexByte(c.g) + toHexByte(c.b)).toUpperCase();
  }

  function rgbString(c) {
    return 'rgb(' + c.r + ', ' + c.g + ', ' + c.b + ')';
  }

  function rgbaString(c, aOverride) {
    const alpha = typeof aOverride === 'number' ? aOverride : c.a;
    return 'rgba(' + c.r + ', ' + c.g + ', ' + c.b + ', ' + alpha.toFixed(3) + ')';
  }

  /* ------------------------------------------------------------------------
     1. CONTINUOUS SCROLL-LINKED COLOUR & CONTRAST INTERPOLATOR
     Directly maps overall scroll progress (0.0 -> 1.0) across the 6 stops:
     #111315 -> #292E32 -> #66736A -> #E9EEE8 -> #FFFFFF -> #FFFFFF
     ------------------------------------------------------------------------ */
  function initScrollColorEngine() {
    if (!document.querySelector('.ambient-canvas-backdrop')) {
      const backdrop = document.createElement('div');
      backdrop.className = 'ambient-canvas-backdrop';
      backdrop.setAttribute('aria-hidden', 'true');

      const glow = document.createElement('div');
      glow.className = 'ambient-canvas-glow';
      glow.setAttribute('aria-hidden', 'true');

      document.body.prepend(glow);
      document.body.prepend(backdrop);
    }

    document.body.classList.add('has-scroll-canvas');
    const rootStyle = document.documentElement.style;
    const backdropEl = document.querySelector('.ambient-canvas-backdrop');

    function computeStateAtProgress(progress) {
      const p = clamp(progress, 0, 1);

      let s0 = SCROLL_STOPS[0];
      let s1 = SCROLL_STOPS[SCROLL_STOPS.length - 1];
      let localT = 0;

      if (p <= 0) {
        s0 = SCROLL_STOPS[0];
        s1 = SCROLL_STOPS[0];
        localT = 0;
      } else if (p >= 1) {
        s0 = SCROLL_STOPS[SCROLL_STOPS.length - 1];
        s1 = SCROLL_STOPS[SCROLL_STOPS.length - 1];
        localT = 1;
      } else {
        for (let i = 0; i < SCROLL_STOPS.length - 1; i++) {
          const a = SCROLL_STOPS[i];
          const b = SCROLL_STOPS[i + 1];
          if (p >= a.p && p <= b.p) {
            s0 = a;
            s1 = b;
            localT = (p - a.p) / Math.max(b.p - a.p, 0.0001);
            break;
          }
        }
      }

      /* Relative luminance & contrast-guarded foreground calculation
         Prevents mid-grey text on mid-tone backgrounds between 20% and 40% scroll */
      const bgRGB = lerpRGB(s0.bg, s1.bg, localT);
      const borderRGBA = lerpRGBA(s0.border, s1.border, localT);
      const surfaceRGBA = lerpRGBA(s0.surface, s1.surface, localT);
      const glowOpacity = lerp(s0.glow, s1.glow, localT);

      /* Compute WCAG relative luminance of current interpolated background */
      const srgb = [bgRGB.r / 255, bgRGB.g / 255, bgRGB.b / 255].map(function (c) {
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      const bgLum = 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];

      /* Contrast-tested foreground selection (Carbon & Volt):
         - When bgLum < 0.179, light foregrounds (Pure White #FFFFFF / Soft Sage #E9EEE8 / Volt Lime #C7F169) provide higher contrast.
         - When bgLum >= 0.179, dark foregrounds (Carbon #111315 / Graphite #292E32 / Dark Muted Green) provide higher contrast.
         Never pass through mid-grey so contrast stays >= 4.5:1 across all intermediate scroll positions. */
      let textRGB, subRGB, mutedRGB, accentRGB;
      if (bgLum < 0.179) {
        const darkT = clamp(bgLum / 0.179, 0, 1);
        textRGB   = lerpRGB({ r: 255, g: 255, b: 255 }, { r: 255, g: 255, b: 255 }, darkT);
        subRGB    = lerpRGB({ r: 233, g: 238, b: 232 }, { r: 244, g: 247, b: 243 }, darkT);
        mutedRGB  = lerpRGB({ r: 233, g: 238, b: 232 }, { r: 244, g: 247, b: 243 }, darkT);
        accentRGB = lerpRGB({ r: 199, g: 241, b: 105 }, { r: 215, g: 248, b: 138 }, darkT);
      } else {
        const lightT = clamp((bgLum - 0.179) / (1 - 0.179), 0, 1);
        textRGB   = lerpRGB({ r: 12,  g: 14,  b: 15  }, { r: 17,  g: 19,  b: 21  }, lightT);
        subRGB    = lerpRGB({ r: 17,  g: 19,  b: 21  }, { r: 41,  g: 46,  b: 50  }, lightT);
        mutedRGB  = lerpRGB({ r: 28,  g: 32,  b: 30  }, { r: 78,  g: 89,  b: 82  }, lightT);
        accentRGB = lerpRGB({ r: 17,  g: 19,  b: 21  }, { r: 41,  g: 46,  b: 50  }, lightT);
      }

      const bgHex = rgbToHex(bgRGB);

      rootStyle.setProperty('--dynamic-bg', bgHex);
      rootStyle.setProperty('--dynamic-text', rgbString(textRGB));
      rootStyle.setProperty('--dynamic-subtext', rgbString(subRGB));
      rootStyle.setProperty('--dynamic-muted', rgbString(mutedRGB));
      rootStyle.setProperty('--dynamic-accent', rgbString(accentRGB));
      rootStyle.setProperty('--dynamic-border', rgbaString(borderRGBA));
      rootStyle.setProperty('--dynamic-surface', rgbaString(surfaceRGBA));
      rootStyle.setProperty('--dynamic-glow-opacity', glowOpacity.toFixed(3));

      /* Apply background colour directly to documentElement, body, and shared fixed backdrop */
      document.documentElement.style.backgroundColor = bgHex;
      if (document.body) {
        document.body.style.backgroundColor = bgHex;
      }
      if (backdropEl) {
        backdropEl.style.backgroundColor = bgHex;
      }

      /* Coordinate Hero Saturn orbital rings contrast during initial scroll (Carbon & Volt) */
      const heroLightBlend = clamp((p - 0.15) / 0.35, 0, 1);
      const orbitalWordFrontRGB = lerpRGB({ r: 255, g: 255, b: 255 }, { r: 17, g: 19, b: 21 }, heroLightBlend);
      const orbitalWordBackRGB  = lerpRGB({ r: 233, g: 238, b: 232 }, { r: 41, g: 46, b: 50 }, heroLightBlend);
      const orbitalRingLineRGB  = lerpRGB({ r: 233, g: 238, b: 232 }, { r: 41, g: 46, b: 50 }, heroLightBlend);
      const orbitalRingAccRGB   = lerpRGB({ r: 199, g: 241, b: 105 }, { r: 17, g: 19, b: 21 }, heroLightBlend);

      rootStyle.setProperty('--orbital-ring-line', rgbaString(orbitalRingLineRGB, lerp(0.3, 0.36, heroLightBlend)));
      rootStyle.setProperty('--orbital-ring-highlight', rgbaString(orbitalWordBackRGB, lerp(0.38, 0.44, heroLightBlend)));
      rootStyle.setProperty('--orbital-ring-accent', rgbaString(orbitalRingAccRGB, lerp(0.44, 0.4, heroLightBlend)));
      rootStyle.setProperty('--orbital-ring-subtle', rgbaString(orbitalRingLineRGB, lerp(0.2, 0.26, heroLightBlend)));
      rootStyle.setProperty('--orbital-node-color', rgbString(orbitalWordFrontRGB));

      return {
        progress: p,
        bgHex: bgHex,
        textRGB: rgbString(textRGB),
        subtextRGB: rgbString(subRGB),
        accentRGB: rgbString(accentRGB)
      };
    }

    function getScrollProgress() {
      const scrollY = Math.max(window.scrollY || window.pageYOffset || 0, 0);
      const docEl = document.documentElement;
      const bodyEl = document.body;
      const scrollHeight = Math.max(
        docEl.scrollHeight,
        bodyEl ? bodyEl.scrollHeight : 0
      );
      const maxScroll = Math.max(scrollHeight - window.innerHeight, 1);
      return clamp(scrollY / maxScroll, 0, 1);
    }

    function updateFromScroll() {
      return computeStateAtProgress(getScrollProgress());
    }

    /* Expose deterministic test/inspection hook for scroll progress verification */
    window.__BROSEO_SCROLL_ENGINE__ = {
      getProgress: getScrollProgress,
      evaluateAtProgress: computeStateAtProgress,
      updateNow: updateFromScroll,
      stops: SCROLL_STOPS
    };

    let ticking = false;
    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          window.requestAnimationFrame(function () {
            updateFromScroll();
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );

    window.addEventListener('resize', updateFromScroll, { passive: true });
    window.addEventListener('orientationchange', updateFromScroll, { passive: true });
    window.addEventListener('load', updateFromScroll);

    if ('ResizeObserver' in window && document.body) {
      const ro = new ResizeObserver(function () {
        updateFromScroll();
      });
      ro.observe(document.body);
    }

    updateFromScroll();
  }

  /* ------------------------------------------------------------------------
     2. FLOATING INTERACTIVE "SEO" TYPOGRAPHY & SATURN ORBITAL RINGS
     Preserves the existing SEO typography and Saturn rings while scaling
     3D offsets proportionally to viewport width during window resize.
     ------------------------------------------------------------------------ */
  function initKineticSEOHero() {
    const arena = document.getElementById('seo-kinetic-arena');
    if (!arena) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const letterNodes = Array.from(arena.querySelectorAll('[data-seo-letter]'));
    const saturnRings = Array.from(arena.querySelectorAll('[data-saturn-ring]'));
    const orbitRing = arena.querySelector('.seo-arena-orbit');

    function getViewportScale() {
      return clamp((window.innerWidth || 1280) / 1280, 0.35, 1);
    }

    function applySaturnRingTransforms(cx, cy, sp) {
      const vScale = getViewportScale();
      saturnRings.forEach(function (ring, idx) {
        const baseX = parseFloat(ring.getAttribute('data-tilt-x') || '68');
        const baseY = parseFloat(ring.getAttribute('data-tilt-y') || '0');
        const baseZ = parseFloat(ring.getAttribute('data-tilt-z') || '0');
        const depthZ = parseFloat(ring.getAttribute('data-depth') || '0') * vScale;

        const dir = idx % 2 === 0 ? 1 : -1;
        const rotX = baseX - cy * 7.5 + sp * 9;
        const rotY = baseY + cx * 11 * dir;
        const rotZ = baseZ + cx * 5 * dir + sp * (14 * dir);
        const shiftX = cx * (depthZ * 0.28);
        const shiftY = cy * (depthZ * 0.22) - sp * (24 * vScale);

        ring.style.transform =
          'translate3d(' +
          shiftX.toFixed(2) + 'px, ' +
          shiftY.toFixed(2) + 'px, ' +
          depthZ.toFixed(1) + 'px) ' +
          'rotateX(' + rotX.toFixed(2) + 'deg) ' +
          'rotateY(' + rotY.toFixed(2) + 'deg) ' +
          'rotateZ(' + rotZ.toFixed(2) + 'deg)';
      });
    }

    applySaturnRingTransforms(0, 0, 0);

    letterNodes.forEach(function (node) {
      node.addEventListener(
        'touchstart',
        function () {
          letterNodes.forEach(function (n) { n.classList.remove('is-touched'); });
          node.classList.add('is-touched');
          setTimeout(function () {
            node.classList.remove('is-touched');
          }, 900);
        },
        { passive: true }
      );
    });

    if (prefersReducedMotion) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let scrollProgress = 0;
    let rafId = null;

    function kickLoop() {
      if (!rafId) {
        rafId = window.requestAnimationFrame(renderKineticFrame);
      }
    }

    function renderKineticFrame() {
      rafId = null;
      const vScale = getViewportScale();
      currentX += (targetX - currentX) * 0.085;
      currentY += (targetY - currentY) * 0.085;

      letterNodes.forEach(function (node, idx) {
        const depth = parseFloat(node.getAttribute('data-depth') || '1');
        const spreadDir = idx === 0 ? -1 : idx === 2 ? 1 : 0;
        const scrollShiftX = spreadDir * scrollProgress * (42 * vScale);
        const scrollShiftY = -scrollProgress * (48 + idx * 12) * vScale;
        const scrollRotZ = spreadDir * scrollProgress * 6;

        const moveX = currentX * 26 * depth * vScale + scrollShiftX;
        const moveY = currentY * 20 * depth * vScale + scrollShiftY;
        const rotY = currentX * 15 * depth;
        const rotX = -currentY * 13 * depth;

        node.style.transform =
          'translate3d(' +
          moveX.toFixed(2) + 'px, ' +
          moveY.toFixed(2) + 'px, ' +
          (depth * 18 * vScale).toFixed(1) + 'px) ' +
          'rotateX(' + rotX.toFixed(2) + 'deg) ' +
          'rotateY(' + rotY.toFixed(2) + 'deg) ' +
          'rotateZ(' + scrollRotZ.toFixed(2) + 'deg)';
      });

      applySaturnRingTransforms(currentX, currentY, scrollProgress);

      if (orbitRing) {
        const ringRotY = currentX * 10;
        const ringRotX = 62 - currentY * 8;
        orbitRing.style.transform =
          'rotateX(' + ringRotX.toFixed(2) + 'deg) rotateY(' + ringRotY.toFixed(2) + 'deg) rotateZ(-8deg)';
      }

      if (
        Math.abs(targetX - currentX) > 0.002 ||
        Math.abs(targetY - currentY) > 0.002
      ) {
        kickLoop();
      }
    }

    window.addEventListener(
      'resize',
      function () {
        const sy = window.scrollY || window.pageYOffset;
        scrollProgress = clamp(sy / Math.max(window.innerHeight * 0.95, 1), 0, 1.4);
        kickLoop();
      },
      { passive: true }
    );

    if (!isCoarsePointer) {
      window.addEventListener(
        'pointermove',
        function (e) {
          const nx = (e.clientX / window.innerWidth) * 2 - 1;
          const ny = (e.clientY / window.innerHeight) * 2 - 1;
          targetX = clamp(nx, -1, 1);
          targetY = clamp(ny, -1, 1);

          document.documentElement.style.setProperty('--cursor-x', ((e.clientX / window.innerWidth) * 100).toFixed(1) + '%');
          document.documentElement.style.setProperty('--cursor-y', ((e.clientY / window.innerHeight) * 100).toFixed(1) + '%');

          kickLoop();
        },
        { passive: true }
      );
    }

    arena.addEventListener(
      'touchmove',
      function (e) {
        if (!e.touches || !e.touches[0]) return;
        const touch = e.touches[0];
        const nx = (touch.clientX / window.innerWidth) * 2 - 1;
        const ny = (touch.clientY / window.innerHeight) * 2 - 1;
        targetX = clamp(nx * 0.65, -1, 1);
        targetY = clamp(ny * 0.65, -1, 1);
        kickLoop();
      },
      { passive: true }
    );

    window.addEventListener(
      'scroll',
      function () {
        const sy = window.scrollY || window.pageYOffset;
        scrollProgress = clamp(sy / (window.innerHeight * 0.95), 0, 1.4);
        kickLoop();
      },
      { passive: true }
    );
  }

  /* ------------------------------------------------------------------------
     2B. BROSEO BUSINESS STUDIO — CINEMATIC 3D PERSPECTIVE, FASTER AUTONOMOUS
         MOTION & RANDOMIZED INDIVIDUAL LETTER VERTICAL DRIFT
     - Faster whole-title cinematic 3D movement + more immediate cursor response.
     - Individual letters gently move up and down independently (2–5px) with
       irregular, randomized phases, speeds, and dwell pauses (never a uniform
       wave).
     - Nested transform hierarchy: 3D perspective on #hero-studio-title,
       vertical float on .studio-title-char spans — zero transform conflict.
     ------------------------------------------------------------------------ */
  function initStudioTitleCinematicDepth() {
    const heroStage = document.querySelector('.hero-stage');
    const centerpiece = document.getElementById('hero-studio-centerpiece');
    const titleEl = document.getElementById('hero-studio-title');
    if (!heroStage || !centerpiece || !titleEl) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    /* Build individual letter spans inside primary (BROSEO) and secondary (BUSINESS STUDIO) tiers */
    const rawText = (titleEl.getAttribute('data-text') || 'BROSEO BUSINESS STUDIO').trim();
    const charStates = [];

    if (!prefersReducedMotion && !titleEl.classList.contains('has-char-spans')) {
      titleEl.setAttribute('aria-label', rawText);
      titleEl.classList.add('has-char-spans');

      /* Non-monotonic scrambled seed offsets so adjacent letters never form a synchronized wave */
      const scrambledSeeds = [
        0.73, 0.19, 0.91, 0.42, 0.08, 0.64,
        0.31, 0.85, 0.14, 0.57, 0.96, 0.27, 0.69, 0.48,
        0.11, 0.79, 0.36, 0.93, 0.52, 0.22
      ];

      let globalCharIdx = 0;

      function populateTierCharacters(tierEl, tierText, isPrimaryTier) {
        if (!tierEl) return;
        tierEl.innerHTML = '';
        tierEl.setAttribute('aria-hidden', 'true');

        const words = tierText.trim().split(/\s+/);
        words.forEach(function (word, wIdx) {
          const wordSpan = document.createElement('span');
          wordSpan.className = 'studio-title-word';

          for (let c = 0; c < word.length; c++) {
            const ch = word.charAt(c);
            const charSpan = document.createElement('span');
            charSpan.className = 'studio-title-char';
            charSpan.setAttribute('data-char', ch);
            charSpan.style.setProperty('--char-index', String(globalCharIdx));

            const inkSpan = document.createElement('span');
            inkSpan.className = 'studio-title-char-ink';
            inkSpan.textContent = ch;
            charSpan.appendChild(inkSpan);
            wordSpan.appendChild(charSpan);

            const seedA = scrambledSeeds[globalCharIdx % scrambledSeeds.length];
            const seedB = scrambledSeeds[(globalCharIdx * 7 + 3) % scrambledSeeds.length];
            const jitter = (Math.random() - 0.5) * 0.18;

            /* Primary BROSEO & Secondary BUSINESS STUDIO letters (Play Jack by NoahType — static display font, no synthetic weight distortion):
               Primary BROSEO: 2.4–4.8px vertical float.
               Secondary BUSINESS STUDIO: 1.5–2.8px vertical float. */
            const minAmp = isPrimaryTier ? 2.4 : 1.5;
            const ampRange = isPrimaryTier ? 2.4 : 1.3;
            const wghtBase = 400;
            const wghtAmp = 0;

            charStates.push({
              el: charSpan,
              isPrimary: isPrimaryTier,
              amp: minAmp + clamp(seedA + jitter, 0, 1) * ampRange,
              freq1: 1.38 + seedB * 0.88 + (Math.random() - 0.5) * 0.16,
              freq2: 0.74 + seedA * 0.62 + (Math.random() - 0.5) * 0.12,
              phase1: (seedA * 6.28318) + Math.random() * 0.9,
              phase2: (seedB * 6.28318) + Math.random() * 0.9,
              wghtBase: wghtBase,
              wghtAmp: wghtAmp,
              wghtFreq: 0.52 + seedA * 0.34,
              wghtPhase: seedB * 6.28318
            });

            globalCharIdx++;
          }

          tierEl.appendChild(wordSpan);

          if (wIdx < words.length - 1) {
            const spaceSpan = document.createElement('span');
            spaceSpan.className = 'studio-title-space';
            spaceSpan.textContent = ' ';
            tierEl.appendChild(spaceSpan);
          }
        });
      }

      const primaryTier = titleEl.querySelector('.hero-title-primary');
      const secondaryTier = titleEl.querySelector('.hero-title-secondary');

      if (primaryTier && secondaryTier) {
        populateTierCharacters(primaryTier, primaryTier.getAttribute('data-primary-word') || 'BROSEO', true);
        populateTierCharacters(secondaryTier, secondaryTier.getAttribute('data-secondary-words') || 'BUSINESS STUDIO', false);
      } else {
        populateTierCharacters(titleEl, rawText, true);
      }
    }

    let isHeroVisible = true;
    let pointerX = 0;
    let pointerY = 0;
    let currentX = 0;
    let currentY = 0;
    let cursorActivity = 0;
    let lastPointerTime = 0;
    let scrollFactor = 0;
    let rafId = null;
    const startTime = performance.now();

    /* Pause continuous light sweep & RAF loop when hero leaves viewport */
    if ('IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            isHeroVisible = entry.isIntersecting;
            centerpiece.classList.toggle('is-offscreen', !isHeroVisible);
            if (!isHeroVisible) {
              pointerX = 0;
              pointerY = 0;
            } else if (!prefersReducedMotion) {
              kickTitleLoop();
            }
          });
        },
        { threshold: 0.02 }
      );
      heroObserver.observe(heroStage);
    }

    if (prefersReducedMotion) return;

    function kickTitleLoop() {
      if (!rafId && isHeroVisible && !document.hidden) {
        rafId = window.requestAnimationFrame(renderTitleFrame);
      }
    }

    function renderTitleFrame(now) {
      rafId = null;
      const t = (now - startTime) * 0.001;

      /* Faster cursor attack (0.22) and smooth decay (0.048) for more immediate cursor response */
      const elapsedSincePointer = now - lastPointerTime;
      const targetActivity = elapsedSincePointer < 180 ? 1 : 0;
      cursorActivity += (targetActivity - cursorActivity) * (targetActivity > cursorActivity ? 0.22 : 0.048);

      /* When cursor becomes inactive, gently relax pointer target back toward center */
      const effectiveTargetX = pointerX * (0.25 + 0.75 * cursorActivity);
      const effectiveTargetY = pointerY * (0.25 + 0.75 * cursorActivity);

      /* Increased spring responsiveness (damping = 0.115) for immediate yet smooth 3D tracking */
      currentX += (effectiveTargetX - currentX) * 0.115;
      currentY += (effectiveTargetY - currentY) * 0.115;

      /* Slightly faster multi-harmonic waves for organic autonomous title movement */
      const idleWaveX = 0.64 * Math.sin(t * 1.04) + 0.36 * Math.cos(t * 0.63 + 0.8);
      const idleWaveY = 0.58 * Math.cos(t * 0.84 + 0.4) + 0.42 * Math.sin(t * 0.57 + 1.7);
      const idleWaveZ = 0.60 * Math.sin(t * 0.72 + 1.2) + 0.40 * Math.cos(t * 0.45);

      const scrollWeight = clamp(1 - scrollFactor * 1.1, 0, 1);
      const idleBlend = (1 - cursorActivity * 0.58) * scrollWeight;
      const cursorBlend = scrollWeight;

      /* Autonomous idle 3D components */
      const idleTx = idleWaveX * 2.8 * idleBlend;
      const idleTy = idleWaveY * 2.2 * idleBlend;
      const idleTz = idleWaveZ * 5.0 * idleBlend;
      const idleRotX = -idleWaveY * 1.15 * idleBlend;
      const idleRotY = idleWaveX * 1.65 * idleBlend;
      const idleRotZ = idleWaveZ * 0.28 * idleBlend;

      /* Cursor-led 3D components */
      const cursorTx = currentX * 4.8 * cursorBlend;
      const cursorTy = currentY * 3.8 * cursorBlend;
      const cursorRotX = -currentY * 1.95 * cursorBlend;
      const cursorRotY = currentX * 2.9 * cursorBlend;

      /* Unified outer title transform composition */
      const totalTx = clamp(idleTx + cursorTx, -5.8, 5.8);
      const totalTy = clamp(idleTy + cursorTy, -4.8, 4.8) - scrollFactor * 16;
      const totalTz = clamp(idleTz, -6.5, 6.5);
      const totalRotX = clamp(idleRotX + cursorRotX, -2.3, 2.3);
      const totalRotY = clamp(idleRotY + cursorRotY, -3.3, 3.3);
      const totalRotZ = clamp(idleRotZ, -0.38, 0.38);
      const opacity = clamp(1 - scrollFactor * 0.42, 0.35, 1);

      titleEl.style.transform =
        'translate3d(' +
        totalTx.toFixed(2) + 'px, ' +
        totalTy.toFixed(2) + 'px, ' +
        totalTz.toFixed(2) + 'px) ' +
        'rotateX(' + totalRotX.toFixed(2) + 'deg) ' +
        'rotateY(' + totalRotY.toFixed(2) + 'deg) ' +
        'rotateZ(' + totalRotZ.toFixed(2) + 'deg)';
      titleEl.style.opacity = opacity.toFixed(3);

      /* Update randomized individual letter vertical movement + variable-font weight breathing */
      if (charStates.length) {
        const vLetterScale = clamp((window.innerWidth || 1280) / 1100, 0.55, 1) * scrollWeight;
        for (let i = 0; i < charStates.length; i++) {
          const cs = charStates[i];
          /* Dual-frequency vertical wave with soft dwell pauses at crests/troughs */
          const w1 = Math.sin(t * cs.freq1 + cs.phase1);
          const w2 = Math.cos(t * cs.freq2 + cs.phase2);
          const composite = 0.68 * w1 + 0.32 * w2;
          const dy = composite * cs.amp * vLetterScale;

          /* Slow, continuous variable-font weight breathing on genuine OpenType wght axis */
          const wghtWave = Math.sin(t * cs.wghtFreq + cs.wghtPhase);
          const wghtVal = Math.round(cs.wghtBase + wghtWave * cs.wghtAmp);

          cs.el.style.transform = 'translate3d(0, ' + dy.toFixed(2) + 'px, 0)';
          cs.el.style.setProperty('--char-wght', String(wghtVal));
        }
      }

      /* Continue autonomous loop only while hero is visible in viewport */
      if (isHeroVisible && !document.hidden) {
        kickTitleLoop();
      }
    }

    /* Desktop-only cursor tracking relative to the hero section */
    if (!isCoarsePointer) {
      heroStage.addEventListener(
        'pointermove',
        function (e) {
          if (!isHeroVisible) return;
          const rect = heroStage.getBoundingClientRect();
          const nx = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
          const ny = ((e.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1;
          pointerX = clamp(nx, -1, 1);
          pointerY = clamp(ny, -1, 1);
          lastPointerTime = performance.now();
          kickTitleLoop();
        },
        { passive: true }
      );

      heroStage.addEventListener(
        'pointerleave',
        function () {
          pointerX = 0;
          pointerY = 0;
          lastPointerTime = 0;
          kickTitleLoop();
        },
        { passive: true }
      );
    }

    document.addEventListener('visibilitychange', function () {
      if (!document.hidden && isHeroVisible) {
        kickTitleLoop();
      }
    });

    function updateScrollCoordination() {
      const sy = Math.max(window.scrollY || window.pageYOffset || 0, 0);
      const heroHeight = Math.max(heroStage.offsetHeight || window.innerHeight, 1);
      scrollFactor = clamp(sy / (heroHeight * 0.75), 0, 1);
      if (isHeroVisible) {
        kickTitleLoop();
      }
    }

    window.addEventListener('scroll', updateScrollCoordination, { passive: true });
    window.addEventListener('resize', updateScrollCoordination, { passive: true });
    updateScrollCoordination();
    kickTitleLoop();
  }

  /* ------------------------------------------------------------------------
     2C. REUSABLE SHARED PAGE-HEADING ANIMATION SYSTEM (FIVE INNER PAGES)
     Applies the BROSEO Sora variable typography & restrained cinematic motion
     to the opening titles across:
     1. About BROSEO (about.html)
     2. Our Services (services.html)
     3. Portfolio & Case Files (work.html)
     4. Working Process (process.html)
     5. Commercial Offering (engagement.html)
     ------------------------------------------------------------------------ */
  function initSharedPageHeadings() {
    const headingEls = Array.from(document.querySelectorAll('[data-broseo-heading]'));
    if (!headingEls.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const heroBanner = document.querySelector('.service-hero-banner') || headingEls[0].closest('section') || document.body;

    const scrambledSeeds = [
      0.68, 0.21, 0.89, 0.44, 0.12, 0.77,
      0.34, 0.92, 0.17, 0.59, 0.83, 0.28, 0.71, 0.49,
      0.15, 0.81, 0.39, 0.95, 0.54, 0.25
    ];

    const headingControllers = [];

    headingEls.forEach(function (el) {
      if (el.classList.contains('has-broseo-chars')) return;
      const fullLabel = (el.textContent || '').replace(/\s+/g, ' ').trim();
      if (!fullLabel) return;

      const isKicker = el.getAttribute('data-intensity') === 'kicker';
      const charStates = [];
      let charCounter = 0;

      if (!prefersReducedMotion) {
        el.setAttribute('aria-label', fullLabel);
        el.classList.add('has-broseo-chars');

        function tokenizeContainer(containerNode) {
          const childNodes = Array.from(containerNode.childNodes);
          containerNode.innerHTML = '';

          childNodes.forEach(function (node) {
            if (node.nodeType === 3) {
              /* Text node: split into words and preserve leading/trailing spaces */
              const text = (node.nodeValue || '').replace(/\s+/g, ' ');
              if (!text) return;

              const tokens = text.split(' ');
              tokens.forEach(function (word, idx) {
                if (word.length > 0) {
                  const wordSpan = document.createElement('span');
                  wordSpan.className = 'broseo-heading-word';
                  wordSpan.setAttribute('aria-hidden', 'true');

                  for (let c = 0; c < word.length; c++) {
                    const ch = word.charAt(c);
                    const charSpan = document.createElement('span');
                    charSpan.className = 'broseo-heading-char';
                    charSpan.setAttribute('data-char', ch);
                    charSpan.style.setProperty('--char-index', String(charCounter));

                    const inkSpan = document.createElement('span');
                    inkSpan.className = 'broseo-heading-char-ink';
                    inkSpan.textContent = ch;
                    charSpan.appendChild(inkSpan);
                    wordSpan.appendChild(charSpan);

                    const seedA = scrambledSeeds[charCounter % scrambledSeeds.length];
                    const seedB = scrambledSeeds[(charCounter * 7 + 5) % scrambledSeeds.length];
                    const jitter = (Math.random() - 0.5) * 0.14;

                    /* Restrained inner-page vertical amplitude:
                       Main heading: 1.1px – 2.25px | Opening kicker: 0.85px – 1.7px
                       Variable Sora weight breathing: 615 (Semibold) <-> 725 (Bold) */
                    const minAmp = isKicker ? 0.85 : 1.1;
                    const ampSpan = isKicker ? 0.85 : 1.15;
                    const wghtBase = isKicker ? 655 : 670;
                    const wghtAmp = isKicker ? 45 : 55;

                    charStates.push({
                      el: charSpan,
                      amp: minAmp + clamp(seedA + jitter, 0, 1) * ampSpan,
                      freq1: 1.24 + seedB * 0.72 + (Math.random() - 0.5) * 0.12,
                      freq2: 0.68 + seedA * 0.54 + (Math.random() - 0.5) * 0.1,
                      phase1: (seedA * 6.28318) + Math.random() * 0.8,
                      phase2: (seedB * 6.28318) + Math.random() * 0.8,
                      wghtBase: wghtBase,
                      wghtAmp: wghtAmp,
                      wghtFreq: 0.48 + seedA * 0.3,
                      wghtPhase: seedB * 6.28318
                    });

                    charCounter++;
                  }

                  containerNode.appendChild(wordSpan);
                }

                if (idx < tokens.length - 1) {
                  const spaceSpan = document.createElement('span');
                  spaceSpan.className = 'broseo-heading-space';
                  spaceSpan.setAttribute('aria-hidden', 'true');
                  spaceSpan.textContent = ' ';
                  containerNode.appendChild(spaceSpan);
                }
              });
            } else if (node.nodeType === 1) {
              /* Element node (e.g., <span class="serif-accent text-blush">): clone wrapper & tokenize children */
              const cloneEl = node.cloneNode(true);
              cloneEl.setAttribute('aria-hidden', 'true');
              tokenizeContainer(cloneEl);
              containerNode.appendChild(cloneEl);
            }
          });
        }

        tokenizeContainer(el);
      }

      headingControllers.push({
        el: el,
        isKicker: isKicker,
        chars: charStates
      });
    });

    if (prefersReducedMotion) return;

    let isVisible = true;
    let pointerX = 0;
    let pointerY = 0;
    let currentX = 0;
    let currentY = 0;
    let cursorActivity = 0;
    let lastPointerTime = 0;
    let scrollFactor = 0;
    let rafId = null;
    const startTime = performance.now();

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            isVisible = entry.isIntersecting;
            heroBanner.classList.toggle('is-offscreen', !isVisible);
            if (!isVisible) {
              pointerX = 0;
              pointerY = 0;
            } else {
              kickLoop();
            }
          });
        },
        { threshold: 0.02 }
      );
      obs.observe(heroBanner);
    }

    function kickLoop() {
      if (!rafId && isVisible && !document.hidden) {
        rafId = window.requestAnimationFrame(renderFrame);
      }
    }

    function renderFrame(now) {
      rafId = null;
      const t = (now - startTime) * 0.001;

      const elapsed = now - lastPointerTime;
      const targetAct = elapsed < 180 ? 1 : 0;
      cursorActivity += (targetAct - cursorActivity) * (targetAct > cursorActivity ? 0.2 : 0.045);

      const effX = pointerX * (0.25 + 0.75 * cursorActivity);
      const effY = pointerY * (0.25 + 0.75 * cursorActivity);

      currentX += (effX - currentX) * 0.1;
      currentY += (effY - currentY) * 0.1;

      /* Restrained multi-harmonic autonomous movement for inner page headings */
      const idleWaveX = 0.64 * Math.sin(t * 0.92) + 0.36 * Math.cos(t * 0.56 + 0.7);
      const idleWaveY = 0.58 * Math.cos(t * 0.76 + 0.3) + 0.42 * Math.sin(t * 0.49 + 1.5);
      const idleWaveZ = 0.60 * Math.sin(t * 0.64 + 1.1) + 0.40 * Math.cos(t * 0.39);

      const scrollWeight = clamp(1 - scrollFactor * 1.1, 0, 1);
      const idleBlend = (1 - cursorActivity * 0.55) * scrollWeight;
      const cursorBlend = scrollWeight;
      const vScale = clamp((window.innerWidth || 1280) / 1150, 0.55, 1) * scrollWeight;

      for (let h = 0; h < headingControllers.length; h++) {
        const ctrl = headingControllers[h];
        const intensity = ctrl.isKicker ? 0.72 : 1.0;

        const tx = clamp((idleWaveX * 1.5 * idleBlend + currentX * 2.8 * cursorBlend) * intensity, -3.5, 3.5);
        const ty = clamp((idleWaveY * 1.2 * idleBlend + currentY * 2.2 * cursorBlend) * intensity, -2.8, 2.8) - scrollFactor * (8 * intensity);
        const tz = clamp(idleWaveZ * 2.6 * idleBlend * intensity, -3.5, 3.5);
        const rotX = clamp((-idleWaveY * 0.65 * idleBlend - currentY * 1.15 * cursorBlend) * intensity, -1.4, 1.4);
        const rotY = clamp((idleWaveX * 0.95 * idleBlend + currentX * 1.75 * cursorBlend) * intensity, -2.0, 2.0);
        const rotZ = clamp(idleWaveZ * 0.16 * idleBlend * intensity, -0.22, 0.22);

        ctrl.el.style.transform =
          'translate3d(' +
          tx.toFixed(2) + 'px, ' +
          ty.toFixed(2) + 'px, ' +
          tz.toFixed(2) + 'px) ' +
          'rotateX(' + rotX.toFixed(2) + 'deg) ' +
          'rotateY(' + rotY.toFixed(2) + 'deg) ' +
          'rotateZ(' + rotZ.toFixed(2) + 'deg)';

        const chars = ctrl.chars;
        for (let i = 0; i < chars.length; i++) {
          const cs = chars[i];
          const w1 = Math.sin(t * cs.freq1 + cs.phase1);
          const w2 = Math.cos(t * cs.freq2 + cs.phase2);
          const dy = (0.68 * w1 + 0.32 * w2) * cs.amp * vScale;
          const wghtVal = Math.round(cs.wghtBase + Math.sin(t * cs.wghtFreq + cs.wghtPhase) * cs.wghtAmp);

          cs.el.style.transform = 'translate3d(0, ' + dy.toFixed(2) + 'px, 0)';
          cs.el.style.setProperty('--char-wght', String(wghtVal));
        }
      }

      if (isVisible && !document.hidden) {
        kickLoop();
      }
    }

    if (!isCoarsePointer) {
      heroBanner.addEventListener(
        'pointermove',
        function (e) {
          if (!isVisible) return;
          const rect = heroBanner.getBoundingClientRect();
          const nx = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
          const ny = ((e.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1;
          pointerX = clamp(nx, -1, 1);
          pointerY = clamp(ny, -1, 1);
          lastPointerTime = performance.now();
          kickLoop();
        },
        { passive: true }
      );

      heroBanner.addEventListener(
        'pointerleave',
        function () {
          pointerX = 0;
          pointerY = 0;
          lastPointerTime = 0;
          kickLoop();
        },
        { passive: true }
      );
    }

    document.addEventListener('visibilitychange', function () {
      if (!document.hidden && isVisible) {
        kickLoop();
      }
    });

    function updateScroll() {
      const sy = Math.max(window.scrollY || window.pageYOffset || 0, 0);
      const h = Math.max(heroBanner.offsetHeight || window.innerHeight * 0.6, 1);
      scrollFactor = clamp(sy / (h * 0.85), 0, 1);
      if (isVisible) {
        kickLoop();
      }
    }

    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll, { passive: true });
    updateScroll();
    kickLoop();
  }

  /* ------------------------------------------------------------------------
     3. SUBTLE MAGNETIC INTERACTION FOR PRIMARY BUTTONS & CTAS (DESKTOP ONLY)
     ------------------------------------------------------------------------ */
  function initMagneticButtons() {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return;
    }

    const magnets = document.querySelectorAll('.btn-contact-cta');

    magnets.forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        el.style.transform = 'translate3d(' + (relX * 0.18).toFixed(1) + 'px, ' + (relY * 0.18).toFixed(1) + 'px, 0)';
      });

      el.addEventListener('pointerleave', function () {
        el.style.transform = '';
      });
    });
  }

  /* ------------------------------------------------------------------------
     4. MOBILE NAVIGATION DRAWER
     ------------------------------------------------------------------------ */
  function initMobileNav() {
    const toggleBtn = document.getElementById('menu-toggle');
    const drawer = document.getElementById('mobile-drawer');
    if (!toggleBtn || !drawer) return;

    function setOpen(isOpen) {
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
      drawer.setAttribute('aria-hidden', String(!isOpen));
      drawer.classList.toggle('is-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    toggleBtn.addEventListener('click', function () {
      const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      setOpen(!expanded);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggleBtn.focus();
      }
    });

    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setOpen(false);
      });
    });

    window.addEventListener(
      'resize',
      function () {
        if (window.innerWidth > 980 && toggleBtn.getAttribute('aria-expanded') === 'true') {
          setOpen(false);
        }
      },
      { passive: true }
    );
  }

  /* ------------------------------------------------------------------------
     5. SCROLL-TRIGGERED EDITORIAL REVEALS
     ------------------------------------------------------------------------ */
  function initScrollReveals() {
    const revealEls = document.querySelectorAll('[data-reveal]');
    if (!revealEls.length) return;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      revealEls.forEach(function (el) {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -6% 0px',
        threshold: 0.08
      }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ------------------------------------------------------------------------
     6. HERO SHOWCASE PROJECT SWITCHER
     ------------------------------------------------------------------------ */
  function initHeroShowcase() {
    const pills = document.querySelectorAll('[data-hero-project]');
    const heroImg = document.getElementById('hero-showcase-img');
    const heroTitle = document.getElementById('hero-showcase-title');
    const heroScope = document.getElementById('hero-showcase-scope');
    const heroUrl = document.getElementById('hero-showcase-url');

    if (!pills.length || !heroImg) return;

    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        const imgSrc = pill.getAttribute('data-img');
        const imgAlt = pill.getAttribute('data-alt');
        const title = pill.getAttribute('data-title');
        const scope = pill.getAttribute('data-scope');
        const urlLabel = pill.getAttribute('data-url');

        pills.forEach(function (p) {
          p.classList.remove('is-active');
          p.setAttribute('aria-pressed', 'false');
        });
        pill.classList.add('is-active');
        pill.setAttribute('aria-pressed', 'true');

        heroImg.style.opacity = '0.35';
        setTimeout(function () {
          if (imgSrc) heroImg.src = imgSrc;
          if (imgAlt) heroImg.alt = imgAlt;
          if (heroTitle && title) heroTitle.textContent = title;
          if (heroScope && scope) heroScope.textContent = scope;
          if (heroUrl && urlLabel) heroUrl.textContent = urlLabel;
          heroImg.style.opacity = '1';
        }, 160);
      });
    });
  }

  /* ------------------------------------------------------------------------
     7. INTERACTIVE SPLIT-SCREEN SERVICES STAGE
     ------------------------------------------------------------------------ */
  function initServicesStage() {
    const rows = document.querySelectorAll('[data-service-row]');
    const stageImg = document.getElementById('service-stage-img');
    const stageTitle = document.getElementById('service-stage-title');
    const stageScope = document.getElementById('service-stage-scope');
    const stageLink = document.getElementById('service-stage-link');
    const stageChips = document.getElementById('service-stage-chips');

    if (!rows.length || !stageTitle) return;

    function activateService(row) {
      rows.forEach(function (r) {
        r.classList.remove('is-active');
      });
      row.classList.add('is-active');

      const title = row.getAttribute('data-title');
      const scope = row.getAttribute('data-scope');
      const img = row.getAttribute('data-img');
      const href = row.getAttribute('data-href');
      const chipsRaw = row.getAttribute('data-chips') || '';

      if (stageTitle && title) stageTitle.textContent = title;
      if (stageScope && scope) stageScope.textContent = scope;
      if (stageLink && href) stageLink.setAttribute('href', href);

      if (stageImg && img) {
        stageImg.style.opacity = '0.4';
        setTimeout(function () {
          stageImg.src = img;
          stageImg.alt = title + ' preview';
          stageImg.style.opacity = '1';
        }, 140);
      }

      if (stageChips && chipsRaw) {
        stageChips.innerHTML = '';
        chipsRaw.split('|').forEach(function (chipText) {
          const span = document.createElement('span');
          span.className = 'deliverable-chip';
          span.textContent = chipText.trim();
          stageChips.appendChild(span);
        });
      }
    }

    rows.forEach(function (row) {
      row.addEventListener('mouseenter', function () {
        activateService(row);
      });
      row.addEventListener('focusin', function () {
        activateService(row);
      });
      row.addEventListener('click', function () {
        activateService(row);
      });
    });
  }

  /* ------------------------------------------------------------------------
     8. CONTACT FORM & WHATSAPP DIRECT HANDLER
     ------------------------------------------------------------------------ */
  function initContactForm() {
    const form = document.getElementById('studio-contact-form');
    const feedback = document.getElementById('form-feedback');
    const whatsappBtn = document.getElementById('whatsapp-submit-btn');

    if (!form) return;

    function collectFormData() {
      const name = (form.querySelector('[name="name"]')?.value || '').trim();
      const email = (form.querySelector('[name="email"]')?.value || '').trim();
      const business = (form.querySelector('[name="business"]')?.value || '').trim();
      const details = (form.querySelector('[name="details"]')?.value || '').trim();
      const checkedServices = [];

      form.querySelectorAll('input[name="services"]:checked').forEach(function (cb) {
        checkedServices.push(cb.value);
      });

      return {
        name: name,
        email: email,
        business: business,
        services: checkedServices.length ? checkedServices.join(', ') : 'Not specified',
        details: details
      };
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = collectFormData();

      if (!data.name || !data.email) {
        if (feedback) {
          feedback.textContent = 'Please provide your name and email address so we can respond to your inquiry.';
          feedback.classList.add('is-visible');
        }
        return;
      }

      const subject = encodeURIComponent('BROSEO Project Inquiry — ' + (data.business || data.name));
      const bodyLines = [
        'Name: ' + data.name,
        'Email: ' + data.email,
        'Business / Website: ' + (data.business || 'Not provided'),
        'Services Required: ' + data.services,
        '',
        'Project Details:',
        data.details || 'No additional notes provided.'
      ];
      const mailtoHref = 'mailto:support@monarchremote.in?subject=' + subject + '&body=' + encodeURIComponent(bodyLines.join('\n'));

      if (feedback) {
        feedback.innerHTML =
          'Your inquiry summary for <strong>BROSEO</strong> has been prepared. Opening your email client now—or use the WhatsApp option alongside to send directly via WhatsApp.';
        feedback.classList.add('is-visible');
      }

      window.location.href = mailtoHref;
    });

    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', function () {
        const data = collectFormData();
        const textLines = [
          'Hello BROSEO,',
          '',
          'Name: ' + (data.name || '[Your Name]'),
          'Email: ' + (data.email || '[Your Email]'),
          'Business / Website: ' + (data.business || '[Business / Website]'),
          'Services Required: ' + data.services,
          'Project Details: ' + (data.details || '[Project Scope]')
        ];
        const waUrl = 'https://wa.me/?text=' + encodeURIComponent(textLines.join('\n'));
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      });
    }
  }

  /* ------------------------------------------------------------------------
     INITIALIZE ON DOM READY
     ------------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    initScrollColorEngine();
    initKineticSEOHero();
    initStudioTitleCinematicDepth();
    initSharedPageHeadings();
    initMagneticButtons();
    initMobileNav();
    initScrollReveals();
    initHeroShowcase();
    initServicesStage();
    initContactForm();
  });
})();
