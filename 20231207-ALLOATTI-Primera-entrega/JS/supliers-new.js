const suplierBrand = document.getElementById("suplier-brand");
const suplierCategory = document.getElementById("suplier-category");
const suplierWeb = document.getElementById("suplier-web");
const suplierAddress = document.getElementById("suplier-address");
const suplierAddressNumber = document.getElementById("suplier-address-number");
const suplierRegion = document.getElementById("suplier-region");
const suplierState = document.getElementById("suplier-state");
const suplierCountry = document.getElementById("suplier-country");
const suplierCUIT = document.getElementById("suplier-cuit");
const suplierIVA = document.getElementById("suplier-iva");
const suplierName = document.getElementById("suplier-name");
const suplierSurname = document.getElementById("suplier-surname");
const suplierPhone = document.getElementById("suplier-phone");
const suplierMail = document.getElementById("suplier-mail");
const suplierRol = document.getElementById("suplier-rol");
const submitButton = document.getElementById("confirm-create")
let supliersArray;


function loadPage() {

    supliersArray = JSON.parse(localStorage.getItem("supliers")) || [];

    loadButton();

}


function createSuplier() {
    let ivaSelected = suplierIVA.value;
    let len = supliersArray.length;
    const currentSuplier = {
        sId: len,
        sBrand: suplierBrand.value,
        sCategory: suplierCategory.value,
        sWeb: suplierWeb.value,
        sFullAddress: {
            address: suplierAddress.value,
            addressNumber: suplierAddressNumber.value,
            region: suplierRegion.value,
            state: suplierState.value,
            suplierCountry: suplierCountry.value,
        },
        sCUIT: suplierCUIT.value.replace(/\D/g, ""),
        sIVA: suplierIVA.options[ivaSelected].text,
        sContact: {
            contactName: suplierName.value,
            contactSurname: suplierSurname.value,
            contactPhone: suplierPhone.value.replace(/\D/g, ""),
            contactMail: suplierMail.value,
            contactRol: suplierRol.valuel
        }
    }
    return currentSuplier;
}

const loadButton = () => {
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        supliersArray.push(createSuplier());
        window.localStorage.setItem("supliers", JSON.stringify(supliersArray));
        alert("Proveedor cargado con éxito.")
    })
};


loadPage();