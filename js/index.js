//1 fullscreen-menu

const openMenu = document.querySelector('.hamburger-menu-link');
const menu = document.querySelector('.fullscreen-menu');
const closeMenu = document.querySelector('.fullscreen-menu__close');

openMenu.addEventListener ('click', (e) => {
  e.preventDefault();
  menu.classList.add('active');
});

closeMenu.addEventListener ('click', (e) => {
  e.preventDefault();
  menu.classList.remove('active');
});




//3 team

const teamHead = document.querySelector('.acco__head');
const teamBody = document.querySelector('.acco__item');

teamHead.addEventListener('click', (e) => {
  e.preventDefault();
  teamBody.classList.add('active')
})

// teamHead.addEventListener('click', (e) => {
//   e.preventDefault();
//   teamBody.classList.remove('active')
// })




//2 acco menu

const menuItem = document.querySelector('.menu-acco__item');
const menuTrigger = document.querySelector('.menu-acco__trigger-title');
const menuContent = document.querySelector('.menu-acco__content');
// 1. клик по .menu-acco__trigger-title
// 2. добавляем класс active родителю .menu-acco__trigger
// 3. а у остальных блоков убрать

menuTrigger.addEventListener('click', (e) => {
  e.preventDefault();
  menuItem.classList.add('active')
  menuTrigger.style.color = 'red';
})
menuContent.addEventListener('click', (e) => {
  e.preventDefault();
  menuItem.classList.remove('active')
  menuTrigger.style.color = 'inherit';
})
