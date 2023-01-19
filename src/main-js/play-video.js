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
    const videoMadal = document.querySelector('.video-modal');
    const key = respVideo.results[0].key;
    const video = ` <div class='video-modal'><iframe class="modal-film__video" src="https://www.youtube.com/embed/${key}/" width="800" height="400" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
    const instance = basicLightbox.create(video);
    instance.show();
  } else {
    Notify.failure('Извините ,видео не найдено');
  }
}
