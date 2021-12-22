import "regenerator-runtime"
import Api from "../scripts/components/Api";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Card from "../scripts/components/Card.js"
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from "../scripts/components/UserInfo";
import DeletePopup from "../scripts/components/DeletePopup.js";
import '../pages/index.css'


//API instance
const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    token: "61a577b5-41b8-4f4a-b2cc-045694a09d23"
});
// variables 
import {
    pageSettings,
    editButton,
    addButton,
    popupTypeEditProfile,
    popupTypeAddCard,
    profileName,
    profileDescription,
    inputName,
    inputDescription,
    inputUrl,
    inputCardTitle,
    elementTemplate,
    formTypeEditProfile,
    formtypeAddCard,
    changeProfileImgPopup,
    buttonForEditImg,
    profilePic,
    inputUrlChangeProfileImg,
    formTypeEditProfilePic,
    saveButtonForPicProfile,
    saveBtnForAddCard,
    saveBtnForEditProfile
} from '../scripts/utils/constants'

//instances for Forms
const editProfilePopup = new PopupWithForm(".popup_type_edit-profile", saveUserInfo);//instances for Forms
const addCardForm = new PopupWithForm(".popup_type_add-card", submitAddCardForm);
const deleteCardPopup = new DeletePopup(".popup_type_delete-card");
const changeProfilePicPopup = new PopupWithForm('.popup_type_edit-profile-img', submitProfilePic)
const imagePopup = new PopupWithImage('.popup_type_zoom-image');
imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardForm.setEventListeners();
// listeners for Forms
changeProfilePicPopup.setEventListeners();
deleteCardPopup.setEventListeners();
function openDeleteCardPopup(cardElement, cardId) {
    deleteCardPopup.open();
    deleteCardPopup.provideSubmitHandler(async () => {
        try {
            const response = await api.deleteCard(cardId)
            if (response) {
                cardElement.remove();
                deleteCardPopup.close()
            }
        }
        catch (e) {
            console.log('backend error ', e)
            alert('the card wasnt deleted due to error')
        }

    })


}

// asynchrone Functions
async function submitProfilePic(evt) {
    evt.preventDefault();
    try {
        saveButtonForPicProfile.textContent = "Saving..."
        const response = await api.updatingProfileImg(inputUrlChangeProfileImg.value);
        if (response) {
            infoAboutUser.setUserInfo({ name: response.name, description: response.about, avatar: response.avatar, id: response._id })
            profilePic.style.backgroundImage = "url(" + infoAboutUser._profilePic.style.backgroundImage + ")"
            changeProfilePicPopup.close();

        }
    }
    catch (e) {
        console.log('the photo is not longer updated', e)

    }
    finally {
        saveButtonForPicProfile.textContent = "Save"
        console.log('you are on the right way')

    }

}




async function addingLikes(cardId) {

    try {
        const response = await api.likeCard(cardId);
        if (response) {
            console.log("see you like in the console", response.likes)
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
        saveBtnForAddCard.textContent = "Creation In Progres..."
        const data = await api.uploadCard(inputCardTitle.value, inputUrl.value)
        if (data) {

            const cardElement = createCard(data);
            cardRender.addItem(cardElement);// place the card into the DOM
            addCardForm.close()
        }
    }
    catch (e) {
        console.log("something went wrong with the backend", e)
    }
    finally {
        saveBtnForAddCard.textContent = "Save"

    }

}
async function loadingThePage() {
    try {
        const [cards, userData] = await Promise.all([api.getInitialCards(), api.getUserData()])
        if ([cards, userData]) {

            infoAboutUser.setUserInfo({ name: userData.name, description: userData.about, avatar: userData.avatar, id: userData._id })
            cardRender.renderItems(cards);


        }
    }
    catch (e) {
        console.log('something Wrong with upoloading the Card/UserInfo', e)
        alert('something Wrong with upoloading the Card/UserInfo')
    }

}
loadingThePage();

// buttons handles
buttonForEditImg.addEventListener('click', () => {
    changeProfilePicPopup.open();
    resetAndValidateEditProfileImg();
})

editButton.addEventListener('click', () => {
    editProfilePopup.open();
    fillEditProfileForm();
    resetAndValidateProfileInfo();

});

addButton.addEventListener('click', () => {
    addCardForm.open();
    resetAndValidateAddCardForm();

});
// popup with image instance + handle events


// card creation func.
function createCard(cardInfo) {
    return new Card(cardInfo, elementTemplate, imagePopup.open, addingLikes, deletingLikes, openDeleteCardPopup, infoAboutUser).createCard();
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
        saveBtnForEditProfile.textContent = "Saving..."
        const userInfo = await api.updatingProfileInfo(inputName.value, inputDescription.value)
        if (userInfo) {
            infoAboutUser.setUserInfo({ name: userInfo.name, description: userInfo.about, avatar: userInfo.avatar });
            editProfilePopup.close();
        }
    }
    catch (e) {
        console.log("your info wasnt updated due to backend error", e)
        alert('your info wasnt updated')
    }
    finally {
        saveBtnForEditProfile.textContent = "Saving"

    }

}
function resetAndValidateEditProfileImg() {
    editProfilePhotoValidator.resetValidation();
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
const editProfilePhotoValidator = new FormValidator(pageSettings, formTypeEditProfilePic);
editProfilePhotoValidator.enableValidation();














