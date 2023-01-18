import { apiThemoviedb } from './renderAllCollection';
import modalFunction from '../templates/modal.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { onRenderMoviesInLibrarry } from './render-favorites-movies';
import { getWatchesList } from './render-favorites-movies';

const gallery = document.querySelector('.gallery');

gallery.addEventListener('click', onClickCard);

function onClickCard(e) {
  if (e.target === e.currentTarget) {
    return;
  }

  const currentId = e.target.closest('.movie-card__item').dataset.id;
  apiThemoviedb.setMovieId(currentId);
  apiThemoviedb.fetchFilmsById(currentId).then(onOpenCard);
}

function onOpenCard(data) {
  console.log(data);
  const markupId = modalFunction(data);
  const instance = basicLightbox.create(markupId);
  instance.show();
  document.body.classList.add('stop-fon');
  //  логика кнопки добавить фильм(локальное хранилище)
  let watchedList = getWatchesList();
  const modalLibrarryBtn = document.querySelector('.modal-btn');
  if (!watchedList.find(film => film.id === data.id)) {
    modalLibrarryBtn.textContent = 'Add to watched';
  } else {
    modalLibrarryBtn.textContent = 'Remove from watched';
  }
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
  // добавить карточки в библиотеку  клик ====================
  modalLibrarryBtn.addEventListener('click', onRenderMoviesInLibrarry);
}

export { onClickCard, onOpenCard };
