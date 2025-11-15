import { get_orders } from "../model/OrderModel.js";

// Orders Table Load Function
const loadOrderTable = () => {
    const orders = get_orders();  // place_order_db එකෙන් data ගන්නවා
    const tbody = $("#order_table_body");
    tbody.empty(); // පරණ rows clear කරන්න

    orders.forEach(order => {
        let row = `
            <tr>
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>${order.item}</td>
                <td>${order.qty}</td>
                <td>${order.price}</td>
                <td>${order.date}</td>
                <td>${order.total}</td>
            </tr>
        `;
        tbody.append(row);
    });
};

$(document).ready(function() {
   
    loadOrderTable();
});
