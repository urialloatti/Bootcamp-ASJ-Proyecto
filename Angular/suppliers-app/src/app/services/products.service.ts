import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { ProductInterface } from '../interfaces/productInterface';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private counter!: number;
  private URL_API = 'http://localhost:3000/products';

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  // GET methods

  public getFullList(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(this.URL_API);
  }

  public getList(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(this.URL_API).pipe(
      map((list: ProductInterface[]) => {
        const filtered_list = list.filter((product) => product.isAvailable);
        this.counter = list.length;
        return filtered_list.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
      })
    );
  }

  public getElementById(id: number): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(this.URL_API + '/' + id);
  }

  public getElementsBysupplierId(id: number): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(this.URL_API).pipe(
      map((res: ProductInterface[]) => {
        const filtered = res.filter(
          (item) => item.supplierId == id && item.isAvailable
        );
        return filtered;
      })
    );
  }

  public getElementsByCategory(
    category: string
  ): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(this.URL_API).pipe(
      map((list: ProductInterface[]) => {
        const filtered = list.filter((product) => product.category == category);
        return filtered;
      })
    );
  }

  // DELETE methods

  public deleteElementById(id: number): Observable<ProductInterface> {
    return this.http.delete<ProductInterface>(this.URL_API + '/' + id);
  }

  cancelElementById(id: number): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(this.URL_API + '/' + id).pipe(
      map((dto) => {
        dto.isAvailable = false;
        this.http
          .put<ProductInterface>(this.URL_API + '/' + id, dto)
          .subscribe();
        return dto;
      })
    );
  }

  // POST methods

  public addElement(product: ProductInterface): Observable<ProductInterface> {
    product.id = this.counter;
    product.createdAt = this.datePipe.transform(
      new Date(),
      'yyyy-MM-dd HH:mm:ss'
    )!;
    product.updatedAt = this.datePipe.transform(
      new Date(),
      'yyyy-MM-dd HH:mm:ss'
    )!;
    return this.http.post<ProductInterface>(this.URL_API, product).pipe(
      map((updatedProduct) => {
        updatedProduct.code = crypto.randomUUID();
        return updatedProduct;
      })
    );
  }

  // UPDATE methods

  public updateElement(
    product: ProductInterface
  ): Observable<ProductInterface> {
    product.updatedAt = this.datePipe.transform(
      new Date(),
      'yyyy-MM-dd HH:mm:ss'
    )!;
    return this.http.put<ProductInterface>(
      this.URL_API + '/' + product.id,
      product
    );
  }

  public updateCounter() {
    this.getFullList().subscribe(
      (response) => (this.counter = response.length + 1)
    );
  }
}
