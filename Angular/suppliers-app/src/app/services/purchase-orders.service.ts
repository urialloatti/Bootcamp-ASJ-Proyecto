import { PurchaseOrderRequestDTO } from './../interfaces/purchaseOrderInterface';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import {
  PurchaseOrderInterface,
  PurchaseOrderResponseDTO,
} from '../interfaces/purchaseOrderInterface';
import { UserCredentialsDTO } from '../interfaces/userInterface';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrdersService {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  private counter!: number;
  private URL_API: string = 'http://localhost:3000/purchaseOrders';
  private URL_API_TEST: string = 'http://localhost:8080/app/purchase-orders';

  // GET methods

  public getList(): Observable<PurchaseOrderResponseDTO[]> {
    return this.http.get<PurchaseOrderResponseDTO[]>(this.URL_API_TEST);
  }

  public getElementById(id: number): Observable<PurchaseOrderResponseDTO> {
    return this.http.get<PurchaseOrderResponseDTO>(
      `${this.URL_API_TEST}/${id}`
    );
  }

  public getElementForUpdate(id: number): Observable<PurchaseOrderRequestDTO> {
    return this.http.get<PurchaseOrderRequestDTO>(
      `${this.URL_API_TEST}/u/${id}`
    );
  }

  public cancelElementById(id: number): Observable<PurchaseOrderResponseDTO> {
    return this.http.patch<PurchaseOrderResponseDTO>(
      `${this.URL_API_TEST}/delete/${id}`,
      { available: false }
    );
  }

  public addElement(
    order: PurchaseOrderRequestDTO
  ): Observable<PurchaseOrderResponseDTO> {
    return this.http.post<PurchaseOrderResponseDTO>(this.URL_API_TEST, order);
  }

  public updateElement(
    id: number,
    order: PurchaseOrderRequestDTO
  ): Observable<PurchaseOrderResponseDTO> {
    return this.http.put<PurchaseOrderResponseDTO>(
      `${this.URL_API_TEST}/${id}`,
      order
    );
  }
}
