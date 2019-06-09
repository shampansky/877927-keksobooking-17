'use strict';

var apartments = [];
var APPARTMENTS_NUMBER = 8;
var APPARTMENT_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var PIN_SIZE_X = 50;
var PIN_SIZE_Y = 70;
// Блок с пинами в разметке
var pinList = document.querySelector('.map__pins');

// Блок шаблона пина
var pinTemplate = document.querySelector('#pin')
.content
.querySelector('button');

var getRandomArrayNumber = function (arrayName) {
  return Math.round(Math.random() * (arrayName.length - 1));
};

var getRandomInRange = function (minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

// Наполняем массив объектами апартаментов
for (var i = 1; i <= APPARTMENTS_NUMBER; i++) {
  var apartment = {
    author: {
      avatar: 'img/avatars/user0' + i + '.png'
    },

    offer: {
      type: APPARTMENT_TYPES[getRandomArrayNumber(APPARTMENT_TYPES)]
    },

    location: {
      // Вычитаем размеры пина, чтобы он не вылезал за пределы блока
      x: getRandomInRange(0, 1200 - PIN_SIZE_X),
      y: getRandomInRange(130, 630 - PIN_SIZE_Y)
    }
  };
  apartments.push(apartment);
}

// Временно убираем затемнение карты
document.querySelector('.map').classList.remove('map--faded');

// Создание пина
var renderPin = function (pin) {
  var style = 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px;';

  var pinElement = pinTemplate.cloneNode(true);

  pinElement.setAttribute('style', style);
  pinElement.querySelector('img').setAttribute('src', pin.author.avatar);

  return pinElement;
};

// Добавляем пины в разметку через элемент documentFragment
var fragment = document.createDocumentFragment();

for (var j = 0; j < apartments.length; j++) {
  fragment.appendChild(renderPin(apartments[j]));
}

pinList.appendChild(fragment);
