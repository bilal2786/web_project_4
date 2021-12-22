export default class Section {
    constructor({ render }, containerSelector) {

        this._render = render;// call back function for connection between classes 
        this._container = document.querySelector(containerSelector);
    }
    renderItems(cards) {
        cards.forEach(element => {
            this._element = this._render(element);

        });
    }
    addItem(element) {
        this._container.prepend(element);
    }
}