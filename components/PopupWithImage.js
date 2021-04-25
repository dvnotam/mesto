import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)

        this.setEventListeners()
    }

    open (name, link) {
        super.open()

        this._popupElement.classList.add('popup_open')

        const popupPhoto = document.querySelector('.group__photo')
        const popupTitle = document.querySelector('.group__title')

        popupTitle.textContent = name
        popupPhoto.src = link
    }
}
