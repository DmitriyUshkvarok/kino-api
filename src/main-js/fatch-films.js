import { Notify } from 'notiflix';
import axios from 'axios';
export class ApiThemoviedb {
  URL = `https://api.themoviedb.org/3`;
  key = 'f27eea818d2010463700365b0c06a16e';

  constructor() {
    this.page = 1;
    this.genreId = null;
    this.movieId = null;
    this.currentId = null;
    this.searchValue = null;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  setMovieId(movieId) {
    this.movieId = movieId;
  }

  // список всех популярных фильмов
  fetchFilms() {
    return axios
      .get(`${this.URL}/discover/movie?api_key=${this.key}&page=${this.page}`)
      .then(response => response.data)
      .catch(this.onError);
  }

  // фильмы по клику (id)
  fetchFilmsById() {
    return axios
      .get(`${this.URL}/movie/${this.movieId}?api_key=${this.key}&`)
      .then(response => response.data)
      .catch(this.onError);
  }

  // список фильмов в поиске по названию
  fetchFilmsBySearch() {
    return axios
      .get(
        `${this.URL}/search/movie?api_key=${this.key}&query=${this.searchValue}&page=${this.page}`
      )
      .then(response => response.data)
      .catch(this.onError);
  }

  // выбор фильмов по жанру
  fetchFilmsByGenre() {
    return axios
      .get(
        `${this.URL}/discover/movie?api_key=${this.key}&with_genres=${this.genreId}&page=${this.page}`
      )
      .then(response => response.data)
      .catch(this.onError);
  }

  // список фильмов с самым высоким рейтингом (хедер)
  fetchFilmsByPopular() {
    return axios
      .get(`${this.URL}/movie/top_rated?api_key=${this.key}`)
      .then(response => response.data)
      .catch(this.onError);
  }

  // список ожидаемых фильмов
  fetchExpectedMovies() {
    return axios
      .get(`${this.URL}/movie/upcoming?api_key=${this.key}&page=${this.page}`)
      .then(response => response.data)
      .catch(this.onError);
  }

  // запрос на просмотр трейлера фильма
  fetchTrailerMovies() {
    return axios
      .get(`${this.URL}/movie/${this.movieId}/videos?api_key=${this.key}`)
      .then(response => response.data)
      .catch(this.onError);
  }

  onError() {
    return Notify.failure('sorry this is error');
  }
}
