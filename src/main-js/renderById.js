import { apiThemoviedb } from './renderAllCollection';
import modalFunction from '../templates/modal.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import moviesWathces from '../templates/movies-watched.hbs';
import { observer } from './renderAllCollection';
import { target } from './renderAllCollection';

const gallery = document.querySelector('.gallery');
// const galleryData = document.querySelector('[data-films]');

gallery.addEventListener('click', onClickCard);

export function onClickCard(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  // apiThemoviedb.movieId = e.target.dataset.id;
  const currentId = e.target.dataset.id;
  apiThemoviedb.setMovieId(currentId);
  apiThemoviedb.fetchFilmsById(currentId).then(onOpenCard);
}

export function onOpenCard(data) {
  const markupId = modalFunction(data);
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
  // добавить карточки в библиотеку ===========================================================================
  const modalLibrarryBtn = document.querySelector('.modal-btn');
  modalLibrarryBtn.addEventListener('click', onRenderMoviesInLibrarry);
  function onRenderMoviesInLibrarry(e) {
    // instance.close();
    const currentIdBtnWatch = e.target.dataset.id;
    console.log(e);
    apiThemoviedb.fetchFilmsById(currentIdBtnWatch).then(onOpenCardCollection);
    observer.unobserve(target);
  }

  function onOpenCardCollection(movie) {
    const resultWatch = moviesWathces(movie);
    gallery.innerHTML = resultWatch;
    console.dir(resultWatch);
    apiThemoviedb.resetPage();
  }
}
