import { apiThemoviedb } from './renderAllCollection';
import modalFunction from '../templates/modal.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import moviesWathces from '../templates/movies-watched.hbs';

const gallery = document.querySelector('.gallery');
const librarryContainer = document.querySelector('.librarry-colection');

gallery.addEventListener('click', onClickCard);

export function onClickCard(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  // apiThemoviedb.movieId = e.target.dataset.id;
  const currentId = e.target.dataset.id;
  apiThemoviedb.setMovieId(currentId);
  apiThemoviedb.fetchFilmsById().then(onOpenCard);
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
    const currentIdBtnWatch = e.target.dataset.id;
    apiThemoviedb.fetchFilmsById(currentIdBtnWatch).then(onOpenCardCollection);
  }

  function onOpenCardCollection(movie) {
    const resultWatch = moviesWathces(movie);
    console.dir(resultWatch);

    librarryContainer.insertAdjacentHTML('beforeend', resultWatch);
    apiThemoviedb.resetPage();
  }
}
