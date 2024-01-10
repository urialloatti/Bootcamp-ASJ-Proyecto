export interface SuplierInterface {
  id?: number;
  code?: string;
  brand: string;
  sector: string;
  web: string;
  phone: PhoneNumber;
  fullAddress: FullAddress;
  cuit: string;
  fiscal_condition: IVAOptions;
  contact: Contact;
  logo?: string;
  isAvailable?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface FullAddress {
  address: string;
  addressNumber: number | undefined;
  city: string;
  country: string;
  province: string;
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
