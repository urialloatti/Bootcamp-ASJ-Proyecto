export interface ProductResponseDTO {
  id: number;
  code: string;
  supplier: string;
  category: string;
  name: string;
  description: string;
  price: number;
  picture: string;
  available: boolean;
}

export interface ProductRequestDTO {
  supplierId: number;
  categoryId: number;
  name: String;
  description: String;
  price: number | undefined;
  picture: String;
}
