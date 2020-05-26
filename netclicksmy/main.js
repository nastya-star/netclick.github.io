const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');
const tvShowList = document.querySelector('.tv-shows__list');

hamburger.addEventListener('click', () => {
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
});

document.addEventListener('click', event =>{
    const target = event.target;
    if(!target.closest('.left-menu')) {
        leftMenu.classList,remove('openMenu');
        hamburger.classList.remove('open');
    }
});

leftMenu.addEventListener('click', event => {
    const target = event.target;
    const dropdown = target.closest('.dropdown');
    if(dropdown) {
        dropdown.classList.toggle('active');
        dropdown.classList.add('openMenu');
        dropdown.classList.add('open');
    }
});

const cards = document.querySelectorAll('.tv-card');

const showCardBackdrop = ({ target }) => {
    const image = target.querySelector('.tv-card__img');

    if(!image) return;

    const backdropLink = image.dataset.backdrop;
    if(backdropLink) {
        image.dataset.backdrop = image.src;
        image.src = backdropLink;
        image.classList.toggle('tv-card__img_back');
    }
}

cards.forEach(card => {
    card.addEventListener('mouseenter', showCardBackdrop, false);
    card.addEventListener('mouseleave', showCardBackdrop, false);
});

