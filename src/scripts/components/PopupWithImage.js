import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector)
    }
    open= ({link, name})=>{
        super.open();
        const popupFigure = this._popup.querySelector(".popup__figure");
        const cardImage = this._popup.querySelector(".popup__image");
        popupFigure.textContent = name;
        cardImage.src = link;
        cardImage.alt = name;
    }
}