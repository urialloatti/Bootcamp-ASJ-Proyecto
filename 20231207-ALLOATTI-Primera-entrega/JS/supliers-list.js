const supliersTableData = document.getElementById("supliers-table-content");
const supliersTable = document.getElementById("supliers-table");
const supliersNotFound = document.getElementById("no-supliers-message");


let supliersArray;
function loadDatabase() {
    let supliersArrayMock = [
        {
            sId: 1,
            sBrand: "Monmouth Real Estate Investment Corporation",
            sCategory: "Medical/Dental Instruments",
            sWeb: "php.net",
            sFullAddress: {
                address: "Grasskamp",
                addressNumber: "80668",
                region: "Katy",
                state: "Texas",
                suplierCountry: "United States",
            },
            sCUIT: "01-02407518-7".replace(/\D/g, ""),
            sIVA: "1",
            sContact: {
                contactName: "Sabina",
                contactSurname: "Besse",
                contactPhone: "156-468-8305".replace(/\D/g, ""),
                contactMail: "sbesse0@oakley.com",
                contactRol: "Research and Development"
            }
        },
        {
            sId: 2,
            sBrand: "BB&T Corporation",
            sCategory: "Packaged Foods",
            sWeb: "amazonaws.com",
            sFullAddress: {
                address: "Clarendon",
                addressNumber: "92",
                region: "Shediac",
                state: "New Brunswick",
                suplierCountry: "Canada",
            },
            sCUIT: "47-72368854-2".replace(/\D/g, ""),
            sIVA: "4",
            sContact: {
                contactName: "Walt",
                contactSurname: "Authers",
                contactPhone: "416-358-9636".replace(/\D/g, ""),
                contactMail: "wauthers7@booking.com",
                contactRol: "Sales"
            }
        },
        {
            sId: 3,
            sBrand: "Arena Pharmaceuticals, Inc.",
            sCategory: "Major Pharmaceuticals",
            sWeb: "altervista.org",
            sFullAddress: {
                address: "Northview",
                addressNumber: "7653",
                region: "Skärholmen",
                state: "Stockholm",
                suplierCountry: "Sweden",
            },
            sCUIT: "43-96484751-5".replace(/\D/g, ""),
            sIVA: "2",
            sContact: {
                contactName: "Aldric",
                contactSurname: "Meany",
                contactPhone: "414-709-9204".replace(/\D/g, ""),
                contactMail: "ameany6@huffingtonpost.com",
                contactRol: "Business Development"
            }
        },
    ];

    let productsArrayMock = [
        {
            pSuplier: "Monmouth Real Estate Investment Corporation",
            pCode: 1,
            pCategory: "Botánicos",
            pName: "Albahaca",
            pDescription: "Lorem ipsum dolor sit amet.",
            pPrice: 125
        },
        {
            pSuplier: "Arena Pharmaceuticals, Inc.",
            pCode: 2,
            pCategory: "Medicamentos",
            pName: "Paracetamol",
            pDescription: "Lorem ipsum dolor sit amet.",
            pPrice: 350
        },
        {
            pSuplier: "BB&T Corporation",
            pCode: 3,
            pCategory: "Botánicos",
            pName: "Girasol",
            pDescription: "Lorem ipsum dolor sit amet.",
            pPrice: 125
        },
        {
            pSuplier: "Arena Pharmaceuticals, Inc.",
            pCode: 4,
            pCategory: "Medicamentos",
            pName: "Betametasona",
            pDescription: "Lorem ipsum dolor sit amet.",
            pPrice: 830
        }
    ]

    window.localStorage.setItem("supliers", JSON.stringify(supliersArrayMock));
    window.localStorage.setItem("products", JSON.stringify(productsArrayMock));
}


function loadPage() {
    supliersNotFound.style.display = "none";
    supliersTable.style.display = "none";
    supliersArray = JSON.parse(localStorage.getItem("supliers")) || [];

    if (supliersArray.length > 0) {
        supliersTable.style.display = "block";
    } else {supliersNotFound.style.display = "block";}

    fillTable(supliersArray);

    let dellButtons = document.getElementsByClassName("btn-del-suplier");
    let updateButtons = document.getElementsByClassName("btn-update-suplier");

    loadDellBtn(dellButtons);
    loadUpdateButtons(updateButtons);


}


function addSuplier(suplierDTO) {
    let tableRow = document.createElement("tr");

    tableRow.innerHTML = 
    `
    <th scope="row" class="pt-3" id="suplier-${suplierDTO.sId}">${suplierDTO.sId}</th>
    <td class="h3" id="suplier-name">${suplierDTO.sBrand}</td>
    <td class="pt-3" id="suplier-category">${suplierDTO.sBrand}</td>
    <td class="d-flex justify-content-end py-2">
    <span class="mx-1">
        <button class="btn btn-secondary pb-2" id="go-to-suplier-${suplierDTO.sId}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-up-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5"/>
            <path fill-rule="evenodd" d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0z"/>
        </svg>
        </button>
    </span>
    <span class="mx-1">
        <button class="btn btn-secondary pb-2 btn-update-suplier" id="update-suplier-${suplierDTO.sId}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
        </svg>
        </button>
    </span>
    <span class="mx-1">
        <button class="btn btn-secondary pb-2 btn-del-suplier" id="delete-suplier-${suplierDTO.sId}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        </svg>
        </button>
    </span>
    </td>
    `;
    // const th = document.createElement("th");
    // th.scope = "row";
    // th.className = "pt-3";
    // th.id = `suplier-${suplierDTO.sId}`;
    // th.innerText = suplierDTO.sId;
    // const tdName = document.createElement("td");
    // tdName.className = "h3";
    // tdName.id = "suplier-name";
    // tdName.innerText = suplierDTO.sBrand;
    // const tdCategory = document.createElement("td");
    // tdCategory.className = "pt-3";
    // tdCategory.id = "suplier-category";
    // tdCategory.innerText = suplierDTO.sCategory;
    // const tdButtons = document.createElement("td");
    // tdButtons.className = "d-flex justify-content-end py-2";
    // const spanInfo = document.createElement("span");


    supliersTableData.append(tableRow);
}


function fillTable(supliers) {
    supliersTableData.innerHTML = "";
    for (let suplierDTO of supliers) {
        addSuplier(suplierDTO);
    }
}

function loadDellBtn(buttons) {
    for (btn of buttons) {
        let btnId = btn.id.slice(15);
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            supliersArray = supliersArray.filter((suplierDTO) => suplierDTO.sId != btnId);
            window.localStorage.setItem("supliers", JSON.stringify(supliersArray));
            loadPage();
            // location.href
        })
    }
}

function loadUpdateButtons(buttons) {
    for (btn of buttons) {
        let btnId = btn.id.slice(15);
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            currentSuplier = supliersArray.filter((suplierDTO) => suplierDTO.sId == btnId);
            window.localStorage.setItem("toUpdate", JSON.stringify(currentSuplier[0]));
            location.href = "supliers-update.html";
        })
    }
}


loadPage();