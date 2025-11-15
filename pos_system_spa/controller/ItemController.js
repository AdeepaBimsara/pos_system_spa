import {
    get_item,
    add_item,
    get_item_detail,
    update_item,
    delete_item
} from "../model/ItemModel.js";

let item_index;

// ==================== Item Array ===================
let item_array = get_item();

// ========== Auto Generate ID ==========
function generatedItemId() {
    let idNum = item_array.length + 1;
    return "I" + idNum.toString().padStart(3, "0");
}

// ========== Set ID to Input ==========
function setItemId() {
    $("#itemId").val(generatedItemId());
}

// ==================== Load Item Table =======================
const loads_item_tbl = () => {
    $("#item_tbl_body").empty();

    item_array = get_item();
    item_array.map((obj) => {
        let tbl_row = `
            <tr>
                <td>${obj.id}</td>
                <td>${obj.name}</td>
                <td>${obj.price}</td>
                <td>${obj.quantity}</td>
            </tr>`;
        $("#item_tbl_body").append(tbl_row);
    });
};

// ==================== Add Item =======================
$(document).ready(function () {

    setItemId();
    loads_item_tbl();

    $("#item_save_btn").on("click", function () {
        let id = $("#itemId").val();
        let name = $("#itemName").val();
        let price = $("#itemPrice").val();
        let qty = $("#itemQty").val();

        add_item(id, name, price, qty);

        loads_item_tbl();
        setItemId();

        // Add item to selector immediately
        const itemSelect = document.getElementById("item");
        let newOpt = document.createElement("option");
        newOpt.value = id;
        newOpt.textContent = name;
        newOpt.setAttribute("data-price", price);
        itemSelect.appendChild(newOpt);

        // clear inputs
        $("#itemName").val('');
        $("#itemPrice").val('');
        $("#itemQty").val('');
    });
});

// ==================== Select Item =======================
$("#item_tbl_body").on('click', 'tr', function () {
    item_index = $(this).index();

    let item_obj = get_item_detail(item_index);

    $("#itemId").val(item_obj.id);
    $("#itemName").val(item_obj.name);
    $("#itemPrice").val(item_obj.price);
    $("#itemQty").val(item_obj.quantity);
});

// ==================== Update Item =======================
$(document).ready(function () {

    $("#item_update_btn").on("click", function () {
        let id = $("#itemId").val();
        let name = $("#itemName").val();
        let price = $("#itemPrice").val();
        let qty = $("#itemQty").val();

        update_item(id, name, price, qty);

        loads_item_tbl();
        setItemId();

        // clear inputs
        $("#itemName").val('');
        $("#itemPrice").val('');
        $("#itemQty").val('');
    });
});

// ==================== Delete Item =======================
$("#item_delete_btn").on('click', () => {

    Swal.fire({
        title: "Are you sure?",
        text: "This item will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {

            delete_item(item_index);
            loads_item_tbl();
            $("#item_reset_btn").click();

            Swal.fire({
                title: "Deleted!",
                text: "Item has been deleted successfully.",
                icon: "success"
            });

            // clear input fields
            $("#itemName").val('');
            $("#itemPrice").val('');
            $("#itemQty").val('');
        }
    });
});

// ==================== Reset Item =======================
$("#item_reset_btn").on('click', function () {
    $("#itemId").val('');
    $("#itemName").val('');
    $("#itemPrice").val('');
    $("#itemQty").val('');

    loads_item_tbl();
    setItemId();
});
