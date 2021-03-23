const allInputsEmpty = (inputList) => {
    return !inputList.some(inputElement => inputElement.value.length > 0);
};

const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid)
};

//валидация кнопки
const toggleButton = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList) || allInputsEmpty(inputList)) {
        buttonElement.classList.add('popup__button_disabled')
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove('popup__button_disabled');
        buttonElement.removeAttribute('disabled',);
    }
};

// если валидация НЕ пролшла
const showInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('popup__input_error');
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add('popup__error_visible');
};

//если валидация прошла
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_error');
    errorElement.classList.remove('popup__error_visible');
};

const checkInput = (formElement, inputElement) => {
    if (inputElement.validity.valid) {
        //все ок
        hideInputError(formElement, inputElement);
    } else {
        //изменить цвет поля
        showInputError(formElement, inputElement);
    }
};

const setInputListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__item'));
    const buttonElement = formElement.querySelector('.popup__button');

    //вешаю обработчики событий полей
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            //текст ошибки
            checkInput(formElement, inputElement);
            //меняю состояние кнопки
            toggleButton(inputList, buttonElement);
        })
    })
};

// Функция запуска валидации
const enableValidation = () => {
    //собираю все формы в массив
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    //прохожу по массиву
    formList.forEach(formElement => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        //Вешаю слушатели для полей
        setInputListeners(formElement);
    })
};

// Запуск валидации
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});

