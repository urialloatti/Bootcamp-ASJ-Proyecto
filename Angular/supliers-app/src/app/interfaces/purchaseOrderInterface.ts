export interface PurchaseOrderInterface {
  id?: number;
  dateArriving: Date | string;
  shippingRequirements: string;
  suplierId: number;
  suplierName?: string;
  products: ProductGroup[];
  state?: POrderState;
  total?: number;
  isAvailable?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface ProductGroup {
  productId: number;
  productName?: string;
  price: number;
  productQuantity: number;
}

export type POrderState = 'Pendiente' | 'Cancelado' | 'Entregado';
