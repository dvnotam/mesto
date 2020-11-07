let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close');
let editButton = document.querySelector('.edit-button');

function showPopup() {
    popup.classList.add('popup__open');
};

function closePopup() {
    popup.classList.remove('popup__open');
};

editButton.addEventListener('click', showPopup);
popupCloseButton.addEventListener('click', closePopup);