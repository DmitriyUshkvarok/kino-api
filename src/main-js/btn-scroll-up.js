let buttonUp = document.querySelector('.btn-scroll');

window.addEventListener('scroll', onScrolFunction);

function onScrolFunction(e) {
  if (window.pageYOffset > 300) {
    buttonUp.classList.add('shown');
  } else {
    buttonUp.classList.remove('shown');
  }
}

buttonUp.addEventListener('click', onScrollUp);

function onScrollUp(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
