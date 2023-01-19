import { apiThemoviedb } from './renderAllCollection';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { Notify } from 'notiflix';

export function onPlayVideo(e) {
  const currentIdVideo = e.target.dataset.id;
  apiThemoviedb.setMovieId(currentIdVideo);
  apiThemoviedb.fetchTrailerMovies(currentIdVideo).then(onRenderVideo);
}

export function onRenderVideo(respVideo) {
  if (respVideo.results.length) {
    const key = respVideo.results[0].key;
    const video = `<iframe class="modal-film__video" src="https://www.youtube.com/embed/${key}/" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    const instance = basicLightbox.create(video);
    instance.show();
  } else {
    Notify.failure('Извините ,видео не найдено');
  }
}
