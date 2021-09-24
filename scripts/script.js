let closeButton = document.querySelector(".popup__close-button");
let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");

let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");

let inputName = document.querySelector(".popup__input_type_name");
let inputDescription = document.querySelector(".popup__input_type_description");
let saveButton = document.querySelector(".popup__save-button");
let button = document.querySelectorAll(".card__button");


function ShowPopup() {
    popup.classList.add(`popup_visible`);
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;

}
editButton.addEventListener('click', ShowPopup);

function ClosePopup() {

    popup.classList.remove(`popup_visible`);

}
closeButton.addEventListener('click', ClosePopup);



function SaveInfo(event) {
    event.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    ClosePopup();
}
popup.addEventListener('submit', SaveInfo);

for (let i=0; i<button.length; i++){
button[i].addEventListener('click',() =>{
    button[i].classList.toggle(`card__button_black`)
});

}
