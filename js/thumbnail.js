const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const postsListElement = document.querySelector('.pictures');

const createThumbnail = ({url, description, likes, comments}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

const generateThumbnails = (pictures) => {
  postsListElement.querySelectorAll('.picture').forEach((element) => element.remove());

  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    thumbnail.setAttribute('data-id', picture.id);

    fragment.append(thumbnail);
  });

  postsListElement.append(fragment);
};

export{ generateThumbnails };
