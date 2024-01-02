import { Injectable } from '@angular/core';
import { PurchaseOrderInterface } from '../interfaces/purchaseOrderInterface';
import { purchaseOrdersMockData } from '../data/mock-data';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrdersService {
  constructor(private http: HttpClient) {}
  private URL_API: string = 'http://localhost:3000/purchaseOrders';
  private counter: number = 2;

  private list: PurchaseOrderInterface[] = purchaseOrdersMockData || [];

  // GET methods
  public getList(): Observable<PurchaseOrderInterface[]> {
    return this.http.get<PurchaseOrderInterface[]>(this.URL_API);
  }

  public getElementById(id: number): Observable<PurchaseOrderInterface> {
    return this.http.get<PurchaseOrderInterface>(this.URL_API + '/' + id);
  }

  public cancelElementById(id: number): Observable<PurchaseOrderInterface> {
    return this.http.get<PurchaseOrderInterface>(this.URL_API + '/' + id).pipe(
      map((dto) => {
        dto.isAvailable = false;
        this.http
          .put<PurchaseOrderInterface>(this.URL_API + '/' + id, dto)
          .subscribe();
        return dto;
      })
    );
  }

  public addElement(
    pOrder: PurchaseOrderInterface
  ): Observable<PurchaseOrderInterface> {
    pOrder.id = this.counter;
    this.counter++;
    return this.http.post<PurchaseOrderInterface>(this.URL_API, pOrder);
  }

  public updateElement(
    pOrder: PurchaseOrderInterface
  ): Observable<PurchaseOrderInterface> {
    return this.http.put<PurchaseOrderInterface>(
      this.URL_API + '/' + pOrder.id,
      pOrder
    );
  }
}
