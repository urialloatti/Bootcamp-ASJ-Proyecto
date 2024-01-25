export interface supplierInterface {
  id?: number;
  code?: string;
  brand: string;
  sector: string;
  web: string;
  phone: PhoneNumber;
  fullAddress: FullAddress;
  cuit: string;
  fiscalCondition: IVAOptions;
  contact: Contact;
  logo?: string;
  available?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SupplierResponseDTO {
  id: number;
  code: string;
  brand: string;
  sector: string;
  web: string;
  phone: PhoneNumber;
  fullAddress: AddressResponseDTO;
  cuit: string;
  fiscalCondition: string;
  contact: ContactResponseDTO;
  logo: string;
  available: boolean;
}

export interface SupplierCreateDTO {
  brand: string;
  sectorId: number;
  web: string;
  phone: PhoneNumber;
  fullAddress: AddressCreateDTO;
  cuit: string;
  fiscalConditionId: number;
  contact: Contact;
  logo?: string;
}

interface FullAddress {
  address: string;
  addressNumber: number | undefined;
  city: string;
  country: string;
  province: string;
  zipCode: string;
}

interface AddressResponseDTO {
  address: string;
  addressNumber: number;
  city: string;
  country: string;
  province: string;
  zipCode: string;
}

export interface ContactResponseDTO {
  name: string;
  surname: string;
  phone: PhoneNumber;
  mail: string;
  rol: string;
}

interface AddressCreateDTO {
  address: string;
  addressNumber: number | undefined;
  city: string;
  provinceId: number;
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
  number: string | undefined;
}
