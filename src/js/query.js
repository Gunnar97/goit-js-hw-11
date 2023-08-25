import axios from 'axios';
import Notiflix from 'notiflix';

const URL = 'https://pixabay.com/api/'
const KEY = '39007065-0db3fa1240dd246ce2d69362f'

let images;
let q = '';
export function setQ(newValue) {q = newValue};
export let currentPage = 1;
export function setCurrentPage(newValue) {currentPage = newValue};
export const page = 40;
export let totalEl;


export async function fetchPhoto() {
  const PARAMS = new URLSearchParams({
    key: KEY,
    q: q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: page,
  });
  try {
    const response = await axios.get(`${URL}?${PARAMS}`);
    totalEl = response.data.total;
    if (currentPage === 1) {
      if (totalEl < 500) {
    Notiflix.Notify.success("Hooray! We found "+totalEl+" images!");
      }
    else {
    Notiflix.Notify.success("Hooray! We found 500 images!");
      };
    } else if (currentPage > 1) {
      Notiflix.Notify.info('You have loaded the following page!');
    };
    if (totalEl === 0) {
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
  };
};

