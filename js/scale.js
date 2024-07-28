const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;
const SCALE_DEFAULT = 100;

const modalWindow = document.querySelector('.img-upload');
const smallerButton = modalWindow.querySelector('.scale__control--smaller');
const biggerButton = modalWindow.querySelector('.scale__control--bigger');
const scaleInput = modalWindow.querySelector('.scale__control--value');
const modalPicture = modalWindow.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  modalPicture.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  scaleImage(
    Math.max(parseInt(scaleInput.value, 10) - SCALE_STEP, SCALE_MIN)
  );
};

const onBiggerButtonClick = () => {
  scaleImage(
    Math.min(parseInt(scaleInput.value, 10) + SCALE_STEP, SCALE_MAX)
  );
};

const resetScale = () => scaleImage(SCALE_DEFAULT);

smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);

export { resetScale };
