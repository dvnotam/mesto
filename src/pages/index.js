import './index.css';

import {initialCards} from "../utils/initial-cards.js"
import FormValidator from "../components/FormValidation.js"
import Card from "../components/Card.js"
import Section from '../components/Section.js'
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { templateCard, popupProfile, popupPhoto, popupOverlayWindow, cardBox, editButton, addButton, formElementTitle, formElementSubtitle, nameInput, jobInput, photoNameInput, photoInput } from '../utils/constants.js'

const userInfo = new UserInfo({
    userName: formElementTitle,
    userJob: formElementSubtitle
})

const profileForm = new PopupWithForm(popupProfile, (item) => {
    userInfo.setUserInfo(item)
    profileForm.close()
})

editButton.addEventListener('click', () => {
    const { name, job } = userInfo.getUserInfo()

    nameInput.value = name;
    jobInput.value = job;

    popupProfileValidation.clearValidationErrors()

    profileForm.open();
})

addButton.addEventListener('click', () => {
    photoNameInput.value = '';
    photoInput.value = '';

    popupPhotoValidation.clearValidationErrors()
    popupPhotoValidation.disableSubmitButton()

    popupAddCard.open();
})

const popupOverlay = new PopupWithImage(popupOverlayWindow)

const createCard = (item) => {
    const card = new Card(item, templateCard, () => {
        popupOverlay.open(item.name, item.link)
    })
    const cardElement = card.generateCard()
    return cardElement
}

const cardSections = new Section({
    item: initialCards,
    renderer: (item) => {
        cardSections.addItem(createCard(item))
    }
}, cardBox)
cardSections.renderItems()

const popupAddCard = new PopupWithForm(popupPhoto, (item) => {
    cardSections.addItem(createCard(item))
    popupAddCard.close()
})

profileForm.setEventListeners()
popupOverlay.setEventListeners()
popupAddCard.setEventListeners()

const validationConfig = {
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const popupFormProfile = document.querySelector('.popup__form_profile')
const popupProfileValidation = new FormValidator(validationConfig, popupFormProfile)
popupProfileValidation.enableValidation()

const popupFormPhoto = document.querySelector('.popup__form_photo')
const popupPhotoValidation = new FormValidator(validationConfig, popupFormPhoto)
popupPhotoValidation.enableValidation()