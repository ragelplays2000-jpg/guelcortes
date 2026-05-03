/* =============================================================
   GUELCORTES — main.js
   Menu mobile | Header scroll | Animações | Count-up
   Lightbox | Slider | Formulário WhatsApp | Nav ativo
   ============================================================= */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ========== HEADER: SCROLL + HIDE/SHOW ========== */
  const header = document.getElementById('header');
  let lastScrollY = window.scrollY;

  function onScroll() {
    const y = window.scrollY;

    // Fundo sólido após 80px
    header.classList.toggle('scrolled', y > 80);

    // Oculta no scroll para baixo, exibe no scroll para cima
    if (y > lastScrollY && y > 250) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }

    lastScrollY = y;
  }

  window.addEventListener('scroll', onScroll, { passive: true });


  /* ========== MENU MOBILE ========== */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu   = document.getElementById('nav-menu');

  function closeMenu() {
    navMenu.classList.remove('is-open');
    navToggle.classList.remove('is-active');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu');
    document.body.style.overflow = '';
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Fecha ao clicar em qualquer link do menu
    navMenu.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Fecha ao clicar fora do menu
    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('is-open') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        closeMenu();
      }
    });
  }


  /* ========== SMOOTH SCROLL (com offset do header) ========== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const offset = header ? header.offsetHeight : 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ========== SCROLL ANIMATIONS (IntersectionObserver) ========== */
  const fadeEls = document.querySelectorAll('.animate-fade-up');

  if (fadeEls.length) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -30px 0px',
    });

    fadeEls.forEach(el => fadeObserver.observe(el));
  }


  /* ========== COUNT-UP ANIMATION ========== */
  const countEls = document.querySelectorAll('.hero__stat-number[data-count]');

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function countUp(el, target, duration) {
    const suffix = el.getAttribute('data-suffix') || '';
    let start = null;

    function tick(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      el.textContent = Math.floor(easeOutCubic(progress) * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }

    requestAnimationFrame(tick);
  }

  if (countEls.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el  = entry.target;
          const val = parseInt(el.getAttribute('data-count'), 10);
          countUp(el, val, 1800);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.6 });

    countEls.forEach(el => countObserver.observe(el));
  }


  /* ========== NAV LINK ATIVO NO SCROLL ========== */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__link');

  function updateActiveLink() {
    const offset = (header ? header.offsetHeight : 70) + 24;
    const y = window.scrollY + offset;

    sections.forEach(section => {
      const top    = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id     = section.getAttribute('id');

      if (y >= top && y < bottom) {
        navLinks.forEach(link => {
          const active = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('is-active', active);
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();


  /* ========== FORMULÁRIO → WHATSAPP ========== */
  const form = document.getElementById('contact-form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = form.querySelector('#contact-name').value.trim();
      const phone   = form.querySelector('#contact-whatsapp').value.trim();
      const service = form.querySelector('#contact-service').value;
      const msg     = form.querySelector('#contact-message').value.trim();

      if (!name || !phone || !service) {
        alert('Por favor, preencha nome, WhatsApp e serviço desejado.');
        return;
      }

      const text =
        `Olá! Preenchi o formulário no site:\n` +
        `👤 Nome: ${name}\n` +
        `📱 WhatsApp: ${phone}\n` +
        `✂️ Serviço: ${service}\n` +
        `📝 Mensagem: ${msg || 'Nenhuma mensagem adicional'}`;

      const url = `https://wa.me/5571984059423?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }


  /* ========== GLIGHTBOX ========== */
  function initLightbox() {
    if (typeof GLightbox === 'undefined') return;

    GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      autoplayVideos: false,
      preload: false,
    });
  }


  /* ========== SWIPER (SLIDER DEPOIMENTOS) ========== */
  function initSwiper() {
    if (typeof Swiper === 'undefined') return;

    new Swiper('.testimonials__slider', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.testimonials__pagination',
        clickable: true,
      },
      navigation: {
        prevEl: '.testimonials__nav--prev',
        nextEl: '.testimonials__nav--next',
      },
      breakpoints: {
        768:  { slidesPerView: 2, spaceBetween: 24 },
        1024: { slidesPerView: 3, spaceBetween: 32 },
      },
      a11y: {
        prevSlideMessage: 'Depoimento anterior',
        nextSlideMessage: 'Próximo depoimento',
      },
    });
  }


  /* Inicializa bibliotecas externas após tudo carregar */
  if (document.readyState === 'complete') {
    initLightbox();
    initSwiper();
  } else {
    window.addEventListener('load', () => {
      initLightbox();
      initSwiper();
    });
  }

}); // end DOMContentLoaded
