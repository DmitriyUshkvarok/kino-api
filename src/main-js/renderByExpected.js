import { apiThemoviedb } from './renderAllCollection';
import expecredMovies from '../templates/expected-movies.hbs';
import { Notify } from 'notiflix';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { setMovieToLocalStorage } from './render-favorites-movies';
const swiper = new Swiper();
const expectedWrapper = document.querySelector('.expected-movies-list');
const expectedContainer = document.querySelector('.expected-swiper ');

expectedContainer.addEventListener('click', addExpecteddetMovie);

// клик по кнопке добавить фильм в окне ожидаемых фильмов и добавление  карточки в библиотеку
async function addExpecteddetMovie(e) {
  console.log(e);
  if (e.target.id === 'open') {
    const currentIdBtnWatch = e.target.dataset.id;
    apiThemoviedb.setMovieId(currentIdBtnWatch);
    await apiThemoviedb
      .fetchFilmsById(currentIdBtnWatch)
      .then(setMovieToLocalStorage);
    Notify.success('Фильм добавлен в библиотеку');
  }
}

// запрос апи ожидаемых фильмов
function renderByExpected() {
  apiThemoviedb.fetchExpectedMovies().then(onRenderExpected);
}
renderByExpected();

// рендер ожидаемых фильмов
function onRenderExpected(expectedResponse) {
  const expectedList = expecredMovies(expectedResponse);
  expectedWrapper.innerHTML = expectedList;
}
