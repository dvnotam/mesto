import {popupElement, popupImage, closeButton, popupText, openPopup, closePopup} from './script.js';

export class Card {
    constructor(data) {
        this._name = data.name;
        this._link = data.link;
    }

    _getTemplate () {
        const cardElement = document.querySelector('.template').content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    _handleOpenPopup () {
        popupImage.src = this._link
        popupText.textContent = this._name
        openPopup(popupElement)
    }

    _handleClosePopup () {
        popupImage.src = ''
        popupText.textContent = ''
        closePopup(popupElement)
    }

    _setEventListener () {
        closeButton.addEventListener('click', () => {
            this._handleClosePopup();
        })

        this._element.querySelector('.element__photo').addEventListener('click', () => {
            this._handleOpenPopup();
        })

        this._element.querySelector('.element__trash').addEventListener('click', (evt) => {
            this._removeCard(evt)
        })

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

        this._element.querySelector('.element__title').innerText = this._name;
        this._element.querySelector('.element__photo').src = this._link;

        this._element.querySelector('.element__trash')
        this._element.querySelector('.element__group')

        return this._element;
    }
}