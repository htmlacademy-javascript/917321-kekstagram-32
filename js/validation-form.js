const MAX_HASHTAG_COUNT = 5;//максимальное число хэштегов
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;//валидные значения для хэштегов
const ErrorText = {
  INVALID_COUNT : `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQ : 'Хэштеги должны быть уникальными',
  INVALID_PATTERN : 'Неправильный хэштег'
};

const form = document.querySelector('.img-upload__form');
const hashtagField = form.querySelector('.text__hashtags');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const normalizeTags = (tagString) => tagString
  .trim()//удаляем пробелы в начале и конце хэштегов
  .toLowerCase()//приводим к нижнему регистру
  .split(' ');//разбиваем на массив через пробел

const hasValidTags = (value) => normalizeTags(value).every((tag)=>VALID_SYMBOLS.test(tag));//проходимся по каждому хэштегу в массиве

const hasValidHashCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;//проверяем, что хэштегов в массиве не больше 5

const hasUniqHash = (value) => {
  const lowerCaseHash = normalizeTags(value);
  return lowerCaseHash.length === new Set(lowerCaseHash).size;//проверяем есть ли повторы
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

export {pristine};
