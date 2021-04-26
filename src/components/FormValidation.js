export default class FormValidator {
    constructor (validationConfig, formElement) {
        this._inputSelector = validationConfig.inputSelector;
        this._submitButtonSelector = validationConfig.submitButtonSelector;
        this._inactiveButtonClass = validationConfig.inactiveButtonClass;
        this._inputErrorClass = validationConfig.inputErrorClass;
        this._errorClass = validationConfig.errorClass;
        this._formElement = formElement;
        this._submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
    }

    disableSubmitButton() {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.setAttribute('disabled', true)
    }

    _allInputsEmpty (inputList) {
        return !inputList.some(inputElement => inputElement.value.length > 0)
    }

    _hasInvalidInput (inputList) {
        return inputList.some(inputElement => !inputElement.validity.valid)
    }

    _showInputError (inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
        inputElement.classList.add(this._inputErrorClass)
        errorElement.textContent = inputElement.validationMessage
        errorElement.classList.add(this._errorClass)
    }

    _toggleButton (inputList, buttonElement) {
        if (this._hasInvalidInput(inputList) || this._allInputsEmpty(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass)
            buttonElement.setAttribute('disabled', true)
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass)
            buttonElement.removeAttribute('disabled',)
        }
    }

    _checkInput (inputElement) {
        if (inputElement.validity.valid) {
            this._hideInputError (inputElement)
        } else {
            this._showInputError (inputElement)
        }
    }

    _setInputListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector)
        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInput(inputElement)
                this._toggleButton(inputList, buttonElement)
            })
        })
    }

    _hideInputError (inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
        inputElement.classList.remove(this._inputErrorClass)
        errorElement.classList.remove(this._errorClass)
    }

    clearValidationErrors () {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        inputList.forEach(inputElement => {
            this._hideInputError(inputElement);
        })
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault()
        })
        this._setInputListeners()
    }
}