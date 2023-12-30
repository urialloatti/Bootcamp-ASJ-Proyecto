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
const submitButton = document.getElementById("confirm-update")
let supliersArray;
let currentSuplier;


function loadPage() {
    currentSuplier = JSON.parse(localStorage.getItem("toUpdate"));
    supliersArray = JSON.parse(localStorage.getItem("supliers")) || [];

    suplierBrand.value = currentSuplier.sBrand;
    suplierCategory.value = currentSuplier.sCategory;
    suplierWeb.value = currentSuplier.sWeb;
    suplierAddress.value = currentSuplier.sFullAddress.address;
    suplierAddressNumber.value = currentSuplier.sFullAddress.addressNumber;
    suplierRegion.value = currentSuplier.sFullAddress.region;
    suplierState.value = currentSuplier.sFullAddress.state;
    suplierCountry.value = currentSuplier.sFullAddress.suplierCountry;
    suplierCUIT.value = currentSuplier.sCUIT;
    suplierCUIT.setAttribute("disabled", "disabled");
    // suplierIVA.value = currentSuplier.
    suplierName.value = currentSuplier.sContact.contactName;
    suplierSurname.value = currentSuplier.sContact.contactSurname;
    suplierPhone.value = currentSuplier.sContact.contactPhone;
    suplierMail.value = currentSuplier.sContact.contactMail;
    suplierRol.value = currentSuplier.sContact.contactRol;

    loadSubmitButton(currentSuplier);

}


function createSuplier(suplierToUpdate) {
    let ivaSelected = suplierIVA.value;
    const currentSuplier = {
        sId: suplierToUpdate.sId,
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


function loadSubmitButton(currentSuplier) {
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        currentSuplier = createSuplier(currentSuplier);
        supliersArray = supliersArray.filter((suplier) => {suplier.sId != currentSuplier.sId})
        currentSuplier = createSuplier(supliersArray)
        supliersArray.push(currentSuplier);
        window.localStorage.setItem("supliers", JSON.stringify(supliersArray));
        // alert("Proveedor actualizado con éxito.");
    })
}



loadPage();