import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
    }

    open (name, link) {
        super.open()

        const popupPhoto = this._popupElement.querySelector('.group__photo')
        const popupTitle = this._popupElement.querySelector('.group__title')

        popupTitle.textContent = name
        popupPhoto.src = link
        popupPhoto.alt = name
    }
}
