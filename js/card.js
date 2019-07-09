'use strict';

(function () {
  var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('article');

  var createCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('img').setAttribute('src', card.author.avatar);
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').innerHTML = card.offer.price + '&#x20bd;<span>/ночь</span>';
    // TODO: Заменить тип жилья на название
    cardElement.querySelector('.popup__type').textContent = window.data.acomodations[card.offer.type].name;
    return cardElement;
  };
  window.card = {
    create: createCard
  };

})();
