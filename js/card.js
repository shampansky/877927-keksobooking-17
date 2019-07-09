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
    cardElement.querySelector('.popup__type').textContent = window.data.acomodations[card.offer.type].name;
    cardElement.querySelector('.popup__text--capacity').textContent =
    card.offer.rooms +
    ' ' +
    window.util.numToString(card.offer.rooms, ['комната', 'комнаты', 'комнат']) +
    ' для '
    + card.offer.guests +
    ' ' +
    window.util.numToString(card.offer.guests, ['гостя', 'гостей', 'гостей']);
    cardElement.querySelector('.popup__text--time').textContent =
    'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    var featuresList = cardElement.querySelector('.popup__features');
    while (featuresList.firstChild) {
      featuresList.removeChild(featuresList.firstChild);
    }
    card.offer.features.forEach(function (feature) {
      var elemFeatureItem = document.createElement('li');
      elemFeatureItem.classList.add('popup__feature', 'popup__feature--' + feature);
      featuresList.appendChild(elemFeatureItem);
    });
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    var photos = cardElement.querySelector('.popup__photos');
    while (photos.firstChild) {
      photos.removeChild(photos.firstChild);
    }
    card.offer.photos.forEach(function (photo) {
      var elemPhoto = document.createElement('img');
      elemPhoto.setAttribute('src', photo);
      elemPhoto.setAttribute('width', '45');
      elemPhoto.setAttribute('height', '40');
      elemPhoto.setAttribute('alt', 'Фотография жилья');
      elemPhoto.classList.add('popup__photo');
      photos.appendChild(elemPhoto);
    });
    return cardElement;
  };
  window.card = {
    create: createCard
  };

})();
