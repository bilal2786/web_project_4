const closeButton = document.querySelector(".popup__close-button");
const editButton = document.querySelector(".profile__edit-button");
const popupTypeEditProfile = document.querySelector(".popup_type_edit-profile");
const popupTypeAddCard = document.querySelector(".popup_type_add-card");
const closeButtonAddCard = popupTypeAddCard.querySelector(".popup__close-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const inputName = document.querySelector(".popup__input_type_name");
const inputDescription = document.querySelector(".popup__input_type_description");
const saveButton = document.querySelector(".popup__save-button");
const button = document.querySelectorAll(".card__button");
const addButton = document.querySelector(".profile__add-button");
const inputUrl = document.querySelector(".popup__input_type_url");
const inputCardTitle = document.querySelector(".popup__input_type_title");
const imagePopup = document.querySelector(".popup_type_zoom-image");


const initialCards = [{
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];
const elementTemplate = document.querySelector("#template").content; ///template content
const cardsSection = document.querySelector(".cards"); // cards section 


function addCards(cardInfo) { // card description + card img url // function for upload cards 
    const cardTemplate = elementTemplate.querySelector(".card").cloneNode(true);
    cardTemplate.querySelector(".card__title").textContent = cardInfo.name;
    cardTemplate.querySelector(".card__image").src = cardInfo.link;
    const cardButton = cardTemplate.querySelector(".card__button"); /// fun for all like buttons ! 
    cardButton.addEventListener('click', (evt) => {
        evt.target.classList.toggle(`card__button_black`);
    });
    const deleteButton = cardTemplate.querySelector(".card__delete-button");

    deleteButton.addEventListener('click', (evt) => {

        cardTemplate.remove();

    });
    cardTemplate.querySelector('.card__image').addEventListener('click', () => { ///img url + image title
        ShowPopup(imagePopup);
        document.querySelector(".popup__figure").textContent = cardTemplate.querySelector(".card__title").textContent;
        document.querySelector(".popup__image").src = cardTemplate.querySelector(".card__image").src;
        imagePopup.querySelector(".popup__close-button").addEventListener('click', () => { ClosePopup(imagePopup); })
    });


    return cardTemplate;

}

initialCards.forEach(cardInfo => {
    cardsSection.append(addCards(cardInfo));
})

function addingNewCard(event) { ////function for adding new card
    event.preventDefault();
    const cardTemplate = elementTemplate.querySelector(".card").cloneNode(true);
    cardTemplate.querySelector(".card__title").textContent = inputCardTitle.value;
    cardTemplate.querySelector(".card__image").src = inputUrl.value;
    ClosePopup(popupTypeAddCard);
    inputCardTitle.value = ""
    inputUrl.value = ""
    cardsSection.prepend(cardTemplate);
    const cardButton = cardTemplate.querySelector(".card__button"); /// fun for all like buttons ! 
    cardButton.addEventListener('click', (evt) => {
        evt.target.classList.toggle(`card__button_black`);

    })
    const deleteButton = cardTemplate.querySelector(".card__delete-button");

    deleteButton.addEventListener('click', (evt) => {

        cardTemplate.remove();

    });
    cardTemplate.querySelector('.card__image').addEventListener('click', () => { ///img url + image title
        ShowPopup(imagePopup);
        document.querySelector(".popup__figure").textContent = cardTemplate.querySelector(".card__title").textContent;
        document.querySelector(".popup__image").src = cardTemplate.querySelector(".card__image").src;
        imagePopup.querySelector(".popup__close-button").addEventListener('click', () => { ClosePopup(imagePopup); })
    });

}
popupTypeAddCard.addEventListener("submit", addingNewCard);


function ShowPopup(popup) {
    popup.classList.add(`popup_visible`);
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;

}
editButton.addEventListener('click', () => { ShowPopup(popupTypeEditProfile) });

function ClosePopup(popup) {

    popup.classList.remove(`popup_visible`);

}
closeButton.addEventListener('click', () => { ClosePopup(popupTypeEditProfile) });


function SaveInfo(event) {
    event.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    ClosePopup(popupTypeEditProfile);
}
popupTypeEditProfile.addEventListener('submit', SaveInfo);

addButton.addEventListener('click', () => ShowPopup(popupTypeAddCard));
closeButtonAddCard.addEventListener('click', () => ClosePopup(popupTypeAddCard));