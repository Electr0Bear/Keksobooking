import {postData} from './api.js';
import {resetForm} from './util.js';


const MAX_ROOMS = 100;
const MIN_GUESTS = 0;
const title = document.querySelector('#title');
const propertyType = document.querySelector('#type');
const price = document.querySelector('#price');
const PropertyPrices = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const roomNumber = document.querySelector('#room_number');
const guestNumber = document.querySelector('#capacity');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const form = document.querySelector('.ad-form');
const formResetBtn = document.querySelector('.ad-form__reset');

title.addEventListener('input', () => {
  title.setCustomValidity(title.validity.tooShort ? 'Заголовок должен состоять минимум из 30 символов' : '');
});

price.addEventListener('input', () => {
  price.setCustomValidity('');
  if (price.validity.rangeUnderflow) {
    price.setCustomValidity(`Для выбранного типа жилья стоимость не может быть меньше ${price.min}`);
  } else if (price.validity.rangeOverflow) {
    price.setCustomValidity('Стоимость не должна превышать 1 000 000');
  }
  price.reportValidity();
});

propertyType.addEventListener('change', () => {
  price.setCustomValidity('');
  const currentType = propertyType.value;
  price.min = PropertyPrices[currentType];
  price.placeholder = PropertyPrices[currentType];
});

const checkRoomCapacity = () => {
  const rooms = +roomNumber.value;
  const guests = +guestNumber.value;
  guestNumber.setCustomValidity('');
  if (rooms === MAX_ROOMS && guests !== MIN_GUESTS) {
    guestNumber.setCustomValidity('Недопустимое количество гостей для выбранного количества комнат. Данное помещение не подходит для размещения гостей');
  } else if (rooms < guests) {
    guestNumber.setCustomValidity(`Недопустимое количество гостей для выбранного количества комнат. Допускается гостей: не более ${roomNumber.value}`);
  } else if (rooms !== MAX_ROOMS && guests === MIN_GUESTS) {
    guestNumber.setCustomValidity('Недопустимое количество гостей для выбранного количества комнат. Должно быть хотя бы 1 место для размещения');
  }
};

checkRoomCapacity();

roomNumber.addEventListener('change', () => {
  checkRoomCapacity();
});

guestNumber.addEventListener('change', () => {
  checkRoomCapacity();
});

const timeTableHandler = (currentInput, targetInput) => {
  targetInput.value = currentInput.value;
};

timeIn.addEventListener('change', (evt) => {
  timeTableHandler(evt.target, timeOut);
});

timeOut.addEventListener('change', (evt) => {
  timeTableHandler(evt.target, timeIn);
});

formResetBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

const onSubmitForm = (onSuccess, onError) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    postData(onSuccess, onError, new FormData(form));
  });
};

export {onSubmitForm};
