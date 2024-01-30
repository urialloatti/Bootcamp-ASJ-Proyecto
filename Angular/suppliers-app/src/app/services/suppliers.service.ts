import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import {
  SupplierRequestDTO,
  SupplierResponseDTO,
} from '../interfaces/supplierInterface';
import { ApiResponse } from '../interfaces/apiResponseInterface';

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  constructor(private http: HttpClient) {}

  URL_API: string = 'http://localhost:8080/app/suppliers';

  // GET methods

  public getList(): Observable<SupplierResponseDTO[]> {
    return this.http
      .get<SupplierResponseDTO[]>(this.URL_API)
      .pipe(
        map((list: SupplierResponseDTO[]) =>
          list.sort((a, b) =>
            a.brand.toLowerCase().localeCompare(b.brand.toLowerCase())
          )
        )
      );
  }

  public getListDeleted(): Observable<SupplierResponseDTO[]> {
    return this.http
      .get<SupplierResponseDTO[]>(this.URL_API + '/deleted')
      .pipe(
        map((list: SupplierResponseDTO[]) =>
          list.sort((a, b) =>
            a.brand.toLowerCase().localeCompare(b.brand.toLowerCase())
          )
        )
      );
  }

  public getElementById(
    id: number
  ): Observable<ApiResponse<SupplierResponseDTO>> {
    return this.http.get<ApiResponse<SupplierResponseDTO>>(
      this.URL_API + '/' + id
    );
  }

  public getElementForUpdate(
    id: number
  ): Observable<ApiResponse<SupplierRequestDTO>> {
    return this.http.get<ApiResponse<SupplierRequestDTO>>(
      this.URL_API + '/u/' + id
    );
  }

  public getCount(): Observable<number> {
    return this.http.get<number>(this.URL_API + '/count');
  }

  // Delete methods

  public cancelElementById(
    id: number
  ): Observable<ApiResponse<SupplierResponseDTO>> {
    return this.http.patch<ApiResponse<SupplierResponseDTO>>(
      this.URL_API + '/deleted/' + id,
      { available: false }
    );
  }

  public restoreElementById(
    id: number
  ): Observable<ApiResponse<SupplierResponseDTO>> {
    return this.http.patch<ApiResponse<SupplierResponseDTO>>(
      this.URL_API + '/deleted/' + id,
      { available: true }
    );
  }

  // POST methods

  public addElement(
    supplier: SupplierRequestDTO
  ): Observable<ApiResponse<SupplierResponseDTO>> {
    return this.http.post<ApiResponse<SupplierResponseDTO>>(
      this.URL_API,
      supplier
    );
  }

  // PUT methods

  public updateElement(
    id: number,
    supplier: SupplierRequestDTO
  ): Observable<ApiResponse<SupplierResponseDTO>> {
    return this.http.put<ApiResponse<SupplierResponseDTO>>(
      this.URL_API + '/' + id,
      supplier
    );
  }

  // Other methods

  public checkCuitExists(cuit: string): Observable<boolean> {
    return this.http.patch<boolean>(`${this.URL_API}/check-cuit`, {
      cuit: cuit,
    });
  }
}
