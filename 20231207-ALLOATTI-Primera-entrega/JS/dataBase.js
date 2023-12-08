let supliersArray = [
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

let productsArray = [
    {
        pSuplier: "Monmouth Real Estate Investment Corporation",
        pCode: 1,
        pCategory: "Botánicos",
        pName: "Albahaca",
        pDescription: "Lorem ipsum dolor sit amet.",
        pPrice: 125
    }
    {
        pSuplier: "Arena Pharmaceuticals, Inc.",
        pCode: 1,
        pCategory: "Medicamentos",
        pName: "Paracetamol",
        pDescription: "Lorem ipsum dolor sit amet.",
        pPrice: 350
    }
    {
        pSuplier: "BB&T Corporation",
        pCode: 1,
        pCategory: "Botánicos",
        pName: "Girasol",
        pDescription: "Lorem ipsum dolor sit amet.",
        pPrice: 125
    }
    {
        pSuplier: "Arena Pharmaceuticals, Inc.",
        pCode: 1,
        pCategory: "Medicamentos",
        pName: "Betametasona",
        pDescription: "Lorem ipsum dolor sit amet.",
        pPrice: 830
    }


];

function loadStorage() {
    window.localStorage.setItem("supliers", JSON.stringify(supliersArray));
}

loadStorage();