const emitionDate = document.getElementById("emition-date");
const deliveryDate = document.getElementById("delivery-date");
const streetName = document.getElementById("delivery-street");
const streetNumber = document.getElementById("delivery-street-number");
const productList = document.getElementById("product-list");
const productSupliers = document.getElementById("supliers-list");
const productPrice = document.getElementById("product-price");
const productQuantity = document.getElementById("product-quantity");
const currentOrder = document.getElementById("current-order");
const purchaseTotal = document.getElementById("purchase-total");
const buttonSubmit = document.getElementById("confirm-purchase");
const buttonAddProduct = document.getElementById("add-product");

let supliersArray;
let productsArray;
let purchaseArray = [];


function loadPage() {
    supliersArray = JSON.parse(localStorage.getItem("supliers")) || [];
    productsArray = JSON.parse(localStorage.getItem("products")) || [];
    loadSelectSupliers();
    loadSelectProduct();

    loadButtonAddProduct();
    loadButtonSubmit();

}


function loadSelectSupliers() {
    productSupliers.innerHTML = "";
    for (const suplierDTO of supliersArray) {
        const option = document.createElement("option");
        option.innerText = suplierDTO.sBrand;
        option.value = suplierDTO.sId;
        productSupliers.appendChild(option);
    }
    const otherOption = document.createElement("option");
    otherOption.innerText = "Otro";
    otherOption.value = supliersArray.length;
    productSupliers.appendChild(otherOption)
}


function loadSelectProduct() {
    productList.innerHTML = "";
    const otherOption = document.createElement("option");
    otherOption.className = "product-option";
    otherOption.innerText = "Otro";
    otherOption.value = -1;
    productList.appendChild(otherOption);

    for (const productDTO of productsArray) {
        const option = document.createElement("option");
        option.className = "product-option";
        option.innerText = productDTO.pName;
        option.value = productDTO.pCode;
        productList.appendChild(option);
    }
    productPrice.value = 0;
    getProductPrice();
}


function getProductPrice() {
    let prodCode;
    productList.addEventListener("change", (e) => {
        prodCode = e.target.value;
        if (prodCode != -1) {
            const prodDTO = productsArray.find(obj => obj.pCode == prodCode);
            productPrice.value = prodDTO.pPrice;
        } 
    })

}


function loadButtonAddProduct() {
    buttonAddProduct.addEventListener("click", (e) => {
        e.preventDefault();
        purchaseArray.push(addProduct());
        completeCurrentOrder();
    })
}


const addProduct = () => {
    let suplierId = productSupliers.value;
    let productId = productList.value;
    const currProduct = {
        productSuplier: productSupliers.options[suplierId].text,
        productName: productList.options[productId].text,
        productPrice: productPrice.value,
        productQuantity: productQuantity.value
    }
    return currProduct;
};


function completeCurrentOrder() {
    currentOrder.innerHTML = "";
    let total = 0;
    for (prod of purchaseArray) {
        const divProd = document.createElement("div");
        divProd.className = "row";
        divProd.innerHTML = `
        <div class="col"><p>${prod.productName} (${prod.productQuantity})</p></div>
        <div class="col"><hr></div>
        <div class="col text-end"><p>$${prod.productPrice}</p></div>
        `;
        currentOrder.appendChild(divProd);
        total += parseInt(prod.productPrice) * parseInt(prod.productQuantity); 
    }
    purchaseTotal.innerHTML = `<p>$${total}</p>`;
}


const loadButtonSubmit = () => {
    buttonSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        window.localStorage.setItem("purchase", JSON.stringify(generatePurchase()));
    })
};


const generatePurchase = () => {
    let purchaseDTO = {
        emitionDate: emitionDate.value,
        deliveryDate: deliveryDate.value,
        streetName: streetName.value,
        streetNumber: streetNumber.value,
        productsPurchased: purchaseArray,
    }
    return purchaseDTO;
}


loadPage();