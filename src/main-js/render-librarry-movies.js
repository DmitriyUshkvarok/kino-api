import moviesWathces from '../templates/movies-watched.hbs';
import noFilmsInLibrarry from '../templates/modal-no-films-librarry.hbs';
import { ApiThemoviedb } from './fatch-films';
import modalFunction from '../templates/modal.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
export const gallery = document.querySelector('.gallery');
export const WATCH_KEY = 'watch-key';
const apiThemoviedb = new ApiThemoviedb();

gallery.addEventListener('click', onClickGalleryLibraryRemoveAndOpenModal);

// получение списка фильмов из локального хранилища для библиотеки
function getWatchesList() {
  const data = JSON.parse(localStorage.getItem(WATCH_KEY));
  if (!data) {
    gallery.innerHTML = noFilmsInLibrarry();
    return;
  }
  return data;
}

// рендер карточек в библиотеку из локального хранилища
function renderMarkupListMovies() {
  let data = getWatchesList();
  const markup = data
    .map(el => {
      return moviesWathces(el);
    })
    .join('');

  gallery.innerHTML = markup;

  if (!markup) {
    gallery.innerHTML = noFilmsInLibrarry();
  }
}
renderMarkupListMovies();

async function onClickGalleryLibraryRemoveAndOpenModal(e) {
  if (e.target === e.currentTarget) {
    return;
  }

  const currentId = e.target.closest('.movie-card__item').dataset.id;
  apiThemoviedb.setMovieId(currentId);

  if (e.target.id === 'close') {
    let data = getWatchesList();
    console.log(data);
    data = data.filter(film => film.id !== Number(currentId));
    localStorage.setItem(WATCH_KEY, JSON.stringify(data));
    window.location.reload();
  } else {
    await apiThemoviedb
      .fetchFilmsById(this.currentId)
      .then(onOpenCardModalLibrarry);
  }
}

// рендер модального окна
function onOpenCardModalLibrarry(respModal) {
  // console.log(respModal);
  const markupId = modalFunction(respModal);
  const instance = basicLightbox.create(markupId);
  instance.show();

  document.body.classList.add('stop-fon');

  // закрытие модального окна по кнопке esc
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
}
