import { popupFigure, cardImage } from "../script.js";

export default class Card {
    constructor(data, templateElement, onImageClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateElement = templateElement;
        this._onImageClick = onImageClick;

    }

    _handlePreviewImage() {
        this._onImageClick({ link: this._link, name: this._name });
    }

    _setEventListeners() {
        const cardButton = this._cardElement.querySelector(".card__button");
        const deleteButton = this._cardElement.querySelector(".card__delete-button");

        cardButton.addEventListener('click', (evt) => { /// func for all like buttons !

            evt.target.classList.toggle(`card__button_black`);

        });

        deleteButton.addEventListener('click', (evt) => { /// deleting cars func !

            this._cardElement.remove();

        });

        this._cardElement.querySelector('.card__image').addEventListener('click', () => { ///event for image popup 

            this._handlePreviewImage();

        });
    }
    createCard() {
        this._cardElement = this._templateElement.querySelector(".card").cloneNode(true);
        this._cardElement.querySelector(".card__title").textContent = this._name;
        this._cardElement.querySelector(".card__image").src = this._link;
        this._cardElement.querySelector(".card__image").alt = this._name;

        this._setEventListeners();

        return this._cardElement;
    }
}