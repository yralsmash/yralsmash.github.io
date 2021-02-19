  //1 fullscreen-menu
var activeClass = ('active');
hideClass = ('hide')
menu = $('.fullscreen-menu');
btn = $('.hamburger-menu-link');
closeMenu = $('.fullscreen-menu__close');
closeMenuLink = $('.menu__link');
menuItems = $('.menu__item');

btn.on('click', function() {
  menu.toggleClass(hideClass)
  menuItems.toggleClass(hideClass)
});

closeMenu.on('click', function() {
  menu.toggleClass(hideClass)
  menuItems.toggleClass(hideClass)
});

closeMenuLink.on('click', function() {
  menu.toggleClass(hideClass)
  menuItems.toggleClass(hideClass)
});

//2 slider
var moveSlide = function(container, slideNum) {
  var items = container.find('.products__item');
  activeSlide = items.filter('.active');
  reqItem = items.eq(slideNum);
  reqIndex = reqItem.index();
  list = container.find('.products__list');
  duration = 500;

  if (reqItem.length) {
    list.animate({
      'left'  : -reqIndex * 100 + '%'
    }, duration, function() {
      activeSlide.removeClass('active');
      reqItem.addClass('active');
    });
  };
}

$('.products__slider-arrow').on('click', function(e){
  e.preventDefault();

  var $this = $(this),
  container = $this.closest('.products__slider'),
  items = $('.products__item', container),
  activeItem = items.filter('.active'),
  existedItem, edgeItem, reqItem;

  if ($this.hasClass('products__slider-arrow--direction--next')) { // вперёд
    existedItem = activeItem.next();
    edgeItem = items.first();
  };

  if ($this.hasClass('products__slider-arrow--direction--prev')) { // назад
    existedItem = activeItem.prev();
    edgeItem = items.last();
  };

  reqItem = existedItem.length ? existedItem.index() : edgeItem.index();

  moveSlide(container, reqItem);
});

//3 team
var head = $('.acco__head');
body = $('.acco__item');

$(head).on('click', function(e) {
  e.preventDefault();
  $(this).closest(body).toggleClass(activeClass).siblings().removeClass(activeClass);
});

//4 acco menu
var trigger = ('.menu-acco__trigger')
triggerItem = ('.menu-acco__item')

$(trigger).on('click', function(e) {
  e.preventDefault();
  $(this).closest(triggerItem).toggleClass(activeClass).siblings().removeClass(activeClass);
});
