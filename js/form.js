import {isEscapeKey} from './util.js';// импортируем определение кнопки Escape

const MAX_HASHTAG_COUNT = 5;//максимальное число хэштегов
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;//валидные значения для хэштегов
const ErrorText = {
  INVALID_COUNT : `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQ : 'Хэштеги должны быть уникальными',
  INVALID_PATTERN : 'Неправильный хэштег'
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const fileField = form.querySelector('.img-upload__input');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const showModal = () => {//показать модалку
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideModal = () => {//скрыть модалку
  form.reset();//сбросить значения формы
  pristine.reset();//сбросить значения валидатора
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () =>//проверяем есть ли фокус на полях ввода хэштега и комментариев
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

const normalizeTags = (tagString) => tagString
  .trim()//удаляем пробелы в начале и конце хэштегов
  .split(' ');//разбиваем на массив через пробел

const hasValidTags = (value) => normalizeTags(value).every((tag)=>VALID_SYMBOLS.test(tag));//проходимся по каждому хэштегу в массиве

const hasValidHashCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;//проверяем, что хэштегов в массиве не больше 5

const hasUniqHash = (value) => {
  const lowerCaseHash = normalizeTags(value).map((tag) => tag.toLowerCase());//приводим к нижнему регистру
  return lowerCaseHash.length === new Set(lowerCaseHash).size;//проверяем есть ли повторы
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()){
    evt.preventDefault();
    hideModal();
  }
}

const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = () => {
  showModal();
};

const onFormSubmit = (evt) => {
  evt.preventDefaut();
  pristine.validate();
};

pristine.addValidator(
  hashtagField,
  hasValidHashCount,
  ErrorText.INVALID_COUNT,
  3,
  true
);

pristine.addValidator(
  hashtagField,
  hasUniqHash,
  ErrorText.NOT_UNIQ,
  2,
  true
);

pristine.addValidator(
  hashtagField,
  hasValidTags,
  ErrorText.INVALID_PATTERN,
  1,
  true
);

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
form.addEventListener('submit', onFormSubmit);
