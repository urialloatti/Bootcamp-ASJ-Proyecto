import { PurchaseOrderRequestDTO } from './../interfaces/purchaseOrderInterface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PurchaseOrderResponseDTO } from '../interfaces/purchaseOrderInterface';
import { ApiResponse } from '../interfaces/apiResponseInterface';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrdersService {
  constructor(private http: HttpClient) {}

  private URL_API: string = 'http://localhost:8080/app/purchase-orders';

  // GET methods

  public getList(): Observable<PurchaseOrderResponseDTO[]> {
    return this.http.get<PurchaseOrderResponseDTO[]>(this.URL_API);
  }

  public getElementById(
    id: number
  ): Observable<ApiResponse<PurchaseOrderResponseDTO>> {
    return this.http.get<ApiResponse<PurchaseOrderResponseDTO>>(
      `${this.URL_API}/${id}`
    );
  }

  public getElementForUpdate(
    id: number
  ): Observable<ApiResponse<PurchaseOrderRequestDTO>> {
    return this.http.get<ApiResponse<PurchaseOrderRequestDTO>>(
      `${this.URL_API}/u/${id}`
    );
  }

  public getCount(): Observable<number> {
    return this.http.get<number>(this.URL_API + '/count');
  }

  public cancelElementById(
    id: number
  ): Observable<ApiResponse<PurchaseOrderResponseDTO>> {
    return this.http.patch<ApiResponse<PurchaseOrderResponseDTO>>(
      `${this.URL_API}/delete/${id}`,
      { available: false }
    );
  }

  public addElement(
    order: PurchaseOrderRequestDTO
  ): Observable<ApiResponse<PurchaseOrderResponseDTO>> {
    return this.http.post<ApiResponse<PurchaseOrderResponseDTO>>(
      this.URL_API,
      order
    );
  }

  public updateElement(
    id: number,
    order: PurchaseOrderRequestDTO
  ): Observable<ApiResponse<PurchaseOrderResponseDTO>> {
    return this.http.put<ApiResponse<PurchaseOrderResponseDTO>>(
      `${this.URL_API}/${id}`,
      order
    );
  }
}
