import { apiThemoviedb } from './renderAllCollection';
import { Notify } from 'notiflix';
const WATCH_KEY = 'watch-key';

function getWatchesList() {
  const data = JSON.parse(localStorage.getItem(WATCH_KEY));
  if (!data) {
    return;
  }
  return data;
}

if (!JSON.parse(localStorage.getItem(WATCH_KEY))) {
  localStorage.setItem(WATCH_KEY, JSON.stringify([]));
}

// делаем запрос по клику на кнопку "добавить фильм"
export function onRenderMoviesInLibrarry(e) {
  let data = getWatchesList();
  const currentIdBtnWatch = e.target.dataset.id;
  apiThemoviedb.fetchFilmsById(currentIdBtnWatch).then(setMovieToLocalStorage);

  if (!data.find(film => film.id === Number(currentIdBtnWatch))) {
    removeMovieFromWatched(currentIdBtnWatch);
  } else {
    addMovieToWatch();
  }
}

function addMovieToWatch() {
  let data = getWatchesList();
  localStorage.setItem(WATCH_KEY, JSON.stringify(data));
  const modalLibrarryBtn = document.querySelector('.modal-btn');
  modalLibrarryBtn.textContent = 'remove from watch';
  Notify.success('Фильм добавлен в библиотеку');
}

function removeMovieFromWatched(currentIdBtnWatch) {
  let data = getWatchesList();
  data = data.filter(film => film.id !== currentIdBtnWatch);
  localStorage.setItem(WATCH_KEY, JSON.stringify(data));
  const modalLibrarryBtn = document.querySelector('.modal-btn');
  modalLibrarryBtn.textContent = 'Add to watched';
  Notify.success('Фильм Удалён из библиотеки');
}

// устанавливаем ключ локального хранилища  и
export function setMovieToLocalStorage({
  poster_path,
  id,
  genres,
  release_date,
  title,
  vote_average,
}) {
  const dataFromLocalStorage = JSON.parse(localStorage.getItem(WATCH_KEY));
  localStorage.setItem(
    WATCH_KEY,
    JSON.stringify([
      ...dataFromLocalStorage,
      { poster_path, id, genres, release_date, title, vote_average },
    ])
  );
}
