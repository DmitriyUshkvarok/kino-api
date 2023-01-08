import { ApiThemoviedb } from './fatch-films';
import '@fancyapps/ui/dist/fancybox.css';
import allCollection from '../templates/all-collection.hbs';
import Notiflix from 'notiflix';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const gallery = document.querySelector('.gallery');
export const apiThemoviedb = new ApiThemoviedb();
// бесконечный скролл
const options = {
  root: null,
  rootMargin: '400px',
  // threshold: 1.0,
};
const observer = new IntersectionObserver(onLoadFilmCards, options);
const target = document.querySelector('.target');

// вызов функции загрузки главной коллекции фильмов
function onLoadCollection() {
  apiThemoviedb.fetchFilms(apiThemoviedb.page).then(renderMarkupMovieCard);
  observer.observe(target);
}
onLoadCollection();

// подгрузка бесконечного скролла
function onLoadFilmCards(entries) {
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
  if (results.total_pages === 0) {
    return Notiflix.Notify.info('Enter the name movie');
  }
  const resultAll = allCollection(results);
  gallery.insertAdjacentHTML('beforeend', resultAll);
}

// observer.unobserve(target);
// if (resultSearch.page === resultSearch.total_pages) {
//   observer.unobserve(target);
// }

// const markup = results
//   .map(
//     ({
//       id,
//       poster_path,
//       original_language,
//       vote_average,
//       title,
//       release_date,
//     }) => {
//       return `
//     <div class="movie-card__item" data-id="${id}">
//               <div class="movie-card">
//                ${
//                  poster_path
//                    ? `<img src="https://image.tmdb.org/t/p/w500${poster_path}"`
//                    : `<img src="https://yt3.ggpht.com/AAKF_677TIvjFz_9xFF0R6PgiVd0kRpEtY6APSxSDRP65nXg8hkn9NFsz2bRd9_Z37DJ9D_b=s900-c-k-c0x00ffffff-no-rj"`
//                }
//                       class="movie-card__poster"
//                       alt="${title}"
//                       loading="lazy"
//                       data-id="${id}"
//                   />
//                   <div class="card-info">
//                   <h2 class="movie-info-title"> ${title}</h2>
//                   <div class="movie-card__thumb">
//                   <div class="movie-icon-decor">
//                       <span>&#127871;</span>
//                       </div>
//             <p class="info-item-year">${release_date?.slice(0, 4)}</p>
//             </div>
//             <div class="second-thumb">
//             <span class="info-item-language"> ${original_language}
//             </span>
//             <p class="info-item-rating"><span class="rating-icon">&#9733;</span> ${vote_average}</p>
//                   </div>
//                   </div>
//               </div>
//   </div>`;
//     }
//   )
//   .join('');
// gallery.insertAdjacentHTML('beforeend', markup);
