export interface ProductInterface {
  id?: number;
  code?: string;
  suplierId: number;
  suplier?: string;
  category: category;
  name: string;
  description: string;
  price: number;
  picture?: string;
  isAvailable?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

type category =
  | 'Celulares'
  | 'Laptops'
  | 'Pequeños'
  | 'Periféricos'
  | 'Audio'
  | 'Otro';
