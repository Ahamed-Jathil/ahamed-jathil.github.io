/* =====================================================
   PORTFOLIO SCRIPT — J Ahamed Jathil
   ===================================================== */

// ── Theme Toggle ──────────────────────────────────────
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ── Navbar Scroll ─────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  updateActiveNav();
  // Back-to-top
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

// ── Active Nav on Scroll ─────────────────────────────
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}

// ── Hamburger ─────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('mobile-open');
});
navLinksEl.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('mobile-open');
  });
});

// ── Typed Effect ──────────────────────────────────────
const typedEl = document.getElementById('typedText');
const phrases = [
  'Software Engineering Student',
  'Web Developer',
  'Problem Solver',
  'Quick Learner',
  'HND @ ESOFT Metro Campus'
];
let phraseIdx = 0, charIdx = 0, deleting = false, pause = false;

function type() {
  if (pause) { setTimeout(type, 1500); pause = false; return; }
  const current = phrases[phraseIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) { deleting = true; pause = true; }
    setTimeout(type, 80);
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
    setTimeout(type, 40);
  }
}
type();

// ── Intersection Observer: Fade In ───────────────────
const fadeEls = document.querySelectorAll('.section-header, .about-grid, .skills-grid, .timeline-item, .projects-coming-soon, .cert-coming-soon, .contact-grid, .stat-item, .soft-skill-card, .about-detail, .contact-item, .cert-plan-item');
fadeEls.forEach(el => el.classList.add('fade-in-up'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
fadeEls.forEach(el => fadeObserver.observe(el));

// ── Skill Bar Animation ───────────────────────────────
const skillBars = document.querySelectorAll('.skill-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillBars.forEach(bar => barObserver.observe(bar));

// ── Back to Top ───────────────────────────────────────
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Contact Form ──────────────────────────────────────
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const toast = document.getElementById('toast');
  const msg = document.getElementById('toastMsg');
  msg.textContent = 'Message sent! I will get back to you soon.';
  toast.classList.add('show');
  this.reset();
  setTimeout(() => toast.classList.remove('show'), 4000);
});

// ── Smooth Scroll for Anchor Links ───────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});
