let CloseButton=document.querySelector(".popup__close-button");
let EditButton=document.querySelector(".profile__edit-button");
let Popup=document.querySelector(".popup");

let ProfileName=document.querySelector(".profile__name");
let ProfileDescription=document.querySelector(".profile__description");

let InputName=document.querySelector(".popup__input_type_name");
let InputDescription=document.querySelector(".popup__input_type_description");
let SaveButton=document.querySelector(".popup__save-button");


function ShowPopup(){
    Popup.classList.remove(`popup_edit_profile`);
    InputName.value=ProfileName.textContent;
    InputDescription.value=ProfileDescription.textContent;

}
EditButton.addEventListener('click', ShowPopup);

function ClosePopup(){
    Popup.classList.add(`popup_edit_profile`);
   
}
CloseButton.addEventListener('click', ClosePopup);

function SaveInfo(){
    ProfileName.textContent=InputName.value;
    ProfileDescription.textContent=InputDescription.value;
    ClosePopup();
}
SaveButton.addEventListener('click', SaveInfo);

