class OrderDTO {

    constructor(id, customer, item, qty, price, date, total) {
        this._id = id;
        this._customer = customer;
        this._item = item;
        this._qty = qty;
        this._price = price;
        this._date = date;
        this._total = total;
    }

    // ======= GETTERS =======
    get id() {
        return this._id;
    }

    get customer() {
        return this._customer;
    }

    get item() {
        return this._item;
    }

    get qty() {
        return this._qty;
    }

    get price() {
        return this._price;
    }

    get date() {
        return this._date;
    }

    get total() {
        return this._total;
    }

    // ======= SETTERS =======
    set id(id) {
        this._id = id;
    }

    set customer(customer) {
        this._customer = customer;
    }

    set item(item) {
        this._item = item;
    }

    set qty(qty) {
        this._qty = qty;
    }

    set price(price) {
        this._price = price;
    }

    set date(date) {
        this._date = date;
    }

    set total(total) {
        this._total = total;
    }

}

export default OrderDTO;
