//массив описаний для description
const DESCRIPTIONS = [
  'Летнее утро',
  'Яркий закат',
  'Вкусный ужин',
  'Красивый вид',
  'Работа мастера',
];

// массив комментариев message
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

// массив имен name
const NAMES = [
  'Катя',
  'Герман',
  'Люда',
  'Даниил',
  'Светлана',
  'Олег',
  'Ирина',
  'Дмитрий',
  'Ольга',
];

const CREATE_POSTS_COUNT = 25; // нужное число итоговых объектов
const MAX_COMMENTS_COUNT = 30; // масимальное число комментариев в к посту

// функция для получения id (Идентификаторы не должны повторяться)
const getId = function () {
  let startId = 0;

  return function(){
    startId += 1;
    return startId;
  };
};

//переменная для id постов
const generatePostId = getId();

// переменная для id комментариев
const generateCommentId = getId();

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

// переменная для id фото
const generatePhotoId = getRandomId(1,25);

// функция нахождения случайного элемента массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// функция создания комментария
function getComment () {
  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES)
  };
}

// функция создания поста
const createPost = () => {
  const generateId = generatePostId();

  return {
    id: generateId,
    url: `photos/${generatePhotoId()}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15,200),
    comments: Array.from({length:getRandomInteger(0, MAX_COMMENTS_COUNT)}, getComment),
  };
};

const otherPosts = Array.from({length: CREATE_POSTS_COUNT}, createPost);

console.log(otherPosts);
