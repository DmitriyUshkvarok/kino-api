import { apiThemoviedb } from './renderAllCollection';
import topRater from '../templates/top-rated.hbs';
import modalFunction from '../templates/modal.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const swiperContainer = document.querySelector('.ganre-wrapper');
const genrePopulary = document.querySelector('.ganre-populary');

function rebnderByRater() {
  apiThemoviedb.fetchFilmsByPopular().then(onRenderTopList);
}
rebnderByRater();

export function onRenderTopList(responseTopList) {
  const markupTopList = topRater(responseTopList);
  swiperContainer.insertAdjacentHTML('beforeend', markupTopList);
}

genrePopulary.addEventListener('click', onRanderRatingMovie);

function onRanderRatingMovie(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const currentId = e.target.dataset.id;
  apiThemoviedb.setMovieId(currentId);
  apiThemoviedb.fetchFilmsById().then(onOpenCardRater);
}

function onOpenCardRater(ownerRater) {
  const markupRater = modalFunction(ownerRater);
  const instance = basicLightbox.create(markupRater);
  instance.show();
  document.body.classList.add('stop-fon');

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
