export default class FormValidation {
    constructor ({validationConfig, formElement}) {
        this._inputSelector = validationConfig.inputSelector
        this._submitButtonSelector = validationConfig.submitButtonSelector
        this._inactiveButtonClass = validationConfig.inactiveButtonClass
        this._inputErrorClass = validationConfig.inputErrorClass
        this._errorClass = validationConfig.errorClass
        this._formElement = formElement
        this._submitButton = formElement.querySelector(validationConfig.submitButtonSelector)
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
    }


    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault()
        })

        this._setInputListeners()
    }

    _setInputListeners() {
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener ('input', () => {
                this._checkInput(inputElement)
                this._toggleButtonState()
            })
            this._toggleButtonState()
        })
    }

    _checkInput(inputElement) {
        if (inputElement.validity.valid) {
            this._hideInputError (inputElement)
        } else {
            this._showInputError (inputElement)
        }
    }

    _hideInputError (inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
        inputElement.classList.remove(this._inputErrorClass)
        errorElement.textContent = ''
        errorElement.classList.remove(this._errorClass)
    }

    _showInputError (inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
        inputElement.classList.add(this._inputErrorClass)
        errorElement.textContent = inputElement.validationMessage
        errorElement.classList.add(this._errorClass)
    }

    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList) || this._allInputsEmpty(this._inputList)) {
            this.disableSubmitButton()
        } else {
            this._submitButton.classList.remove(this._inactiveButtonClass)
            this._submitButton.removeAttribute('disabled')
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some(inputElement => !inputElement.validity.valid)
    }

    _allInputsEmpty(inputList) {
        return !inputList.some(inputElement => inputElement.value.length > 0)
    }

    disableSubmitButton() {
        this._submitButton.classList.add(this._inactiveButtonClass)
        this._submitButton.setAttribute('disabled', true)
    }

    resetValidator() {
        this._inputList.forEach((input) => {
            this._hideInputError(input)
        })

        this._toggleButtonState()
    }
}