import { Injectable } from '@angular/core';
import { productsMockData } from '../data/mock-data';
import { ProductInterface } from '../interfaces/productInterface';
import { SupliersService } from './supliers.service';

// const data: ProductInterface[] = productsMockData;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private list: ProductInterface[] = productsMockData || [];

  constructor(private supliersService: SupliersService) {}
  
  public getList(): ProductInterface[] {
    return this.list;
  }

  public getElementById(id: number): ProductInterface | undefined {
    return this.list.find((product) => product.id == id);
  }

  public deleteElement(id: number): ProductInterface | undefined {
    const deleted = this.list.find((product) => product.id == id);
    this.list = this.list.filter((product) => product.id != id);
    return deleted;
  }

  public addElement( product: ProductInterface): void {
    product.id = this.list.length;
    product.suplier = this.supliersService.getElementById(product.suplierId)?.brand || "Otro";
    this.list.push(product);
  }

  public updateElement( newProduct: ProductInterface) {
    let updated = this.list.find((product) => product.id == newProduct.id);
    updated = newProduct;
  }

}
