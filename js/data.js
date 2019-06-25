'use strict';

(function () {
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

  var getApartmentData = function (imageNum, appTypes, pinSizeX, pinSizeY) {
    var apartment = {
      author: {
        avatar: 'img/avatars/user0' + imageNum + '.png'
      },

      offer: {
        type: appTypes[window.util.getRandomArrayNumber(appTypes)]
      },

      location: {
        // Вычитаем размеры пина, чтобы он не вылезал за пределы блока
        x: window.util.getRandomInRange(0, 1200 - pinSizeX),
        y: window.util.getRandomInRange(130, 630 - pinSizeY)
      }
    };
    return apartment;
  };

  for (var i = 1; i <= APPARTMENTS_NUMBER; i++) {
    apartments.push(getApartmentData(i, APPARTMENT_TYPES, window.pin.size.x, window.pin.size.y));
  }

  window.data = {
    apartments: apartments,
    acomodations: ACCOMMODATIONS
  };
})();
