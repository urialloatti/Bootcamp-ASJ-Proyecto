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
}

type category =
  | 'Celulares'
  | 'Laptops'
  | 'Pequeños'
  | 'Periféricos'
  | 'Audio'
  | 'Otro';
