import anime from 'animejs';
const logo = document.querySelector('.rated-title');
anime({
  targets: '.rated-title',
  scale: 1.2,
  direction: 'alternate',
  loop: true,
  easing: 'linear',
  duration: 3000,
});
