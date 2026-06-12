/* ============================================
   Karthick N — Portfolio · script.js
   Vanilla JS · no dependencies
   ============================================ */

(() => {
  'use strict';

  /* Scroll-driven CSS animations supported? (Chrome/Edge)
     If yes, CSS owns the progress bar + reveals; JS fallbacks are skipped. */
  const sda = typeof CSS !== 'undefined' && CSS.supports('animation-timeline: view()');

  /* ---------- Scroll progress (JS fallback) ---------- */
  const progress = document.getElementById('progress');
  if (!sda) {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (scrolled / max) * 100 : 0;
      progress.style.width = pct + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ---------- Hamburger menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', String(open));
  });

  const closeMobileNav = () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  /* ---------- Close mobile nav on link click (incl. brand logo) ---------- */
  navLinks.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', closeMobileNav);
  });
  const brand = document.querySelector('.nav-brand');
  if (brand) brand.addEventListener('click', closeMobileNav);

  /* ---------- Stats counter animation ---------- */
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeOut(t);
      const value = Math.round(target * eased);
      // Use locale formatting for numbers >= 1000
      const display = target >= 1000 ? value.toLocaleString() : value;
      el.textContent = display + suffix;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = (target >= 1000 ? target.toLocaleString() : target) + suffix;
    };
    requestAnimationFrame(tick);
  };

  const counters = document.querySelectorAll('.stat-num');
  let countersTriggered = false;
  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countersTriggered) {
          countersTriggered = true;
          counters.forEach((c) => animateCounter(c));
        }
      });
    },
    { threshold: 0.3 }
  );
  const hero = document.getElementById('hero');
  if (hero) heroObserver.observe(hero);

  /* ---------- Fade-in on scroll (JS fallback) ---------- */
  const fadeTargets = document.querySelectorAll(
    'section h2, .section-intro, .skill-col, .exp-card, .project-card, .cert-card, .edu-card, .contact-card'
  );
  fadeTargets.forEach((el) => el.classList.add('fade-in'));

  if (!sda) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    fadeTargets.forEach((el) => fadeObserver.observe(el));
  }

  /* ---------- Active nav highlighting ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = navLinks.querySelectorAll('a');
  const setActive = () => {
    const scrollPos = window.scrollY + 120;
    let current = '';
    sections.forEach((sec) => {
      if (scrollPos >= sec.offsetTop) current = sec.id;
    });
    navAnchors.forEach((a) => {
      a.classList.toggle('nav-active', a.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();

  /* ---------- Magnetic CTAs + project-card tilt ----------
     Desktop fine-pointer only; fully disabled under reduced motion. */
  const fineMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (fineMotion) {
    // Magnetic pull — button leans toward the cursor (max ~5px)
    document.querySelectorAll('.hero-ctas .btn').forEach((btn) => {
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        btn.style.transform = `translate(${(x * 5).toFixed(1)}px, ${(y * 4).toFixed(1)}px)`;
      });
      btn.addEventListener('pointerleave', () => {
        btn.style.transform = '';
      });
    });

    // 3D tilt — max 6° on each axis, lift preserved from hover state
    document.querySelectorAll('.project-card').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-6px)`;
      });
      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ---------- Resume availability guard ----------
     The "Download Resume" button 404s until the PDF is added to the repo.
     Hide it gracefully if the file isn't there yet; it reappears
     automatically once the PDF is committed. (Skipped on file:// where
     fetch is blocked.) */
  const resumeBtn = document.querySelector('a[download]');
  if (resumeBtn && location.protocol.startsWith('http')) {
    fetch(resumeBtn.getAttribute('href'), { method: 'HEAD' })
      .then((res) => {
        if (!res.ok) {
          resumeBtn.style.display = 'none';
          console.warn('Resume PDF not found — "Download Resume" button hidden. Add ' + resumeBtn.getAttribute('href') + ' to the repo to enable it.');
        }
      })
      .catch(() => { /* network hiccup — leave the button alone */ });
  }
})();
