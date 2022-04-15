import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(elementSelector, submitTheForm) {
        super(elementSelector);
        this._submitTheForm = submitTheForm;
    }
    setInputValues(data){
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        
        });
    }
    _getInputValues() {
         this._inputInfo = {};
         this._inputList = this._popup.querySelectorAll('.popup__input');
        this._inputList.forEach((item) => this._inputInfoinputInfo[item.name] = item.value);
        return this._inputInfo;

    }
    constructor({ popupSelector, handleSubmit }) {
        super(popupSelector);
        // fix the initial button text only once in the constructor
        this._submitBtnText = this._submitBtn.textContent
      }
      // add 2 params: isLoading and loadingText with a default text
      renderLoading(isLoading, loadingText='Saving...') {
        if (isLoading) {
          this._submitBtn.textContent = loadingText;
        } else {
          this._submitBtn.textContent = this._submitBtnText;
        }
      }
    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', this._submitTheForm);
    }

    close() {
        super.close();
        this._form.reset();

    }
}