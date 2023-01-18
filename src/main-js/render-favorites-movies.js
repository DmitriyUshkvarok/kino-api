import { apiThemoviedb } from './renderAllCollection';
import { Notify } from 'notiflix';
export const WATCH_KEY = 'watch-key';

export function getWatchesList() {
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
  if (data.find(film => film.id === Number(currentIdBtnWatch))) {
    const modalLibrarryBtn = document.querySelector('.modal-btn');
    modalLibrarryBtn.textContent = 'Add to watched';
    let data = getWatchesList();
    data = data.filter(film => film.id !== Number(currentIdBtnWatch));
    localStorage.setItem(WATCH_KEY, JSON.stringify(data));
    Notify.success('Фильм Удалён из библиотеки');
  } else {
    const modalLibrarryBtn = document.querySelector('.modal-btn');
    modalLibrarryBtn.textContent = 'remove from watch';
    let data = getWatchesList();
    localStorage.setItem(WATCH_KEY, JSON.stringify(data));
    apiThemoviedb
      .fetchFilmsById(currentIdBtnWatch)
      .then(setMovieToLocalStorage);
    Notify.success('Фильм добавлен в библиотеку');
  }
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
