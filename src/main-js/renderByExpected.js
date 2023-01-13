import { apiThemoviedb } from './renderAllCollection';
import expecredMovies from '../templates/expected-movies.hbs';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
const swiper = new Swiper();
// import { onRenderMoviesInLibrarry } from './render-favorites-movies';
const expectedWrapper = document.querySelector('.expected-movies-list');

function renderByExpected() {
  apiThemoviedb.fetchExpectedMovies().then(onRenderExpected);
}
renderByExpected();

function onRenderExpected(expectedResponse) {
  const expectedList = expecredMovies(expectedResponse);
  expectedWrapper.innerHTML = expectedList;
}

// const expectedBtn = document.querySelector('.expected-btn');
// expectedBtn.addEventListener('click', onAddExpectedInLibrarry);
// function onAddExpectedInLibrarry(e) {
//   console.log(e);
//   // onRenderMoviesInLibrarry();
// }
