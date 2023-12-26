export interface SuplierInterface {
  id?: number;
  code?: string;
  brand: string;
  category: string;
  web: string;
  phone: PhoneNumber;
  fullAddress: FullAddress;
  cuit: string;
  iva: IVAOptions;
  contact: Contact;
}

interface FullAddress {
  address: string;
  addressNumber: number | undefined;
  state: string;
  country: string;
  district: string;
  zipCode: string;
}

export type IVAOptions =
  | 'IVA Responsable Inscripto'
  | 'IVA Sujeto Exento'
  | 'Responsable Monotributo'
  | 'Proveedor del Exterior'
  | 'Otro';

export interface Contact {
  name: string;
  surname: string;
  phone: PhoneNumber;
  mail: string;
  rol: string;
}

export interface PhoneNumber {
  country: number;
  number: number | undefined;
}
