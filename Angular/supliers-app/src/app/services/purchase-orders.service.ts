import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';

import { PurchaseOrderInterface } from '../interfaces/purchaseOrderInterface';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrdersService implements OnInit {
  constructor(private http: HttpClient) {}

  private URL_API: string = 'http://localhost:3000/purchaseOrders';
  private counter!: number;

  ngOnInit(): void {
    let subscription = this.getList().subscribe(
      (response) => (this.counter = response.length)
    );
    subscription.unsubscribe();
  }

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
