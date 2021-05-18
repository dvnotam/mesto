import './index.css'

import FormValidation from "../components/FormValidation.js"
import Api from "../components/Api.js"
import Card from "../components/Card.js"
import Section from '../components/Section.js'
import UserInfo from "../components/UserInfo.js"
import PopupWithForm from "../components/PopupWithForm.js"
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithSubmit from "../components/PopupWithSubmit.js"

import { selectorValidation, cardListSection, popupProfile, popupProfileName, popupProfileAbout, popupProfileButton, popupProfileForm, profileName, profileAbout, profileAvatar, profileAvatarImg, popupNewCardButton, popupNewCard, photoPopupForm, popupAvatarProfile, popupAvatarForm, popupImage, popupDelete, template } from '../utils/constants.js'

//Простите, что не исправил пожелания. Я обязательно все поправлю в свободное время

let currentUserId = null

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23',
    headers: {
        authorization: '003a5599-a194-411d-bc3c-1ecd4eb68232',
        "content-type": "application/json"
    }
})

const userInfo = new UserInfo({
    userInfoName: profileName,
    userInfoAbout: profileAbout,
    userAvatar: profileAvatarImg
})

const cardList = new Section({
    renderer: (item) => {
        cardList.appendItem(createNewCard(item, currentUserId))
    }
}, cardListSection)

const popupAddCard = new PopupWithForm({
    popupSelector: popupNewCard,
    handleFormSubmit: (item) => {
        popupAddCard.renderLoading(true)
        api.newCard(item)
            .then((item) => {
                cardList.prependItem(createNewCard(item, currentUserId))
                popupAddCard.close()
            })
            .catch((err) => {
                console.log(`Ошибка! ${err}`)
            })
            .finally(() => {
                popupAddCard.renderLoading(false)
            })
    }
})

popupAddCard.setEventListeners()

popupNewCardButton.addEventListener('click', () => {
    photoPopupFormValidation.resetValidator()
    popupAddCard.open()
})

const popupEditProfile = new PopupWithForm({
    popupSelector: popupProfile,
    handleFormSubmit: (data) => {
        popupEditProfile.renderLoading(true)
        api.setUserInfo({
            name: data.name,
            about: data.about
        })
            .then((data) => {
                const setProfile = userInfo.getUserInfo();
                setProfile.name = data.name;
                setProfile.about = data.about
                userInfo.setUserInfo(setProfile);
                popupEditProfile.close()
            })
            .catch((err) => {
                console.log(`Ошибка! ${err}`)
            })
            .finally(() => {
                popupEditProfile.renderLoading(false)
            })
    }
})

popupEditProfile.setEventListeners()

popupProfileButton.addEventListener('click', () => {
    const userData = userInfo.getUserInfo()

    popupProfileName.value = userData.name
    popupProfileAbout.value = userData.about

    editPopupFormValidation.resetValidator()
    popupEditProfile.open()
})

const popupImageOpen = new PopupWithImage(popupImage)

popupImageOpen.setEventListeners()


const popupAvatar = new PopupWithForm({
    popupSelector: popupAvatarProfile,
    handleFormSubmit: (data) => {
        popupAvatar.renderLoading(true)
        api.newAvatar(data)
            .then((data) => {
                userInfo.setUserInfo(data)
                popupAvatar.close()
            })
            .catch((err) => {
                console.log(`Ошибка! ${err}`)
            })
            .finally(() => {
                popupAvatar.renderLoading(false)
            })
    }
})

popupAvatar.setEventListeners()

profileAvatar.addEventListener('click', () => {
    popupAvatar.open()
    avatarPopupFormValidation.resetValidator()
})

const deletePopup = new PopupWithSubmit(popupDelete)

deletePopup.setEventListeners()

function createNewCard (item, currentUserId) {
    const card = new Card({
        data: item,
        cardSelector: template,
        handleCardClick: () => {
            popupImageOpen.open(item.name, item.link)
        },
        handleDeleteCard: () => {
            deletePopup.setSubmitAction(() => {
                api.deleteCard(item._id)
                    .then(() => {
                        card.deleteCard()
                        deletePopup.close()
                    })
                    .catch((err) => {
                        console.log(`Ошибка! ${err}`)
                    })
            })
            deletePopup.open()
        },
        handleLikeIcon: () => {
            if(card.isLiked()) {
                api.deleteLike(item._id)
                    .then((data) => {
                        card.displayCounterLikes(data)
                    })
                    .catch((err) => {
                        console.log(`Ошибка! ${err}`)
                    })
            } else {
                api.getLike(item._id)
                    .then((data) => {
                        card.displayCounterLikes(data)
                    })
                    .catch((err) => {
                        console.log(`Ошибка! ${err}`)
                    })
            }
        }
    }, currentUserId)

    const cardElement = card.generateCard()
    card.displayCounterLikes(item)

    return cardElement
}

Promise.all([api.getUserInfo(), api.getCards()])
    .then(([userData, cardData]) => {
        userInfo.setUserInfo({
            name: userData.name,
            about: userData.about,
            avatar: userData.avatar
        })
        currentUserId = userData._id
        cardList.renderItems(cardData)
    })
    .catch((err) => {
        console.log(`Ошибка! ${err}`)
    })

const editPopupFormValidation = new FormValidation({
    validationConfig: selectorValidation,
    formElement: popupProfileForm
})

editPopupFormValidation.enableValidation()

const photoPopupFormValidation = new FormValidation({
    validationConfig: selectorValidation,
    formElement: photoPopupForm
})

photoPopupFormValidation.enableValidation()

const avatarPopupFormValidation = new FormValidation({
    validationConfig: selectorValidation,
    formElement: popupAvatarForm
})

avatarPopupFormValidation.enableValidation()