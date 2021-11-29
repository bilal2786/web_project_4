export default class Popup{
    constructor (popupSelector){
        this._popup=document.querySelector(popupSelector);
    }
    _handleEscClose=(evt)=>{
        if (evt.key==="Escape"){
        
            this.close();
            
        }

    }
    setEventListeners(){
        this._popup.addEventListener('click',(evt)=> {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__icon') ){
                this.close();
            }
             
             });
    }
    open(){
        this._popup.classList.add(`popup_visible`);
        document.addEventListener('keydown',this._handleEscClose);
    }
    close(){
        this._popup.classList.remove(`popup_visible`);
        document.addEventListener('keydown',this._handleEscClose);
    }
    }