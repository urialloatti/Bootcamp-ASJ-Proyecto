export interface PurchaseOrderInterface {
  id?: number;
  dateEmited: Date;
  dateArriving: Date;
  shippingRequirements: string;
  suplierId: number;
  suplierName?: string;
  products: ProductGroup[];
  total?: number;
  isCanceled?: boolean;
}

export interface ProductGroup {
  productId: number;
  productName?: string;
  productQuantity: number;
}
