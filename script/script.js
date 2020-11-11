let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close');
let editButton = document.querySelector('.profile__edit-button');
let formElementTitle = document.querySelector('.profile__title');
let formElementSubtitle = document.querySelector('.profile__subtitle');
let formElement = document.getElementById('form');
let nameInput = document.getElementById('name');
let jobInput = document.getElementById('job');

function showPopup() {
    popup.classList.add('popup__open');

    nameInput.value = formElementTitle.textContent;
    jobInput.value = formElementSubtitle.textContent;
};

function closePopup() {
    popup.classList.remove('popup__open');
};

editButton.addEventListener('click', showPopup);
popupCloseButton.addEventListener('click', closePopup);


function formSubmitHandler (evt) {
    evt.preventDefault();

    formElementTitle.textContent = nameInput.value;
    formElementSubtitle.textContent = jobInput.value;

    console.log(evt);
}

formElement.addEventListener('submit', formSubmitHandler);

