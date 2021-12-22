
import Popup from "./Popup.js";

export default class DeletePopup extends Popup {
    constructor(elementSelector) {
        super(elementSelector);



    }
    provideSubmitHandler(onSubmit) {
        this._handleSubmit = onSubmit;
    }

    setEventListeners() {
        super.setEventListeners()
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit();
        })


    }

    open() {
        super.open();

    }



}