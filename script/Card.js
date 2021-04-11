import {popupElement, popupImage, closeButton, popupText} from '../utils/constants.js';
import {closePopup, openPopup} from "../utils/utils.js";

export class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate () {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    _handleOpenPopup () {
        popupImage.src = this._link
        popupText.textContent = this._name
        popupImage.alt = this._name
        openPopup(popupElement)
    }

    _photoElement () {
        this._element.querySelector('.element__photo').src = this._link;
        this._element.querySelector('.element__photo').alt = this._name;
    }

    _deleteCard () {
        this._element.querySelector('.element__trash').addEventListener('click', (evt) => {
            this._removeCard(evt)
        })
    }

    _clickPhoto () {
        this._element.querySelector('.element__photo').addEventListener('click', () => {
        this._handleOpenPopup();
    })
    }

    _setEventListener () {
        this._element.querySelector('.element__group').addEventListener('click', (evt) => {
            this._likeButton(evt);
        })
    }

    _removeCard (evt) {
        evt.target.closest('.element').remove();
    }

    _likeButton (evt) {
        evt.target.classList.toggle('element__group_active')
    }

    generateCard () {
        this._element = this._getTemplate()
        this._setEventListener()
        this._deleteCard()
        this._clickPhoto()
        this._photoElement()

        this._element.querySelector('.element__title').innerText = this._name;

        return this._element;
    }
}