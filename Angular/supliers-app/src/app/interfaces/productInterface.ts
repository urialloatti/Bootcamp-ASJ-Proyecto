export interface ProductInterface {
  id?: number;
  suplierId: number;
  suplier?: string;
  category: category;
  name: string;
  description: string;
  price: number;
}

type category =
  | 'Árboles'
  | 'Aromáticas'
  | 'Fertilizantes'
  | 'Florales'
  | 'Frutales'
  | 'Insecticidas'
  | 'Otro';
