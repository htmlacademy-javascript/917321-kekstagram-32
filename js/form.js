import {isEscapeKey} from './util.js';// импортируем определение кнопки Escape
import {resetScale} from './scale.js'; // импортируем функцию для масштабирования
import {
  init as initEffect,
  reset as resetEffect
} from './effect.js';//импортируем функции для фильтров фото
import { pristine } from './validation-form.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const fileField = form.querySelector('.img-upload__input');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');

const showModal = () => {//показать модалку
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  cancelButton.addEventListener('click', onCancelButtonClick);
};

const hideModal = () => {//скрыть модалку
  form.reset();//сбросить значения формы
  pristine.reset();//сбросить значения валидатора
  resetScale();//сбросить значения масштабирования
  resetEffect();//сбросить значения фильтров
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  cancelButton.removeEventListener('click', onCancelButtonClick);
};

const isTextFieldFocused = () =>//проверяем есть ли фокус на полях ввода хэштега и комментариев
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()){
    evt.preventDefault();
    hideModal();
  }
}

function onCancelButtonClick () {
  hideModal();
}

const onFileInputChange = () => {
  showModal();
};

const onFormSubmit = (evt) => {
  evt.preventDefaut();
  pristine.validate();
};

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
form.addEventListener('submit', onFormSubmit);
initEffect();
