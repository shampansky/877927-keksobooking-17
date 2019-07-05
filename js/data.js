'use strict';

(function () {
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

  var errorHandler = function (errorMessage) {

    var elemMain = document.querySelector('main');
    var messageTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
    var fragment = document.createDocumentFragment();
    var elemError = messageTemplate.cloneNode(true);

    var elemErrorMessage = elemError.querySelector('.error__message');

    elemErrorMessage.textContent = errorMessage;
    fragment.appendChild(elemError);
    elemMain.appendChild(fragment);

    var elemErrorButton = document.querySelector('main .error__button');
    var errorButtonHander = function () {
      document.location.reload(true);
    };
    elemErrorButton.addEventListener('click', errorButtonHander);
  };

  var successHandler = function (data) {
    // Уменьшаем входной псевдомассив до 5 элементов
    window.data = {
      apartments: data,
      acomodations: ACCOMMODATIONS,
      update: function () {
        var pins = document.querySelectorAll('.app-pin');
        pins.forEach(function (pin) {
          pin.parentNode.removeChild(pin);
        });
        var filteredData = data.filter(function (app) {
          return app.offer.type === window.filter.housingType;
        });
        window.map.createPins(filteredData);
      }
    };
  };

  window.backend.load(successHandler, errorHandler);
})();
