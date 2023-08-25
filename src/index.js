import { refs } from "./js/refs";
import Notiflix from 'notiflix';
import { fetchPhoto, totalEl, page, currentPage, setCurrentPage, setQ } from "./js/query";
import { renderList } from "./js/render";
import { btnUp } from "./js/button";

btnUp.addEventListener();

refs.searchForm.addEventListener('submit', onSubmit);

function onSubmit(eve) {
    eve.preventDefault();
    setQ(refs.input.value);
    setCurrentPage(1);
  if (!refs.input.value.trim()) {
      Notiflix.Report.warning(
'Warning','The input field must be filled!','Okay',
    );
    return
    };
  refs.gallery.innerHTML = '';
    observer.unobserve(refs.target)
    fetchPhoto().then((images) => {
        renderList(images)
        observer.observe(refs.target);
    }
    )
    refs.input.value = '';
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
              if (totalEl > 40) {
                 Notiflix.Report.info("info", "We're sorry, but you've reached the end of search results.")
                };
            }
            else {
              setCurrentPage(currentPage + 1);
                fetchPhoto().then((images) => {
                    renderList(images);
                });
                    const { height: cardHeight } = document
                    .querySelector(".gallery")
                    .firstElementChild.getBoundingClientRect();
                    window.scrollBy({
                    top: cardHeight * 2,
                    behavior: "smooth",
              });
            };
        };
    });  
};