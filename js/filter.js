'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters').children;
  var elemHousingType = document.querySelector('#housing-type');

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

  // var housingTypeValue = elemHousingType.options[elemHousingType.selectedIndex].value;

  // Обработчик типа жилья
  elemHousingType.addEventListener('change', function () {
    window.filter.housingType = elemHousingType.options[elemHousingType.selectedIndex].value;
    window.data.update();
  });

  window.filter = {
    activateMapFilters: activateMapFilters,
    // housingType: housingTypeValue
  };

  deactivateMapFilters();

})();
