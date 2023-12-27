export interface PurchaseOrderInterface {
  id?: number;
  dateEmited: Date | string;
  dateArriving: Date | string;
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
  price: number;
  productQuantity: number;
}
