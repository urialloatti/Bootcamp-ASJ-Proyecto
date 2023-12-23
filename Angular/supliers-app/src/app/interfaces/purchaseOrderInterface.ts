export interface PurchaseOrderInterface {
    id?: number,
    dateEmited: Date,
    dateArriving: Date,
    suplierId: number,
    suplierName?: string,
    purchases: ProductsGroup[],
    total?: number
}

interface ProductsGroup {
    productId: number,
    productQuantity: number
}