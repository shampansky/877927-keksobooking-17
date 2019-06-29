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
    window.data = {
      apartments: data,
      acomodations: ACCOMMODATIONS
    };
  };

  window.backend.load(successHandler, errorHandler);
})();
