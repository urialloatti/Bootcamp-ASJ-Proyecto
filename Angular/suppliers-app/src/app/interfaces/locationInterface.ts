import { SmallCrudInterface } from './smallCrudsInterfaces';

export interface LocationResponseDTO {
  countryId: number;
  countryName: string;
  provinces: SmallCrudInterface[];
}
