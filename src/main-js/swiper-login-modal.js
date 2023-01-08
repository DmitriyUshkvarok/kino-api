import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { EffectFade } from 'swiper';
import { EffectCube } from 'swiper';
// import Swiper, { Autoplay } from 'swiper';
// Swiper.use([Autoplay]);

const swiper = new Swiper('.modal-swiper', {
  modules: [EffectFade, EffectCube],
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  grabCursor: true,
  autoplay: {
    delay: 4500,
    disableOnInteraction: true,
  },
  loop: true,
  effect: 'cube',
  cubeEffect: {
    slideShadows: false,
  },
});
