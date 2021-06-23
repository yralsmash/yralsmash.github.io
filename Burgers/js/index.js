  //1 fullscreen-menu
const activeClass = 'active';
const hideClass = 'hide';
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
const teamHead = document.querySelectorAll('.acco__head');
const teamItem = document.querySelectorAll('.acco__item');

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
const triggerHead = document.querySelectorAll('.menu-acco__head')
const triggerItem = document.querySelectorAll('.menu-acco__item')

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
const detailsBtn = document.querySelectorAll('.reviews__btn');
const reviewsOverlay = document.querySelector('.reviews__overlay');
const reviewsOverlayClose = document.querySelector('.reviews__overlay-btn');

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
    const position = `${sectionEq}` * -100 + '%';
    const transitionIsFinished = 1000;
    const mouseInertionIsFinished = 300;

    display.css({
      transform: `translateY(${position})`
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
const playerStart = $('.player__start');
const playerPlayback = $('.player__playback');
const playerWrapper = $('.player__wrapper');
const playerSplash = $('.player__splash');
const playerPlaybackButton = $('.player__playback-button');
const playerCompleted = $('.player__duration-completed');
const playerEstimate = $('.player__duration-estimate');


let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '405',
    width: '660',
    videoId: 'DEG2Lg-eAO0',
    playerVars: {
      controls: 0,
      disablekb: 0,
      modestbranding: 0,
      rel: 0,
      autoplay: 0,
      showinfo: 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerStateChange(event) {
  switch(event.data) {
    case 1:
      playerStart.addClass('paused');
      playerWrapper.addClass(activeClass);
      break;
    case 2:
      playerStart.removeClass('paused');
  }
}

function onPlayerReady () {
  const duration = player.getDuration();
  let interval;
  updateTimer();
  clearInterval(interval);
  interval = setInterval(() => {
    const completed = player.getCurrentTime();
    const percent = (completed / duration) * 100;
    updateTimer();
    changeButtonPosition(percent);
  }, 1000);
}

function updateTimer() {
  playerCompleted.text(formatTime(player.getCurrentTime() ));
  playerEstimate.text(formatTime(player.getDuration() ));
}

function formatTime(time) {
  const roundTime = Math.round(time);
  const minutes = Math.floor(roundTime / 60);
  const seconds = roundTime - minutes * 60;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return minutes + ":" + formattedSeconds;
}

$(playerStart).on('click', e => {
  // -1 – воспроизведение видео не началось
  // 0 – воспроизведение видео завершено
  // 1 – воспроизведение
  // 2 – пауза
  // 3 – буферизация
  // 5 – видео находится в очереди
  const playerStatus = player.getPlayerState();

  if (playerStatus != -1) {
    player.playVideo();
  }
  if (playerStatus == 1) {
    player.pauseVideo();
  }
});

$(playerPlayback).on('click', e => {
  const bar = $(e.currentTarget);
  const newButtonPosition = e.pageX - bar.offset().left;
  const clickedPercent = (newButtonPosition / bar.width()) * 100;
  const newPlayerTime = (player.getDuration() / 100) * clickedPercent;

  changeButtonPosition(clickedPercent);
  player.seekTo(newPlayerTime);
});

$(playerSplash).on('click', e => {
  player.playVideo();
})

function changeButtonPosition(percent) {
  $(playerPlaybackButton).css({
    left: `${percent}%`
  })
}

// 10 map
ymaps.ready(init);

var placemarks = [
  {
    latitude: 59.97,
    longitude: 30.31,
    hintContent: '<div class="map__item map__hint">улица Литераторов, 17</div>',
    balloonContent: [
      '<div class="map__item map__balloon">',
      '<img class="map__balloon"/>',
      '<div class="map__text">Самые вкусные бургеры у нас!</div>',
      '<div class="map__text">Заходите по адресу: <b> ул.Литераторов, 17</b></div>',
      '</div>'
    ]
  }, {
    latitude: 59.94,
    longitude: 30.25,
    hintContent: '<div class="map__item map__hint">Малый проспект В О, 64</div>',
    balloonContent: [
      '<div class="map__item map__balloon">',
      '<img class="map__balloon"/>',
      '<div class="map__text">Самые вкусные бургеры у нас!</div>',
      '<div class="map__text">Заходите по адресу: <b>Малый проспект В О, 64</b></div>',
      '</div>'
    ]
  }, {
    latitude: 59.93,
    longitude: 30.34,
    hintContent: '<div class="map__item map__hint">Наб. реки Фонтанки, 56</div>',
    balloonContent: [
      '<div class="map__item map__balloon">',
      '<img class="map__balloon"/>',
      '<div class="map__text">Самые вкусные бургеры у нас!</div>',
      '<div class="map__text">Заходите по адресу: <b>Наб. реки Фонтанки, 56</b></div>',
      '</div>'
    ]
  }, {
    latitude: 59.93,
    longitude: 30.40,
    hintContent: '<div class="map__item map__hint">Малоохтинский проспект, 61</div>',
    balloonContent: [
      '<div class="map__item map__balloon">',
      '<img class="map__balloon"/>',
      '<div class="map__text">Самые вкусные бургеры у нас!</div>',
      '<div class="map__text">Заходите по адресу: <b>Малоохтинский проспект, 61</b></div>',
      '</div>'
    ]
  }
];

function init() {
  let map = new ymaps.Map('map', {
    center: [59.94, 30.32],
    zoom: 12,
    // behaviors: [],
    // controls: ['zoomControl'],
  });

  placemarks.forEach(function (obj) {
    let placemark = new ymaps.Placemark([obj.latitude, obj.longitude], {
      hintContent: obj.hintContent,
      balloonContent: obj.balloonContent.join('')
    },
      {
        iconLayout: 'default#image',
        iconImageHref: 'img/icons/map-marker.svg',
        iconImageSize: [46, 58],
        iconImageOffset: [-23, -57]
      });

    map.geoObjects.add(placemark);
  });
};

//