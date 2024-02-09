import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { ErrorHandlerService } from './error-handler.service';

import { ApiResponse } from '../interfaces/apiResponseInterface';
import {
  SupplierRequestDTO,
  SupplierResponseDTO,
} from '../interfaces/supplierInterface';

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  URL_API: string = 'http://localhost:8080/app/suppliers';

  // GET methods
  public getList(): Observable<SupplierResponseDTO[]> {
    return this.http.get<SupplierResponseDTO[]>(this.URL_API).pipe(
      map((list: SupplierResponseDTO[]) =>
        list.sort((a, b) =>
          a.brand.toLowerCase().localeCompare(b.brand.toLowerCase())
        )
      ),
      catchError((error) => {
        this.errorHandler.handleServerError(error);
        return throwError(() => error);
      })
    );
  }

  public getListDeleted(): Observable<SupplierResponseDTO[]> {
    return this.http.get<SupplierResponseDTO[]>(this.URL_API + '/deleted').pipe(
      map((list: SupplierResponseDTO[]) =>
        list.sort((a, b) =>
          a.brand.toLowerCase().localeCompare(b.brand.toLowerCase())
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
  ): Observable<ApiResponse<SupplierResponseDTO>> {
    return this.http
      .get<ApiResponse<SupplierResponseDTO>>(this.URL_API + '/' + id)
      .pipe(
        catchError((error) => {
          this.errorHandler.handleServerError(error);
          return throwError(() => error);
        })
      );
  }

  public getElementForUpdate(
    id: number
  ): Observable<ApiResponse<SupplierRequestDTO>> {
    return this.http
      .get<ApiResponse<SupplierRequestDTO>>(this.URL_API + '/u/' + id)
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
    supplier: SupplierRequestDTO
  ): Observable<ApiResponse<SupplierResponseDTO>> {
    return this.http
      .post<ApiResponse<SupplierResponseDTO>>(this.URL_API, supplier)
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
    supplier: SupplierRequestDTO
  ): Observable<ApiResponse<SupplierResponseDTO>> {
    return this.http
      .put<ApiResponse<SupplierResponseDTO>>(this.URL_API + '/' + id, supplier)
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
  ): Observable<ApiResponse<SupplierResponseDTO>> {
    return this.http
      .patch<ApiResponse<SupplierResponseDTO>>(this.URL_API + '/delete/' + id, {
        available: false,
      })
      .pipe(
        catchError((error) => {
          this.errorHandler.handleServerError(error);
          return throwError(() => error);
        })
      );
  }

  public restoreElementById(
    id: number
  ): Observable<ApiResponse<SupplierResponseDTO>> {
    return this.http
      .patch<ApiResponse<SupplierResponseDTO>>(this.URL_API + '/delete/' + id, {
        available: true,
      })
      .pipe(
        catchError((error) => {
          this.errorHandler.handleServerError(error);
          return throwError(() => error);
        })
      );
  }

  public checkCuitExists(cuit: string): Observable<boolean> {
    return this.http.patch<boolean>(`${this.URL_API}/check-cuit`, {
      cuit: cuit,
    });
  }
}
