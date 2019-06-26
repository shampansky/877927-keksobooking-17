'use strict';

window.util = (function () {
  return {
    getRandomArrayNumber: function (arrayName) {
      return Math.round(Math.random() * (arrayName.length - 1));
    },
    getRandomInRange: function (minValue, maxValue) {
      return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    }
  };
})();
