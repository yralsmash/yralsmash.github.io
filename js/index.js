  //1 fullscreen-menu
var activeClass = ('active');
hideClass = ('hide')
menu = $('.fullscreen-menu');
btn = $('.hamburger-menu-link');
close = $('.fullscreen-menu__close');
menuItems = $('.menu__item');

btn.on('click', function() {
  menu.toggleClass(hideClass)
  menuItems.toggleClass(hideClass)
})

close.on('click', function() {
  menu.toggleClass(hideClass)
  menuItems.toggleClass(hideClass)
})

//2 team
var head = $('.acco__head');
body = $('.acco__item');

$(head).on('click', function(e) {
  e.preventDefault();
  $(this).closest(body).toggleClass(activeClass).siblings().removeClass(activeClass);
});

//3 acco menu
var trigger = ('.menu-acco__trigger')
triggerItem = ('.menu-acco__item')

$(trigger).on('click', function(e) {
  e.preventDefault();
  $(this).closest(triggerItem).toggleClass(activeClass).siblings().removeClass(activeClass);
});
