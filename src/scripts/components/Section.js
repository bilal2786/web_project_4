export default class Section {
    constructor ({items, render}, elementSelector){
        this._items=items;
        this._render=render;// call back function for connection between classes 
        this._elementSelector=document.querySelector(elementSelector);
    }
    renderItems(){
       this._items.forEach(element => {
           this._element=this._render(element);
           
        }); 
    }
    addItem(element){
        this._elementSelector.prepend(element);
    }
}