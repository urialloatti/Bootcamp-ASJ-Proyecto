const emitionDate = document.getElementById("emition-date");
const deliveryDate = document.getElementById("delivery-date");
const streetName = document.getElementById("delivery-street");
const streetNumber = document.getElementById("delivery-street-number");
const productQuantity = document.getElementById("product-quantity");
const productSupliers = document.getElementById("supliers-list");
const productList = document.getElementById("product-list");
const buttonSubmit = document.getElementById("confirm-purchase");


let supliersArray;
let productsArray;


function loadPage() {
    supliersArray = JSON.parse(localStorage.getItem("supliers")) || [];
    productsArray = JSON.parse(localStorage.getItem("products")) || [];
    loadSelectSupliers();
    loadSelectProduct();

    // loadButtonProduct();
    loadButtonSubmit();

}


function loadSelectSupliers() {
    productSupliers.innerHTML = "";
    for (let suplierDTO of supliersArray) {
        let option = document.createElement("option");
        option.innerText = suplierDTO.sBrand;
        option.value = suplierDTO.sId;
        productSupliers.appendChild(option);
    }
    let otherOption = document.createElement("option");
    otherOption.innerText = "Otro";
    otherOption.value = supliersArray.length;
    productSupliers.appendChild(otherOption)
}


function loadSelectProduct() {
    productList.innerHTML = "";
    for (let productDTO of productsArray) {
        let option = document.createElement("option");
        option.innerText = productDTO.pName;
        option.value = productDTO.pCode;
        productList.appendChild(option);
    }
    let otherOption = document.createElement("option");
    otherOption.innerText = "Otro";
    otherOption.value = productsArray.length;
    productList.appendChild(otherOption)
}


const generatePurchase = () => {
    let suplierId = productSupliers.value;
    let productId = productList.value;
    let purchaseDTO = {
        emitionDate: emitionDate.value,
        deliveryDate: deliveryDate.value,
        streetName: streetName.value,
        streetNumber: streetNumber.value,
        productSupliers: productSupliers.options[suplierId].text,
        productList: productList.options[productId].text,
        productQuantity: productQuantity.value
    }
    return purchaseDTO;
}


const loadButtonSubmit = () => {
    buttonSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        window.localStorage.setItem("purchase", JSON.stringify(generatePurchase()));
    })
};


loadPage();