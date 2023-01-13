import { apiThemoviedb } from './renderAllCollection';
import { Notify } from 'notiflix';
const WATCH_KEY = 'watch-key';

if (!JSON.parse(localStorage.getItem(WATCH_KEY))) {
  localStorage.setItem(WATCH_KEY, JSON.stringify([]));
}

// делаем запрос по клику на кнопку "добавить фильм"
export function onRenderMoviesInLibrarry(e) {
  const currentIdBtnWatch = e.target.dataset.id;
  apiThemoviedb.fetchFilmsById(currentIdBtnWatch).then(setMovieToLocalStorage);
  Notify.success('Фильм добавлен в библиотеку');
}

// устанавливаем ключ локального хранилища  и
function setMovieToLocalStorage({
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
