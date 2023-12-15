export interface SuplierInterface {
    id: number,
    brand: string,
    category: string,
    web: string,
    fullAddress: FullAddress,
    cuit: string,
    iva: IVAOptions,
    contact: Contact

}

interface FullAddress {
    address: string,
    addressNumber: string,
    region: string,
    state: string,
    country: string
}

export enum IVAOptions {
    "IVA Responsable Inscripto",
    "IVA Sujeto Exento",
    "Responsable Monotributo",
    "Proveedor del Exterior",
    "Otro"
}

interface Contact {
    name: string,
    surname: string,
    phone: string,
    mail: string,
    rol: string
}