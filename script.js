const $bar = document.getElementById('bar');
const $nav = document.getElementsByTagName('nav')[0];
const $closeNav = document.getElementById('close');


$bar.addEventListener('click', () => {
  $nav.classList.add('active');
})

$closeNav.addEventListener('click', () => {
  $nav.classList.remove('active');
})

