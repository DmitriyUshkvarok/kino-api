import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { onRenderTopList } from './renderByRated';
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
Swiper.use([Autoplay]);

const swiper = new Swiper('.mySwiper', {
  modules: [Navigation, Pagination, Autoplay],
  autoplay: {},
  slidesPerView: 'auto',
  slidesPerGroup: 1,

  virtual: {
    slides: (function () {
      let slide = [];
      for (let i = 0; i <= 20; i++) {
        slide.push(onRenderTopList());
      }
      return slide;
    })(),
    freeMode: true,
  },
});
