import { modalLibrarryBtn } from './renderById';
import moviesWathces from '../templates/movies-watched.hbs';
modalLibrarryBtn.addEventListener('click', onRenderMoviesInLibrarry);

function onRenderMoviesInLibrarry(e) {
  const currentIdBtnWatch = e.target.dataset.id;
  apiThemoviedb.fetchFilmsById(currentIdBtnWatch).then(onOpenCardCollection);
}

function onOpenCardCollection(movie) {
  const resultWatch = moviesWathces(movie);
  console.dir(resultWatch);

  librarryContainer.innerHTML = resultWatch;
  apiThemoviedb.resetPage();
}
