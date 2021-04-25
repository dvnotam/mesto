export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick
    }

    _getTemplate () {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }
    
    _photoElement () {
        this._element.querySelector('.element__photo').src = this._link;
        this._element.querySelector('.element__photo').alt = this._name;
    }

    _deleteCard () {
        this._element.querySelector('.element__trash').addEventListener('click', (evt) => {
            this._removeCard(evt)
        })
    }

    _clickPhoto () {
        this._element.querySelector('.element__photo').addEventListener('click', () => {
        this._handleCardClick()
    })
    }

    _setEventListener () {
        this._element.querySelector('.element__group').addEventListener('click', (evt) => {
            this._likeButton(evt);
        })
    }

    _removeCard (evt) {
        evt.target.closest('.element').remove();
    }

    _likeButton (evt) {
        evt.target.classList.toggle('element__group_active')
    }

    generateCard () {
        this._element = this._getTemplate()
        this._setEventListener()
        this._deleteCard()
        this._clickPhoto()
        this._photoElement()

        this._element.querySelector('.element__title').innerText = this._name;

        return this._element;
    }
}