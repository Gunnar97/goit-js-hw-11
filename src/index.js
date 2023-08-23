import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const URL = 'https://pixabay.com/api/'
const KEY ='39007065-0db3fa1240dd246ce2d69362f'
const axios = require('axios').default;
let currentPage = 1;
let totalEl;
let q ='';

const refs = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    input: document.querySelector('[name="searchQuery"]'),
    target: document.querySelector('.js-guard')
};

refs.searchForm.addEventListener('submit', onSubmit);

function onSubmit(eve) {
    eve.preventDefault();
    q = refs.input.value;
    console.log(q)
    if (!refs.input.value) return;
    currentPage = 1;
    refs.gallery.innerHTML = ''
    fetchPhoto();
    refs.input.value = '';
};
 

async function fetchPhoto() {
  console.log(currentPage);
  const PARAMS = new URLSearchParams({
    key: KEY,
    q: q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: 40,
  });
  try {
   const response = await axios.get(`${URL}?${PARAMS}`);
      const images = response.data.hits;
      totalEl = response.data.total;
      console.log(totalEl)
      console.log(images)
      renderList(images);
      return images;
  } catch (error) {
      console.log(error);
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
       <li class="gallery__item">
        <a class="gallery__link" href="${photo.largeImageURL}"><img class="gallery__image" src="${photo.webformatURL}" alt="${photo.tags}" title=""/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${photo.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${photo.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${photo.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${photo.downloads}</b>
    </p>
  </div>
</li>`).join('')
        refs.gallery.insertAdjacentHTML('beforeend', listPhoto);
        let lightbox = new SimpleLightbox('.gallery a', {
            fadeSpeed: 800,
            captionsData: 'alt',
            signmentPosition: 'bottom',
            signmentDelay: 250
        });
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
            currentPage += 1;
            if (refs.gallery.childElementCount >= totalEl || refs.gallery.childElementCount >= 500) {
            observer.unobserve(refs.target)
            Notiflix.Report.info("info", "We're sorry, but you've reached the end of search results.")
            }
            else {
                fetchPhoto()
            }
            
 
        }
    });
    
}