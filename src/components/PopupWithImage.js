import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        //я удалил слушатели setEventListener из конструкторов и поправил код, теперь я не совсем понимаю, нужно ли добавлять их в index.js
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
