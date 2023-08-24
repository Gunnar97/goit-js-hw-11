import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const URL = 'https://pixabay.com/api/'
const KEY ='39007065-0db3fa1240dd246ce2d69362f'
let currentPage = 1;
const page = 40;
let totalEl;
let q = '';



const refs = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    input: document.querySelector('[name="searchQuery"]'),
    target: document.querySelector('.js-guard')
};

let lightbox = new SimpleLightbox('.gallery a', {
            fadeSpeed: 300,
            captionsData: 'alt',
            signmentPosition: 'bottom',
            signmentDelay: 250
       });

refs.searchForm.addEventListener('submit', onSubmit);

function onSubmit(eve) {
    eve.preventDefault();
    q = refs.input.value;
    currentPage = 1;
  if (!refs.input.value) {
      Notiflix.Report.warning(
'Warning',
'The input field must be filled!',
        'Okay',
    );
    return
    };
  refs.gallery.innerHTML = '';
  observer.unobserve(refs.target)
  fetchPhoto();
    refs.input.value = '';
};
 

async function fetchPhoto() {
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
      const images = response.data.hits;
    totalEl = response.data.total;
    if (currentPage === 1) {
      if (totalEl < 500) {
    Notiflix.Notify.success("Hooray! We found "+totalEl+" images!");
  }
    else {
    Notiflix.Notify.success("Hooray! We found 500 images!");
  }
    } else if (currentPage > 1) {
      Notiflix.Notify.info('You have loaded the following page!');
    }
      
    if (totalEl === 0) {
       Notiflix.Report.info("info", "Sorry, there are no images matching your search query. Please try again.")
    } else {
      renderList(images);
    }
    return images;
  } catch (error) {
    Notiflix.Report.failure (
      'ERROR',
      'Oops! Something went wrong! Try reloading the page!',
      'Okay'
    );
    }
}

function renderList(arr) {
    if (Array.isArray(arr)) {
      const listPhoto = arr.map(photo => `<div class="photo-card">
        <a class="gallery__link" href="${photo.largeImageURL}">
      <img class="gallery__image" src="${photo.webformatURL}" alt="${photo.tags}" />
   </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            <span class="quant">${photo.likes}</span>
          </p>
          <p class="info-item">
            <b>Views</b>
            <span class="quant">${photo.views}</span>
          </p>
          <p class="info-item">
            <b>Comments</b>
            <span class="quant">${photo.comments}</span>
          </p>
          <p class="info-item">
            <b>Downloads</b>
            <span class="quant">${photo.downloads}</span>
          </p>
        </div>
      </div>`).join('')
      refs.gallery.insertAdjacentHTML('beforeend', listPhoto);
      lightbox.refresh();
      observer.observe(refs.target);
    }
    else {
        console.error("Invalid data format: arr is not an array.");
    };
};


let options = {
    root: null,
    rootMargin: "400px",
    threshold: 1.0,
};

let observer = new IntersectionObserver(onLoad, options);
function onLoad(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (currentPage*page >= totalEl || currentPage*page >= 500) {
              observer.unobserve(refs.target) 
              Notiflix.Report.info("info", "We're sorry, but you've reached the end of search results.")
            }
            else {
              currentPage += 1;
              fetchPhoto()
                    const { height: cardHeight } = document
                      .querySelector(".gallery")
                      .firstElementChild.getBoundingClientRect();
                      window.scrollBy({
                      top: cardHeight * 2,
                      behavior: "smooth",
              });
            }
        }
    });
    
};