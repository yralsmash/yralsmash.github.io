const menuContent = document.querySelector('.menu-acco__content');
const triggerCollection = document.querySelectorAll('.menu-acco__trigger')
const hoverCollection = document.querySelectorAll('.menu-acco__content')

for (const element of triggerCollection) {
  element.addEventListener('click', function(e) {
    e.preventDefault();
    menuContent.classList.add = ('active');
  })
}

for (const element of hoverCollection) {
  element.addEventListener('click', function(e) {
    e.preventDefault();
    menuContent.classList.remove = ('.active');
  })
}
