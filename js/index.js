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
var Slider = $('.products__slider-arrow')
moveSlide = function(container, slideNum) {
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

$(Slider).on('click', function(e){
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
var trigger = ('.menu-acco__head')
triggerItem = ('.menu-acco__item')

$(trigger).on('click', function(e) {
  e.preventDefault();
  $(this).closest(triggerItem).toggleClass(activeClass).siblings().removeClass(activeClass);
});

//5 order
const myForm = document.querySelector('.form');
const sendButton = document.querySelector('#sendBtn');

sendButton.addEventListener('click', function(e) {
  e.preventDefault();

  if(validateForm(myForm)) {
    const data = {
      name: myForm.elements.name.value,
      phone: myForm.elements.phone.value,
      comment: myForm.elements.comment.value
    }
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', 'http://httpbin.org/post');
    xhr.send(JSON.stringify(data));
    xhr.addEventListener('load', function() {
      if (xhr.status >=400) {
        overlay.classList.remove(hideClass);
        overlayMessage.style.color = 'red';
        overlayMessage.textContent = 'Отправить письмо не удалось, повторите запрос позже';
      } else {
        overlay.classList.remove(hideClass);
      }
    })
  }
});

function validateForm(form) {
  let valid = true;

  if(!validateField(form.elements.name)) {
    valid = false;
  }
  if(!validateField(form.elements.phone)) {
    valid = false;
  }
  if(!validateField(form.elements.comment)) {
    valid = false;
  }
  return valid;
}

function validateField(field) {
  field.nextElementSibling.textContent = field.validationMessage;
  return field.checkValidity();
}

//6 overlay
const overlay = document.querySelector('.form__overlay');
const overlayMessage = document.querySelector('.overlay__message');
const overlayButton = document.querySelector('.btn--overlay');
overlayButton.addEventListener ('click', function(e) {
  e.preventDefault();
  overlay.classList.add(hideClass);
});
overlay.addEventListener("click", e => {
  if (e.target === overlay) {
    overlayButton.click();
  }
});
