import axios from 'axios';
import Notiflix from 'notiflix';

const URL = 'https://pixabay.com/api/'
const KEY = '39007065-0db3fa1240dd246ce2d69362f'




export const queryParam = {
  q: '',
  currentPage: 1,
  page: 40,
  totalEl: 0
};

export async function fetchPhoto() {
  const PARAMS = new URLSearchParams({
    key: KEY,
    q: queryParam.q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: queryParam.currentPage,
    per_page: queryParam.page,
  });
  let images;
  try {
    const response = await axios.get(`${URL}?${PARAMS}`);
    queryParam.totalEl = response.data.total;
    if (queryParam.currentPage === 1) {
      if (queryParam.totalEl < 500) {
    Notiflix.Notify.success("Hooray! We found "+queryParam.totalEl+" images!");
      }
    else {
    Notiflix.Notify.success("Hooray! We found 500 images!");
      };
    } else if (queryParam.currentPage > 1) {
      Notiflix.Notify.info('You have loaded the following page!');
    };
    if (queryParam.totalEl === 0) {
       Notiflix.Report.info("info", "Sorry, there are no images matching your search query. Please try again.")
    } else {
      images = response.data.hits;
    };
    return images;
  } catch (error) {
    Notiflix.Report.failure (
      'ERROR',
      'Oops! Something went wrong! Try reloading the page!',
      'Okay'
    );
    return null;
  };
};

