import { Injectable } from '@angular/core';
import { productsMockData } from '../../data/products';
import { ProductInterface } from '../../interfaces/productsInterface';

// const data: ProductInterface[] = productsMockData;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private list: ProductInterface[] = productsMockData || [];
  
  getList(): ProductInterface[] {
    return this.list;
  }

  deleteElement(id: number): ProductInterface[] {
    this.list = this.list.filter((product) => product.id != id);
    return this.list;
  }

  addElement( product: ProductInterface): void {
    product.id = this.list.length;
    this.list.push(product);
  }
}
