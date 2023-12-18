import { SuplierInterface } from '../interfaces/suplierInterface';

export const suplierMockData: SuplierInterface[] = [
    {
        id: 0,
        brand: "Monmouth Real Estate Investment Corporation",
        category: "Medical/Dental Instruments",
        web: "php.net",
        fullAddress: {
            address: "Grasskamp",
            addressNumber: 80668,
            state: "Texas",
            country: "United States",
        },
        cuit: Number("01-02407518-7".replace(/\D/g, "")),
        iva: "IVA Responsable Inscripto",
        contact: {
            name: "Sabina",
            surname: "Besse",
            phone: Number("156-468-8305".replace(/\D/g, "")),
            mail: "sbesse0@oakley.com",
            rol: "Research and Development"
        }
    },
    {
        id:  1,
        brand:  "BB&T Corporation",
        category:  "Packaged Foods",
        web:  "amazonaws.com",
        fullAddress: {
            address:  "Clarendon",
            addressNumber:  92,
            state:  "New Brunswick",
            country:  "Canada",
        },
        cuit:  Number("47-72368854-2".replace(/\D/g, "")),
        iva:  "IVA Responsable Inscripto",
        contact: {
            name:  "Walt",
            surname:  "Authers",
            phone:  Number("416-358-9636".replace(/\D/g, "")),
            mail:  "wauthers7@booking.com",
            rol:  "Sales"
        }
    }
]