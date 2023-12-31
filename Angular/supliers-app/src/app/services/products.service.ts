import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';

import { ProductInterface } from '../interfaces/productInterface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService implements OnInit {
  private counter!: number;
  private URL_API = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    let subscription = this.getList().subscribe((response) => {
      this.counter = response.length;
      subscription.unsubscribe();
    });
  }

  // GET methods
  public getList(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(this.URL_API).pipe(
      map((list: ProductInterface[]) => {
        const filtered_list = list.filter((product) => product.isAvailable);
        return filtered_list.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
      })
    );
  }

  public getElementById(id: number): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(this.URL_API + '/' + id);
  }

  public getElementsBySuplierId(id: number): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(this.URL_API).pipe(
      map((res: ProductInterface[]) => {
        const filtered = res.filter(
          (item) => item.suplierId == id && item.isAvailable
        );
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
  }
}
