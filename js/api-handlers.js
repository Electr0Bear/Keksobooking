import {closePopup, resetForm} from './util.js';

const onError = (err) => {
  const errorPopup = `<div class="error">
    <p style="color: #FFF">Не удалось загрузить данные с сервера.<br>Код ошибки: ${err}</p>
    <button type="button" class="error__button-onload" style="color: white; border: 4px solid #ff5635; background-color: #ff5635; border-radius: 8px;">OK</button>
    </div>`;
  document.querySelector('body').insertAdjacentHTML('beforeend', errorPopup);
  document.querySelector('.error__button-onload').addEventListener('click', () =>
    document.querySelector('.error').remove(),
  );
  closePopup(errorPopup);
};

const onGoodSubmit = () => {
  resetForm();
  const successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
  const successPopup = successPopupTemplate.cloneNode(true);
  document.querySelector('body').appendChild(successPopup);
  closePopup(successPopup);
};

const onFailedSubmit = () => {
  resetForm();
  const failurePopupTemplate = document.querySelector('#error').content.querySelector('.error');
  const failurePopup = failurePopupTemplate.cloneNode(true);
  document.querySelector('body').appendChild(failurePopup);
  closePopup(failurePopup);
};

export {onError, onGoodSubmit, onFailedSubmit};