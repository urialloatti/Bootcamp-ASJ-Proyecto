export interface PurchaseOrderInterface {
  id?: number;
  dateArriving: Date | string;
  shippingRequirements: string;
  supplierId: number;
  supplierName?: string;
  products: ProductGroup[];
  state?: OrderState;
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

export interface PurchaseOrderResponseDTO {
  id: number;
  dateArriving: string;
  shippingRequirements: string;
  supplierName: string;
  products: PurchaseProductResponseDTO[];
  state: OrderState;
  total: number;
  createdAt: string;
  available: boolean;
}

export interface PurchaseProductResponseDTO {
  productId: number;
  productName: string;
  price: number;
  productQuantity: number;
}

export interface PurchaseOrderRequestDTO {
  dateArriving: string;
  shippingRequirements: string;
  supplierId: number;
  products: PurchaseProductRequestDTO[];
  createdAt: string;
  userId: number;
}

export interface PurchaseProductRequestDTO {
  productId: number;
  productQuantity: number;
}

export type OrderState = 'Pendiente' | 'Cancelado' | 'Entregado';
