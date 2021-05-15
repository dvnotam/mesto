import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
    }

    open(name, link) {
        super.open()

        this._popupName = this._popupElement.querySelector('.group__title')
        this._popupPhoto = this._popupElement.querySelector('.group__photo')

        this._popupName.textContent = name
        this._popupPhoto.src = link
        this._popupPhoto.alt = name
    }
}