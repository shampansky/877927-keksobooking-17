'use strict';

var apartments = [];
var APPARTMENTS_NUMBER = 8;
var APPARTMENT_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var ACCOMMODATIONS = {
  palace: {
    minPrice: 10000
  },
  flat: {
    minPrice: 1000
  },
  house: {
    minPrice: 5000
  },
  bungalo: {
    minPrice: 0
  }
};

var PIN_SIZE_X = 50;
var PIN_SIZE_Y = 70;

var MAIN_PIN_X = 65;
var MAIN_PIN_Y = 82;
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

var getApartmentData = function (imageNum, appTypes, pinSizeX, pinSizeY) {
  var appartment = {
    author: {
      avatar: 'img/avatars/user0' + imageNum + '.png'
    },

    offer: {
      type: appTypes[getRandomArrayNumber(appTypes)]
    },

    location: {
      // Вычитаем размеры пина, чтобы он не вылезал за пределы блока
      x: getRandomInRange(0, 1200 - pinSizeX),
      y: getRandomInRange(130, 630 - pinSizeY)
    }
  };
  return appartment;
};

// Наполняем массив объектами апартаментов
for (var i = 1; i <= APPARTMENTS_NUMBER; i++) {
  apartments.push(getApartmentData(i, APPARTMENT_TYPES, PIN_SIZE_X, PIN_SIZE_Y));
}

// Временно убираем затемнение карты
// document.querySelector('.map').classList.remove('map--faded');

// Создание пина
var pinStyle = function (pin) {
  var style = 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px;';

  var pinElement = pinTemplate.cloneNode(true);

  pinElement.setAttribute('style', style);
  pinElement.querySelector('img').setAttribute('src', pin.author.avatar);

  return pinElement;
};

// Добавляем пины в разметку через элемент documentFragment

var createPinsOnMap = function () {
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < apartments.length; j++) {
    fragment.appendChild(pinStyle(apartments[j]));
  }

  pinList.appendChild(fragment);
};

var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var adFormFieldsets = document.querySelectorAll('.ad-form fieldset');
var adForm = document.querySelector('.ad-form');
var mapFilters = document.querySelector('.map__filters').children;

var activateForm = function () {
  adForm.classList.remove('ad-form--disabled');
};

var revealMap = function () {
  map.classList.remove('map--faded');
};

var activateFiledsets = function () {
  for (var a = 0; a < adFormFieldsets.length; a++) {
    adFormFieldsets[a].removeAttribute('disabled');
  }
};

var deactivateFiledsets = function () {
  for (var b = 0; b < adFormFieldsets.length; b++) {
    adFormFieldsets[b].setAttribute('disabled', 'disabled');
  }
};

var activateMapFilters = function () {
  for (var c = 0; c < mapFilters.length; c++) {
    mapFilters[c].removeAttribute('disabled');
  }
};

var deactivateMapFilters = function () {
  for (var d = 0; d < mapFilters.length; d++) {
    mapFilters[d].setAttribute('disabled', 'disabled');
  }
};

var addressField = adForm.querySelector('#address');

var addMainPinCoordinates = function (pin, pinWidth, pinHeight, input) {
  var xCoord = parseInt(pin.style.left, 10) + Math.floor(pinWidth / 2);
  var yCoord = parseInt(pin.style.top, 10) + pinHeight;
  input.value = xCoord + ', ' + yCoord;
};

deactivateMapFilters();
deactivateFiledsets();

mainPin.addEventListener('mouseup', function () {
  revealMap();
  activateMapFilters();
  createPinsOnMap();
  activateForm();
  activateFiledsets();
  addMainPinCoordinates(mainPin, MAIN_PIN_X, MAIN_PIN_Y, addressField);
});

// находим поле с типом жилья
var formAccomTypesSelect = document.querySelector('#type');


var onChangePriceAttributes = function (minValue) {
  var formPriceInput = document.querySelector('#price');
  formPriceInput.setAttribute('placeholder', minValue);
  formPriceInput.setAttribute('min', minValue);

};

// обработчик изменения типа жилья
formAccomTypesSelect.addEventListener('change', function (evt) {
  var currentSelectionValue = evt.target.options[evt.target.selectedIndex].value;
  onChangePriceAttributes(ACCOMMODATIONS[currentSelectionValue].minPrice);
});
