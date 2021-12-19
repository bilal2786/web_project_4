import Popup from "./Popup.js";

export default class DeletePopup extends Popup {
    constructor(elementSelector, deleteCard) {
        super(elementSelector);
        this._deleteCardFromServer = deleteCard;

    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector(".popup__close-button").addEventListener('click', () => { this.close(); })

    }

    close() {
        super.close();
        this._popup.querySelector('.popup__form').reset();
    }
    open(cardElement, cardId) {
        super.open();
        this._popup.addEventListener('submit', (event) => {
            event.preventDefault();
            cardElement.remove();
            this.close();
            this._deleteCardFromServer(cardId)
        })

    }

}