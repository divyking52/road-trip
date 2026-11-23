/* ==========================================================================
   CAIRN & AXLE — MULTI-PAGE INTERACTION ENGINE (assets/app.js)
   Powers shared navigation, directional left/right scroll-ins, native dialogs,
   accessible form validation, and per-page interactive modules.
   ========================================================================== */
(function () {
  'use strict';

  const DATA = window.CAIRN_AXLE_DATA || { TRIPS: [], GALLERY: [], TESTIMONIALS: [], STORIES: [], LEGAL: {} };
  const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SUPPORTS_SCROLL_TIMELINE = CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)');

  function clamp01(v) { return Math.max(0, Math.min(1, v)); }
  function escapeHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* 1. Offline SVG Fallback for Images */
  const FALLBACK_SVG = 'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#34302B"/><stop offset="55%" stop-color="#6B4431"/><stop offset="100%" stop-color="#C47752"/></linearGradient></defs><rect width="1200" height="800" fill="url(#g)"/><path d="M0 620 Q320 440 620 560 T1200 460 L1200 800 L0 800 Z" fill="#24211D" opacity="0.72"/></svg>'
  );
  function attachImageFallbacks(root = document) {
    root.querySelectorAll('img').forEach((img) => {
      if (img.dataset.fallbackBound) return;
      img.dataset.fallbackBound = '1';
      img.addEventListener('error', () => { if (img.src !== FALLBACK_SVG) img.src = FALLBACK_SVG; });
    });
  }

  /* 2. Mobile Drawer, Header Scroll Fallback & Scroll-to-Top */
  const siteHeader = document.getElementById('siteHeader');
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  function setDrawerOpen(open) {
    if (!menuToggle || !mobileDrawer) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    mobileDrawer.classList.toggle('is-open', open);
    mobileDrawer.setAttribute('aria-hidden', String(!open));
    if (!open) menuToggle.focus();
  }
  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => setDrawerOpen(menuToggle.getAttribute('aria-expanded') !== 'true'));
    mobileDrawer.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileDrawer.classList.remove('is-open');
        mobileDrawer.setAttribute('aria-hidden', 'true');
      });
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) setDrawerOpen(false);
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1080 && mobileDrawer.classList.contains('is-open')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileDrawer.classList.remove('is-open');
        mobileDrawer.setAttribute('aria-hidden', 'true');
      }
    });
  }
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: REDUCED_MOTION ? 'auto' : 'smooth' }));
  }

  /* 3. Split-Text Hero Stagger (Accessible) */
  function initSplitText() {
    const heading = document.querySelector('[data-split-text]');
    if (!heading) return;
    const fullText = heading.textContent.replace(/\s+/g, ' ').trim();
    heading.setAttribute('aria-label', fullText);
    let charIdx = 0;
    const nodes = Array.from(heading.childNodes);
    heading.innerHTML = '';
    const appendWords = (container, txt) => {
      txt.trim().split(/\s+/).filter(Boolean).forEach((w) => {
        const ws = document.createElement('span');
        ws.className = 'split-word';
        ws.setAttribute('aria-hidden', 'true');
        for (const ch of w) {
          const cs = document.createElement('span');
          cs.className = 'split-char';
          cs.textContent = ch;
          cs.style.setProperty('--char-index', charIdx++);
          ws.appendChild(cs);
        }
        container.appendChild(ws);
      });
    };
    nodes.forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) appendWords(heading, n.textContent);
      else if (n.nodeType === Node.ELEMENT_NODE) {
        const clone = n.cloneNode(false);
        appendWords(clone, n.textContent);
        heading.appendChild(clone);
      }
    });
    heading.classList.add('is-split');
  }
  initSplitText();

  /* 4. Native <dialog> Light-Dismiss Fallback & Legal Modals */
  function bindDialogEnhancements() {
    document.querySelectorAll('dialog').forEach((d) => {
      d.addEventListener('close', () => { d.returnValue = ''; });
    });
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      const outside = (e, d) => {
        const r = d.getBoundingClientRect();
        return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
      };
      document.querySelectorAll('dialog[closedby="any"]').forEach((d) => {
        let downOut = false;
        d.addEventListener('pointerdown', (e) => { downOut = outside(e, d); });
        d.addEventListener('pointerup', (e) => { if (downOut && outside(e, d)) d.close(); });
      });
    }
    const legalDialog = document.getElementById('legalDialog');
    if (legalDialog) {
      document.querySelectorAll('[data-legal]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const doc = DATA.LEGAL[btn.dataset.legal];
          if (!doc) return;
          document.getElementById('legalDialogTitle').textContent = doc.title;
          document.getElementById('legalDialogBody').innerHTML = doc.html;
          legalDialog.showModal();
        });
      });
    }
  }

  /* 5. Shared Newsletter & Editable Social Feedback */
  function initFooterUtilities() {
    const nlForm = document.getElementById('newsletterForm');
    const nlStatus = document.getElementById('newsletterStatus');
    if (nlForm && nlStatus) {
      nlForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('nl-email');
        if (!email.checkValidity()) {
          nlStatus.textContent = 'Please enter a valid email address to subscribe.';
          email.focus();
          return;
        }
        nlStatus.textContent = `Subscribed ${email.value.trim()} to Cairn & Axle's route dispatches (demo confirmation).`;
        nlForm.reset();
      });
    }
    document.querySelectorAll('[data-social-toast]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (nlStatus) nlStatus.textContent = `Editable social placeholder: ${btn.dataset.socialToast}`;
      });
    });
  }

  /* 6. Accessible Post-Interaction Validation (:user-invalid + ARIA live sync) */
  const announcer = document.createElement('div');
  announcer.setAttribute('aria-live', 'polite');
  announcer.classList.add('visually-hidden');
  document.body.append(announcer);
  let announceTimer = null;
  let announcedField = null;
  const flagged = new WeakSet();
  const announced = new WeakSet();
  const dirtyState = new WeakMap();
  const supportsUserInvalid = CSS.supports('selector(:user-invalid)');

  function linkError(el, shown) {
    const errorId = el.dataset.error;
    if (!errorId) return;
    const ids = (el.getAttribute('aria-describedby') || '').split(/\s+/).filter((id) => id && id !== errorId);
    if (shown) ids.push(errorId);
    if (ids.length) el.setAttribute('aria-describedby', ids.join(' '));
    else el.removeAttribute('aria-describedby');
  }
  function spokenText(node) {
    const copy = node.cloneNode(true);
    copy.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove());
    copy.querySelectorAll('[role="img"][aria-label]').forEach((n) => n.replaceWith(`${n.getAttribute('aria-label')}: `));
    return copy.textContent.replace(/\s+/g, ' ').trim();
  }
  function syncFieldAria(el, announce = false) {
    if (!el.matches?.('input, select, textarea')) return;
    const inv = supportsUserInvalid ? el.matches(':user-invalid') : el.classList.contains('user-invalid-fallback');
    if (inv) {
      if (announce && !announced.has(el)) {
        const err = el.dataset.error ? document.getElementById(el.dataset.error) : null;
        if (err) {
          const label = el.labels?.[0] ? `${spokenText(el.labels[0])}: ` : '';
          clearTimeout(announceTimer);
          announcer.textContent = '';
          announcedField = el;
          announceTimer = setTimeout(() => { announcer.textContent = label + spokenText(err); }, 450);
        }
        announced.add(el);
      }
      el.setAttribute('aria-invalid', 'true');
      linkError(el, true);
      flagged.add(el);
    } else if (flagged.has(el) || el.getAttribute('aria-invalid') !== 'true') {
      el.setAttribute('aria-invalid', 'false');
      linkError(el, false);
      flagged.delete(el);
      announced.delete(el);
      if (announcedField === el) { clearTimeout(announceTimer); announcer.textContent = ''; }
    }
  }
  function markFallback(el) {
    if (supportsUserInvalid || !el.validity) return;
    const ok = el.validity.valid;
    el.classList.toggle('user-invalid-fallback', !ok);
    el.classList.toggle('user-valid-fallback', ok);
  }
  document.querySelectorAll('input, select, textarea').forEach((el) => el.setAttribute('aria-invalid', 'false'));
  document.addEventListener('blur', (e) => {
    const el = e.target;
    if (!el.matches?.('input, select, textarea')) return;
    if (!supportsUserInvalid) {
      const st = dirtyState.get(el) || { interacted: false, blurred: false };
      st.blurred = true; dirtyState.set(el, st);
      if (st.interacted) markFallback(el);
    }
    syncFieldAria(el, true);
  }, true);
  document.addEventListener('input', (e) => {
    const el = e.target;
    if (!el.matches?.('input, select, textarea')) return;
    if (!supportsUserInvalid) {
      const st = dirtyState.get(el) || { interacted: false, blurred: false };
      st.interacted = true; dirtyState.set(el, st);
      if (st.blurred) markFallback(el);
    }
    if (el.hasAttribute('aria-invalid')) syncFieldAria(el);
  });
  document.addEventListener('change', (e) => {
    const el = e.target;
    if (!el.matches?.('input, select, textarea')) return;
    if (!supportsUserInvalid) { dirtyState.set(el, { interacted: true, blurred: true }); markFallback(el); }
    syncFieldAria(el, true);
  }, true);
  document.addEventListener('invalid', (e) => {
    const el = e.target;
    if (!supportsUserInvalid) { dirtyState.set(el, { interacted: true, blurred: true }); markFallback(el); }
    announced.add(el); syncFieldAria(el);
  }, true);

  function validateForm(form) {
    let firstInvalid = null;
    form.querySelectorAll('input, select, textarea').forEach((ctrl) => {
      if (!ctrl.checkValidity()) {
        ctrl.classList.add('user-invalid-fallback');
        ctrl.setAttribute('aria-invalid', 'true');
        linkError(ctrl, true);
        if (!firstInvalid) firstInvalid = ctrl;
      } else {
        ctrl.classList.remove('user-invalid-fallback');
        syncFieldAria(ctrl);
      }
    });
    if (firstInvalid) { firstInvalid.focus(); return false; }
    return true;
  }

  /* 7. Reusable Modules (Carousel, Testimonials, Gallery, Stories, Booking, Contact) */
  function initHeroWidgets() {
    const ftpTitle = document.getElementById('ftpTitle');
    if (ftpTitle && DATA.TRIPS.length) {
      let idx = 0;
      const render = () => {
        const t = DATA.TRIPS[idx];
        ftpTitle.textContent = t.title.split('&')[0].trim();
        document.getElementById('ftpCategory').textContent = t.category;
        document.getElementById('ftpDuration').textContent = `${t.duration} · ${t.distance}`;
        document.getElementById('ftpPrice').textContent = t.price;
        document.getElementById('ftpDate').textContent = t.departure;
        const coords = document.getElementById('heroLiveCoords');
        if (coords) coords.textContent = t.coords;
        const link = document.getElementById('ftpInspect');
        if (link) link.href = `trip-detail.html?id=${encodeURIComponent(t.id)}`;
      };
      render();
      document.getElementById('ftpPrev')?.addEventListener('click', () => { idx = (idx - 1 + DATA.TRIPS.length) % DATA.TRIPS.length; render(); });
      document.getElementById('ftpNext')?.addEventListener('click', () => { idx = (idx + 1) % DATA.TRIPS.length; render(); });
    }
    const tickerBand = document.getElementById('routeTickerBand');
    const tickerBtn = document.getElementById('tickerPauseBtn');
    if (tickerBand && tickerBtn) {
      tickerBtn.addEventListener('click', () => {
        const paused = tickerBand.classList.toggle('is-paused');
        tickerBtn.textContent = paused ? 'Play' : 'Pause';
      });
    }
    const heroForm = document.getElementById('heroEnquiryForm');
    if (heroForm) {
      const dateInput = document.getElementById('hero-month');
      if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];
      heroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateForm(heroForm)) return;
        const data = Object.fromEntries(new FormData(heroForm).entries());
        const q = new URLSearchParams({
          name: data.name || '',
          trip: data.destination || '',
          date: data.travelDate || '',
          phone: data.phone || ''
        });
        const status = document.getElementById('heroFormStatus');
        status.innerHTML = `<strong>Route Dossier Queued for ${escapeHtml(data.name)}!</strong> <a href="contact.html?${q.toString()}" style="text-decoration:underline;color:var(--terracotta-light);font-weight:600;margin-left:4px;">Continue to full expedition brief &rarr;</a>`;
        status.classList.add('is-visible');
      });
    }
  }

  function initPackages3D() {
    const stage = document.getElementById('packagesStage');
    if (!stage || !DATA.TRIPS.length) return;
    const routeLine = document.getElementById('packagesRouteLine');
    const routeNodes = document.getElementById('packagesRouteNodes');
    const counter = document.getElementById('pkgCounter');
    const autoBtn = document.getElementById('pkgAutoToggle');

    let visible = [...DATA.TRIPS];
    let idx = 0;
    let playing = !REDUCED_MOTION;
    let timer = null;
    let lineLen = 1040;
    if (routeLine) {
      try { lineLen = routeLine.getTotalLength(); routeLine.style.strokeDasharray = lineLen; } catch (_) {}
    }

    const NODE_COORDS = [{ x: 60, y: 24 }, { x: 256, y: 28 }, { x: 452, y: 20 }, { x: 648, y: 20 }, { x: 844, y: 29 }, { x: 1040, y: 24 }];
    if (routeNodes) {
      routeNodes.innerHTML = '';
      DATA.TRIPS.forEach((t, i) => {
        const pt = NODE_COORDS[i] || { x: 60 + i * 190, y: 24 };
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', 'route-node');
        g.setAttribute('tabindex', '0');
        g.setAttribute('role', 'button');
        g.dataset.tripId = t.id;
        g.innerHTML = `<circle cx="${pt.x}" cy="${pt.y}" r="7"></circle><text x="${pt.x}" y="49" text-anchor="middle">${t.shortName}</text>`;
        const jump = () => { visible = [...DATA.TRIPS]; idx = i; update(); };
        g.addEventListener('click', jump);
        g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); jump(); } });
        routeNodes.appendChild(g);
      });
    }

    stage.innerHTML = '';
    DATA.TRIPS.forEach((t) => {
      const card = document.createElement('article');
      card.className = 'trip-card';
      card.dataset.tripId = t.id;
      card.innerHTML = `
        <div class="trip-card__media"><img src="${t.image}" alt="${t.alt}" class="editorial-photo" loading="lazy" width="1200" height="800"></div>
        <div class="trip-card__overlay" aria-hidden="true"></div>
        <div class="trip-card__top">
          <span class="trip-cat-badge">${t.category}</span>
          <span class="trip-seats-badge">${t.seats} Seats Left</span>
        </div>
        <div class="trip-card__body">
          <div class="trip-card__meta-row"><span>${t.departure}</span><span>${t.difficulty}</span></div>
          <h3 class="trip-card__title">${t.title}</h3>
          <div class="trip-card__specs">
            <div class="trip-spec"><span>Duration</span><strong>${t.duration}</strong></div>
            <div class="trip-spec"><span>Distance</span><strong>${t.distance}</strong></div>
            <div class="trip-spec"><span>Elevation</span><strong>${t.maxElevation}</strong></div>
          </div>
          <div class="trip-card__footer">
            <div class="trip-price"><span>Demo / Person</span><strong>${t.price}</strong></div>
            <a href="trip-detail.html?id=${encodeURIComponent(t.id)}" class="btn btn--primary trip-explore-btn" style="padding:0.65rem 1.15rem;font-size:0.82rem;">Explore Route &rarr;</a>
          </div>
        </div>
      `;
      card.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        const pos = visible.findIndex((x) => x.id === t.id);
        if (pos !== -1 && pos !== idx) { idx = pos; update(); }
      });
      stage.appendChild(card);
    });
    attachImageFallbacks(stage);

    function update() {
      const n = visible.length;
      if (!n) return;
      idx = ((idx % n) + n) % n;
      const active = visible[idx];
      const narrow = window.innerWidth < 720;

      stage.querySelectorAll('.trip-card').forEach((card) => {
        const pos = visible.findIndex((x) => x.id === card.dataset.tripId);
        if (pos === -1) { card.classList.add('is-hidden'); return; }
        card.classList.remove('is-hidden');
        let off = pos - idx;
        if (n > 2) { if (off > n / 2) off -= n; if (off < -n / 2) off += n; }
        const abs = Math.abs(off);
        const center = off === 0;
        card.classList.toggle('is-center', center);
        const cta = card.querySelector('.trip-explore-btn');
        if (cta) cta.tabIndex = center ? 0 : -1;

        if (center) { card.style.transform = 'translate3d(0,0,45px) rotateY(0deg) scale(1)'; card.style.opacity = '1'; card.style.zIndex = 20; card.style.pointerEvents = 'auto'; }
        else if (abs === 1) { card.style.transform = `translate3d(${off * (narrow ? 190 : 340)}px,14px,-135px) rotateY(${off * -24}deg) scale(0.86)`; card.style.opacity = narrow ? '0.45' : '0.76'; card.style.zIndex = 12; card.style.pointerEvents = 'auto'; }
        else if (abs === 2) { card.style.transform = `translate3d(${off * (narrow ? 280 : 540)}px,28px,-290px) rotateY(${off * -36}deg) scale(0.72)`; card.style.opacity = narrow ? '0' : '0.38'; card.style.zIndex = 6; card.style.pointerEvents = narrow ? 'none' : 'auto'; }
        else { card.style.transform = 'translate3d(0,35px,-420px) scale(0.6)'; card.style.opacity = '0'; card.style.zIndex = 1; card.style.pointerEvents = 'none'; }
      });

      if (routeLine && routeNodes) {
        const gIdx = DATA.TRIPS.findIndex((t) => t.id === active.id);
        routeLine.style.strokeDashoffset = lineLen * (1 - (gIdx / Math.max(1, DATA.TRIPS.length - 1)));
        routeNodes.querySelectorAll('.route-node').forEach((node) => node.classList.toggle('is-active', node.dataset.tripId === active.id));
      }
      if (counter) counter.textContent = `ROUTE ${String(idx + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')} — ${active.title.toUpperCase()}`;
    }

    document.getElementById('pkgPrev')?.addEventListener('click', () => { idx--; update(); });
    document.getElementById('pkgNext')?.addEventListener('click', () => { idx++; update(); });
    if (autoBtn) {
      autoBtn.textContent = playing ? 'Pause Rotation' : 'Play Rotation';
      autoBtn.addEventListener('click', () => {
        playing = !playing;
        autoBtn.textContent = playing ? 'Pause Rotation' : 'Play Rotation';
        clearInterval(timer);
        if (playing) timer = setInterval(() => { idx++; update(); }, 5600);
      });
    }
    if (playing) timer = setInterval(() => { idx++; update(); }, 5600);
    update();
    window.addEventListener('resize', update);
  }

  function initTripsCatalogue() {
    const grid = document.getElementById('tripsCatalogGrid');
    if (!grid) return;
    const catWrap = document.getElementById('catalogCatFilters');
    const diffSelect = document.getElementById('catalogDiffFilter');
    const budgetRange = document.getElementById('catalogBudgetRange');
    const budgetLabel = document.getElementById('catalogBudgetVal');
    const countLabel = document.getElementById('catalogCount');

    let selectedCat = 'all';
    function render() {
      const diff = diffSelect ? diffSelect.value : 'all';
      const maxBudget = budgetRange ? Number(budgetRange.value) : 90000;
      if (budgetLabel) budgetLabel.textContent = `Up to ₹${maxBudget.toLocaleString('en-IN')}`;

      const list = DATA.TRIPS.filter((t) =>
        (selectedCat === 'all' || t.category === selectedCat) &&
        (diff === 'all' || t.difficulty === diff) &&
        t.priceNum <= maxBudget
      );
      if (countLabel) countLabel.textContent = `Showing ${list.length} of ${DATA.TRIPS.length} curated corridors`;

      if (!list.length) {
        grid.innerHTML = '<div style="grid-column:1/-1;padding:2.5rem;text-align:center;border:1px dashed var(--sand-25);border-radius:var(--radius-md);color:var(--sand);">No expeditions match this combination. Try increasing your budget slider or clearing filters.</div>';
        return;
      }

      grid.innerHTML = list.map((t, i) => `
        <article class="catalog-card is-slid-in" data-slide="${i % 2 === 0 ? 'left' : 'right'}">
          <div class="catalog-card__thumb">
            <img src="${t.image}" alt="${t.alt}" class="editorial-photo" loading="lazy" width="1200" height="750">
            <span class="story-cat-pill">${t.category}</span>
          </div>
          <div class="catalog-card__body">
            <div class="trip-card__meta-row"><span>${t.departure}</span><span>${t.seats} Seats Left</span></div>
            <h3>${t.title}</h3>
            <p>${t.teaser}</p>
            <div class="trip-card__specs">
              <div class="trip-spec"><span>Duration</span><strong>${t.duration}</strong></div>
              <div class="trip-spec"><span>Distance</span><strong>${t.distance}</strong></div>
              <div class="trip-spec"><span>Difficulty</span><strong>${t.difficulty}</strong></div>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:0.2rem;">
              <span style="font-family:var(--font-mono);font-size:0.65rem;color:var(--sand-muted);text-transform:uppercase;">Demo Price / Person</span>
              <strong style="font-family:var(--font-display);font-size:1.45rem;color:var(--sand-paper);">${t.price}</strong>
            </div>
            <div class="catalog-card__actions">
              <a href="trip-detail.html?id=${encodeURIComponent(t.id)}" class="btn btn--primary" style="flex:1;padding:0.7rem 1rem;font-size:0.82rem;">Full Route Page &rarr;</a>
              <a href="contact.html?trip=${encodeURIComponent(t.title)}" class="btn btn--secondary" style="padding:0.7rem 1rem;font-size:0.82rem;">Enquire</a>
            </div>
          </div>
        </article>
      `).join('');
      attachImageFallbacks(grid);
    }

    catWrap?.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-pill');
      if (!btn) return;
      selectedCat = btn.dataset.cat;
      catWrap.querySelectorAll('.filter-pill').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      render();
    });
    diffSelect?.addEventListener('change', render);
    budgetRange?.addEventListener('input', render);
    render();
  }

  function initTripDetailPage() {
    const heroTitle = document.getElementById('detailTitle');
    if (!heroTitle) return;
    const params = new URLSearchParams(window.location.search);
    const reqId = params.get('id');
    const tripIdx = Math.max(0, DATA.TRIPS.findIndex((t) => t.id === reqId));
    const trip = DATA.TRIPS[tripIdx];
    const nextTrip = DATA.TRIPS[(tripIdx + 1) % DATA.TRIPS.length];

    document.title = `${trip.title} — CAIRN & AXLE`;
    document.getElementById('detailHeroImg').src = trip.image;
    document.getElementById('detailHeroImg').alt = trip.alt;
    document.getElementById('detailBreadcrumb').textContent = trip.shortName;
    document.getElementById('detailCategory').textContent = `${trip.category} · ${trip.coords}`;
    heroTitle.textContent = trip.title;
    document.getElementById('detailTeaser').textContent = trip.overview;
    document.getElementById('detailStats').innerHTML = `
      <div class="metric-box"><div class="metric-value" style="font-size:1.5rem;">${trip.duration}</div><span class="metric-label">Duration</span></div>
      <div class="metric-box"><div class="metric-value" style="font-size:1.5rem;">${trip.distance}</div><span class="metric-label">Distance</span></div>
      <div class="metric-box"><div class="metric-value" style="font-size:1.5rem;">${trip.difficulty}</div><span class="metric-label">Difficulty</span></div>
      <div class="metric-box"><div class="metric-value" style="font-size:1.5rem;">${trip.maxElevation}</div><span class="metric-label">Max Elevation</span></div>
    `;
    document.getElementById('detailTimeline').innerHTML = trip.highlights.map(([day, desc], i) => `
      <li data-slide="${i % 2 === 0 ? 'left' : 'right'}"><strong>${day}</strong>${desc}</li>
    `).join('');
    document.getElementById('detailInclusions').innerHTML = trip.inclusions.map((x) => `<li>&bull; ${x}</li>`).join('');
    document.getElementById('detailExclusions').innerHTML = trip.exclusions.map((x) => `<li>&bull; ${x}</li>`).join('');

    // Interactive Demo Cost Estimator
    const tierSelect = document.getElementById('calcTier');
    const travInput = document.getElementById('calcTravellers');
    const totalEl = document.getElementById('calcTotal');
    const reserveBtn = document.getElementById('detailReserveBtn');
    const departureNote = document.getElementById('detailDepartureNote');
    if (departureNote) departureNote.textContent = `Next Departure: ${trip.departure} · ${trip.seats} Seats Left · ${trip.startEnd}`;

    function recalc() {
      const count = Math.max(1, Math.min(12, Number(travInput.value) || 1));
      const mode = tierSelect.value;
      const perPerson = trip.priceNum + (mode === 'suv' ? trip.suvAddon : mode === 'shared' ? trip.sharedAddon : 0);
      totalEl.textContent = `₹${(perPerson * count).toLocaleString('en-IN')}`;
      const typeLabel = mode === 'suv'
        ? 'Self-Drive (Cairn & Axle 4x4 Fleet Rental)'
        : mode === 'shared'
          ? 'Small-Group Curated Departure'
          : 'Self-Drive (Own Vehicle in Convoy)';
      const q = new URLSearchParams({ trip: trip.title, type: typeLabel, travellers: String(count) });
      reserveBtn.href = `contact.html?${q.toString()}`;
    }
    tierSelect.addEventListener('change', recalc);
    travInput.addEventListener('input', recalc);
    recalc();

    const nextLink = document.getElementById('nextCorridorLink');
    if (nextLink) {
      nextLink.href = `trip-detail.html?id=${encodeURIComponent(nextTrip.id)}`;
      nextLink.textContent = `Next Expedition: ${nextTrip.title} →`;
    }
    attachImageFallbacks();
  }

  function initTestimonials3D() {
    const stage = document.getElementById('testiStage');
    if (!stage || !DATA.TESTIMONIALS.length) return;
    const dots = document.getElementById('testiDots');
    const pauseBtn = document.getElementById('testiPauseBtn');
    let idx = 0, auto = !REDUCED_MOTION, timer = null;

    stage.innerHTML = '';
    if (dots) dots.innerHTML = '';
    DATA.TESTIMONIALS.forEach((t, i) => {
      const stars = Array.from({ length: t.rating }, () => '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>').join('');
      const card = document.createElement('article');
      card.className = 'testi-card';
      card.innerHTML = `
        <div class="testi-stars">${stars}<span class="testi-route-chip">${t.destination}</span></div>
        <blockquote class="testi-quote">&ldquo;${t.quote}&rdquo;</blockquote>
        <div class="testi-author"><img src="${t.avatar}" alt="${t.name}" class="testi-avatar editorial-photo" loading="lazy" width="108" height="108"><div><strong>${t.name}</strong><span>${t.role}</span></div></div>
      `;
      card.addEventListener('click', () => { if (idx !== i) { idx = i; update(); } });
      stage.appendChild(card);

      if (dots) {
        const d = document.createElement('button');
        d.type = 'button'; d.className = 'testi-dot';
        d.setAttribute('aria-label', `Show review ${i + 1}`);
        d.addEventListener('click', () => { idx = i; update(); });
        dots.appendChild(d);
      }
    });
    attachImageFallbacks(stage);

    function update() {
      const n = DATA.TESTIMONIALS.length;
      idx = ((idx % n) + n) % n;
      const narrow = window.innerWidth < 760;
      stage.querySelectorAll('.testi-card').forEach((c, i) => {
        let off = i - idx;
        if (off > n / 2) off -= n; if (off < -n / 2) off += n;
        c.classList.toggle('is-center', off === 0);
        if (off === 0) { c.style.transform = 'translate3d(0,0,50px) scale(1)'; c.style.opacity = '1'; c.style.filter = 'blur(0)'; c.style.zIndex = 15; }
        else if (Math.abs(off) === 1) { c.style.transform = `translate3d(${off * (narrow ? 140 : 410)}px,16px,-160px) rotateY(${off * -22}deg) scale(0.84)`; c.style.opacity = narrow ? '0.2' : '0.52'; c.style.filter = 'blur(1.2px)'; c.style.zIndex = 8; }
        else { c.style.transform = 'translate3d(0,28px,-360px) scale(0.68)'; c.style.opacity = '0'; c.style.zIndex = 1; }
      });
      dots?.querySelectorAll('.testi-dot').forEach((d, i) => { if (i === idx) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
    }
    document.getElementById('testiPrev')?.addEventListener('click', () => { idx--; update(); });
    document.getElementById('testiNext')?.addEventListener('click', () => { idx++; update(); });
    if (pauseBtn) {
      pauseBtn.textContent = auto ? 'Pause Autoplay' : 'Play Autoplay';
      pauseBtn.addEventListener('click', () => {
        auto = !auto; pauseBtn.textContent = auto ? 'Pause Autoplay' : 'Play Autoplay';
        clearInterval(timer); if (auto) timer = setInterval(() => { idx++; update(); }, 6200);
      });
    }
    if (auto) timer = setInterval(() => { idx++; update(); }, 6200);
    update();
    window.addEventListener('resize', update);
  }

  function initGalleryPage() {
    const mosaic = document.getElementById('galleryMosaic');
    if (!mosaic) return;
    mosaic.innerHTML = DATA.GALLERY.map((g, i) => `
      <button type="button" class="gallery-tile" data-span="${g.span}" data-mask="${g.mask}" data-gcat="${g.theme}" data-index="${i}" data-cursor="VIEW" data-slide="${i % 2 === 0 ? 'left' : 'right'}" aria-label="Open ${g.title} in lightbox">
        <div class="gallery-frame">
          <img src="${g.image}" alt="${g.alt}" class="editorial-photo" loading="lazy" width="1200" height="800">
          <div class="gallery-caption">
            <div><small>${g.category} · ${g.location}</small><strong>${g.title}</strong></div>
            <span class="gallery-zoom-tag" aria-hidden="true">+</span>
          </div>
        </div>
      </button>
    `).join('');
    attachImageFallbacks(mosaic);

    const lb = document.getElementById('lightboxDialog');
    let lbIdx = 0;
    function renderLb(i) {
      lbIdx = ((i % DATA.GALLERY.length) + DATA.GALLERY.length) % DATA.GALLERY.length;
      const item = DATA.GALLERY[lbIdx];
      document.getElementById('lightboxImg').src = item.image;
      document.getElementById('lightboxImg').alt = item.alt;
      document.getElementById('lightboxTitle').textContent = item.title;
      document.getElementById('lightboxCounter').textContent = `FRAME ${String(lbIdx + 1).padStart(2, '0')} / ${String(DATA.GALLERY.length).padStart(2, '0')} · ${item.category}`;
      document.getElementById('lightboxLocation').textContent = item.location;
      document.getElementById('lightboxDesc').textContent = item.desc;
    }
    mosaic.addEventListener('click', (e) => {
      const tile = e.target.closest('.gallery-tile');
      if (!tile || !lb) return;
      renderLb(Number(tile.dataset.index) || 0);
      lb.showModal();
    });
    document.getElementById('lbPrev')?.addEventListener('click', () => renderLb(lbIdx - 1));
    document.getElementById('lbNext')?.addEventListener('click', () => renderLb(lbIdx + 1));
    document.addEventListener('keydown', (e) => {
      if (!lb?.open) return;
      if (e.key === 'ArrowLeft') renderLb(lbIdx - 1);
      if (e.key === 'ArrowRight') renderLb(lbIdx + 1);
    });

    document.getElementById('galleryFilters')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.gallery-filter-btn');
      if (!btn) return;
      const cat = btn.dataset.gcat;
      document.querySelectorAll('#galleryFilters .gallery-filter-btn').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      mosaic.querySelectorAll('.gallery-tile').forEach((t) => t.classList.toggle('is-filtered-out', cat !== 'all' && t.dataset.gcat !== cat));
    });
  }

  function initJournalPage() {
    const grid = document.getElementById('journalGrid');
    const featured = document.getElementById('featuredStorySlot');
    const dialog = document.getElementById('storyDialog');
    if (!grid && !featured) return;

    function openStory(id) {
      const s = DATA.STORIES.find((x) => x.id === id);
      if (!s || !dialog) return;
      document.getElementById('storyDialogMeta').textContent = `${s.category} · ${s.readTime}`;
      document.getElementById('storyDialogImg').src = s.image;
      document.getElementById('storyDialogImg').alt = s.title;
      document.getElementById('storyDialogTitle').textContent = s.title;
      document.getElementById('storyDialogBody').innerHTML = `
        ${s.paragraphs.map((p) => `<p>${p}</p>`).join('')}
        <blockquote>${s.quote}</blockquote>
        <div style="margin-top:1.5rem;padding-top:1.25rem;border-top:1px solid var(--sand-15);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
          <span class="demo-pill">Sample Editorial Dispatch · Editable</span>
          <a href="contact.html" class="btn btn--primary" style="padding:0.7rem 1.3rem;font-size:0.84rem;">Plan a Route Like This &rarr;</a>
        </div>
      `;
      dialog.showModal();
    }

    if (featured && DATA.STORIES[0]) {
      const lead = DATA.STORIES[0];
      featured.innerHTML = `
        <article class="featured-story-card" data-slide="left">
          <div class="featured-story-media"><img src="${lead.image}" alt="${lead.title}" class="editorial-photo" width="1200" height="800"></div>
          <div class="featured-story-body">
            <span class="eyebrow">Featured Dispatch · ${lead.category}</span>
            <h2>${lead.title}</h2>
            <p>${lead.excerpt}</p>
            <div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--terracotta-light);">${lead.readTime} · ${lead.date}</div>
            <div style="margin-top:0.5rem;"><button type="button" class="btn btn--primary" data-read-story="${lead.id}">Read Full Dispatch &rarr;</button></div>
          </div>
        </article>
      `;
      attachImageFallbacks(featured);
    }

    if (grid) {
      const limit = Number(grid.dataset.limit) || DATA.STORIES.length;
      const items = DATA.STORIES.slice(0, limit);
      grid.innerHTML = items.map((s, i) => `
        <article class="story-card" data-bcat="${s.category}" data-slide="${i % 2 === 0 ? 'left' : 'right'}" data-slide-delay="${(i % 3) + 1}">
          <div class="story-thumb">
            <img src="${s.image}" alt="${s.title}" class="editorial-photo" loading="lazy" width="1200" height="750">
            <span class="story-cat-pill">${s.category}</span>
          </div>
          <div class="story-body">
            <span class="story-meta">${s.readTime} · ${s.date}</span>
            <h3>${s.title}</h3>
            <p>${s.excerpt}</p>
            <button type="button" class="story-read-btn" data-read-story="${s.id}">Read Story &rarr;</button>
          </div>
        </article>
      `).join('');
      attachImageFallbacks(grid);
    }

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-read-story]');
      if (btn) openStory(btn.dataset.readStory);
    });

    document.getElementById('blogFilters')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.gallery-filter-btn');
      if (!btn || !grid) return;
      const cat = btn.dataset.bcat;
      document.querySelectorAll('#blogFilters .gallery-filter-btn').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      grid.querySelectorAll('.story-card').forEach((c) => c.classList.toggle('is-hidden', cat !== 'all' && c.dataset.bcat !== cat));
    });
  }

  function initFaqAndChecklist() {
    const acc = document.getElementById('faqAccordion');
    const toggleBtn = document.getElementById('faqToggleAll');
    if (acc && toggleBtn) {
      const items = Array.from(acc.querySelectorAll(':scope > details'));
      const sync = () => toggleBtn.setAttribute('aria-expanded', String(items.every((d) => d.open)));
      sync();
      toggleBtn.addEventListener('click', () => {
        const expand = toggleBtn.getAttribute('aria-expanded') !== 'true';
        items.forEach((d) => { d.open = expand; });
        sync();
      });
      acc.addEventListener('toggle', sync, { capture: true });
    }
    const checklistProgress = document.getElementById('checklistProgress');
    if (checklistProgress) {
      const boxes = Array.from(document.querySelectorAll('.check-list input[type="checkbox"]'));
      const updateChecks = () => {
        const done = boxes.filter((b) => b.checked).length;
        checklistProgress.textContent = `${done} / ${boxes.length} READY FOR FLAG-OFF`;
      };
      boxes.forEach((b) => b.addEventListener('change', updateChecks));
      updateChecks();
    }
  }

  function initContactPage() {
    const form = document.getElementById('mainEnquiryForm');
    if (!form) return;
    const dateInput = document.getElementById('enq-date');
    if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

    // Auto-populate from query parameters (passed from home.html, trips.html, trip-detail.html)
    const params = new URLSearchParams(window.location.search);
    if (params.get('name')) document.getElementById('enq-name').value = params.get('name');
    if (params.get('phone')) document.getElementById('enq-phone').value = params.get('phone');
    if (params.get('date')) document.getElementById('enq-date').value = params.get('date');
    if (params.get('travellers')) document.getElementById('enq-travellers').value = params.get('travellers');
    if (params.get('trip')) {
      const sel = document.getElementById('enq-destination');
      if (Array.from(sel.options).some((o) => o.value === params.get('trip'))) sel.value = params.get('trip');
    }
    if (params.get('type')) {
      const sel = document.getElementById('enq-type');
      if (Array.from(sel.options).some((o) => o.value === params.get('type'))) sel.value = params.get('type');
    }

    const receipt = document.getElementById('enquiryReceipt');
    const submitBtn = document.getElementById('enqSubmitBtn');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validateForm(form)) return;
      const payload = Object.fromEntries(new FormData(form).entries());
      const refId = `CAX-2027-${String(Math.floor(1000 + Math.random() * 9000))}`;
      const orig = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Dispatching Route Brief…';

      let note = 'Demo Dispatch Mode (connect window.CAIRN_AXLE_ENQUIRY_ENDPOINT for live CRM)';
      if (typeof window.CAIRN_AXLE_ENQUIRY_ENDPOINT === 'string' && window.CAIRN_AXLE_ENQUIRY_ENDPOINT.trim()) {
        try {
          const r = await fetch(window.CAIRN_AXLE_ENQUIRY_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, referenceId: refId }) });
          note = r.ok ? 'Delivered to Live Dispatch Endpoint' : 'Queued locally (endpoint non-200)';
        } catch (_) { note = 'Saved locally (endpoint unreachable)'; }
      }
      submitBtn.disabled = false;
      submitBtn.innerHTML = orig;
      form.style.display = 'none';
      document.getElementById('receiptCode').textContent = `DISPATCH REF · ${refId}`;
      document.getElementById('receiptSummary').innerHTML = `
        <div><span>Lead Traveller</span><strong>${escapeHtml(payload.fullName)}</strong></div>
        <div><span>Corridor</span><strong>${escapeHtml(payload.destination)}</strong></div>
        <div><span>Target Date</span><strong>${escapeHtml(payload.travelDate)}</strong></div>
        <div><span>Group &amp; Format</span><strong>${escapeHtml(payload.travellers)} Traveller(s) · ${escapeHtml(payload.tripType)}</strong></div>
        <div><span>Contact</span><strong>${escapeHtml(payload.email)} · ${escapeHtml(payload.phone)}</strong></div>
        <div><span>Dispatch Status</span><strong>${escapeHtml(note)}</strong></div>
      `;
      receipt.classList.add('is-visible');
      receipt.focus();
    });

    document.getElementById('receiptResetBtn')?.addEventListener('click', () => {
      form.reset();
      form.style.display = '';
      receipt.classList.remove('is-visible');
      document.getElementById('enq-name').focus();
    });
  }

  /* 8. Scroll-Linked Motion Engine (Roadmap SVG, Booking 4x4 Vehicle, Footer Road, Slide-Ins) */
  function initScrollAndMotion() {
    const heroParallax = document.getElementById('heroParallax');
    const roadmapWrapper = document.getElementById('roadmapWrapper');
    const whyPath = document.getElementById('whyRoadmapPath');
    const bookingSection = document.getElementById('how-it-works');
    const bookingPath = document.getElementById('bookingHighwayPath');
    const vehicle = document.getElementById('highwayVehicle');
    const vFill = document.getElementById('verticalRoadFill');
    const vCar = document.getElementById('verticalRoadVehicle');
    const bookingSteps = Array.from(document.querySelectorAll('.booking-step'));
    const footerFinale = document.getElementById('footerFinale');
    const footerPath = document.getElementById('footerRoadDraw');

    let whyLen = 2000, bookLen = 1200, footLen = 900, manualOverride = null;
    try {
      if (whyPath) { whyLen = whyPath.getTotalLength(); whyPath.style.strokeDasharray = whyLen; if (!REDUCED_MOTION) whyPath.style.strokeDashoffset = whyLen; }
      if (bookingPath) { bookLen = bookingPath.getTotalLength(); bookingPath.style.strokeDasharray = bookLen; bookingPath.style.strokeDashoffset = bookLen; }
      if (footerPath) { footLen = footerPath.getTotalLength(); footerPath.style.strokeDasharray = footLen; if (!REDUCED_MOTION) footerPath.style.strokeDashoffset = footLen; }
    } catch (_) {}

    function placeVehicle(progress) {
      const p = clamp01(progress);
      const stepIdx = Math.min(3, Math.floor(p * 3.99));
      bookingSteps.forEach((s, i) => s.classList.toggle('is-active', i <= stepIdx));
      if (window.innerWidth > 820 && bookingPath && vehicle) {
        try {
          bookingPath.style.strokeDashoffset = bookLen * (1 - p);
          const d = bookLen * p;
          const pt = bookingPath.getPointAtLength(d);
          const ahead = bookingPath.getPointAtLength(Math.min(bookLen, d + 6));
          const ang = Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * (180 / Math.PI);
          vehicle.style.left = `${(pt.x / 1200) * 100}%`;
          vehicle.style.top = `${(pt.y / 120) * 100}%`;
          vehicle.style.transform = `translate(-50%, -62%) rotate(${ang.toFixed(1)}deg)`;
        } catch (_) {}
      }
      if (vFill && vCar) { vFill.style.transform = `scaleY(${p})`; vCar.style.top = `${(p * 100).toFixed(1)}%`; }
    }
    bookingSteps.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        manualOverride = [0.06, 0.36, 0.67, 0.96][i];
        placeVehicle(manualOverride);
        setTimeout(() => { manualOverride = null; }, 2200);
      });
    });

    const revealEls = Array.from(document.querySelectorAll('[data-reveal]'));
    const slideEls = Array.from(document.querySelectorAll('[data-slide]'));

    function sweepVisible() {
      const vh = window.innerHeight;
      revealEls.forEach((el) => { if (!el.classList.contains('is-revealed') && el.getBoundingClientRect().top < vh * 0.96) el.classList.add('is-revealed'); });
      slideEls.forEach((el) => { if (!el.classList.contains('is-slid-in') && el.getBoundingClientRect().top < vh * 0.96) el.classList.add('is-slid-in'); });
    }

    if (REDUCED_MOTION) {
      revealEls.forEach((e) => e.classList.add('is-revealed'));
      slideEls.forEach((e) => e.classList.add('is-slid-in'));
    } else {
      const rObs = new IntersectionObserver((entries, obs) => {
        entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-revealed'); obs.unobserve(en.target); } });
      }, { threshold: 0.05, rootMargin: '0px 0px -12px 0px' });
      revealEls.forEach((el) => rObs.observe(el));

      const sObs = new IntersectionObserver((entries, obs) => {
        entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-slid-in'); obs.unobserve(en.target); } });
      }, { threshold: 0.04, rootMargin: '0px 0px -20px 0px' });
      slideEls.forEach((el) => sObs.observe(el));
    }

    // Animated Counters
    const counters = document.querySelectorAll('[data-counter]');
    const cObs = new IntersectionObserver((entries, obs) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        const target = Number(el.dataset.counter) || 0;
        const suffix = el.dataset.suffix || '';
        if (REDUCED_MOTION) { el.textContent = target.toLocaleString('en-IN') + suffix; obs.unobserve(el); return; }
        const t0 = performance.now();
        const tick = (now) => {
          const p = clamp01((now - t0) / 1400);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString('en-IN') + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    }, { threshold: 0.3 });
    counters.forEach((el) => cObs.observe(el));

    let ticking = false;
    function frame() {
      ticking = false;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const docH = document.documentElement.scrollHeight - vh;

      scrollTopBtn?.classList.toggle('is-visible', y > vh * 0.55);
      if (siteHeader) siteHeader.classList.toggle('is-scrolled', y > 40);
      if ((!SUPPORTS_SCROLL_TIMELINE || REDUCED_MOTION) && scrollProgressBar && docH > 0) {
        scrollProgressBar.style.transform = `scaleX(${clamp01(y / docH)})`;
      }
      if (bookingSection && manualOverride === null) {
        const r = bookingSection.getBoundingClientRect();
        placeVehicle(clamp01((vh * 0.72 - r.top) / (r.height * 0.72 + vh * 0.25)));
      }
      if (!REDUCED_MOTION) {
        sweepVisible();
        if (heroParallax && y < vh * 1.2) heroParallax.style.transform = `translate3d(0, ${(y * 0.2).toFixed(1)}px, 0)`;
        if (roadmapWrapper && whyPath) {
          const r = roadmapWrapper.getBoundingClientRect();
          whyPath.style.strokeDashoffset = whyLen * (1 - clamp01((vh * 0.72 - r.top) / (r.height * 0.88)));
        }
        if (footerFinale && footerPath) {
          const r = footerFinale.getBoundingClientRect();
          footerPath.style.strokeDashoffset = footLen * (1 - clamp01((vh * 0.92 - r.top) / (r.height + vh * 0.2)));
        }
      }
    }
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
    frame();
  }

  /* 9. Magnetic Buttons & Custom Desktop Cursor */
  function initPointerFX() {
    if (REDUCED_MOTION || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    document.querySelectorAll('.magnetic').forEach((btn) => {
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        btn.style.transform = `translate3d(${((e.clientX - (r.left + r.width / 2)) * 0.2).toFixed(1)}px, ${((e.clientY - (r.top + r.height / 2)) * 0.2).toFixed(1)}px, 0)`;
      });
      btn.addEventListener('pointerleave', () => { btn.style.transform = 'translate3d(0,0,0)'; });
    });
    const cursor = document.getElementById('customCursor');
    if (!cursor) return;
    let cx = -100, cy = -100, tx = -100, ty = -100, active = false;
    const step = () => {
      cx += (tx - cx) * 0.22; cy += (ty - cy) * 0.22;
      cursor.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0) translate(-50%, -50%)`;
      if (Math.abs(tx - cx) > 0.25 || Math.abs(ty - cy) > 0.25) requestAnimationFrame(step);
      else active = false;
    };
    document.addEventListener('pointermove', (e) => {
      tx = e.clientX; ty = e.clientY; cursor.classList.add('is-active');
      if (!active) { active = true; requestAnimationFrame(step); }
    });
    document.addEventListener('pointerover', (e) => {
      const lbl = e.target.closest('[data-cursor]');
      if (lbl) { cursor.textContent = lbl.dataset.cursor; cursor.classList.add('is-labeled'); cursor.classList.remove('is-link'); return; }
      cursor.textContent = ''; cursor.classList.remove('is-labeled');
      cursor.classList.toggle('is-link', Boolean(e.target.closest('a, button, summary')));
    });
    document.addEventListener('pointerleave', () => cursor.classList.remove('is-active'));
  }

  /* Boot Everything in Clean Order (render dynamic DOM BEFORE scroll observers!) */
  attachImageFallbacks();
  bindDialogEnhancements();
  initFooterUtilities();
  initHeroWidgets();
  initPackages3D();
  initTripsCatalogue();
  initTripDetailPage();
  initTestimonials3D();
  initGalleryPage();
  initJournalPage();
  initFaqAndChecklist();
  initContactPage();
  initScrollAndMotion();
  initPointerFX();
})();
