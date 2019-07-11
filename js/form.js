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

  window.form = {
    address: addressField,
    activate: activateForm,
    activateFieldsets: activateFiledsets,
  };

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

})();
