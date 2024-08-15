import { isEscapeKey } from './util.js';

const SHOW_COMMENTS_COUNT = 5;

// необходимые переменные
const fullscreenPictureElement = document.querySelector('.big-picture');
const fullscreenPictureCloseButtonElement = fullscreenPictureElement.querySelector('.big-picture__cancel');
const fullscreenPictureImageElement = fullscreenPictureElement.querySelector('.big-picture__img img');
const fullscreenPictureDescriptionElement = fullscreenPictureElement.querySelector('.social__caption');

// для комментариев
const commentTemplateElement = document.querySelector('#comment-template').content.querySelector('.social__comment');
const commentsListElement = fullscreenPictureElement.querySelector('.social__comments');
const fullscreenPictureShowCommentsCountElement = fullscreenPictureElement.querySelector('.social__comment-shown-count');
const fullscreenPictureTotalCommentCountElement = fullscreenPictureElement.querySelector('.social__comment-total-count');
const fullscreenPictureLoadMoreCommentElement = fullscreenPictureElement.querySelector('.comments-loader');

const fullscreenPictureLikesCountElement = fullscreenPictureElement.querySelector('.likes-count');

// const postsList = document.querySelector('.pictures');

// закрываем окно с большой картинкой клавишей esc
const clickOnDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullscreenPicture();
  }
};

// закрываем окно с большой картинкой крестиком
function closeFullscreenPicture () {
  fullscreenPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsListElement.innerHTML = '';
  document.removeEventListener('keydown', clickOnDocumentKeydown);
  fullscreenPictureCloseButtonElement.removeEventListener('click', closeFullscreenPicture);
  fullscreenPictureLoadMoreCommentElement.removeEventListener('click', onLoadMoreCommentsClick);
}

// открываем окно с большой картинкой
const openFullscreenPicture = () => {
  fullscreenPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', clickOnDocumentKeydown);
  fullscreenPictureCloseButtonElement.addEventListener('click', closeFullscreenPicture);
};

// отрисовывем комментарии
const renderComments = (comments) => {

  const commentFragment = document.createDocumentFragment();
  commentsListElement.innerHTML = '';

  comments.forEach((comment, index) => {
    const commentItem = commentTemplateElement.cloneNode(true);

    commentItem.querySelector('.social__picture').src = comment.avatar;
    commentItem.querySelector('.social__picture').alt = comment.name;
    commentItem.querySelector('.social__text').textContent = comment.message;

    if (index > SHOW_COMMENTS_COUNT - 1) {
      commentItem.classList.add('hidden');//скрываем комментарии кроме 5 первых
    }
    commentFragment.appendChild(commentItem);
  });

  commentsListElement.appendChild(commentFragment);
};

//обработчик кнопки загрузки комментариев
function onLoadMoreCommentsClick () {
  const commentHiddenArray = commentsListElement.querySelectorAll('.social__comment.hidden');//находим массив скрытых комментариев
  const countComment = Math.min(commentHiddenArray.length, SHOW_COMMENTS_COUNT);

  for (let i = 0; i < countComment; i++){
    commentHiddenArray[i].classList.remove('hidden');
  }

  const currentShowedCommentsCount = parseInt(fullscreenPictureShowCommentsCountElement.textContent, 10);
  const currentCommentsCount = currentShowedCommentsCount + countComment;
  fullscreenPictureShowCommentsCountElement.textContent = currentCommentsCount;

  const commentArrayLenght = commentsListElement.querySelectorAll('.social__comment').length;
  if (currentCommentsCount === commentArrayLenght){
    fullscreenPictureLoadMoreCommentElement.classList.add('hidden');
  }
}

// отрисовываем большую картинку
const clickOnThumbnail = (post) => {
  fullscreenPictureImageElement.src = post.url;
  fullscreenPictureLikesCountElement.textContent = post.likes;
  fullscreenPictureDescriptionElement.textContent = post.description;

  //показываем число комментариев
  if (post.comments.length <= SHOW_COMMENTS_COUNT) {
    fullscreenPictureShowCommentsCountElement.textContent = post.comments.length;
    fullscreenPictureLoadMoreCommentElement.classList.add('hidden');
  } else {
    fullscreenPictureShowCommentsCountElement.textContent = SHOW_COMMENTS_COUNT;
    fullscreenPictureLoadMoreCommentElement.classList.remove('hidden');
    fullscreenPictureLoadMoreCommentElement.addEventListener('click', onLoadMoreCommentsClick);
  }

  fullscreenPictureTotalCommentCountElement.textContent = post.comments.length;
  renderComments(post.comments);
  openFullscreenPicture();
};

export { clickOnThumbnail };
