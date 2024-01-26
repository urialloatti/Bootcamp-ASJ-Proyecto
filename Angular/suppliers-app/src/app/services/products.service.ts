import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import {
  ProductInterface,
  ProductRequestDTO,
  ProductResponseDTO,
} from '../interfaces/productInterface';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private URL_API_TEST = 'http://localhost:8080/app/products';

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  // GET methods

  public getList(): Observable<ProductResponseDTO[]> {
    return this.http
      .get<ProductResponseDTO[]>(this.URL_API_TEST)
      .pipe(
        map((list: ProductResponseDTO[]) =>
          list.sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          )
        )
      );
  }

  public getElementsBySupplierId(id: number): Observable<ProductResponseDTO[]> {
    return this.http
      .get<ProductResponseDTO[]>(`${this.URL_API_TEST}/supplier/${id}`)
      .pipe(
        map((list: ProductResponseDTO[]) =>
          list.sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          )
        )
      );
  }

  public getElementsByCategoryId(id: number): Observable<ProductResponseDTO[]> {
    return this.http
      .get<ProductResponseDTO[]>(`${this.URL_API_TEST}/category/${id}`)
      .pipe(
        map((list: ProductResponseDTO[]) =>
          list.sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          )
        )
      );
  }

  public getElementById(id: number): Observable<ProductResponseDTO> {
    return this.http.get<ProductResponseDTO>(`${this.URL_API_TEST}/${id}`);
  }

  public getElementForUpdate(id: number): Observable<ProductRequestDTO> {
    return this.http.get<ProductRequestDTO>(`${this.URL_API_TEST}/u/${id}`);
  }

  // DELETE methods

  public cancelElementByIdB(id: number): Observable<ProductResponseDTO> {
    return this.http.patch<ProductResponseDTO>(
      `${this.URL_API_TEST}/delete/${id}`,
      {
        available: false,
      }
    );
  }

  // POST methods

  public addElementB(
    product: ProductRequestDTO
  ): Observable<ProductResponseDTO> {
    return this.http.post<ProductResponseDTO>(this.URL_API_TEST, product);
  }

  // UPDATE methods

  public updateElementB(
    id: number,
    product: ProductRequestDTO
  ): Observable<ProductResponseDTO> {
    return this.http.put<ProductResponseDTO>(
      `${this.URL_API_TEST}/${id}`,
      product
    );
  }
}
