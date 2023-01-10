import { apiThemoviedb } from './renderAllCollection';
import moviesWathces from '../templates/movies-watched.hbs';
import { observer } from './renderAllCollection';
import { target } from './renderAllCollection';
export const gallery = document.querySelector('.gallery');
export const WATCH_KEY = 'watch-key';

const viewFafavorites = document.querySelector('.view-favorites-btn');
// const librarry = document.querySelector('.librarry-btn');

if (!JSON.parse(localStorage.getItem(WATCH_KEY))) {
  localStorage.setItem(WATCH_KEY, JSON.stringify([]));
}
// librarry.addEventListener('click', onHideBtnCollection);
// function onHideBtnCollection(e) {
//   console.log(e);
//   viewFafavorites.classList.add('hide');
// }
viewFafavorites.addEventListener('click', onRenderWatches);

export function onRenderMoviesInLibrarry(e) {
  const currentIdBtnWatch = e.target.dataset.id;
  console.log(e);
  apiThemoviedb.fetchFilmsById(currentIdBtnWatch).then(setMovieToLocalStorage);
}

function setMovieToLocalStorage({ poster_path, id, genres, release_date }) {
  const dataFromLocalStorage = JSON.parse(localStorage.getItem(WATCH_KEY));
  localStorage.setItem(
    WATCH_KEY,
    JSON.stringify([
      ...dataFromLocalStorage,
      { poster_path, id, genres, release_date },
    ])
  );
}

function onRenderWatches(e) {
  console.log(e);
  let movieLocal = JSON.parse(localStorage.getItem(WATCH_KEY));
  if (movieLocal) {
    movieLocal = JSON.parse(movieLocal);
  }
}
