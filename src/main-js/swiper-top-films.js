import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { onRenderTopList } from './renderByRated';
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
Swiper.use([Autoplay]);

const swiper = new Swiper('.mySwiper', {
  modules: [Navigation, Pagination, Autoplay],
  autoplay: {
    delay: 2000,
    // disableOnInteraction: true,
  },
  slidesPerView: 'auto',
  slidesPerGroup: 1,
  // loop: true,
  // loopFillGroupWithBlank: true,
  // loopedSlides: 40,

  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },
  virtual: {
    slides: (function () {
      let slide = [];
      for (let i = 0; i <= 20; i++) {
        slide.push(onRenderTopList());
      }
      return slide;
    })(),
    // spaceBetween: 40,
    freeMode: true,
  },

  // breakpointsInverse: true,
  // dynamicMainBullets: 6,
  // pagination: {
  //   el: '.swiper-pagination',
  //   clickable: true,
  // },
  // breakpoints: {
  //   320: {
  //     slidesPerView: 1,
  //     spaceBetween: 10,
  //   },

  //   485: {
  //     slidesPerView: 2,
  //   },

  //   800: {
  //     slidesPerView: 3,
  //     spaceBetween: 10,
  //   },
  // },
});
