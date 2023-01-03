const themeBtn = document.querySelector('.switcher-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme == 'dark') {
  document.body.classList.add('white-theme');
  document.getElementById('slider').checked = false;
} else {
  document.getElementById('slider').checked = true;
}

themeBtn.addEventListener('click', onToggleTheme);

function onToggleTheme() {
  document.body.classList.toggle('white-theme');

  // Допустим, тема светлая
  let theme = 'light';
  // Если <body> содержит класс .dark-theme…
  if (document.body.classList.contains('white-theme')) {
    // …тогда делаем тему тёмной
    theme = 'dark';
  }
  // После чего сохраняем выбор в localStorage
  localStorage.setItem('theme', theme);
}
