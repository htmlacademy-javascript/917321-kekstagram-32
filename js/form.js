import { isEscapeKey } from './util.js';// импортируем определение кнопки Escape
import { resetScale } from './scale.js'; // импортируем функцию для масштабирования
import {
  initEffect as initEffect,
  reset as resetEffect
} from './effect.js';//импортируем функции для фильтров фото
import { pristine } from './validation-form.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SUBMITTING: 'Отправляю...',
};

const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const overlayElement = document.querySelector('.img-upload__overlay');
const cancelButtonElement = formElement.querySelector('.img-upload__cancel');
const fileFieldElement = formElement.querySelector('.img-upload__input');
const hashtagFieldElement = formElement.querySelector('.text__hashtags');
const commentFieldElement = formElement.querySelector('.text__description');
const submitButtonElement = formElement.querySelector('.img-upload__submit');
const photoPreviewElement = formElement.querySelector('.img-upload__preview img');
const effectsPreviewsElement = formElement.querySelectorAll('.effects__preview');

const showModal = () => {//показать модалку
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydownClick);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
};

const hideModal = () => {//скрыть модалку
  overlayElement.classList.add('hidden');
  formElement.reset();//сбросить значения формы
  pristine.reset();//сбросить значения валидатора
  resetScale();//сбросить значения масштабирования
  resetEffect();//сбросить значения фильтров
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydownClick);
  cancelButtonElement.removeEventListener('click', onCancelButtonClick);
};

const toggleSubmitButton = (isDisabled) => {
  submitButtonElement.disabled = isDisabled;
  submitButtonElement.textContent = isDisabled
    ? SubmitButtonText.SUBMITTING
    : SubmitButtonText.IDLE;
};

const isTextFieldFocused = () =>//проверяем есть ли фокус на полях ввода хэштега и комментариев
  document.activeElement === hashtagFieldElement ||
  document.activeElement === commentFieldElement;

const isErrorMessageShown = () => Boolean(document.querySelector('.error'));

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

function onDocumentKeydownClick(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused() && !isErrorMessageShown()){ //проверяем показывается ли сейчас ошибка
    evt.preventDefault();
    hideModal();
  }
}

function onCancelButtonClick () {
  hideModal();
}

const onFileInputChange = () => {

  const file = fileFieldElement.files[0];

  if(file && isValidType(file)){

    const imageUrl = URL.createObjectURL(file);

    photoPreviewElement.src = imageUrl;

    effectsPreviewsElement.forEach((previewsItem) => {
      previewsItem.style.backgroundImage = `url(${imageUrl})`;
    });
    showModal();
  }
};

const setOnFormSubmit = (callback) => {
  formElement.addEventListener('submit', async(evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if(isValid){
      toggleSubmitButton(true);
      await callback(new FormData(formElement));
      toggleSubmitButton();
    }
  });
};

fileFieldElement.addEventListener('change', onFileInputChange);
cancelButtonElement.addEventListener('click', onCancelButtonClick);
initEffect();

export { setOnFormSubmit, hideModal };
