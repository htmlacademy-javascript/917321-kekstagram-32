// функция для получения id (Идентификаторы не должны повторяться)
const getId = function () {
  let startId = 0;

  return function(){
    startId += 1;
    return startId;
  };
};

// функция нахождения случайного целого числа
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// функция для случайного числа из диапазона, которое не будет повторяться
const getRandomId = (min, max) => {
  const firstValues = [];

  return function(){
    let currentValue = getRandomInteger(min,max);

    if (firstValues.length >= (max - min + 1)){
      return null;
    }

    while (firstValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    firstValues.push(currentValue);

    return currentValue;
  };
};

// функция нахождения случайного элемента массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export {getId};
export {getRandomInteger};
export {getRandomId};
export {getRandomArrayElement};
