'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var SUCCESS = 200;

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS) {
          onLoad(xhr.response);
        } else {
          onError('Ошибка при обработке запроса: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.open('GET', URL_GET);
      xhr.send();
    }
  };

})();
