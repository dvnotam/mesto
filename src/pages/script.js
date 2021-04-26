import './index.css';

import {initialCards} from "../utils/initial-cards.js"
import FormValidator from "../components/FormValidation.js"
import Card from "../components/Card.js"
import Section from '../components/Section.js'
import Popup from '../components/Popup.js'
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { popupProfile, popupPhoto, popupOverlayWindow, cardBox, editButton, addButton, formElementTitle, formElementSubtitle, nameInput, jobInput, photoNameInput, photoInput } from '../utils/constants.js'

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

    const popup = new Popup(popupProfile);
    popup.open();
})

addButton.addEventListener('click', () => {
    photoNameInput.value = '';
    photoInput.value = '';

    popupPhotoValidation.clearValidationErrors()
    popupPhotoValidation.disableSubmitButton()

    const popup = new Popup(popupPhoto);
    popup.open();
})

const cardSections = new Section({
    item: initialCards,
    renderer: (item) => {
        const card = new Card(item, '.template_card', () => {
            const popupOverlay = new PopupWithImage(popupOverlayWindow)
            popupOverlay.open(item.name, item.link)
        })
        const cardElement = card.generateCard()
        cardSections.addItem(cardElement)
    }
}, cardBox)
cardSections.rendererItem()

const newCard = new PopupWithForm(popupPhoto, (item) => {
    const card = new Card(item, '.template_card', () => {
        const popupOverlay = new PopupWithImage()
        popupOverlay.open(item.name, item.link)
    })
    const cardElement = card.generateCard()
    cardSections.addItem(cardElement)

    newCard.close()
})

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