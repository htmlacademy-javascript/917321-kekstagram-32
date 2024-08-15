import { getData, sendData } from './api.js';
import { generateThumbnails } from './thumbnail.js';
import { showAlert, debounce } from './util.js';
import { setOnFormSubmit, hideModal } from './form.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { initFilter as initFilter, getFilteredPictures } from './filter.js';
import { clickOnThumbnail } from './fullscreenpost';


const postsList = document.querySelector('.pictures');


setOnFormSubmit(async(data)=>{
  try {
    await sendData(data);
    hideModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  const debaunsRenderPosts = debounce(generateThumbnails);
  initFilter(data, debaunsRenderPosts);
  generateThumbnails(getFilteredPictures());

  // обработчик клика по миниатюре
  postsList.addEventListener('click', (evt) => {
    const target = evt.target.closest('.picture');
    if (target) {
      evt.preventDefault();
      clickOnThumbnail(data[target.getAttribute('data-id')]);
    }
  });
} catch {
  showAlert();
}
