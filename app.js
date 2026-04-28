/* ─────────────────────────────────────────────
   APP.JS — Vanilla JS interactions
───────────────────────────────────────────── */

// ── NAV: transparent → solid on scroll ──────
const nav = document.getElementById('nav');
const onScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
};
window.addEventListener('scroll', onScroll, { passive: true });

// ── NAV: active link highlighting via IntersectionObserver ──
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ── HAMBURGER MENU ───────────────────────────
const hamburger = document.querySelector('.nav-hamburger');
const navLinksEl = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  const isOpen = navLinksEl.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

navLinksEl?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinksEl.classList.remove('open'));
});

// ── SCROLL REVEAL ────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

// ── PROJECT FILTER TABS ──────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    projectCards.forEach(card => {
      const cats = (card.dataset.categories || '').split(',').map(s => s.trim());
      if (filter === 'all' || cats.includes(filter)) {
        card.classList.remove('hidden');
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = '';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ── TYPEWRITER EFFECT ────────────────────────
const titles = [
  'CS Grad @ USC',
  'Software Engineer',
  'AI / ML Enthusiast',
  'Researcher',
];

const titleEl = document.querySelector('.hero-title-typed');
if (titleEl) {
  let ti = 0, ci = 0, deleting = false;
  const type = () => {
    const current = titles[ti];
    if (!deleting) {
      titleEl.textContent = current.slice(0, ++ci);
      if (ci === current.length) {
        deleting = true;
        return setTimeout(type, 2000);
      }
    } else {
      titleEl.textContent = current.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        ti = (ti + 1) % titles.length;
      }
    }
    setTimeout(type, deleting ? 60 : 90);
  };
  setTimeout(type, 800);
}

// ── CURSOR DOT (desktop only) ────────────────
if (window.innerWidth > 768) {
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.appendChild(dot);

  let mx = 0, my = 0, dx = 0, dy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  const animateCursor = () => {
    dx += (mx - dx) * 0.18;
    dy += (my - dy) * 0.18;
    dot.style.left = dx + 'px';
    dot.style.top  = dy + 'px';
    requestAnimationFrame(animateCursor);
  };
  animateCursor();
}
