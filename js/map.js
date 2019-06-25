'use strict';
(function () {
  var MIN_MAP_Y = 130;
  var MAX_MAP_Y = 630;

  var map = document.querySelector('.map');

  var revealMap = function () {
    map.classList.remove('map--faded');
  };

  // Добавляем пины в разметку через элемент documentFragment

  var createPinsOnMap = function () {
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < window.data.apartments.length; j++) {
      fragment.appendChild(window.pin.create(window.data.apartments[j]));
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
