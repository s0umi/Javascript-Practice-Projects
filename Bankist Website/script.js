'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScroll.addEventListener('click', () => {
  section1.scrollIntoView({ behavior: 'smooth' });
});
//page navigation

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//tabbed components
const tabsContainer = document.querySelector('.operations__tab-container');

const tabs = document.querySelectorAll('.operations__tab');

const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//menu fade animation

const nav = document.querySelector('.nav');
const handelHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = e.target
      .closest('.nav__links')
      .querySelectorAll('.nav__link');
    siblings.forEach(el => {
      if (el != link) {
        el.style.opacity = opacity;
      }
    });
  }
};

nav.addEventListener('mouseover', function (e) {
  handelHover(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  handelHover(e, 1);
});

const header = document.querySelector('.header');

const obscallback = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(obscallback, {
  root: null,
  threshold: 0,
  rootMargin: '-90px',
});

headerObserver.observe(header);

const allSections = document.querySelectorAll('section');
const secCall = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(secCall, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

const imgLazy = document.querySelectorAll('img[data-src]');

const imgCallback = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });
};

const imgObserver = new IntersectionObserver(imgCallback, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgLazy.forEach(img => imgObserver.observe(img));

const slides = document.querySelectorAll('.slide');
const rightButton = document.querySelector('.slider__btn--right');
const leftButton = document.querySelector('.slider__btn--left');
let curSlide = 0;

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${(i - slide) * 100}%)`;
  });
};
goToSlide(0);

const nextSlide = function () {
  if (curSlide === slides.length - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = slides.length - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};
rightButton.addEventListener('click', nextSlide);
leftButton.addEventListener('click', prevSlide);
