import { apiThemoviedb } from './renderAllCollection';
import modalFunction from '../templates/modal.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const gallery = document.querySelector('.gallery');

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

  // добавить карточки в библиотеку
  // const librarryCollection = document.querySelector('.librarry-colection');
}
