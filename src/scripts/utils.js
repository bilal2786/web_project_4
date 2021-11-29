import PopupWithForm from "./components/PopupWithForm.js";
import { saveUserInfo,submitAddCardForm,fillEditProfileForm,resetAndValidateAddCardForm,resetAndValidateProfileInfo } from "./script.js";
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editProfilePopup=new PopupWithForm(".popup_type_edit-profile",saveUserInfo);//instances for Forms
const addCardForm=new PopupWithForm(".popup_type_add-card",submitAddCardForm);
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

export {editButton,addButton,editProfilePopup,addCardForm };