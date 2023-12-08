const productSupliers = document.getElementById("product-suplier")
const productCategory = document.getElementById("product-category");
const productName = document.getElementById("product-name");
const productDescription = document.getElementById("product-description");
const productPrice = document.getElementById("product-price");
const confirmButton = document.getElementById("confirm-create-product");

let supliersArray;
let productsArray;

function loadPage() {
    supliersArray = JSON.parse(localStorage.getItem("supliers")) || [];
    productsArray = JSON.parse(localStorage.getItem("products")) || [];
    loadSelectSupliers();

    loadButtonProduct();

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


function createProduct() {
    let suplierId = productSupliers.value;
    let code = productsArray.length;
    let currentProduct = {
        pCode: code,
        pSuplier: productSupliers.options[suplierId].text,
        pCategory: productCategory.value,
        pName: productName.value,
        pDescription: productDescription.value,
        pPrice: productPrice.value
    };
    // console.log(JSON.stringify(currentProduct))
    return currentProduct;
}


const loadButtonProduct = () => {
    confirmButton.addEventListener("click", (e) => {
        e.preventDefault();
        productsArray.push(createProduct());
        window.localStorage.setItem("products", JSON.stringify(productsArray));
        alert("Producto cargado con éxito.")
    })
};


loadPage();
