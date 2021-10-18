const closeEditProfilePopupBtn = document.querySelector(".popup__close-button");
const editButton = document.querySelector(".profile__edit-button");
const popupTypeEditProfile = document.querySelector(".popup_type_edit-profile");
const popupTypeAddCard = document.querySelector(".popup_type_add-card");
const closeButtonAddCard = popupTypeAddCard.querySelector(".popup__close-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const inputName = document.querySelector(".popup__input_type_name");
const inputDescription = document.querySelector(".popup__input_type_description");
const saveButton = document.querySelector(".popup__save-button");
const addButton = document.querySelector(".profile__add-button");
const inputUrl = document.querySelector(".popup__input_type_url");
const inputCardTitle = document.querySelector(".popup__input_type_title");
const popupImage = document.querySelector(".popup_type_zoom-image");
const elementTemplate = document.querySelector("#template").content; ///template content
const cardsSection = document.querySelector(".cards"); // cards section 
const popupFigure = document.querySelector(".popup__figure");
const cardImage = document.querySelector(".popup__image");
const closePopupImageBtn = popupImage.querySelector(".popup__close-button");

function createCard(cardInfo) { // card description + card img url // function for upload cards 
const cardTemplate = elementTemplate.querySelector(".card").cloneNode(true);
const templateImge=cardTemplate.querySelector(".card__image");
cardTemplate.querySelector(".card__title").textContent = cardInfo.name;
const templateImg=cardTemplate.querySelector(".card__image");
templateImge.src= cardInfo.link;
templateImg.alt = cardInfo.name; 
const cardButton = cardTemplate.querySelector(".card__button"); 
cardButton.addEventListener('click', (evt) => {  /// func for all like buttons !
evt.target.classList.toggle(`card__button_black`);
});
const deleteButton = cardTemplate.querySelector(".card__delete-button");

deleteButton.addEventListener('click', (evt) => {/// deleting cars func !

cardTemplate.remove();

});
cardTemplate.querySelector('.card__image').addEventListener('click', () => { ///event for image popup 
showPopup(popupImage);
popupFigure.textContent = cardInfo.name;
cardImage.src = cardInfo.link;
cardImage.alt=cardInfo.name;

});

return cardTemplate;

}

initialCards.forEach(cardInfo => {
cardsSection.append(createCard(cardInfo));
})

function submitAddCardForm(event) { ////function for adding new card
    event.preventDefault();
    const cardElement= createCard({ name: inputCardTitle.value, link: inputUrl.value });
    cardsSection.prepend(cardElement);
    closePopup(popupTypeAddCard);
    inputCardTitle.value="";
    inputUrl.value="";
}
popupTypeAddCard.addEventListener("submit", submitAddCardForm);

function openEditProfileForm() { /// the function takes the text value from user info and make it appears at the input values of the popup form 
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;

}


function showPopup(popup) {
    popup.classList.add(`popup_visible`);

}
function closePopup(popup) {

    popup.classList.remove(`popup_visible`);

}
editButton.addEventListener('click', () => {
    showPopup(popupTypeEditProfile);
    openEditProfileForm();
    enableValidation(pageSettings);
    
});


closeEditProfilePopupBtn.addEventListener('click', () => { closePopup(popupTypeEditProfile) });


function saveUserInfo(event) {
    event.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopup(popupTypeEditProfile);
}
popupTypeEditProfile.addEventListener('submit', saveUserInfo);

addButton.addEventListener('click', () => {showPopup(popupTypeAddCard); });
closeButtonAddCard.addEventListener('click', () => closePopup(popupTypeAddCard));
closePopupImageBtn.addEventListener('click', () => { closePopup(popupImage); });


document.addEventListener("keydown", (evt)=> {
   if (evt.key==="Escape"){
       Array.from(document.querySelectorAll('.popup')).forEach((popup)=>closePopup(popup));
   }
    
})
const allPopupsArray=Array.from(document.querySelectorAll(".popup"));
allPopupsArray.forEach((popup)=>popup.addEventListener('click', (evt)=>{
    if (evt.target.classList.contains("popup")){
         closePopup(popup) 
    }
    }))

// popupTypeEditProfile.addEventListener("keydown", (evt)=>{
//     if (evt.key==="Escape"){
//         closePopup(popupTypeEditProfile);
//     }
// })