import moviesWathces from '../templates/movies-watched.hbs';
import { apiThemoviedb } from './renderAllCollection';
import onOpenCard from './renderById';

function onRenderMoviesInLibrarry(onOpenCard) {
  const currentIdBtnWatch = e.target.dataset.id;
  apiThemoviedb.fetchFilmsById(currentIdBtnWatch).then(onOpenCardCollection);
}

function onOpenCardCollection(movie) {
  const resultWatch = moviesWathces(movie);
  console.dir(resultWatch);

  librarryContainer.innerHTML = resultWatch;
  apiThemoviedb.resetPage();
}
