import { place_order_db } from "../db/DB.js";
import PlaceOrderDTO from "../dto/PlaceOrderDTO.js";

// =============== Get PlaceOrder ===================
const get_place_order= () => {
    return place_order_db;
}

//===============add card====================
const add_cart = (id, customer, item, qty, price, date, total) => {
    let place_order_obj = new PlaceOrderDTO(id, customer, item, qty, price, date, total);
    place_order_db.push(place_order_obj);
}


export{get_place_order,add_cart};