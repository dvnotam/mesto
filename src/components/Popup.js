export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector
        this._popupElement = document.querySelector(popupSelector)
        this._handleEscClose = this._handleEscClose.bind(this)
    }


    open() {
        this._popupElement.classList.add('popup_open')

        document.addEventListener('keydown', this._handleEscClose)
    }

    close() {
        this._popupElement.classList.remove('popup_open')

        document.removeEventListener('keydown', this._handleEscClose)
    }


    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close()
        }
    }

    setEventListeners() {
        const popup = document.querySelector(this._popupSelector)
        popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_open')) {
                this.close(popup)
            }
            if (evt.target.classList.contains('popup__close-button')) {
                this.close(popup)
            }
        })
    }
}