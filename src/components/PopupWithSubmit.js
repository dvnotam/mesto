import Popup from './Popup.js'

export default class PopupWithSubmit extends Popup {
    constructor(popupElement) {
        super(popupElement)
    }

    setSubmitAction(submitAction) {
        this._handleSubmiteCallback = submitAction
    }

    setEventListeners() {
        super.setEventListeners()
        this._popupElement.addEventListener('submit', (event) => {
            event.preventDefault()
            this._handleSubmiteCallback()
        })
    }
}