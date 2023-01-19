import { ApiThemoviedb } from './fatch-films';
import allCollection from '../templates/all-collection.hbs';
import Notiflix from 'notiflix';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
// бесконечный скролл
const options = {
  root: null,
  rootMargin: '400px',
  // threshold: 1.0,
};
export const observer = new IntersectionObserver(onLoadFilmCards, options);
export const target = document.querySelector('.target');

export const apiThemoviedb = new ApiThemoviedb();
const gallery = document.querySelector('.gallery');
// вызов функции загрузки главной коллекции фильмов
function onLoadCollection() {
  apiThemoviedb.fetchFilms(apiThemoviedb.page).then(renderMarkupMovieCard);
  observer.observe(target);
}
onLoadCollection();
// подгрузка бесконечного скролла
export function onLoadFilmCards(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      apiThemoviedb.incrementPage();
      if (apiThemoviedb.genreId) {
        apiThemoviedb
          .fetchFilmsByGenre(apiThemoviedb.genreId)
          .then(renderMarkupMovieCard);
      } else if (apiThemoviedb.searchValue) {
        apiThemoviedb
          .fetchFilmsBySearch(apiThemoviedb.searchValue)
          .then(renderMarkupMovieCard);
      } else {
        apiThemoviedb.fetchFilms().then(renderMarkupMovieCard);
      }
    }
  });
}

// рендер коллекции фильмов
function renderMarkupMovieCard(results) {
  const resultAll = allCollection(results);
  gallery.insertAdjacentHTML('beforeend', resultAll);
  if (results.results.length === 0) {
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

// observer.unobserve(target);
