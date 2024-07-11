import {getId, getRandomInteger, getRandomId, getRandomArrayElement} from './util.js';

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

//переменная для id постов
const generatePostId = getId();

// переменная для id комментариев
const generateCommentId = getId();

// переменная для id фото
const generatePhotoId = getRandomId(1,25);

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
const createPost = function(){

  return {
    id: generatePostId(),
    url: `photos/${generatePhotoId()}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15,200),
    comments: Array.from({length:getRandomInteger(0, MAX_COMMENTS_COUNT)}, getComment),
  };
};

const otherPosts = Array.from({length: CREATE_POSTS_COUNT}, createPost);

export {otherPosts};
