import initialCards from "./intial-cards.js"
import FormValidator from "./FormValidator.js";
import Card from "./Card.js"
import { closePopup,showPopup } from "./utils.js";
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
const formSelector=".popup__form";
const pageSettings = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
}

initialCards.forEach((cardInfo)=>{// stay in script 
const newCard=new Card(cardInfo,elementTemplate).creatingCard();
cardsSection.append(newCard);
})
function submitAddCardForm(event) { ////function for adding new card 
    event.preventDefault();
    const cardElement = new Card({
        name: inputCardTitle.value,
        link: inputUrl.value
    }, elementTemplate).creatingCard();
    cardsSection.prepend(cardElement);
    closePopup(popupTypeAddCard);
}
popupTypeAddCard.addEventListener("submit", submitAddCardForm);

function fillEditProfileForm() { /// the function takes the text value from user info and make it appears at the input values of the popup form 
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;

}

function saveUserInfo(event) {
    event.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopup(popupTypeEditProfile);
}
popupTypeEditProfile.addEventListener('submit', saveUserInfo);

function formReseting(popup){ /// form reseting and hide validation messages
    const popupForm=popup.querySelector(".popup__form");
    popupForm.reset();
    const formValidator=new FormValidator(pageSettings,popup);
    formValidator.enableValidation();
    [...popup.querySelectorAll(pageSettings.inputSelector)].forEach((input)=>formValidator._hideInputError(input))/// hide error validation after reset the form 

}

const formList =document.querySelectorAll(formSelector);
formList.forEach((form)=>{
    const formValidator=new FormValidator(pageSettings,form);
    formValidator.enableValidation();
} )
export {showPopup, popupFigure, cardImage,formReseting,popupTypeAddCard,popupTypeEditProfile,fillEditProfileForm};
