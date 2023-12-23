export interface SuplierInterface {
    id?: number,
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
    addressNumber: number | undefined,
    state: string,
    country: string
}

export type IVAOptions = 
    "IVA Responsable Inscripto" |
    "IVA Sujeto Exento" |
    "Responsable Monotributo" |
    "Proveedor del Exterior" |
    "Otro";

interface Contact {
    name: string,
    surname: string,
    phone: number | undefined,
    mail: string,
    rol: string
}