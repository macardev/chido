document.addEventListener('DOMContentLoaded', () => {

  // === NAVBAR SCROLL ===
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  });

  // === HAMBURGER ===
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // === INTERSECTION OBSERVER — FADE-IN + ACTIVE NAV ===
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '-80px 0px 0px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const fadeEls = entry.target.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-scale, .fade-in-rotate');
      if (entry.isIntersecting) {
        fadeEls.forEach(el => el.classList.add('visible'));
      }

      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // === PARALLAX BURRITO ===
  const burrito = document.getElementById('parallax-burrito');
  const heroSection = document.getElementById('hero');
  const BURRITO_WIDTH = 260;
  const SIDE_WIDTH = 180;
  const SIDE_LEFT_PX = 24;
  const TRANSITION_ZONE = 400;

  function getMaxScroll() {
    return document.documentElement.scrollHeight - window.innerHeight;
  }

  function getCenterLeft() {
    return window.innerWidth / 2 - BURRITO_WIDTH / 2;
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function updateBurrito() {
    if (!burrito) return;
    const scrollY = window.scrollY;
    const maxScroll = getMaxScroll();
    const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;
    const vhShift = progress * 35;
    const heroHeight = heroSection.offsetHeight;

    let leftPx, scale;

    if (scrollY <= heroHeight) {
      leftPx = getCenterLeft();
      scale = 1;
    } else if (scrollY < heroHeight + TRANSITION_ZONE) {
      const t = (scrollY - heroHeight) / TRANSITION_ZONE;
      const eased = easeOutCubic(t);
      leftPx = getCenterLeft() * (1 - eased) + SIDE_LEFT_PX * eased;
      scale = 1 - eased * (1 - SIDE_WIDTH / BURRITO_WIDTH);
    } else {
      leftPx = SIDE_LEFT_PX;
      scale = SIDE_WIDTH / BURRITO_WIDTH;
    }

    burrito.style.left = `${leftPx}px`;
    burrito.style.transform = `translate(0, calc(-50% + ${vhShift}vh)) rotate(${scrollY * 0.02}deg) scale(${scale})`;
  }

  updateBurrito();
  window.addEventListener('scroll', updateBurrito);
  window.addEventListener('resize', updateBurrito);

  // === GALLERY HORIZONTAL SCROLL ===
  const galeri = document.getElementById('galeri');
  const galleryTrack = document.querySelector('.gallery-track');

  function setGalleryHeight() {
    if (!galeri || !galleryTrack) return;
    if (window.innerWidth <= 768) { galeri.style.height = ''; return; }
    const extraScroll = Math.max(0, galleryTrack.scrollWidth - window.innerWidth);
    galeri.style.height = `${extraScroll + window.innerHeight}px`;
  }

  function updateGallery() {
    if (!galeri || !galleryTrack) return;
    if (window.innerWidth <= 768) { galleryTrack.style.transform = ''; return; }
    const rect = galeri.getBoundingClientRect();
    const sectionHeight = galeri.offsetHeight;
    const viewHeight = window.innerHeight;
    const maxTranslate = Math.max(0, galleryTrack.scrollWidth - window.innerWidth);

    if (maxTranslate === 0) {
      galleryTrack.style.transform = 'translateX(0)';
      return;
    }

    const scrollable = sectionHeight - viewHeight;
    const progress = scrollable > 0 ? Math.max(0, Math.min(1, -rect.top / scrollable)) : 0;

    galleryTrack.style.transform = `translateX(${-progress * maxTranslate}px)`;
  }

  // Initial calc works via min-width; recalculate once images actually load
  setGalleryHeight();
  const galleryImgs = document.querySelectorAll('.gallery-item img');
  let imagesLoaded = 0;
  galleryImgs.forEach(img => {
    if (img.complete) {
      imagesLoaded++;
    } else {
      img.addEventListener('load', () => {
        imagesLoaded++;
        if (imagesLoaded === galleryImgs.length) setGalleryHeight();
      });
    }
  });
  if (imagesLoaded === galleryImgs.length) setGalleryHeight();
  setTimeout(setGalleryHeight, 800);

  window.addEventListener('scroll', updateGallery);
  window.addEventListener('resize', () => {
    setGalleryHeight();
    updateGallery();
  });

});
