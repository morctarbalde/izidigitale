// Izidigitale — Main JS v2

/* ——— Reveal Animation (Intersection Observer) ——— */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ——— Sticky Nav ——— */
const navbar = document.getElementById('navbar');
if (navbar) {
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ——— Hamburger Menu ——— */
const hamburger = document.getElementById('hamburger');
if (hamburger && navbar) {
  hamburger.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('mobile-open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close on nav link click
  navbar.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('mobile-open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ——— FAQ Accordion ——— */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    const answer = btn.nextElementSibling;

    // Close all others
    document.querySelectorAll('.faq-q').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      const a = b.nextElementSibling;
      if (a) a.classList.remove('open');
    });

    // Toggle current
    if (!isExpanded) {
      btn.setAttribute('aria-expanded', 'true');
      if (answer) answer.classList.add('open');
    }
  });
});

/* ——— Strip ticker duplication for seamless loop ——— */
const strip = document.querySelector('.strip-inner');
if (strip) {
  strip.innerHTML += strip.innerHTML; // duplicate for seamless scroll
}

/* ——— Contact Form ——— */
const contactForm = document.getElementById('main-contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const span = btn.querySelector('span');
    const originalText = span.textContent;

    span.textContent = 'Envoi en cours…';
    btn.disabled = true;

    // Simulate sending (replace with actual fetch/API call)
    await new Promise(resolve => setTimeout(resolve, 1600));

    span.textContent = '✓ Message envoyé avec succès !';
    btn.style.background = '#10b981';
    btn.style.boxShadow = '0 8px 24px rgba(16,185,129,0.35)';
    contactForm.reset();

    setTimeout(() => {
      span.textContent = originalText;
      btn.style.background = '';
      btn.style.boxShadow = '';
      btn.disabled = false;
    }, 4000);
  });
}

/* ——— Smooth Anchor Scroll Highlight in Nav ——— */
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = Array.from(navLinks)
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

const navHighlight = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = '#' + entry.target.id;
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === id);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navHighlight.observe(s));
