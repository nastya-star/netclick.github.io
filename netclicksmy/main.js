const IMG_URL ='https://image.tmdb.org/t/p/w185_and_h278_bestv2';
const API_KEY ='f644549e92187909ef898a14dad4d44c';
const API_SERVER = 'http://theviedb.org/3';

const leftMenu = document.querySelector('.left-menu'),
    hamburger = document.querySelector('.hamburger'),
    tvShowList = document.querySelector('.tv-shows__list'),
    modal = document.querySelector('.modal'),
    tvShows = document.querySelector('.tv-shows'),
    tvCardImg = document.querySelector('.tv-card__img'),
    modalTitle = document.querySelector('.modal__title'),
    genresList = document.querySelector('.genres-list'),
    rating = document.querySelector('.rating'),
    description = document.querySelector('.description'),
    searchForm = document.querySelector('.search__form'),
    searchFormInput = document.querySelector('.search__form-input'),
    modalLink = document.querySelector('.modal__link')
;

const loading = document.createElement('div');
    
loading.className = 'loading';

class DBServise {

    constructor(){
        this.SERVER = 'http://theviedb.org/3';
        this.API_KEY ='f644549e92187909ef898a14dad4d44c';
    }

    getData = async(url) => {
        const res = await fetch(url);
        if (res.ok){
            return res.json();
        } else {
            throw new Error (`Не удалось получить данные по адресу ${url}`)
        }
    }
    getTestData = () => {
        return this.getData('test.json')
    }
    getTestCard = () => {
        return this.getData('card.json')
    }
    getSearchResult = query => this
        .getData(`${this.SERVER}/search/tv?api_key=${this.API_KEY}&language=ru-RU&query=${query}`);
    
    getTvShow = id => this.getData(`${this.SERVER}/tv/${id}?api_key=${this.API_KEY}&language=ru-RU`);
}

const renderCard = response => {
    tvShowList.textContent ='';

    response.results.forEach(item => {

        const {
            backdrop_path: backdrop,
            name: title,
            poster_path: poster,
            vote_average: vote,
            id
        } = item;

        const posterIMG = poster ? IMG_URL + poster: 'img/no-poster.jpg';
        const backdropIMG = backdrop ? IMG_URL + backdrop: '';
        const voteElem = voteElem ? `<span class="tv-card__vote">${vote}</span>`: '';

        const card = document.createElement('li');
        card.className = 'tv-shows__item';
        card.innerHTML = `
        <a href="#" class="tv-card">
          <span class="tv-card__vote">${vote}</span>
          <img class="tv-card__img"
            src="${poster}"
            data-backdrop="${backdropIMG}"
            alt="${title}">
        <h4 class="tv-card__head">${title}</h4>
    </a>
    `;

    loading.remove();
    tvShowList.append(card);
    });
};

searchForm.addEventListener('submit', event => {
    event.preventDefault();
    const value = searchFormInput.value.trim;
    if(value) {
        tvShows.append(loading);
        new DBServise().getSearchResult(value).then(renderCard);
    }
    searchFormInput.value = '';
});


hamburger.addEventListener('click', () => {
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
});

document.addEventListener('click', event =>{
    const target = event.target;
    if(!target.closest('.left-menu')) {
        leftMenu.classList.remove('openMenu');
        hamburger.classList.remove('open');
    }
});

leftMenu.addEventListener('click', event => {
    event.preventDefault();
    const target = event.target;
    const dropdown = target.closest('.dropdown');
    if(dropdown) {
        dropdown.classList.toggle('active');
        leftMenu.dropdown.classList.add('openMenu');
        hamburger.classList.add('open');
    }
});

tvShowList.addEventListener('click', event => {

    event.preventDefault();

    const target = event.target;
    const card = target.closest('.tv-card');

    if(card) {

        new DBServise().getTvShow(card.id)
        .then(({
            poster_path: posterPath,
            name: title,
            genres,
            vote_average: voteAverage,
            overview,
            homepage }) => {
            tvCardImg.src = IMG_URL + posterPath;
            tvCardImg.alt = title;
            modalTitle.textContent = title;
            genresList.textContent='';
            genres.forEach(item => {
                genresList.innerHTML += `<li>${item.name}`;
            })
            rating.textContent = voteAverage;
            description.textContent = overview;
            modalLink.href = homepage;
        })
        .then(() => {
            document.body.style.overflow ='hidden';
            modal.classList.remove('hide');
        })
    }
});

modal.addEventListener('click', event => {

    if(event.target.closest('.cross') ||
    event.target.classList.contains('.modal')){
        document.body.style.overflow = '';
        modal.classList.add('hide');
    }
});

const changeImage = event => {
    const card = event.target.closest('.tv-shows__item');

    if(card){
        const img = card.querySelector('.tv-card__img');
        if(img.dataset.backdrop) {
            [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src];
        }
    }
};

tvShowList.addEventListener('mouseover', changeImage);
tvShowList.addEventListener('mouseout', changeImage);

