import { apiThemoviedb } from './renderAllCollection';
import expecredMovies from '../templates/expected-movies.hbs';
const expectedWrapper = document.querySelector('.expected-movies-list');

function renderByExpected() {
  apiThemoviedb.fetchExpectedMovies().then(onRenderExpected);
}
renderByExpected();

function onRenderExpected(expectedResponse) {
  const expectedList = expecredMovies(expectedResponse);
  expectedWrapper.innerHTML = expectedList;
}
