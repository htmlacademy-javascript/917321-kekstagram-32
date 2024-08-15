const EFFECT = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectToFilter = {
  [EFFECT.CHROME]:{
    style: 'grayscale',
    unit: '',
  },
  [EFFECT.SEPIA]:{
    style: 'sepia',
    unit: '',
  },
  [EFFECT.MARVIN]:{
    style: 'invert',
    unit: '%',
  },
  [EFFECT.PHOBOS]:{
    style: 'blur',
    unit: 'px',
  },
  [EFFECT.HEAT]:{
    style: 'brightness',
    unit: '',
  },
};

const effectToSliderOptions = {
  [EFFECT.DEFAULT]:{
    min: 0,
    max: 100,
    step: 1,
  },
  [EFFECT.CHROME]:{
    min: 0,
    max: 1,
    step: 0.1,
  },
  [EFFECT.SEPIA]:{
    min: 0,
    max: 1,
    step: 0.1,
  },
  [EFFECT.MARVIN]:{
    min: 0,
    max: 100,
    step: 1,
  },
  [EFFECT.PHOBOS]:{
    min: 0,
    max: 3,
    step: 0.1,
  },
  [EFFECT.HEAT]:{
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const modalWindowElement = document.querySelector('.img-upload');
const modalPictureElement = modalWindowElement.querySelector('.img-upload__preview img');
const effectsPreviewElement = modalWindowElement.querySelector('.effects');
const modalSliderContainer = modalWindowElement.querySelector('.img-upload__effect-level');
const modalSlider = modalSliderContainer.querySelector('.effect-level__slider');
const effectLevelElement = modalWindowElement.querySelector('.effect-level__value');

let chosenEffect = EFFECT.DEFAULT;

const isDefault = () => chosenEffect === EFFECT.DEFAULT;

const setImageStyle = () => {
  if (isDefault()){
    modalPictureElement.style.filter = null;
    return;
  }

  const {value} = effectLevelElement;
  const {style,unit} = effectToFilter[chosenEffect];
  modalPictureElement.style.filter = `${style}(${value}${unit})`;
};

const showSlider = () => {
  modalSliderContainer.classList.remove('hidden');
};

const hideSlider = () => {
  modalSliderContainer.classList.add('hidden');
};

const changeSlider = () => {
  effectLevelElement.value = modalSlider.noUiSlider.get();
  setImageStyle();
};

const createSlider = ({min, max, step}) => {
  noUiSlider.create(modalSlider, {
    range: {min, max},
    step,
    start: max,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    }
  });
  modalSlider.noUiSlider.on('update', changeSlider);
  hideSlider();
};

const updateSlider = ({min, max, step}) => {
  modalSlider.noUiSlider.updateOptions({
    range: {min, max},
    step,
    start: max,
  });
};

const setSlider = () => {
  if(isDefault()){
    hideSlider();
  } else {
    updateSlider(effectToSliderOptions[chosenEffect]);
    showSlider();
  }
};

const setEffect = (effect) => {
  chosenEffect = effect;
  setSlider();
  setImageStyle();
};

const reset = () => {
  setEffect(EFFECT.DEFAULT);
};

const changeEffects = (evt) => {
  setEffect(evt.target.value);
};

const initializationEffects = () => {
  createSlider(effectToSliderOptions[chosenEffect]);
  effectsPreviewElement.addEventListener('change', changeEffects);
};

export {initializationEffects, reset};
