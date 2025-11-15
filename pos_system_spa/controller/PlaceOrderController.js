import { add_cart, get_place_order } from "../model/PlaceOrderModel.js";
import { customer_db, item_db, place_order_db } from "../db/DB.js";
import PlaceOrderDTO from "../dto/PlaceOrderDTO.js";

let place_array = get_place_order();

// AUTO ID GENERATE
function generatePlaceOrderId() {
    let idNum = place_array.length + 1;
    return "O" + idNum.toString().padStart(3, "0");
}

// SET ID INTO INPUT
function setPlaceOrderId() {
    $("#orderId").val(generatePlaceOrderId());
}

//Item Selector  
const loadItemSelector = () => {
    const itemSelect = document.getElementById("item");
    itemSelect.innerHTML = `<option value="">Select Item</option>`; // default option

    item_db.forEach(item => {
        let opt = document.createElement("option");
        opt.value = item.id;
        opt.textContent = item.name;
        opt.setAttribute("data-price", item.price);
        itemSelect.appendChild(opt);
    });
};

//Customer Selector
const loadCustomerSelector = () => {
    const customerSelect = document.getElementById("Customer");
    customerSelect.innerHTML = `<option value="">Select Customet</option>`; // First default option

    customer_db.forEach(customer => {
        let opt = document.createElement("option");
        opt.value = customer.id;
        opt.textContent = customer.name;

        customerSelect.appendChild(opt);
    });
};

$("#item").on("change", function () {
    let price = $(this).find(":selected").data("price"); // get data-price
    $("#price").val(price || 0);  // set input value
    $("#grand_total").text(price || 0);
});

// PAGE LOAD
$(document).ready(function () {

    setPlaceOrderId();
    loadItemSelector();
    loadCustomerSelector();

    $("#add_to_cart").on("click", function () {

        const id = $('#orderId').val();
        const customerText = $("#Customer option:selected").text();
        const itemText = $("#item option:selected").text();
        const quantity = Number($("#quantity").val());
        const price = Number($("#price").val());
        const date = $('#orderDate').val();
        const total = quantity * price;

        add_cart(id, customerText, itemText, quantity, price, date, total);
        load_cart_tbl();
        setPlaceOrderId();

        $("#item").val('');
        $("#Customer").val('');
        $("#orderDate").val('');
        $("#quantity").val(1);
        $("#price").val(0);
    });

});

//============ load table cart==============
const load_cart_tbl = () => {

    $('#cart_body').empty();

    place_array = get_place_order();

    place_array.map((obj) => {

        let row = `
        <tr>
            <td>${obj.id}</td>
            <td>${obj.customer}</td>
            <td>${obj.item}</td>
            <td>${obj.qty}</td>
            <td>${obj.price}</td>
            <td>${obj.date}</td>
            <td>${obj.total}</td>
            <td><button class="remove_btn"><i class="fa fa-trash"></i> Remove</button></td>

        </tr>
        `;

        $("#cart_body").append(row);

    });

    updateGrandTotal();

};

const updateGrandTotal = () => {
    let grandTotal = 0;
    place_array.forEach(obj => grandTotal += Number(obj.total));
    $('#grand_total').text(grandTotal);

    updateBalance(); // update balance automatically
}

// Remove row from table
$("#cart_body").on("click", ".remove_btn", function () {
    const rowIndex = $(this).closest("tr").index();
    place_array.splice(rowIndex, 1);
    $(this).closest("tr").remove();

    setPlaceOrderId();

    // Recalculate grand total
    let total = 0;
    place_array.forEach(obj => {
        total += Number(obj.total);
    });

    $('#grand_total').text(total);     
    $('#payment').val('');
    $('#balance').val(total);
});



$("#payment").on("input", function () {
    updateBalance();
});

const updateBalance = () => {
    let grandTotal = Number($('#grand_total').text());
    let payment = Number($('#payment').val());
    let balance = payment - grandTotal;
    $('#balance').val(balance >= 0 ? balance : 0); 
}

// =========== Place Order Button ===========
$("#place_order").on("click", function() {
    if(place_array.length === 0){
        alert("Cart is empty!");
        return;
    }

    const orderId = $("#orderId").val();
    const customer = $("#Customer option:selected").text();
    const item = $("#item option:selected").text();
    const qty = Number($("#quantity").val());
    const price = Number($("#price").val());
    const date = $("#orderDate").val();
    const total = qty * price;

    // Add to "database"
    const newOrder = new PlaceOrderDTO(orderId, customer, item, qty, price, date, total);
    place_order_db.push(newOrder);

    // Clear cart array
    place_array.length = 0;

    // Reload cart table
    load_cart_tbl();


    $("#grand_total").text('0');
    $("#payment").val('');
    $("#balance").val('');

    
    $("#orderId").val('');
    $("#Customer").val('');
    $("#item").val('');
    $("#quantity").val(1);
    $("#price").val(0);
    $("#orderDate").val('');

    setPlaceOrderId();

    alert("Order placed successfully!");
});







