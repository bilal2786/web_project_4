let closeButton = document.querySelector(".popup__close-button");
let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");

let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");

let inputName = document.querySelector(".popup__input_type_name");
let inputDescription = document.querySelector(".popup__input_type_description");
let saveButton = document.querySelector(".popup__save-button");


function ShowPopup() {
    popup.classList.remove(`popup_hidden`);
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;

}
editButton.addEventListener('click', ShowPopup);

function ClosePopup() {

    popup.classList.add(`popup_hidden`);

}
closeButton.addEventListener('click', ClosePopup);



function SaveInfo(event) {
    event.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    ClosePopup();
}
popup.addEventListener('submit', SaveInfo);