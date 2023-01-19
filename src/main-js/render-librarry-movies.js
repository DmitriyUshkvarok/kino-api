import moviesWathces from '../templates/movies-watched.hbs';
import noFilmsInLibrarry from '../templates/modal-no-films-librarry.hbs';
import { ApiThemoviedb } from './fatch-films';
import modalFunction from '../templates/modal.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { Notify } from 'notiflix';
export const gallery = document.querySelector('.gallery');
export const WATCH_KEY = 'watch-key';
const apiThemoviedb = new ApiThemoviedb();

gallery.addEventListener('click', onClickGalleryLibraryRemoveAndOpenModal);

// получение списка фильмов из локального хранилища для библиотеки и проверка на пустую библиотеку
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
    Notify.warning('Фильм Удалён из библиотеки');
    renderMarkupListMovies();
  } else {
    await apiThemoviedb
      .fetchFilmsById(this.currentId)
      .then(onOpenCardModalLibrarry);
  }
}
// рендер модального окна
function onOpenCardModalLibrarry(respModal) {
  let data = getWatchesList();
  const markupId = modalFunction(respModal);
  const instance = basicLightbox.create(markupId);
  instance.show();
  document.body.classList.add('stop-fon');

  const modalImg = document.querySelector('.modal-img');
  modalImg.addEventListener('click', onPlayVideos);

  const modalLibrarryBtn = document.querySelector('.modal-btn');
  modalLibrarryBtn.textContent = 'remove from watch';
  modalLibrarryBtn.addEventListener('click', e => {
    const currentId = e.target.dataset.id;
    if (data.find(film => film.id === Number(currentId))) {
      let data = getWatchesList();
      data = data.filter(film => film.id !== Number(currentId));
      localStorage.setItem(WATCH_KEY, JSON.stringify(data));
      instance.close();
      Notify.success('Фильм Удалён из библиотеки');
      renderMarkupListMovies();
    }
  });

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

function onPlayVideos(e) {
  const currentIdVideos = e.target.dataset.id;
  apiThemoviedb.setMovieId(currentIdVideos);
  apiThemoviedb.fetchTrailerMovies(currentIdVideos).then(onRenderVideos);
}

function onRenderVideos(respVideos) {
  if (respVideos.results.length) {
    const keys = respVideos.results[0].key;
    const videos = `<div class='video-modal'><iframe class="modal-film__video" src="https://www.youtube.com/embed/${keys}/" width="800" height="400" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
    const instance = basicLightbox.create(videos);
    instance.show();
  } else {
    Notify.failure('Извините ,видео не найдено');
  }
}
