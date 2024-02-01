import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { ApiResponse } from '../interfaces/apiResponseInterface';
import {
  ProductRequestDTO,
  ProductResponseDTO,
} from '../interfaces/productInterface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private URL_API = 'http://localhost:8080/app/products';

  constructor(private http: HttpClient) {}

  // GET methods
  public getList(): Observable<ProductResponseDTO[]> {
    return this.http
      .get<ProductResponseDTO[]>(this.URL_API)
      .pipe(
        map((list: ProductResponseDTO[]) =>
          list.sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          )
        )
      );
  }

  public getListDeleted(): Observable<ProductResponseDTO[]> {
    return this.http
      .get<ProductResponseDTO[]>(this.URL_API + '/deleted')
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
      .get<ProductResponseDTO[]>(`${this.URL_API}/supplier/${id}`)
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
      .get<ProductResponseDTO[]>(`${this.URL_API}/category/${id}`)
      .pipe(
        map((list: ProductResponseDTO[]) =>
          list.sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          )
        )
      );
  }

  public getElementById(
    id: number
  ): Observable<ApiResponse<ProductResponseDTO>> {
    return this.http.get<ApiResponse<ProductResponseDTO>>(
      `${this.URL_API}/${id}`
    );
  }

  public getElementForUpdate(
    id: number
  ): Observable<ApiResponse<ProductRequestDTO>> {
    return this.http.get<ApiResponse<ProductRequestDTO>>(
      `${this.URL_API}/u/${id}`
    );
  }

  public getCount(): Observable<number> {
    return this.http.get<number>(this.URL_API + '/count');
  }

  // POST methods
  public addElement(
    product: ProductRequestDTO
  ): Observable<ApiResponse<ProductResponseDTO>> {
    return this.http.post<ApiResponse<ProductResponseDTO>>(
      this.URL_API,
      product
    );
  }

  // PUT methods
  public updateElement(
    id: number,
    product: ProductRequestDTO
  ): Observable<ApiResponse<ProductResponseDTO>> {
    return this.http.put<ApiResponse<ProductResponseDTO>>(
      `${this.URL_API}/${id}`,
      product
    );
  }

  // PATCH methods
  public cancelElementByIdB(
    id: number
  ): Observable<ApiResponse<ProductResponseDTO>> {
    return this.http.patch<ApiResponse<ProductResponseDTO>>(
      `${this.URL_API}/deleted/${id}`,
      {
        available: false,
      }
    );
  }

  public restoreElementByIdB(
    id: number
  ): Observable<ApiResponse<ProductResponseDTO>> {
    return this.http.patch<ApiResponse<ProductResponseDTO>>(
      `${this.URL_API}/deleted/${id}`,
      {
        available: true,
      }
    );
  }
}
