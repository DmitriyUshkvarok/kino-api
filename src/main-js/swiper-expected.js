import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { EffectFade } from 'swiper';
import { EffectCube } from 'swiper';
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
Swiper.use([Autoplay]);

const swiper = new Swiper('.expected-swiper', {
  modules: [EffectFade, EffectCube, Navigation, Pagination, Autoplay],
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  // autoplay: {
  //   delay: 2000,
  //   // disableOnInteraction: true,
  // },
  grabCursor: true,
  // loop: true,
  slidesPerView: 1,
  slidesPerGroup: 1,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
