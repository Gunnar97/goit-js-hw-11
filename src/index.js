import { refs } from './js/refs.js';
import Notiflix from 'notiflix';
import {
  fetchPhoto,
  queryParam
} from './js/query';
import { renderList } from './js/render.js';
import { btnUp } from './js/button.js';

btnUp.addEventListener();

refs.searchForm.addEventListener('submit', onSubmit);

async function onSubmit(eve) {
    eve.preventDefault();
    queryParam.q = refs.input.value;
    queryParam.currentPage = 1;
  if (!refs.input.value.trim()) {
    Notiflix.Report.warning(
      'Warning',
      'The input field must be filled!',
      'Okay'
    );
    return;
  }
  refs.gallery.innerHTML = '';
  observer.unobserve(refs.target);
  try {
    const images = await fetchPhoto();
    renderList(images);
    observer.observe(refs.target);
  } catch (error) {
    Notiflix.Report.failure(
      'ERROR',
      'Oops! Something went wrong! Try reloading the page!',
      'Okay'
    );
  }
  refs.input.value = '';
}

let options = {
  root: null,
  rootMargin: '400px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(onLoad, options);
function onLoad(entries, observer) {
  entries.forEach(async (entry) => {
    if (entry.isIntersecting) {
      if (queryParam.currentPage * queryParam.page >= queryParam.totalEl || queryParam.currentPage * queryParam.page >= 500) {
        observer.unobserve(refs.target);
        if (queryParam.totalEl > 40) {
          Notiflix.Report.info(
            'info',
            "We're sorry, but you've reached the end of search results."
          );
        }
      } else {
          try {
            queryParam.currentPage += 1;
            const images = await fetchPhoto();
            renderList(images);
        } catch (error) {
          Notiflix.Report.failure(
            'ERROR',
            'Oops! Something went wrong! Try reloading the page!',
            'Okay'
          );
        }
        const { height: cardHeight } = document
          .querySelector('.gallery')
          .firstElementChild.getBoundingClientRect();
        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }
    }
  });
}
