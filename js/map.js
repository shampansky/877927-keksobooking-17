'use strict';
(function () {
  var MIN_MAP_Y = 130;
  var MAX_MAP_Y = 630;
  var PINS_ON_MAP = 5;

  var map = document.querySelector('.map');

  var revealMap = function () {
    map.classList.remove('map--faded');
  };

  // Добавляем пины в разметку через элемент documentFragment

  var createPinsOnMap = function (data) {
    var fragment = document.createDocumentFragment();
    var pinsCount = data.length > PINS_ON_MAP ? PINS_ON_MAP : data.length;
    for (var j = 0; j < pinsCount; j++) {
      fragment.appendChild(window.pin.create(data[j]));
    }

    window.pin.list.appendChild(fragment);
  };

  window.map = {
    element: map,
    reveal: revealMap,
    createPins: createPinsOnMap,
    minY: MIN_MAP_Y,
    maxY: MAX_MAP_Y
  };

})();
