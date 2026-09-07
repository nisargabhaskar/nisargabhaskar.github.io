/* ─────────────────────────────────────────────
   APP.JS — vanilla interactions
───────────────────────────────────────────── */

// ── NAV: border/shadow on scroll ─────────────
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── NAV: active link via IntersectionObserver ─
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = [...navLinks]
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = `#${entry.target.id}`;
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(s => spy.observe(s));

// ── HAMBURGER MENU ───────────────────────────
const hamburger = document.querySelector('.nav-hamburger');
const navLinksEl = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
  const open = navLinksEl.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(open));
});

navLinksEl?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
  });
});

// ── PROJECT FILTERS ───────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project[data-category]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const cats = card.dataset.category.split(' ');
      const match = filter === 'all' || cats.includes(filter);
      card.classList.toggle('hidden', !match);
    });
  });
});

// ── SCROLL REVEAL ────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -40px 0px', threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));