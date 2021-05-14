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
var teamHead = document.querySelectorAll('.acco__head');
var teamItem = document.querySelectorAll('.acco__item');

teamHead.forEach ((e) => {
  e.addEventListener('click', () => {
    var curParent = e.parentNode;
    if (curParent.classList.contains(activeClass)) {
      curParent.classList.remove(activeClass)
    } else {
      teamItem.forEach((e) => {
        e.classList.remove(activeClass);
      })
      curParent.classList.add(activeClass)
    }
  })
})

//4 acco menu
var triggerHead = document.querySelectorAll('.menu-acco__head')
var triggerItem = document.querySelectorAll('.menu-acco__item')

triggerHead.forEach ((e) => {
  e.addEventListener('click', () => {
    var curParent = e.parentNode;
    if (curParent.classList.contains(activeClass)) {
      curParent.classList.remove(activeClass)
    } else {
      triggerItem.forEach((e) => {
        e.classList.remove(activeClass);
      })
      curParent.classList.add(activeClass)
    }
  })
})

//5 reviews overlay
var detailsBtn = document.querySelectorAll('.reviews__btn');
reviewsOverlay = document.querySelector('.reviews__overlay');
reviewsOverlayClose = document.querySelector('.reviews__overlay-btn');

detailsBtn.forEach ((e) => {
  e.addEventListener('click', () => {
    reviewsOverlay.classList.remove(hideClass);
  })
});

reviewsOverlayClose.addEventListener ('click', function(e) {
  e.preventDefault();
  reviewsOverlay.classList.add(hideClass);
});

reviewsOverlay.addEventListener("click", e => {
  if (e.target === reviewsOverlay) {
    reviewsOverlayClose.click();
  }
});

//6 order
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
    xhr.open('POST', 'https://httpbin.org/post');
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

//7 form-overlay
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

//8 One-page-scroll
const sections = $('.section');
const display = $('.maincontent');
let inScroll = false;
const md = new MobileDetect(window.navigator.userAgent);

const isMobile = md.mobile();

const setActiveMenuItem = itemEq => {
  $('.fixed-menu__item').eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const performTransition = sectionEq => {
  if (inScroll === false) {
    inScroll = true;
    const position = sectionEq * -100 + '%';
    const transitionIsFinished = 1000;
    const mouseInertionIsFinished = 300;

    display.css({
      transform: 'translateY('+position+')'
    });

    sections.eq(sectionEq).addClass(activeClass).siblings().removeClass(activeClass);

    setTimeout(() => {
      inScroll = false
      setActiveMenuItem(sectionEq);
    }, transitionIsFinished + mouseInertionIsFinished);
  }
};

const scrollToSection = direction => {
  const activeSection = sections.filter('.active');
  const prevSection = activeSection.prev();
  const nextSection = activeSection.next();

  if (direction === 'up' && prevSection.length) {
    performTransition(prevSection.index());
  }
  if (direction === 'down' && nextSection.length) {
    performTransition(nextSection.index());
  }
}

$(document).on({
  wheel: e => {
    const direction = e.originalEvent.deltaY > 0 ? 'down' : 'up';
    scrollToSection(direction);
  },
  keydown: e => {
    switch(e.keyCode) {
      case 40:
        scrollToSection('down');
        break;
      case 38:
        scrollToSection('up');
        break;
    }
  },
  touchMove: e => e.preventDefault()
});

$('[data-scroll-to]').on('click', e => {
  e.preventDefault();

  const target = $(e.currentTarget).attr('data-scroll-to');
  performTransition(target);
})

if (isMobile) {
  $(document).swipe( {
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      /*
      * Потому что библиотека возвращает фактическое перемещение пальца вверх,
      * а мы основывались на перемещении страницы.
      */
      const scrollDirection = direction === 'down' ? 'up' : 'down';
      scrollToSection(scrollDirection);
    }
  });
}

//9 player


