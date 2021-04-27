export default class Section {
    constructor({ item, renderer }, containerSelector) {
        console.log()
        this._renderedItems = item;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector)
    }

    renderItems () {
        this._renderedItems.forEach((item) => {
            this._renderer(item)
        })
    }

    addItem (elem) {
        this._container.prepend(elem)
    }
}