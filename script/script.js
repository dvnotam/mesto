import {initialCards} from "./initial-cards.js";
import {Card} from './Card.js'

export const popupElement = document.querySelector('.popup_overlay-window')
export const popupImage = document.querySelector('.group__photo')
export const closeButton = document.querySelector('.popup__close-button')
export const popupText = document.querySelector('.group__title');

export const someFormElement = document.querySelectorAll('.popup__form');

const popupProfile = document.querySelector('.popup_profile-form');
const popupPhoto = document.querySelector('.popup_photo-form');

const formElementProfile = document.querySelector('.popup__form_profile');
const formElementPhoto = document.querySelector('.popup__form_photo');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const formElementTitle = document.querySelector('.profile__title');
const formElementSubtitle = document.querySelector('.profile__subtitle');

const nameInput = document.querySelector('.popup__item_profile-name');
const jobInput = document.querySelector('.popup__item_profile-job');
const photoNameInput = document.querySelector('.popup__item_photo-name');
const photoInput = document.querySelector('.popup__item_photo');

const submitButtonPhoto = document.querySelector('.popup__button_photo');

const renderCard = (item) => {
    const card = new Card(item);
    const cardElement = card.generateCard();

    document.querySelector('.elements').prepend(cardElement);
}

initialCards.forEach(renderCard);

const showPopupProfile = () => {
    nameInput.value = formElementTitle.textContent;
    jobInput.value = formElementSubtitle.textContent;

    openPopup(popupProfile);
};

const saveProfileForm = (evt) => {
    evt.preventDefault();

    formElementTitle.textContent = nameInput.value;
    formElementSubtitle.textContent = jobInput.value;

    closePopup(popupProfile)
};

editButton.addEventListener('click', () => {showPopupProfile()});
formElementProfile.addEventListener('submit', (evt) => {saveProfileForm(evt)});

const openPhotoPopup = (photo, subm) => {
    subm.setAttribute('disabled', true);
    subm.classList.add('popup__button_disabled');
    openPopup(photo)
}

const addPhotoCard = (evt) => {
    evt.preventDefault();

    const objectBox = {name:photoNameInput.value, link:photoInput.value};

    renderCard(objectBox);

    closePopup(popupPhoto);

    photoNameInput.value = ''
    photoInput.value = ''
};

addButton.addEventListener('click', () => {openPhotoPopup(popupPhoto, submitButtonPhoto)});
formElementPhoto.addEventListener('submit', addPhotoCard);

 export const openPopup = (popup) => {
    popup.classList.add('popup_open');
    document.addEventListener('keydown', closeByEscape);
}

export const closePopup = (popup) => {
    popup.classList.remove('popup_open');
    document.removeEventListener('keydown', closeByEscape);
}

const closeByEscape = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_open')
        closePopup(openedPopup);
    }
};

const closeOverlayClick = () => {
    const popups = document.querySelectorAll('.popup')

    popups.forEach((popup) => {
        popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_open')) {
                closePopup(popup)
            }
            if (evt.target.classList.contains('popup__close-button')) {
                closePopup(popup)
            }
        })
    })
};

closeOverlayClick();