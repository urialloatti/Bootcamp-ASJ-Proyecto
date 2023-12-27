import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map, pipe } from 'rxjs';

import { productsMockData } from '../data/mock-data';
import { ProductInterface } from '../interfaces/productInterface';
import { SupliersService } from './supliers.service';
import { __makeTemplateObject } from 'tslib';

// const data: ProductInterface[] = productsMockData;

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private counter: number = 4;
  private URL_API = 'http://localhost:3000/products';
  private list: ProductInterface[] = productsMockData || [];

  constructor(
    private supliersService: SupliersService,
    private http: HttpClient
  ) {}

  // GET methods
  public getList(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(this.URL_API).pipe(
      map((list: ProductInterface[]) => {
        const sorted = list.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
        return sorted;
      })
    );
  }

  public getElementById(id: number): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(this.URL_API + '/' + id);
  }

  public getElementsBySuplierId(id: number): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(this.URL_API).pipe(
      map((res: ProductInterface[]) => {
        const filtered = res.filter((item) => item.suplierId == id);
        return filtered;
      })
    );
  }

  // DELETE methods
  public deleteElement(id: number): Observable<ProductInterface> {
    return this.http.delete<ProductInterface>(this.URL_API + '/' + id);
  }

  // POST methods
  public addElement(product: ProductInterface): Observable<ProductInterface> {
    product.id = this.counter;
    product.code = crypto.randomUUID();
    this.counter++;
    return this.http.post<ProductInterface>(this.URL_API, product);
  }

  // UPDATE methods
  public updateElement(
    product: ProductInterface
  ): Observable<ProductInterface> {
    return this.http.put<ProductInterface>(
      this.URL_API + '/' + product.id,
      product
    );
    // let oldProduct = this.list.find((product) => product.id == newProduct.id);
    // oldProduct = newProduct;
  }
}
