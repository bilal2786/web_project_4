import "regenerator-runtime"
import Api from "./components/Api.js";
import PopupWithForm from "./components/PopupWithForm.js";
// import initialCards from "./intial-cards.js"
import FormValidator from "./components/FormValidator.js";
import Card from "./components/Card.js"
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import UserInfo from "./components/UserInfo";
import DeletePopup from "./components/DeletePopup.js";

import '../pages/index.css'
// importing images 
import logoHeaderSrc from '../images/logo1.svg'; // source of logo 
import profileIconEditButton from '../images/logo__button.svg';
import addButtonImgSrc from '../images/Add__button.svg'
import popupCloseIconSrc from '../images/Close__button.svg';
const logoHeader = document.getElementById('header__logo');// find the logo 
logoHeader.src = logoHeaderSrc; // add the src to the DOM element
const profilePhoto = document.getElementById('profile__photo');
// profilePhoto.src = profilePhotoSrc;
const profileEditIcon = document.getElementById('profile__icon-edit-button');
profileEditIcon.src = profileIconEditButton;
const addButtonImg = document.getElementById('profile__icon-add-button');
addButtonImg.src = addButtonImgSrc
const popupCloseIcon = document.getElementById('popup__icon');
popupCloseIcon.src = popupCloseIconSrc
const popupCloseIconAddCardForm = document.getElementById('popup__icon_type_add-card');
popupCloseIconAddCardForm.src = popupCloseIconSrc
const popupCloseIconZoomImg = document.getElementById('popup__icon_type_zoom-image');
popupCloseIconZoomImg.src = popupCloseIconSrc
const popupDeleteCard = document.getElementById('popup__icon_type_delete-card');
popupDeleteCard.src = popupCloseIconSrc
const popupCloseIconEditProfileImg = document.getElementById('popup__icon_type_change-profile-pic');
popupCloseIconEditProfileImg.src = popupCloseIconSrc
// variables 
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupTypeEditProfile = document.querySelector(".popup_type_edit-profile");
const popupTypeAddCard = document.querySelector(".popup_type_add-card");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const inputName = document.querySelector(".popup__input_type_name");
const inputDescription = document.querySelector(".popup__input_type_description");
const inputUrl = document.querySelector(".popup__input_type_url");
const inputCardTitle = document.querySelector(".popup__input_type_title");
const elementTemplate = document.querySelector("#template").content; ///template content
const cardsSection = document.querySelector(".cards"); // cards section 
const popupFigure = document.querySelector(".popup__figure");
const cardImage = document.querySelector(".popup__image");
const formTypeEditProfile = popupTypeEditProfile.querySelector('.popup__form');
const formtypeAddCard = popupTypeAddCard.querySelector('.popup__form');
const popupConfirmation = document.querySelector('.popup_type_delete-card');
const numOfLikes = document.querySelector(".card__num-likes");
const changeProfileImgPopup = document.querySelector('.popup_type_edit-profile-img');
const buttonForEditImg = document.querySelector('.profile__edit-img-button');
const profilePic = document.querySelector('.profile__photo');
const inputUrlChangeProfileImg = changeProfileImgPopup.querySelector('.popup__input_type_url')
const formTypeEditProfilePic = changeProfileImgPopup.querySelector('.popup__form')


const pageSettings = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
}
//API instance
const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    token: "61a577b5-41b8-4f4a-b2cc-045694a09d23"
});


//instances for Forms
const editProfilePopup = new PopupWithForm(".popup_type_edit-profile", saveUserInfo);//instances for Forms
const addCardForm = new PopupWithForm(".popup_type_add-card", submitAddCardForm);
const deleteCardPopup = new DeletePopup(".popup_type_delete-card", deleteCard);
const changeProfilePicPopup = new PopupWithForm('.popup_type_edit-profile-img', submitProfilePic)
// listeners for Forms
deleteCardPopup.setEventListeners()
changeProfilePicPopup.setEventListeners();
// asynchrone Functions
async function submitProfilePic(evt) {
    evt.preventDefault();
    try {
        changeProfileImgPopup.querySelector('.popup__save-button').textContent = "Saving..."
        const response = await api.updatingProfileImg(inputUrlChangeProfileImg.value);
        if (response) {
            profilePic.style.backgroundImage = "url(" + inputUrlChangeProfileImg.value + ")";
            changeProfileImgPopup.querySelector('.popup__save-button').textContent = "Save"
            console.log(response)
        }
    }
    catch (e) {
        console.log('the photo is not longer updated', e)

    }

    console.log('you are on the right way')
    changeProfilePicPopup.close();
}
async function deleteCard(cardId) {

    try {
        const response = await api.deleteCard(cardId)
        if (response) {
            console.log(response)
        }
    }
    catch (e) {
        console.log('backend error ', e)
        alert('the card wasnt deleted due to error')
    }
}
async function addingLikes(cardId) {

    try {
        const response = await api.likeCard(cardId);
        if (response) {
            // console.log("see you like in the console", response.likes)
            return response.likes;
        }
    }
    catch (e) {
        console.log("something went wrong with your backend", e)
        alert("something went wrong with your like");
    }
}

