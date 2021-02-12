const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const template = document.querySelector('.template').content;
const elements = document.querySelector('.elements');


const renderTemplate = (elem) => {
    const htmlElement = template.cloneNode(true);

    htmlElement.querySelector('.element__title').innerText = elem.name;
    htmlElement.querySelector('.element__photo').src = elem.link;

    htmlElement.querySelector('.element__trash').addEventListener('click', hendlerDelete);
    htmlElement.querySelector('.element__group').addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__group_active');
    });

    htmlElement.querySelector('.element__photo').addEventListener('click', (event)=>{
        openOverlay(event)});

    elements.prepend(htmlElement);
};

initialCards.forEach(renderTemplate);

function hendlerDelete (evt) {
    evt.target.closest('.element').remove();
};

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const formElementTitle = document.querySelector('.profile__title');
const formElementSubtitle = document.querySelector('.profile__subtitle');
const popupProfile = document.getElementById('profile-form');
const popupPhoto = document.getElementById('photo-form');
const formElementProfile = document.getElementById('profile__input-form');
const formElementPhoto = document.getElementById('photo__input-form');
const nameInput = document.getElementById('name');
const jobInput = document.getElementById('job');
const photoNameInput = document.getElementById('photo-name');
const photoInput = document.getElementById('photo');
const profileCloseButton = document.getElementById('profile__close-btn');
const photoCloseButton = document.getElementById('photo__close-btn');
const overlay = document.querySelector('.overlay');
const overlayCloseButton = document.querySelector('.group__close-button');

function overlayToggle () {
    overlay.classList.toggle('overlay__open')
}

function openOverlay (event) {
    const overlayPhoto = document.querySelector('.group__photo')
    const overlayText = document.querySelector('.group__title');

    overlayPhoto.src = event.target.currentSrc
    overlayText.innerText = event.target.nextSibling.parentElement.innerText

    overlayToggle();
};

overlayCloseButton.addEventListener('click', () => {overlayToggle()});

formElementProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();

    formElementTitle.textContent = nameInput.value;
    formElementSubtitle.textContent = jobInput.value;

    close(popupProfile);
});

formElementPhoto.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const objectBox = {name:photoNameInput.value, link:photoInput.value};

    renderTemplate(objectBox);
    close(popupPhoto);
});

editButton.addEventListener('click', () => {
    nameInput.value = formElementTitle.textContent;
    jobInput.value = formElementSubtitle.textContent;

    open(popupProfile);
});

addButton.addEventListener('click', () => {open(popupPhoto)});

profileCloseButton.addEventListener('click', () => {close(popupProfile)});
photoCloseButton.addEventListener('click',() => {close(popupPhoto)});

function close (elem) {
    elem.classList.remove('popup__open');
};

function open (elem) {
    elem.classList.add('popup__open');
}


