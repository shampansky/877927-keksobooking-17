'use strict';
(function () {

  var adFormFieldsets = document.querySelectorAll('.ad-form fieldset');
  var adForm = document.querySelector('.ad-form');
  var addressField = adForm.querySelector('#address');

  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
  };

  var deactivateForm = function () {
    adForm.classList.add('ad-form--disabled');
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

  // поле адрес только для чтения
  var formAddressInput = document.querySelector('#address');
  formAddressInput.readOnly = true;

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

  // Соответсвие количества комнат количеству гостей
  var formRoomsSelect = document.querySelector('#room_number');
  var formCapacitySelect = document.querySelector('#capacity');
  var formCapacityOptions = document.querySelector('#capacity').children;

  var roomsForGuests = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  formRoomsSelect.addEventListener('change', function (evt) {
    var roomsValue = evt.target.options[evt.target.selectedIndex].value;

    [].forEach.call(formCapacityOptions, function (option) {
      if (roomsForGuests[roomsValue].includes(option.value)) {
        option.disabled = false;
      } else {
        option.disabled = true;
      }
    });

    var selCapacityOption = formCapacitySelect.options[formCapacitySelect.selectedIndex];

    // Снимаем выделение на опции, которую нельзя выбрать
    if (selCapacityOption.disabled) {
      selCapacityOption.selected = false;
    }
  });

  deactivateFiledsets();

  var resetForm = function () {
    adForm.reset();
    window.map.hide();
    window.pin.resetCoordsMain();
    window.form.deactivateFiledsets();
    window.form.deactivate();
    window.filter.deactivateMapFilters();
    window.map.removePins();
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var successHandler = function () {
      window.success.show();
      resetForm();
    };

    var errorHandler = function () {
      window.error.show();
    };

    window.backend.save(new FormData(adForm), successHandler, errorHandler);

  });

  // adFormReset.addEventListener('click', function (evt) {
  //
  // });

  window.form = {
    adForm: adForm,
    address: addressField,
    activate: activateForm,
    deactivate: deactivateForm,
    activateFieldsets: activateFiledsets,
    deactivateFiledsets: deactivateFiledsets,
    resetForm: resetForm
  };

})();
