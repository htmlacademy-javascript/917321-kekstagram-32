import { isEscapeKey } from './util.js';

const SHOW_COMMENTS_COUNT = 5;

// необходимые переменные
const fullscreenPicture = document.querySelector('.big-picture');
const fullscreenPictureCloseButton = fullscreenPicture.querySelector('.big-picture__cancel');
const fullscreenPictureImage = fullscreenPicture.querySelector('.big-picture__img img');
const fullscreenPictureDescription = fullscreenPicture.querySelector('.social__caption');

// для комментариев
const commentTemplate = document.querySelector('#comment-template').content.querySelector('.social__comment');
const commentsList = fullscreenPicture.querySelector('.social__comments');
const fullscreenPictureShowCommentsCount = fullscreenPicture.querySelector('.social__comment-shown-count');
const fullscreenPictureTotalCommentCount = fullscreenPicture.querySelector('.social__comment-total-count');
const fullscreenPictureLoadMoreComment = fullscreenPicture.querySelector('.comments-loader');

const fullscreenPictureLikesCount = fullscreenPicture.querySelector('.likes-count');

// закрываем окно с большой картинкой клавишей esc
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullscreenPicture();
  }
};

// закрываем окно с большой картинкой крестиком
function closeFullscreenPicture () {
  fullscreenPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsList.innerHTML = '';
  document.removeEventListener('keydown', onDocumentKeydown);
  fullscreenPictureCloseButton.removeEventListener('click', closeFullscreenPicture);
  fullscreenPictureLoadMoreComment.removeEventListener('click', loadMoreComment);
}

// открываем окно с большой картинкой
const openFullscreenPicture = () => {
  fullscreenPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  fullscreenPictureCloseButton.addEventListener('click', closeFullscreenPicture);
};

// отрисовывем комментарии
const renderComments = (comments) => {

  const commentFragment = document.createDocumentFragment();
  commentsList.innerHTML = '';

  comments.forEach((comment, index) => {
    const commentItem = commentTemplate.cloneNode(true);

    commentItem.querySelector('.social__picture').src = comment.avatar;
    commentItem.querySelector('.social__picture').alt = comment.name;
    commentItem.querySelector('.social__text').textContent = comment.message;

    if (index > SHOW_COMMENTS_COUNT - 1) {
      commentItem.classList.add('hidden');//скрываем комментарии кроме 5 первых
    }
    commentFragment.appendChild(commentItem);
  });

  commentsList.appendChild(commentFragment);
};

//обработчик кнопки загрузки комментариев
function loadMoreComment () {
  const commentHiddenArray = commentsList.querySelectorAll('.social__comment.hidden');//находим массив скрытых комментариев
  const countComment = Math.min(commentHiddenArray.length, SHOW_COMMENTS_COUNT);

  for (let i = 0; i < countComment; i++){
    commentHiddenArray[i].classList.remove('hidden');
  }

  const currentShowedCommentsCount = parseInt(fullscreenPictureShowCommentsCount.textContent, 10);
  const currentCommentsCount = currentShowedCommentsCount + countComment;
  fullscreenPictureShowCommentsCount.textContent = currentCommentsCount;

  const commentArrayLenght = commentsList.querySelectorAll('.social__comment').length;
  if (currentCommentsCount === commentArrayLenght){
    fullscreenPictureLoadMoreComment.classList.add('hidden');
  }
}

// отрисовываем большую картинку
const renderFullscreenPicture = (post) => {
  fullscreenPictureImage.src = post.url;
  fullscreenPictureLikesCount.textContent = post.likes;
  fullscreenPictureDescription.textContent = post.description;

  //показываем число комментариев
  if (post.comments.length <= SHOW_COMMENTS_COUNT) {
    fullscreenPictureShowCommentsCount.textContent = post.comments.length;
    fullscreenPictureLoadMoreComment.classList.add('hidden');
  } else {
    fullscreenPictureShowCommentsCount.textContent = SHOW_COMMENTS_COUNT;
    fullscreenPictureLoadMoreComment.classList.remove('hidden');
    fullscreenPictureLoadMoreComment.addEventListener('click', loadMoreComment);
  }

  fullscreenPictureTotalCommentCount.textContent = post.comments.length;
  renderComments(post.comments);
  openFullscreenPicture();
};

export { renderFullscreenPicture };
