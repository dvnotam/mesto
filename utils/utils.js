export const closeByEscape = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_open')
        closePopup(openedPopup);
    }
}

export const openPopup = (popup) => {
    popup.classList.add('popup_open');
    document.addEventListener('keydown', closeByEscape);
}

export const closePopup = (popup) => {
    popup.classList.remove('popup_open');
    document.removeEventListener('keydown', closeByEscape);
}