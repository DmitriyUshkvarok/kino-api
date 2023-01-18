import { apiThemoviedb } from './renderAllCollection';
import expecredMovies from '../templates/expected-movies.hbs';
import { Notify } from 'notiflix';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import {
  setMovieToLocalStorage,
  getWatchesList,
  WATCH_KEY,
} from './render-favorites-movies';
const swiper = new Swiper();
const expectedWrapper = document.querySelector('.expected-movies-list');

// запрос апи ожидаемых фильмов
function renderByExpected() {
  apiThemoviedb.fetchExpectedMovies().then(onRenderExpected);
}
renderByExpected();

// рендер ожидаемых фильмов
function onRenderExpected(expectedResponse) {
  const expectedList = expecredMovies(expectedResponse);
  expectedWrapper.innerHTML = expectedList;
  const movieItemBtn = document.querySelectorAll('.expected-btn');
  movieItemBtn.forEach(movieItems => {
    movieItems.addEventListener('click', onAddCardToLibrarry);
  });
}

function onAddCardToLibrarry(e) {
  if (e.target.id !== 'open') {
    return;
  }

  const currentIdExp = e.target.dataset.id;
  let dataExpected = getWatchesList();
  if (dataExpected.find(film => film.id === Number(currentIdExp))) {
    let dataExpected = getWatchesList();
    dataExpected = dataExpected.filter(
      film => film.id !== Number(currentIdExp)
    );
    localStorage.setItem(WATCH_KEY, JSON.stringify(dataExpected));
    Notify.warning('Фильм Удалён из библиотеки');
  } else {
    let dataExpected = getWatchesList();
    localStorage.setItem(WATCH_KEY, JSON.stringify(dataExpected));
    const currentIdExp = e.target.dataset.id;
    apiThemoviedb.setMovieId(currentIdExp);
    apiThemoviedb.fetchFilmsById(currentIdExp).then(setMovieToLocalStorage);
    Notify.success('Фильм добавлен в библиотеку');
  }
}
