import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(elementSelector, submitTheForm) {
        super(elementSelector);
        this._submitTheForm = submitTheForm;
    }

    _getInputValues() {
        const inputInfo = {};
        const inputList = this._popup.querySelectorAll('.popup__input');
        inputList.forEach((item) => inputInfo[item.name] = item.value);
        return inputInfo;

    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', this._submitTheForm);
    }

    close() {
        super.close();
        this._popup.querySelector('.popup__form').reset();
    }
}