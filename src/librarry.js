// import './main-js/btn-scroll-up';
// import './main-js/title-animation';
// import './main-js/tioggle-theme';
// import './main-js/location';
// import './main-js/google-translate';
import './main-js/firebase';
// import './main-js/preloader';
// import './main-js/render-favorites-movies';
import { gallery, WATCH_KEY } from './main-js/render-favorites-movies';
import moviesWathces from './templates/movies-watched.hbs';

function renderMarkupListMovies() {
  console.dir('fff');
  const data = JSON.parse(localStorage.getItem(WATCH_KEY));

  if (!data && !data[0]) {
    return;
  }
  const markup = data
    .map(el => {
      moviesWathces(el);
    })
    .join('');

  gallery.innerHTML = markup;
}
renderMarkupListMovies();
// import './main-js/renderById';
// import './main-js/fatch-films';
// import {
//   onRenderMoviesInLibrarry,
//   onOpenCardCollection,
// } from './main-js/renderById';
