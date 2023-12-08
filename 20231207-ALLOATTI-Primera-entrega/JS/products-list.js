const productsTableData = document.getElementById("products-table-content");
const productsTable = document.getElementById("products-table");
const productsNotFound = document.getElementById("no-products-message");


let productsArray;



function loadPage() {
    productsNotFound.style.display = "none";
    productsTable.style.display = "none";
    productsArray = JSON.parse(localStorage.getItem("products")) || [];

    if (productsArray.length > 0) {
        productsTable.style.display = "block";
    } else {productsNotFound.style.display = "block";}

    fillTable(productsArray);

    let dellButtons = document.getElementsByClassName("btn-del-product")

    loadDellBtn(dellButtons);

}


function addProduct(productDTO) {
    let tableRow = document.createElement("tr");

    tableRow.innerHTML = 
    `
    <th scope="row" class="pt-3" id="product-${productDTO.pCode}">${productDTO.pCode}</th>
    <td class="h3" id="product-name">${productDTO.pSuplier}</td>
    <td class="pt-3" id="product-category">${productDTO.pCategory}</td>
    <td class="pt-3" id="product-category">${productDTO.pName}</td>
    <td class="pt-3" id="product-category">$${productDTO.pPrice}</td>
    <td class="d-flex justify-content-end py-2">
        <a href="" class="mx-1">
                <button class="btn btn-secondary pb-2" id="go-to-product-${productDTO.pCode}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-up-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5"/>
                        <path fill-rule="evenodd" d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0z"/>
                </svg>
                </button>
        </a>
        <a href="" class="mx-1">
                <button class="btn btn-secondary pb-2" id="update-product-${productDTO.pCode}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
                </button>
        </a>
        <a href="" class="mx-1">
                <button class="btn btn-secondary pb-2 btn-del-product" id="delete-product-${productDTO.pCode}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
                </button>
        </a>
    </td>
    `;

    productsTableData.append(tableRow);
}


function fillTable(products) {
    productsTableData.innerHTML = "";
    for (let productDTO of products) {
        addProduct(productDTO);
    }
}

function loadDellBtn(buttons) {
    for (btn of buttons) {
        let btnId = btn.id.slice(15);
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            productsArray = productsArray.filter((productDTO) => productDTO.pCode != btnId)
            window.localStorage.setItem("products", JSON.stringify(productsArray));
            loadPage();
        })
    }
}


loadPage();