import { customer_db } from "../db/DB";
import CustomerDTO from "../dto/CudtomerDTO";

// =============== Get Customers ===================
const get_customer = () => {
    return customer_db;
}

export{get_customer}