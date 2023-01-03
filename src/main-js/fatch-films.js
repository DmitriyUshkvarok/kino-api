import Notiflix from 'notiflix';
// рендер всех карточек
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
    return fetch(
      `${this.URL}/discover/movie?api_key=${this.key}&page=${this.page}`
    )
      .then(response => response.json())
      .catch(this.onError);
  }

  // фильмы по клику (id)
  fetchFilmsById() {
    return fetch(`${this.URL}/movie/${this.movieId}?api_key=${this.key}&`)
      .then(response => response.json())
      .catch(this.onError);
  }

  // список фильмов в поиске по названию
  fetchFilmsBySearch(searchValue) {
    return fetch(
      `${this.URL}/search/movie/?api_key=${this.key}&query=${searchValue}&page=${this.page}`
    )
      .then(response => response.json())
      .catch(this.onError);
  }

  // выбор фильмов по жанру
  fetchFilmsByGenre() {
    return fetch(
      `${this.URL}/discover/movie?api_key=${this.key}&with_genres=${this.genreId}&page=${this.page}`
    )
      .then(response => response.json())
      .catch(this.onError);
  }

  // список фильмов с самым высоким рейтингом (хедер)
  fetchFilmsByPopular() {
    return fetch(`${this.URL}/movie/top_rated?api_key=${this.key}`)
      .then(response => response.json())
      .catch(this.onError);
  }

  onError(errorMovie) {
    return Notiflix.failure('sorry this is error');
  }
}

// рендер по клику id

// рендер по кнопке поиска

// рендер по жанру

// самые популярные фильмы

// export {
//   fetchFilms,
//   fetchFilmsById,
//   fetchFilmsBySearch,
//   fetchFilmsByGenre,
//   fetchFilmsByPopular,
// };
