import { apiThemoviedb } from './renderAllCollection';
import { setMovieToLocalStorage } from './render-favorites-movies';
import { Notify } from 'notiflix';
import { onPlayVideo } from './play-video';
import topRater from '../templates/top-rated.hbs';
import modalFunction from '../templates/modal.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import {
  setMovieToLocalStorage,
  getWatchesList,
  WATCH_KEY,
} from './render-favorites-movies';

const swiperContainer = document.querySelector('.ganre-wrapper');
const genrePopulary = document.querySelector('.ganre-populary');
genrePopulary.addEventListener('click', onRanderRatingMovie);

// запрос на рендер топ 20 фильмов
function rebnderByRater() {
  apiThemoviedb.fetchFilmsByPopular().then(onRenderTopList);
}
rebnderByRater();

// рендер топ 20 фильмов
export function onRenderTopList(responseTopList) {
  const markupTopList = topRater(responseTopList);
  swiperContainer.insertAdjacentHTML('beforeend', markupTopList);
}

// запрос на открытие модального окна в галерее топ 20
function onRanderRatingMovie(e) {
  if (e.target === e.currentTarget) {
    return;
  }

  const currentId = e.target.closest('.rater-slide').dataset.id;
  apiThemoviedb.setMovieId(currentId);
  apiThemoviedb.fetchFilmsById().then(onOpenCardRater);
}

// рендер модального окна галереи топ 20
function onOpenCardRater(ownerRater) {
  const markupRater = modalFunction(ownerRater);
  const instance = basicLightbox.create(markupRater);
  instance.show();
  document.body.classList.add('stop-fon');
  const modalImg = document.querySelector('.modal-img');
  modalImg.addEventListener('click', onPlayVideo);

  let watchedList = getWatchesList();
  const modalLibrarryBtn = document.querySelector('.modal-btn');
  if (!watchedList.find(film => film.id === ownerRater.id)) {
    modalLibrarryBtn.textContent = 'Add to watched';
  } else {
    modalLibrarryBtn.textContent = 'Remove from watched';
  }

  // закрытие модалки по кнопке esc
  window.addEventListener('keydown', onEscKeyPressEight);
  function onEscKeyPressEight(event) {
    if (event.code === 'Escape') {
      instance.close();
      document.body.classList.remove('stop-fon');
    }
  }

  //  закрытие модального окна по клику бекдропа
  const basic = document.querySelector('.basicLightbox');
  basic.addEventListener('click', onOffHidden);

  function onOffHidden() {
    document.body.classList.remove('stop-fon');
  }

  // клик на добавление карточки  из топ 20 в галерею
  const modal = document.querySelector('.modal');
  modal.addEventListener('click', addRatedMovieOnLibrarry);
}

// рендер и сохранение в локальное хранилище библиотеки карточки топ 20
async function addRatedMovieOnLibrarry(e) {
  console.log(e);
  if (e.target.id !== 'open') {
    return;
  }
  const currentIdExp = e.target.dataset.id;
  let dataExpected = getWatchesList();
  if (dataExpected.find(film => film.id === Number(currentIdExp))) {
    const modalLibrarryBtn = document.querySelector('.modal-btn');
    modalLibrarryBtn.textContent = 'Add to watched';
    let dataExpected = getWatchesList();
    dataExpected = dataExpected.filter(
      film => film.id !== Number(currentIdExp)
    );
    localStorage.setItem(WATCH_KEY, JSON.stringify(dataExpected));
    Notify.warning('Фильм Удалён из библиотеки');
  } else {
    let dataExpected = getWatchesList();
    const modalLibrarryBtn = document.querySelector('.modal-btn');
    modalLibrarryBtn.textContent = 'remove from watch';
    localStorage.setItem(WATCH_KEY, JSON.stringify(dataExpected));
    const currentIdExp = e.target.dataset.id;
    apiThemoviedb.setMovieId(currentIdExp);
    apiThemoviedb.fetchFilmsById(currentIdExp).then(setMovieToLocalStorage);
    Notify.success('Фильм добавлен в библиотеку');
  }
}
