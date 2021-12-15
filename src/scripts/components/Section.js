export default class Section {
    constructor({ render }, elementSelector) {

        this._render = render;// call back function for connection between classes 
        this._elementSelector = document.querySelector(elementSelector);
    }
    renderItems(cards) {
        cards.forEach(element => {
            this._element = this._render(element);

        });
    }
    addItem(element) {
        this._elementSelector.prepend(element);
    }
}