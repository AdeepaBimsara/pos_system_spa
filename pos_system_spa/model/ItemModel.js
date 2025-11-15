import { item_db } from "../db/DB.js";
import ItemDTO from "../dto/ItemDTO.js";

// =============== Get Items ===================
const get_item = () => {
    return item_db;
}

// ================ Add Item ===================
const add_item = (id, name, price, quantity) => {
    let item_obj = new ItemDTO(id, name, price, quantity);
    item_db.push(item_obj);
}

// =============== Get Item Detail ===================
const get_item_detail = (index) => {
    return item_db[index];
}

// ==================== Update Item ===================
const update_item = (id, name, price, quantity) => {
    let item_obj = new ItemDTO(id, name, price, quantity);

    const index = item_db.findIndex(item => item.id === id);
    if (index !== -1) {
        item_db[index] = item_obj; // replace existing
    } else {
        item_db.push(item_obj); // if not found, add new
    }
}

// ============== Delete Item ==================
const delete_item = (index) => {
    item_db.splice(index, 1);
}

export { get_item, add_item, get_item_detail, update_item, delete_item };
