export interface PurchaseOrderInterface {
  id?: number;
  dateArriving: Date | string;
  shippingRequirements: string;
  suplierId: number;
  suplierName?: string;
  products: ProductGroup[];
  total?: number;
  isAvailable?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductGroup {
  productId: number;
  productName?: string;
  price: number;
  productQuantity: number;
}