async function deletingLikes(cardId) {
    try {
        const response = await api.removeLikeCard(cardId)
        if (response) {
            console.log("see you like in the console", response.likes)
            return response.likes;

        }

    }
    catch (e) {
        console.log("something went wrong", e)
    }

}


async function submitAddCardForm(event) { ////function for submit new card 
    event.preventDefault();
    try {
        popupTypeAddCard.querySelector('.popup__save-button').textContent = "Creation In Progres..."
        const data = await api.uploadCard(inputCardTitle.value, inputUrl.value)
        if (data) {

            const cardElement = createCard(data);
            cardRender.addItem(cardElement);// place the card into the DOM

        }
    }
    catch (e) {
        console.log("something went wrong with the backend", e)
    }
    finally {
        popupTypeAddCard.querySelector('.popup__save-button').textContent = "Save"
        addCardForm.close()
    }

}
async function loadingThePage() {
    const [cards, userData] = await Promise.all([api.getInitialCards(), api.getUserData()])
    cardRender.renderItems(cards);
    infoAboutUser.setUserInfo({ name: userData.name, description: userData.about, avatar: userData.avatar })
}
loadingThePage();
// buttons handles
buttonForEditImg.addEventListener('click', () => {
    changeProfileImgPopup.classList.add('popup_visible')
})

editButton.addEventListener('click', () => {
    editProfilePopup.open();
    editProfilePopup.setEventListeners();
    fillEditProfileForm();
    resetAndValidateProfileInfo();

});

addButton.addEventListener('click', () => {
    addCardForm.open();
    addCardForm.setEventListeners();
    resetAndValidateAddCardForm();

});
// popup with image instance + handle events
const imagePopup = new PopupWithImage('.popup_type_zoom-image');
imagePopup.setEventListeners();

// card creation func.
function createCard(cardInfo) {
    return new Card(cardInfo, elementTemplate, imagePopup.open, addingLikes, deletingLikes, deleteCard).createCard();
}

const cardRender = new Section({
    render: (element) => {// create instance of section from intialCards 
        const newCard = createCard(element); // render => call back function that connects between Section class and Card class 
        cardRender.addItem(newCard);
    }
}, ".cards")


//
function fillEditProfileForm() { /// the function takes the text value from user info and make it appears at the input values of the popup form 
    const userInfo = infoAboutUser.getUserInfo();
    inputName.value = userInfo.name;
    inputDescription.value = userInfo.description;

}

const infoAboutUser = new UserInfo({ profileName, profileDescription, profilePic }); /// instance with the UserInfo

async function saveUserInfo(event) {
    event.preventDefault();
    try {
        popupTypeEditProfile.querySelector('.popup__save-button').textContent = "Saving..."
        const userInfo = await api.updatingProfileInfo(inputName.value, inputDescription.value)
        if (userInfo) {
            infoAboutUser.setUserInfo({ name: userInfo.name, description: userInfo.about, avatar: userInfo.avatar });
        }
    }
    catch (e) {
        console.log("your info wasnt updated due to backend error", e)
        alert('your info wasnt updated')
    }
    finally {
        popupTypeEditProfile.querySelector('.popup__save-button').textContent = "Saving"
        editProfilePopup.close();
    }

}

function resetAndValidateAddCardForm() {
    addCardFormValidator.resetValidation();
}
function resetAndValidateProfileInfo() {
    editUserFormValidator.resetValidation();
}
// instance for the form validation
const editUserFormValidator = new FormValidator(pageSettings, formTypeEditProfile);
editUserFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(pageSettings, formtypeAddCard);
addCardFormValidator.enableValidation();
// const editProfilePhotoValidator = new FormValidator(pageSettings, formTypeEditProfilePic);
// editProfilePhotoValidator.enableValidation();

export {
    editUserFormValidator,
    popupFigure,
    cardImage,
    popupTypeAddCard,
    popupTypeEditProfile,
    fillEditProfileForm,
    resetAndValidateAddCardForm,
    resetAndValidateProfileInfo,
    saveUserInfo,
    submitAddCardForm,
    profileName,
    profileDescription,
    popupConfirmation,
    deleteCardPopup,
    api
};












