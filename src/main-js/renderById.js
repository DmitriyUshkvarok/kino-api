import { apiThemoviedb } from './renderAllCollection';
import modalFunction from '../templates/modal.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { onRenderMoviesInLibrarry } from './render-favorites-movies';

const gallery = document.querySelector('.gallery');

gallery.addEventListener('click', onClickCard);

function onClickCard(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const currentId = e.target.dataset.id;
  apiThemoviedb.setMovieId(currentId);
  apiThemoviedb.fetchFilmsById(currentId).then(onOpenCard);
}

function onOpenCard(data) {
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
  // добавить карточки в библиотеку  клик ===========================================================================
  const modalLibrarryBtn = document.querySelector('.modal-btn');
  modalLibrarryBtn.addEventListener('click', onRenderMoviesInLibrarry);
  // ====
}

export { onClickCard, onOpenCard };
