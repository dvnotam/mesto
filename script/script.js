const template = document.querySelector('.template').content;
const elements = document.querySelector('.elements');


const createCard = (elem) => {
    const htmlElement = template.cloneNode(true);

    htmlElement.querySelector('.element__title').innerText = elem.name;
    htmlElement.querySelector('.element__photo').src = elem.link;
    htmlElement.querySelector('.element__photo').alt = elem.alt;

    htmlElement.querySelector('.element__trash').addEventListener('click', hendlerDelete);
    htmlElement.querySelector('.element__group').addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__group_active');
    });

    htmlElement.querySelector('.element__photo').addEventListener('click', (event)=>{
        openOverlay(elem)});

    return htmlElement;
};

const renderCard = (item) => {
    elements.prepend(createCard(item))
};

initialCards.forEach(renderCard);

function hendlerDelete (evt) {
    evt.target.closest('.element').remove();
};

const popupProfile = document.querySelector('.popup_profile-form');
const popupPhoto = document.querySelector('.popup_photo-form');

const formElementProfile = document.querySelector('.popup__form_profile');
const formElementPhoto = document.querySelector('.popup__form_photo');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const formElementTitle = document.querySelector('.profile__title');
const formElementSubtitle = document.querySelector('.profile__subtitle');

const nameInput = document.querySelector('.popup__item_profile-name');
const jobInput = document.querySelector('.popup__item_profile-job');
const photoNameInput = document.querySelector('.popup__item_photo-name');
const photoInput = document.querySelector('.popup__item_photo');

const submitButtonPhoto = document.querySelector('.popup__button_photo');;

const overlay = document.querySelector('.popup_overlay-window');
const overlayPhoto = document.querySelector('.group__photo');
const overlayText = document.querySelector('.group__title');

const showPopupProfile = () => {
    nameInput.value = formElementTitle.textContent;
    jobInput.value = formElementSubtitle.textContent;

    openPopup(popupProfile);
};

const saveProfileForm = (evt) => {
    evt.preventDefault();

    formElementTitle.textContent = nameInput.value;
    formElementSubtitle.textContent = jobInput.value;

    closePopup(popupProfile)
};

editButton.addEventListener('click', () => {showPopupProfile()});
formElementProfile.addEventListener('submit', (evt) => {saveProfileForm(evt)});

const openPhotoPopup = (photo, subm) => {
    subm.setAttribute('disabled', true);
    subm.classList.add('popup__button_disabled');
    openPopup(photo)
}

const addPhotoCard = (evt) => {
    evt.preventDefault();

    const objectBox = {name:photoNameInput.value, link:photoInput.value};

    renderCard(objectBox);

    closePopup(popupPhoto);

    photoNameInput.value = ''
    photoInput.value = ''
};

addButton.addEventListener('click', () => {openPhotoPopup(popupPhoto, submitButtonPhoto)});
formElementPhoto.addEventListener('submit', addPhotoCard);

const openOverlay = (elem) => {

    overlayPhoto.src = elem.link
    overlayPhoto.alt = elem.alt
    overlayText.innerText = elem.name

    openPopup(overlay);
};

 const openPopup = (popup) => {
    popup.classList.add('popup_open');
    document.addEventListener('keydown', closeByEscape);
}

const closePopup = (popup) => {
    popup.classList.remove('popup_open');
    document.removeEventListener('keydown', closeByEscape);
}

const closeByEscape = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_open')
        closePopup(openedPopup);
    }
};

const closeOverlayClick = () => {
    const popups = document.querySelectorAll('.popup')

    popups.forEach((popup) => {
        popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_open')) {
                closePopup(popup)
            }
            if (evt.target.classList.contains('popup__close-button')) {
                closePopup(popup)
            }
        })
    })
};

closeOverlayClick();
