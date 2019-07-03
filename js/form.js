'use strict';
(function () {

  var adFormFieldsets = document.querySelectorAll('.ad-form fieldset');
  var adForm = document.querySelector('.ad-form');
  var addressField = adForm.querySelector('#address');

  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
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
    onChangePriceAttributes(window.data.acomodations[currentSelectionValue].minPrice);
  });

  window.form = {
    address: addressField,
    activate: activateForm,
    activateFieldsets: activateFiledsets,
  };

  deactivateFiledsets();

})();
