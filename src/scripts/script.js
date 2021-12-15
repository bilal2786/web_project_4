import "regenerator-runtime"
import Api from "./components/Api.js";
import PopupWithForm from "./components/PopupWithForm.js";
// import initialCards from "./intial-cards.js"
import FormValidator from "./components/FormValidator.js";
import Card from "./components/Card.js"
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import UserInfo from "./components/UserInfo";

import '../pages/index.css'
// importing images 
import logoHeaderSrc from '../images/logo1.svg'; // source of logo 
import profilePhotoSrc from '../images/spartna__image.jpg';
import profileIconEditButton from '../images/logo__button.svg';
import addButtonImgSrc from '../images/Add__button.svg'
import popupCloseIconSrc from '../images/Close__button.svg';
import { ids } from "webpack";
const logoHeader = document.getElementById('header__logo');// find the logo 
logoHeader.src = logoHeaderSrc; // add the src to the DOM element
const profilePhoto = document.getElementById('profile__photo');
profilePhoto.src = profilePhotoSrc;
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
const popupConfirmation = document.querySelector('.popup_type_delete-card')

const pageSettings = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
}
// 
const api = new Api({//API instance
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    token: "61a577b5-41b8-4f4a-b2cc-045694a09d23"
});

const editProfilePopup = new PopupWithForm(".popup_type_edit-profile", saveUserInfo);//instances for Forms
const addCardForm = new PopupWithForm(".popup_type_add-card", submitAddCardForm);
// const deleteCardPopup = new PopupWithForm(".popup_type_delete-card", deleteTheCard);
// deleteCardPopup.setEventListeners();

// function deleteTheCard(evt) {
//     evt.preventDefault();
// }

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

const imagePopup = new PopupWithImage('.popup_type_zoom-image');// instance for popup of the image 
imagePopup.setEventListeners();// set event handlers for it 

function createCard(cardInfo) {// return card element
    return new Card(cardInfo, elementTemplate, imagePopup.open).createCard();
}

const cardRender = new Section({
    render: (element) => {// create instance of section from intialCards 
        const newCard = createCard(element); // render => call back function that connects between Section class and Card class 
        cardRender.addItem(newCard);
    }
}, ".cards")

// cardRender.renderItems();//  add intial Cards to the DOM 

// function submitAddCardForm(event) { ////function for submit new card 
//     event.preventDefault();
//     api.uploadCard(inputCardTitle.value, inputUrl.value)
//         .then((data) => {
//             if (data) {
//                 const cardElement = createCard({
//                     name: data.name,
//                     link: data.link
//                 });
//                 cardRender.addItem(cardElement);// place the card into the DOM 
//             }
//         })
//         .catch((err) => console.log("something went wrong", err))

//         .finally(() => addCardForm.close())
// }
async function submitAddCardForm(event) { ////function for submit new card 
    event.preventDefault();
    try {
        const response = await api.uploadCard(inputCardTitle.value, inputUrl.value)
        if (response) {
            console.log(response.owner._id)
            const cardElement = createCard({
                name: response.name,
                link: response.link,
                likes: response.likes,


            });
            cardRender.addItem(cardElement);// place the card into the DOM

        }
    }
    catch (e) {
        console.log("something went wrong", e)
    }
    finally {
        addCardForm.close()
    }


}

function fillEditProfileForm() { /// the function takes the text value from user info and make it appears at the input values of the popup form 
    const userInfo = infoAboutUser.getUserInfo();
    inputName.value = userInfo.name;
    inputDescription.value = userInfo.description;

}

const infoAboutUser = new UserInfo({ profileName, profileDescription }); /// instance with the UserInfo
function saveUserInfo(event) {
    event.preventDefault();
    api.updatingProfileInfo(inputName.value, inputDescription.value)
    infoAboutUser.setUserInfo({ name: inputName.value, description: inputDescription.value });
    editProfilePopup.close();
}

function resetAndValidateAddCardForm() {
    addCardFormValidator.resetValidation();
}
function resetAndValidateProfileInfo() {
    editUserFormValidator.resetValidation();
}

const editUserFormValidator = new FormValidator(pageSettings, formTypeEditProfile);// instance for the form validation for each form 
editUserFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(pageSettings, formtypeAddCard);
addCardFormValidator.enableValidation();
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

};



async function loadingThePage() {
    const [cards, userData] = await Promise.all([api.getInitialCards(), api.getUserData()])
    console.log(cards)
    cardRender.renderItems(cards);
    infoAboutUser.setUserInfo({ name: userData.name, description: userData.about })
}
loadingThePage();










