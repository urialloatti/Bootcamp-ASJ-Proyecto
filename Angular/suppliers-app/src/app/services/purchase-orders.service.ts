import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { ErrorHandlerService } from './error-handler.service';

import { ApiResponse } from '../interfaces/apiResponseInterface';
import {
  PurchaseOrderResponseDTO,
  PurchaseOrderRequestDTO,
} from '../interfaces/purchaseOrderInterface';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrdersService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  private URL_API: string = 'http://localhost:8080/app/purchase-orders';

  // GET methods
  public getList(): Observable<PurchaseOrderResponseDTO[]> {
    return this.http.get<PurchaseOrderResponseDTO[]>(this.URL_API).pipe(
      catchError((error) => {
        this.errorHandler.handleServerError(error);
        return throwError(() => error);
      })
    );
  }

  public getElementById(
    id: number
  ): Observable<ApiResponse<PurchaseOrderResponseDTO>> {
    return this.http
      .get<ApiResponse<PurchaseOrderResponseDTO>>(`${this.URL_API}/${id}`)
      .pipe(
        catchError((error) => {
          this.errorHandler.handleServerError(error);
          return throwError(() => error);
        })
      );
  }

  public getElementForUpdate(
    id: number
  ): Observable<ApiResponse<PurchaseOrderRequestDTO>> {
    return this.http
      .get<ApiResponse<PurchaseOrderRequestDTO>>(`${this.URL_API}/u/${id}`)
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
    order: PurchaseOrderRequestDTO
  ): Observable<ApiResponse<PurchaseOrderResponseDTO>> {
    return this.http
      .post<ApiResponse<PurchaseOrderResponseDTO>>(this.URL_API, order)
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
    order: PurchaseOrderRequestDTO
  ): Observable<ApiResponse<PurchaseOrderResponseDTO>> {
    return this.http
      .put<ApiResponse<PurchaseOrderResponseDTO>>(
        `${this.URL_API}/${id}`,
        order
      )
      .pipe(
        catchError((error) => {
          this.errorHandler.handleServerError(error);
          return throwError(() => error);
        })
      );
  }

  // PATCH methods
  public cancelElementById(
    id: number
  ): Observable<ApiResponse<PurchaseOrderResponseDTO>> {
    return this.http
      .patch<ApiResponse<PurchaseOrderResponseDTO>>(
        `${this.URL_API}/delete/${id}`,
        { available: false }
      )
      .pipe(
        catchError((error) => {
          this.errorHandler.handleServerError(error);
          return throwError(() => error);
        })
      );
  }
}
