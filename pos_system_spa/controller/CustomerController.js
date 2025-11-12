import { get_customer } from "../model/CustomerModel";

// ==================== Load Customer Tbl =======================
const loads_customer_tbl = () => {
    $("#customer_tbl_body").empty();

    let customer_list = get_customer();

    customer_list.map((obj, index) => {
        let tbl_row =  `<tr>
                <td>${obj.id}</td>
                <td>${obj.name}</td>
                <td>${obj.address}</td>
                <td>${obj.phone}</td>
            </tr>`;
        $("#customer_tbl_body").append(tbl_row);
    });
}