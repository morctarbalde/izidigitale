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

/* ——— Animated Number Counters ——— */
function animateCounter(el, target, duration = 1800, suffix = '') {
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      animateCounter(el, target, 1800, suffix);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));

/* ——— Hero Content Entrance ——— */
const heroContent = document.querySelector('.hero-center-content');
if (heroContent) {
  heroContent.style.opacity = '0';
  heroContent.style.transform = 'translateY(30px)';
  setTimeout(() => {
    heroContent.style.transition = 'opacity 1s cubic-bezier(0.4,0,0.2,1), transform 1s cubic-bezier(0.4,0,0.2,1)';
    heroContent.style.opacity = '1';
    heroContent.style.transform = 'translateY(0)';
  }, 200);
  const trustBar = document.querySelector('.hero-trust-bar');
  if (trustBar) {
    trustBar.style.opacity = '0';
    setTimeout(() => {
      trustBar.style.transition = 'opacity 0.8s ease';
      trustBar.style.opacity = '1';
    }, 900);
  }
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
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
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

/* ——— Custom Cursor ——— */
const customCursor = document.createElement('div');
customCursor.className = 'custom-cursor';
document.body.appendChild(customCursor);

const cursorFollow = document.createElement('div');
cursorFollow.className = 'custom-cursor-follower';
document.body.appendChild(cursorFollow);

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followX = 0, followY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

const renderCursor = () => {
  cursorX += (mouseX - cursorX) * 0.5;
  cursorY += (mouseY - cursorY) * 0.5;
  followX += (mouseX - followX) * 0.15;
  followY += (mouseY - followY) * 0.15;

  customCursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
  cursorFollow.style.transform = `translate3d(${followX}px, ${followY}px, 0)`;

  requestAnimationFrame(renderCursor);
};
requestAnimationFrame(renderCursor);

/* Interactive Elements Hover Effect for Cursor */
const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .pricing-card, .benefit-card, .testi-card');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorFollow.classList.add('hover-active');
    customCursor.classList.add('hide');
  });
  el.addEventListener('mouseleave', () => {
    cursorFollow.classList.remove('hover-active');
    customCursor.classList.remove('hide');
  });
});
