import { place_order_db } from "../db/DB.js";
import OrderDTO from "../dto/OrderDTO.js";

// Return all orders
const get_orders = () => {
    return place_order_db;
}


export { get_orders };
