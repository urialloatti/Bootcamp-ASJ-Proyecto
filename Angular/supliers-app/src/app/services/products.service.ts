import { Injectable } from '@angular/core';
import { productsMockData } from '../data/mock-data';
import { ProductInterface } from '../interfaces/productInterface';
import { SupliersService } from './supliers.service';

// const data: ProductInterface[] = productsMockData;

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private list: ProductInterface[] = productsMockData || [];

  constructor(private supliersService: SupliersService) {}

  // GET methods
  public getList(): ProductInterface[] {
    return this.list.sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
  }

  public getElementById(id: number): ProductInterface | undefined {
    return this.list.find((product) => product.id == id);
  }

  public getElementsBySuplierId(id: number): ProductInterface[] {
    return this.list.filter((product) => product.suplierId == id);
  }

  // DELETE methods
  public deleteElement(id: number): ProductInterface | undefined {
    const deleted = this.list.find((product) => product.id == id);
    this.list = this.list.filter((product) => product.id != id);
    return deleted;
  }

  // CREATE methods
  public addElement(product: ProductInterface): void {
    product.id = this.list.length;
    product.suplier =
      this.supliersService.getElementById(product.suplierId)?.brand || 'Otro';
    product.code = crypto.randomUUID();
    this.list.push(product);
  }

  // UPDATE methods
  public updateElement(newProduct: ProductInterface) {
    let oldProduct = this.list.find((product) => product.id == newProduct.id);
    oldProduct = newProduct;
  }
}