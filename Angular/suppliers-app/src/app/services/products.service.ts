import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { ErrorHandlerService } from './error-handler.service';

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

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  // GET methods
  public getList(): Observable<ProductResponseDTO[]> {
    return this.http.get<ProductResponseDTO[]>(this.URL_API).pipe(
      map(
        (list: ProductResponseDTO[]) =>
          list.sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          ),
        catchError((error) => {
          this.errorHandler.handleServerError(error);
          return throwError(() => error);
        })
      )
    );
  }

  public getListDeleted(): Observable<ProductResponseDTO[]> {
    return this.http.get<ProductResponseDTO[]>(this.URL_API + '/deleted').pipe(
      map((list: ProductResponseDTO[]) =>
        list.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        )
      ),
      catchError((error) => {
        this.errorHandler.handleServerError(error);
        return throwError(() => error);
      })
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
        ),
        catchError((error) => {
          this.errorHandler.handleServerError(error);
          return throwError(() => error);
        })
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
        ),
        catchError((error) => {
          this.errorHandler.handleServerError(error);
          return throwError(() => error);
        })
      );
  }

  public getElementById(
    id: number
  ): Observable<ApiResponse<ProductResponseDTO>> {
    return this.http
      .get<ApiResponse<ProductResponseDTO>>(`${this.URL_API}/${id}`)
      .pipe(
        catchError((error) => {
          this.errorHandler.handleServerError(error);
          return throwError(() => error);
        })
      );
  }

  public getElementForUpdate(
    id: number
  ): Observable<ApiResponse<ProductRequestDTO>> {
    return this.http
      .get<ApiResponse<ProductRequestDTO>>(`${this.URL_API}/u/${id}`)
      .pipe(
        catchError((error) => {
          this.errorHandler.handleServerError(error);
          return throwError(() => error);
        })
      );
  }

  public getCount(): Observable<number> {
    return this.http.get<number>(this.URL_API + '/count').pipe(
      catchError((error) => {
        this.errorHandler.handleServerError(error);
        return throwError(() => error);
      })
    );
  }

  // POST methods
  public addElement(
    product: ProductRequestDTO
  ): Observable<ApiResponse<ProductResponseDTO>> {
    return this.http
      .post<ApiResponse<ProductResponseDTO>>(this.URL_API, product)
      .pipe(
        catchError((error) => {
          this.errorHandler.handleServerError(error);
          return throwError(() => error);
        })
      );
  }

  // PUT methods
  public updateElement(
    id: number,
    product: ProductRequestDTO
  ): Observable<ApiResponse<ProductResponseDTO>> {
    return this.http
      .put<ApiResponse<ProductResponseDTO>>(`${this.URL_API}/${id}`, product)
      .pipe(
        catchError((error) => {
          this.errorHandler.handleServerError(error);
          return throwError(() => error);
        })
      );
  }

  // PATCH methods
  public cancelElementByIdB(
    id: number
  ): Observable<ApiResponse<ProductResponseDTO>> {
    return this.http
      .patch<ApiResponse<ProductResponseDTO>>(`${this.URL_API}/deleted/${id}`, {
        available: false,
      })
      .pipe(
        catchError((error) => {
          this.errorHandler.handleServerError(error);
          return throwError(() => error);
        })
      );
  }

  public restoreElementByIdB(
    id: number
  ): Observable<ApiResponse<ProductResponseDTO>> {
    return this.http
      .patch<ApiResponse<ProductResponseDTO>>(`${this.URL_API}/deleted/${id}`, {
        available: true,
      })
      .pipe(
        catchError((error) => {
          this.errorHandler.handleServerError(error);
          return throwError(() => error);
        })
      );
  }
}
