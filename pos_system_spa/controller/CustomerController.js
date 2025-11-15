import { get_customer, add_customer, get_customer_detail, update_customer, delete_customer } from "../model/CustomerModel.js";

let customer_index;

// ==================== Customer Array ===================
let customer_array = get_customer();

// ========== Auto Generate ID ==========
function generatedId() {
    let idNum = customer_array.length + 1;
    return "C" + idNum.toString().padStart(3, "0");
}

// ========== Set ID to Input ==========
function setCustomerId() {
    $("#cusId").val(generatedId());
}

// ==================== Load Customer Table =======================
const loads_customer_tbl = () => {
    $("#customer_tbl_body").empty();

    customer_array = get_customer();
    customer_array.map((obj) => {
        let tbl_row = `<tr>
                <td>${obj.id}</td>
                <td>${obj.name}</td>
                <td>${obj.address}</td>
                <td>${obj.phone}</td>
            </tr>`;
        $("#customer_tbl_body").append(tbl_row);
    });
}

// ==================== Add Customer =======================
$(document).ready(function () {

    setCustomerId();
    loads_customer_tbl();

    $("#customer_save_btn").on("click", function () {

        let id = $("#cusId").val();
        let name = $("#cusName").val();
        let address = $("#cusAddress").val();
        let phone = $("#cusPhone").val();

        add_customer(id, name, address, phone);

        loads_customer_tbl();
        setCustomerId();

        const customerSelect = document.getElementById("Customer");
        let newOpt = document.createElement("option");
        newOpt.value = id;
        newOpt.textContent = name;
        customerSelect.appendChild(newOpt);


        $("#cusName").val('');
        $("#cusAddress").val('');
        $("#cusPhone").val('');
    });
});

// ==================== Select Customr =======================

$("#customer_tbl_body").on('click', 'tr', function () {
    console.log($(this).index())
    let tbl_row = $(this).index();

    let customer_obj = get_customer_detail(tbl_row);

    $("#cusId").val(customer_obj.id);
    $("#cusName").val(customer_obj.name);
    $("#cusAddress").val(customer_obj.address);
    $("#cusPhone").val(customer_obj.phone);
});

// ==================== Update Customer ===================
$(document).ready(function () {

    $("#customer_update_btn").on("click", function () {

        let id = $('#cusId').val();
        let name = $("#cusName").val();
        let address = $("#cusAddress").val();
        let phone = $("#cusPhone").val();

        update_customer(id, name, address, phone);

        loads_customer_tbl();
        setCustomerId();

        // clear input fields
        $("#cusName").val('');
        $("#cusAddress").val('');
        $("#cusPhone").val('');

    });
});

// ===================Reset_customer===================
$("#customer_reset_btn").on('click', function () {

    $("#cusId").val('');
    $("#cusName").val('');
    $("#cusAddress").val('');
    $("#cusPhone").val('');
    loads_customer_tbl();
    setCustomerId();
})

// ==================== Remove Student =======================

$("#customer_delete_btn").on('click', () => {

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {

            delete_customer(tbl_row);
            loads_customer_tbl();
            $("#student_reset_btn").click();

            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });

            // clear input fields
            $("#cusName").val('');
            $("#cusAddress").val('');
            $("#cusPhone").val('');
        }
    });
});

let tbl_row;



