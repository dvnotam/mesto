let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close');
let editButton = document.querySelector('.profile__edit-button');

function showPopup() {
    popup.classList.add('popup__open');
};

function closePopup() {
    popup.classList.remove('popup__open');
};

editButton.addEventListener('click', showPopup);
popupCloseButton.addEventListener('click', closePopup);


let formElementTitle = document.querySelector('.profile__title');
let formElementSubtitle = document.querySelector('.profile__subtitle');
let addButton = document.querySelector('.popup__button');
let formElement = document.getElementById('form');

function formSubmitHandler (evt) {
    evt.preventDefault();

    let nameInput = document.getElementById('name');
    let jobInput = document.getElementById('job');

    formElementTitle.textContent = nameInput.value;
    formElementSubtitle.textContent = jobInput.value;

    console.log(evt);
}

formElement.addEventListener('submit', formSubmitHandler);

