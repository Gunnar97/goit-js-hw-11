import { refs } from "./refs";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export let lightbox = new SimpleLightbox('.gallery a', {
            fadeSpeed: 300,
            captionsData: 'alt',
            signmentPosition: 'bottom',
            signmentDelay: 250
});

export function renderList(arr) {
    if (Array.isArray(arr)) {
      const listPhoto = arr.map(photo => `<div class="photo-card">
        <a class="gallery__link" href="${photo.largeImageURL}">
      <img class="gallery__image" src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
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
    }
    else {
        console.error("Invalid data format: arr is not an array.");
    };
};
