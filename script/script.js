//Простите, я пытался разобраться сам, но так и не понял как пофиксить ошибку валижации при закрытии попапа профиля.
//Если вас не затруднит, обьясните с чем это может быть связанно. Заранее спасибо.

import {FormValidator} from "./FormValidation.js"
import {initialCards} from "./initial-cards.js"
import {Card} from "./Card.js"
import {closePopup, openPopup} from "../utils/utils.js"

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

const createCard = (item) => {
    const card = new Card(item, '.template_card');
    const cardElement = card.generateCard();
    
    return cardElement;
}

const prependCard = (cardElement) => {
    document.querySelector('.elements').prepend(cardElement);
}

initialCards.forEach((initialCard) => {
    const newCard = createCard(initialCard)
    prependCard(newCard)
});

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
    photoNameInput.value = '';
    photoInput.value = '';

    subm.setAttribute('disabled', true);
    subm.classList.add('popup__button_disabled');
    openPopup(photo)
}

const addPhotoCard = (evt) => {
    evt.preventDefault();

    const card = {name:photoNameInput.value, link:photoInput.value};

    const newCard = createCard(card)
    prependCard(newCard)

    closePopup(popupPhoto);

    photoNameInput.value = ''
    photoInput.value = ''
};

addButton.addEventListener('click', () => {openPhotoPopup(popupPhoto, submitButtonPhoto)});
formElementPhoto.addEventListener('submit', addPhotoCard);

const closeButton = document.querySelector('.group__close-button');
const overlay = document.querySelector('.popup_overlay-window');
closeButton.addEventListener('click', () => {
    closePopup(overlay);
})

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

const popupFormProfile = document.querySelector('.popup__form_profile')
const popupProfileValidation = new FormValidator({
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}, popupFormProfile)
popupProfileValidation.enableValidation()

const popupFormPhoto = document.querySelector('.popup__form_photo')
const popupPhotoValidation = new FormValidator({
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}, popupFormPhoto)
popupPhotoValidation.enableValidation()