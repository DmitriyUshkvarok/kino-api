import allCollection from '../templates/all-collection.hbs';
import Notiflix from 'notiflix';
import { apiThemoviedb } from './renderAllCollection';
import { scrollSmooth } from './scroll-by-push-btn-search';

export const refs = {
  searchForm: document.querySelector('.search-form'),
  searchInput: document.querySelector('.input-search'),
  searchButton: document.querySelector('.search-button'),
  gallery: document.querySelector('.gallery'),
};

refs.searchForm.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();
  apiThemoviedb.searchValue = e.currentTarget.elements.searchQuery.value.trim();

  if (!apiThemoviedb.searchValue) {
    return Notiflix.Notify.info('Enter the name movie');
  }
  apiThemoviedb.resetPage();
  apiThemoviedb.fetchFilmsBySearch(apiThemoviedb.searchValue).then(showMovie);
  refs.searchForm.elements.searchQuery.value = '';
  scrollSmooth();
}

function showMovie(resultSearch) {
  const markupSearch = allCollection(resultSearch);
  refs.gallery.innerHTML = markupSearch;
}
