import { customer_db } from "../db/DB.js";
import CustomerDTO from "../dto/CudtomerDTO.js";

// =============== Get Customers ===================
const get_customer = () => {
    return customer_db;
}


// ================ Add Customer ===================
const add_customer = (id,name, address,phone) => {

    let customer_obj = new CustomerDTO(id, name, address,phone);

    customer_db.push(customer_obj);
}

// =============== Get Customers ===================
const get_customer_detail = (index) => {
    return customer_db[index];
}

// ==================== Update Customer ===================
const update_customer = (id,name, address,phone) => {

    let customer_obj = new CustomerDTO(id, name, address,phone);

    const index = customer_db.findIndex(cus => cus.id === id);
    if (index !== -1) {
        customer_db[index] = customer_obj;
    } else {
        customer_db.push(customer_obj);
    }
}

// ============== Delete Student ==================
const delete_customer = (index) => {
    customer_db.splice(index, 1);
}


export{get_customer,add_customer,get_customer_detail,update_customer,delete_customer}




