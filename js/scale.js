const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;
const SCALE_DEFAULT = 100;

const modalWindowElement = document.querySelector('.img-upload');
const smallerButtonElement = modalWindowElement.querySelector('.scale__control--smaller');
const biggerButtonElement = modalWindowElement.querySelector('.scale__control--bigger');
const scaleInputElement = modalWindowElement.querySelector('.scale__control--value');
const modalPictureElement = modalWindowElement.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  modalPictureElement.style.transform = `scale(${value / 100})`;
  scaleInputElement.value = `${value}%`;
};

const clickOnSmallerButton = () => {
  scaleImage(
    Math.max(parseInt(scaleInputElement.value, 10) - SCALE_STEP, SCALE_MIN)
  );
};

const clickOnBiggerButton = () => {
  scaleImage(
    Math.min(parseInt(scaleInputElement.value, 10) + SCALE_STEP, SCALE_MAX)
  );
};

const resetScale = () => scaleImage(SCALE_DEFAULT);

smallerButtonElement.addEventListener('click', clickOnSmallerButton);
biggerButtonElement.addEventListener('click', clickOnBiggerButton);

export { resetScale };
