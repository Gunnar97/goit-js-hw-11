function onSubmit(eve) {
    eve.preventDefault();
    q = refs.input.value;
    console.log(q)
    if (!refs.input.value) return;
    fetchPhoto();
    // refs.input.value = '';
};
 


async function fetchPhoto() {
  console.log(maxPage);
  const PARAMS = new URLSearchParams({
    key: KEY,
    q: q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: maxPage,
    per_page: 40,
  });
  try {
   const response = await axios.get(`${URL}?${PARAMS}`);
      const images = response.data.hits;
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
        <a class="gallery__link" href="${photo.largeImageURL}"><img class="gallery__image" src="${photo.webformatURL}" alt="${photo.tags}" title=""/>
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
</div>
</a>
</li>`).join('')
        refs.gallery.innerHTML = listPhoto;
        let lightbox = new SimpleLightbox('.gallery a', {
            fadeSpeed: 800,
            captionsData: 'alt',
            signmentPosition: 'bottom',
            signmentDelay: 250
        })
    }
    else {
        console.error("Invalid data format: arr is not an array.");
    };
};
