import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(elementSelector,formSubmition){
        super(elementSelector);
        this._formSubmition=formSubmition;
    }
    _getInputValues(){
        const inputInfo={};
        const inputList=this._popup.querySelectorAll('.popup__input');
        inputList.forEach((item)=>inputInfo[item.name]=item.value);
        return inputInfo;

    }
    setEventListeners(){
        super.setEventListeners();
        this._popup.querySelector(".popup__close-button").addEventListener('click',()=> {this.close(); })
        this._popup.addEventListener('submit', this._formSubmition);
    }
    close(){
        super.close();
        this._popup.querySelector('.popup__form').reset();
    }
}