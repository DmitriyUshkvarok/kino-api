// import { ApiThemoviedb } from './fatch-films';
import { apiThemoviedb } from './renderAllCollection';
import { refs } from './renderBySearch';
import allCollection from '../templates/all-collection.hbs';

const genreList = document.querySelector('.genre-list');
genreList.addEventListener('click', onCallByGanre);

function onCallByGanre(e) {
  if (e.currentTarget === e.target) {
    return;
  }
  apiThemoviedb.resetPage();
  apiThemoviedb.genreId = e.target.dataset.id;
  // apiThemoviedb.setGenreId(this.genreId);
  apiThemoviedb.fetchFilmsByGenre(apiThemoviedb.genreId).then(onRenderbyGenre);
}

function onRenderbyGenre(owner) {
  const markupGenre = allCollection(owner);
  refs.gallery.innerHTML = markupGenre;
}
