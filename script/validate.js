const allInputsEmpty = (inputList) => {
    return !inputList.some(inputElement => inputElement.value.length > 0);
};

const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid)
};

const toggleButton = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList) || allInputsEmpty(inputList)) {
        buttonElement.classList.add('popup__button_disabled')
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove('popup__button_disabled');
        buttonElement.removeAttribute('disabled',);
    }
};

const showInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('popup__input_error');
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add('popup__error_visible');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__input-error');
    errorElement.classList.remove('popup__error_visible');
};

const checkInput = (formElement, inputElement) => {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement);
    } else {
        showInputError(formElement, inputElement);
    }
};

const setInputListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__item'));
    const buttonElement = formElement.querySelector('.popup__button');

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInput(formElement, inputElement);
            toggleButton(inputList, buttonElement);
        })
    })
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach(formElement => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setInputListeners(formElement);
    })
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});

