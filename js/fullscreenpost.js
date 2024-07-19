import {otherPosts} from './data.js';
import {isEscapeKey} from './util.js';

// необходимые переменные
const fullscreenPicture = document.querySelector('.big-picture');
const fullscreenPictureCloseButton = fullscreenPicture.querySelector('.big-picture__cancel');
const fullscreenPictureImage = fullscreenPicture.querySelector('.big-picture__img img');
const fullscreenPictureDescription = fullscreenPicture.querySelector('.social__caption');

// для комментариев
const commentTemplate = document.querySelector('#comment-template').content.querySelector('.social__comment');
const commentsList = fullscreenPicture.querySelector('.social__comments');
const fullscreenPictureCommentCount = fullscreenPicture.querySelector('.social__comment-count');
const fullscreenPictureShowCommentCount = fullscreenPicture.querySelector('.social__comment-shown-count');
const fullscreenPictureTotalCommentCount = fullscreenPicture.querySelector('.social__comment-total-count');
const fullscreenPictureLoadMoreComment = fullscreenPicture.querySelector('.comments-loader');

const fullscreenPictureLikesCount = fullscreenPicture.querySelector('.likes-count');
const postsList = document.querySelector('.pictures');

let closeFullscreenPicture = function(){};

// закрываем окно с большой картинкой клавишей esc
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullscreenPicture();
  }
};

// закрываем окно с большой картинкой крестиком
closeFullscreenPicture = () => {
  fullscreenPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsList.innerHTML = '';
  document.removeEventListener('keydown', onDocumentKeydown);
  fullscreenPictureCloseButton.removeEventListener('click', closeFullscreenPicture);
};

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

  comments.forEach((comment) => {
    const commentItem = commentTemplate.cloneNode(true);

    commentItem.querySelector('.social__picture').src = comment.avatar;
    commentItem.querySelector('.social__picture').alt = comment.name;
    commentItem.querySelector('.social__text').textContent = comment.message;
    commentFragment.appendChild(commentItem);
  });

  commentsList.appendChild(commentFragment);
};

// отрисовываем большую картинку
const renderFullscreenPicture = (post) => {
  fullscreenPictureImage.src = post.url;
  fullscreenPictureLikesCount.textContent = post.likes;
  fullscreenPictureDescription.textContent = post.description;
  fullscreenPictureShowCommentCount.textContent = post.comments.length; //все комментарии
  fullscreenPictureTotalCommentCount.textContent = post.comments.length;

  renderComments(post.comments);

  openFullscreenPicture();
};

// обработчик клика по миниатюре
postsList.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {

    const postId = parseInt(evt.target.closest('.picture').getAttribute('data-id'), 10);
    const renderPost = otherPosts.find((data) => data.id === postId);

    if (renderPost) {
      evt.preventDefault();
      renderFullscreenPicture(renderPost);
      fullscreenPictureCommentCount.classList.add('hidden');
      fullscreenPictureLoadMoreComment.classList.add('hidden');
    }
  }
});
