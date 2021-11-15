import {
  getRndInteger,
  getRndFloat,
  getRndElements
} from './util.js';

const TITLE_1 = ['Роскошн', 'Просторн', 'Доступн', 'Комфортабельн', 'Элегантн'];
const TITLE_2 = ['дворец', 'квартира', 'дом', 'бунгало', 'номер в отеле'];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_IN_OUT_TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTION = ['новый ремонт', 'живописный вид', 'тихий район', 'в шаговой доступности от метро', 'можно с животными', 'удобный паркинг', 'рядом есть парк'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const types = {
  palace: `ый ${TITLE_2[0]}`,
  flat: `ая ${TITLE_2[1]}`,
  house: `ый ${TITLE_2[2]}`,
  bungalow: `ое ${TITLE_2[3]}`,
  hotel: `ый ${TITLE_2[4]}`,
};

// Функия генерации объекта
const getObject = (counter) => {
  counter < 10 ? counter = `0${counter}` : counter;
  const avatar = `img/avatars/user${counter}.png`;
  const latitude = getRndFloat(35.65000, 35.70000, 5);
  const longitude = getRndFloat(139.70000, 139.80000, 5);
  const type = TYPES[getRndInteger(0, 4)];
  const rooms = getRndInteger(1, 10);
  const title = TITLE_1[getRndInteger(0, TITLE_1.length - 1)] + types[type];
  const price = rooms * getRndInteger(1000, 5000);
  const guests = rooms * getRndInteger(1, 3);
  const checkin = CHECK_IN_OUT_TIME[getRndInteger(0, CHECK_IN_OUT_TIME.length - 1)];
  const checkout = CHECK_IN_OUT_TIME[getRndInteger(0, CHECK_IN_OUT_TIME.indexOf(checkin))];
  const features = getRndElements(FEATURES);
  const description = getRndElements(DESCRIPTION).join(', ');
  const photos = getRndElements(PHOTOS);

  return {
    author: {
      avatar: avatar,
    },

    offer: {
      title: title,
      address: `${latitude}, ${longitude}`,
      price: price,
      type: type,
      rooms: rooms,
      guests: guests,
      checkin: checkin,
      checkout: checkout,
      features: features,
      description: description,
      photos: photos,
    },

    location: {
      lat: latitude,
      lng: longitude,
    },
  };
};

const request = async () => {
  const response = await fetch('https://24.javascript.pages.academy/keksobooking/data');
  const adverts = await response.json();
  return adverts;
};

const objects = await request();

export {
  getObject,
  objects
};
