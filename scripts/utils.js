export {closePopup,showPopup }
import { formReseting,popupTypeAddCard,popupTypeEditProfile,fillEditProfileForm } from "./script.js";
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
function closePopup(popup) {

    popup.classList.remove(`popup_visible`);
    document.removeEventListener('keydown',  closePopupWithEscKey);
    document.removeEventListener('mousedown',closePopupByClickOutsideThePopup);
    if (popup.querySelector('.popup__form')){/// condition for having form in the popup 
        formReseting(popup);
    }
     
}
function closePopupWithEscKey(evt){
    if (evt.key==="Escape"){
        
        closePopup(document.querySelector('.popup_visible'));
    }
}
function closePopupByClickOutsideThePopup (evt){
    if (evt.target.classList.contains(`popup_visible`)){
        closePopup(evt.target);
    }
}

function showPopup(popup) {
    popup.classList.add(`popup_visible`);
    document.addEventListener('keydown',closePopupWithEscKey);
    document.addEventListener('mousedown',closePopupByClickOutsideThePopup);
}
editButton.addEventListener('click', () => {
    showPopup(popupTypeEditProfile);
    fillEditProfileForm();
    
});
addButton.addEventListener('click', () => {
    showPopup(popupTypeAddCard);
    
});
const allPopups=document.querySelectorAll(".popup"); // events for close buttons 
Array.from(allPopups).forEach((popup)=>{
    popup.querySelector(".popup__close-button").addEventListener('click',()=> {closePopup(popup); });  
}
);