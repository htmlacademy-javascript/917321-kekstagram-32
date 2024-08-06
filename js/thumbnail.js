import { renderFullscreenPicture } from './fullscreenpost';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const postsList = document.querySelector('.pictures');

const createThumbnail = ({url, description, likes, comments}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

const generateThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    thumbnail.setAttribute('data-id', picture.id);

    fragment.append(thumbnail);
  });

  postsList.append(fragment);

  // обработчик клика по миниатюре перенесла из модуля fullscreenpost
  postsList.addEventListener('click', (evt) => {
    const target = evt.target.closest('.picture');

    if (target) {
      evt.preventDefault();
      renderFullscreenPicture(pictures[target.getAttribute('data-id')]);
    }
  });
};

export{ generateThumbnails };
