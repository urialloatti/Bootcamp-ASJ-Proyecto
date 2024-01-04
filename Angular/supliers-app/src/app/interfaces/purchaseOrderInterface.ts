export interface PurchaseOrderInterface {
  id?: number;
  dateEmited: Date | string;
  dateArriving: Date | string;
  shippingRequirements: string;
  suplierId: number;
  suplierName?: string;
  products: ProductGroup[];
  total?: number;
  isAvailable: boolean;
}

export interface ProductGroup {
  productId: number;
  productName?: string;
  price: number;
  productQuantity: number;
}
