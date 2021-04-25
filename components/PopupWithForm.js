import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector,formSubmit) {
        super(popupSelector)
        this._formSubmit = formSubmit
        this.setEventListeners.bind(this)
    }

    _getInputValues () {
        this._inputList = this._popupElement.querySelectorAll('.popup__item')
        this._formValue = {}
        this._inputList.forEach((input) => {
            this._formValue[input.name] = input.value
        })
        return this._formValue
    }


    close () {
        super.close()
        this._formElement.reset()
    }

    setEventListeners() {
        this._formElement = this._popupElement.querySelector('.popup__form')
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault()

            this._formSubmit(this._getInputValues())
        })
    }
}