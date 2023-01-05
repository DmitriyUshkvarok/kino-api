import openLibrarry from '../templates/librarry.hbs';

const librarryBtn = document.querySelector('.librarry-btn');
librarryBtn.addEventListener('click', onRenderLibrary);

function onRenderLibrary() {
  const markupLibrarry = openLibrarry();
  document.body.innerHTML = markupLibrarry;
}

// const modalLibrarryBtn = document.querySelector('.modal-btn');

// modalLibrarryBtn.addEventListener('click', onRenderMoviesInLibrarry);

// function onRenderMoviesInLibrarry() {}
