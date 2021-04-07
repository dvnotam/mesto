import {someFormElement} from './script.js';

class FormValidator {
    constructor (enableObject, formElement) {
        this._inputSelector = enableObject.inputSelector;
        this._submitButtonSelector = enableObject.submitButtonSelector;
        this._inactiveButtonClass = enableObject.inactiveButtonClass;
        this._inputErrorClass = enableObject.inputErrorClass;
        this._errorClass = enableObject.errorClass;
        this._formElement = formElement;
    }

    _allInputsEmpty (inputList) {
        return !inputList.some(inputElement => inputElement.value.length > 0)
    }

    _hasInvalidInput (inputList) {
        return inputList.some(inputElement => !inputElement.validity.valid)
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

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault()
        })
        this._setInputListeners()
    }
}

someFormElement.forEach((formElement) => {
    const someFormValidator = new FormValidator({
        inputSelector: '.popup__item',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    }, formElement)
    someFormValidator.enableValidation()
})