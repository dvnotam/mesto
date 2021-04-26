export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector
        this._popupElement = document.querySelector(popupSelector)
        this._handlerEscClose = this._handlerEscClose.bind(this)

        this.setEventListeners()

    }

    _handlerEscClose (evt) {
        const keyName = evt.key;
        if (keyName === 'Escape') {
           this.close()
        }
    }

    setEventListeners () {
        const popups = document.querySelectorAll('.popup')
        popups.forEach((popup) => {
            popup.addEventListener('click', (evt) => {
                if (evt.target.classList.contains('popup_open')) {
                    this.close(popup)
                }
                if (evt.target.classList.contains('popup__close-button')) {
                    this.close(popup)
                }
            })
        })
    }

    open () {
        this._popupElement.classList.add('popup_open');

        document.addEventListener('keydown', this._handlerEscClose)
    }

    close (evt) {
        this._popupElement.classList.remove('popup_open');

        document.removeEventListener('keydown', this._handlerEscClose);
    }
}