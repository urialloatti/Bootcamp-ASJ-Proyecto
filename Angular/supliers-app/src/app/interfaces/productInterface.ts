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
}

type category =
  | 'Celulares'
  | 'Laptops'
  | 'Pequeños'
  | 'Periféricos'
  | 'Audio'
  | 'Otro';
