import { Injectable } from '@angular/core';
import { PurchaseOrderInterface } from '../interfaces/purchaseOrderInterface';
import { purchaseOrdersMockData } from '../data/mock-data';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrdersService {
  constructor() {}

  private list: PurchaseOrderInterface[] = purchaseOrdersMockData || [];

  public getList(): PurchaseOrderInterface[] {
    return this.list;
  }

  public getElementById(id: number): PurchaseOrderInterface | undefined {
    return this.list.find((purchase) => purchase.id == id);
  }

  public deleteById(id: number): PurchaseOrderInterface | undefined {
    const deleted = this.list.find((purchase) => purchase.id == id);
    if (deleted) {
      deleted.isCanceled = true;
    }
    return deleted;
  }

  public addElement(product: PurchaseOrderInterface): void {
    product.id = this.list.length;
    this.list.push(product);
  }
}
