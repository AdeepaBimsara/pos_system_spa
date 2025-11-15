class ItemDTO {
    constructor(id, name, price, quantity) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get price() {
        return this._price;
    }

    get quantity() {
        return this._quantity;
    }

    set id(id) {
        this._id = id;
    }

    set name(name) {
        this._name = name;
    }

    set price(price) {
        this._price = price;
    }

    set quantity(quantity) {
        this._quantity = quantity;
    }
}

export default ItemDTO;
