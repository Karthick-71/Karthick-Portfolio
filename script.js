/* Karthick N — Portfolio · vanilla JS, no dependencies */
(() => {
  'use strict';
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Theme toggle — remembers the choice when storage is available */
  const themeBtn = document.getElementById('themeToggle');
  const isDark = () => {
    const t = root.getAttribute('data-theme');
    if (t) return t === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };
  themeBtn.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked — fine */ }
  });

  /* Mobile menu */
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  const setMenu = (open) => {
    navLinks.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  menuBtn.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
  navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

  /* Nav border on scroll */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Active nav link */
  const links = [...navLinks.querySelectorAll('a')];
  const sections = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => spy.observe(s));
  }

  /* Contact: "Email me" opens a chooser (Gmail / Outlook / mail app / copy) */
  const mailBtn = document.getElementById('mailBtn');
  const mailMenu = document.getElementById('mailMenu');
  if (mailBtn && mailMenu) {
    const setMail = (open) => { mailMenu.hidden = !open; mailBtn.setAttribute('aria-expanded', String(open)); };
    mailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      setMail(mailMenu.hidden);
      if (!mailMenu.hidden) mailMenu.querySelector('a').focus();
    });
    mailMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMail(false)));
    document.addEventListener('click', (e) => { if (!e.target.closest('.mail-pick')) setMail(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !mailMenu.hidden) { setMail(false); mailBtn.focus(); } });
  }

  /* Contact: copy email / phone to clipboard */
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    const label = btn.querySelector('span');
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy;
      let ok = false;
      try { await navigator.clipboard.writeText(text); ok = true; } catch (e) {
        try {
          const t = document.createElement('textarea'); t.value = text; t.style.position = 'fixed'; t.style.opacity = '0';
          document.body.appendChild(t); t.select(); ok = document.execCommand('copy'); t.remove();
        } catch (e2) { ok = false; }
      }
      if (!ok) return;
      const before = label ? label.textContent : '';
      btn.classList.add('done'); if (label) label.textContent = before === 'copy' ? 'copied' : 'Copied ✓';
      setTimeout(() => { btn.classList.remove('done'); if (label) label.textContent = before; }, 1600);
    });
  });

  if (reduceMotion || !('IntersectionObserver' in window)) return;

  /* Terminal lines type in one by one */
  const code = document.querySelector('.run-body code');
  if (code) {
    const lines = code.innerHTML.split('\n');
    code.innerHTML = lines.map((l, i) => `<span class="line" style="animation-delay:${0.15 + i * 0.12}s">${l}</span>`).join('\n');
  }

  /* Reveal sections on scroll */
  const targets = document.querySelectorAll('.skill, .job, .case, .domain, .cred-list li, .about-body, .contact-list li');
  targets.forEach((el) => el.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  targets.forEach((el) => io.observe(el));
  /* ---------- 3D: terminal tilt + chip parallax follow the pointer ---------- */
  const stage = document.getElementById('stage');
  const card = document.getElementById('runCard');
  const hero = document.querySelector('.hero');
  const chips = stage ? [...stage.querySelectorAll('.chip3d')] : [];
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  if (stage && card && hero && finePointer) {
    let raf = 0;
    hero.addEventListener('pointermove', (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = stage.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) / r.width;   // -0.5 … 0.5 around the card
        const y = (e.clientY - (r.top + r.height / 2)) / r.height;
        const cx = Math.max(-1, Math.min(1, x * 2));
        const cy = Math.max(-1, Math.min(1, y * 2));
        card.style.setProperty('--ry', (cx * 14).toFixed(2) + 'deg');
        card.style.setProperty('--rx', (-cy * 10).toFixed(2) + 'deg');
        card.style.setProperty('--sheen', (cx * 40).toFixed(1) + '%');
        chips.forEach((c, i) => {
          const depth = (i + 1) * 9;
          c.style.setProperty('--px', (cx * depth).toFixed(1) + 'px');
          c.style.setProperty('--py', (cy * depth).toFixed(1) + 'px');
        });
      });
    });
    hero.addEventListener('pointerleave', () => {
      card.style.removeProperty('--ry'); card.style.removeProperty('--rx'); card.style.removeProperty('--sheen');
      chips.forEach((c) => { c.style.removeProperty('--px'); c.style.removeProperty('--py'); });
    });
  }

  /* ---------- 3D: each section flips up into place on scroll ---------- */
  const flips = document.querySelectorAll('.section > .wrap');
  flips.forEach((el) => el.classList.add('flip'));
  const flipIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); flipIO.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
  flips.forEach((el) => flipIO.observe(el));

  /* stagger cards within a section */
  document.querySelectorAll('.skill-grid, .domain-grid, .work-grid, .timeline, .cred-list, .contact-list').forEach((group) => {
    [...group.children].forEach((child, i) => { child.style.transitionDelay = (i * 0.08) + 's'; });
  });

  /* ---------- 3D: page-turn transition when jumping via nav ---------- */
  if (document.startViewTransition) {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (ev) => {
        const id = a.getAttribute('href');
        const target = id.length > 1 ? document.querySelector(id) : null;
        if (!target) return;
        ev.preventDefault();
        // reveal the destination instantly so it isn't blank mid-transition
        target.querySelectorAll('.flip, .reveal').forEach((el) => el.classList.add('in'));
        if (target.matches('.flip, .reveal')) target.classList.add('in');
        const wrap = target.querySelector(':scope > .wrap'); if (wrap) wrap.classList.add('in');
        document.startViewTransition(() => {
          root.style.scrollBehavior = 'auto';
          target.scrollIntoView({ block: 'start' });
          history.replaceState(null, '', id);
          root.style.scrollBehavior = '';
        });
      });
    });
  }
  /* ---------- 3D: About profile card tilts with the pointer ---------- */
  const idStage = document.getElementById('idStage');
  const idCard = document.getElementById('idCard');
  if (idStage && idCard && finePointer) {
    idStage.addEventListener('pointermove', (e) => {
      const r = idStage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      idCard.style.setProperty('--ry', (x * 22).toFixed(2) + 'deg');
      idCard.style.setProperty('--rx', (-y * 16).toFixed(2) + 'deg');
      idCard.style.setProperty('--sheen', (x * 120 - 40).toFixed(1) + '%');
    });
    idStage.addEventListener('pointerleave', () => {
      ['--ry', '--rx', '--sheen'].forEach((v) => idCard.style.removeProperty(v));
    });
  }
})();
