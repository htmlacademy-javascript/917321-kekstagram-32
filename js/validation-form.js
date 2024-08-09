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

//проверяем на валидные значения (прошлая проверка на пропускала публикацию без тэгов и с лишними пробелами)
function hasValidTags(value) {
  if (value === ''){
    return true;
  }

  const arrayTags = value.trim().toLowerCase().split(' ').filter(Boolean);

  for (let i = 0; i < arrayTags.length; i++) {
    if (!VALID_SYMBOLS.test(arrayTags[i])) {
      return false;
    }
  }
  return true;
}

function hasValidHashCount(value) {
  const arrayTags = value.trim().toLowerCase().split(' ').filter(Boolean);

  return arrayTags.length <= MAX_HASHTAG_COUNT;//проверяем, что хэштегов в массиве не больше 5
}

function hasUniqHash(value) {
  const arrayTags = value.trim().toLowerCase().split(' ').filter(Boolean);

  return arrayTags.length === new Set(arrayTags).size;//проверяем есть ли повторы
}

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

export { pristine };
