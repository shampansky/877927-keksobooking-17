'use strict';

(function () {
  var mapFilters = [].slice.call(document.querySelector('.map__filters').children);

  var elemHousingType = document.querySelector('#housing-type');

  var activateMapFilters = function () {
    mapFilters.map(function (filter) {
      filter.removeAttribute('disabled');
    });
  };

  var deactivateMapFilters = function () {
    mapFilters.map(function (filter) {
      filter.setAttribute('disabled', 'disabled');
    });
  };

  // var housingTypeValue = elemHousingType.options[elemHousingType.selectedIndex].value;

  // Обработчик типа жилья
  elemHousingType.addEventListener('change', function () {
    window.filter.housingType = elemHousingType.options[elemHousingType.selectedIndex].value;
    window.data.update();
  });

  window.filter = {
    activateMapFilters: activateMapFilters,
    deactivateMapFilters: deactivateMapFilters,
    // housingType: housingTypeValue
  };

  deactivateMapFilters();

})();
