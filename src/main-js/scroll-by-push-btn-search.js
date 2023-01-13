export function scrollSmooth() {
  const { height: cardHeight } =
    document.body.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 1.5,
    behavior: 'smooth',
  });
}
