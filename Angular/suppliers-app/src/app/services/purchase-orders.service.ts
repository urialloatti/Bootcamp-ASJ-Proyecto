import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';

import { PurchaseOrderInterface } from '../interfaces/purchaseOrderInterface';
import { UserCredentialsInterface } from '../interfaces/userInterface';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrdersService implements OnInit {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}

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
    const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
    return this.http.get<PurchaseOrderInterface[]>(this.URL_API).pipe(
      map((list: PurchaseOrderInterface[]) => {
        return list.map((DTO) => {
          if (DTO.isAvailable && DTO.dateArriving < currentDate) {
            DTO.state = 'Entregado';
            DTO.isAvailable = false;
            this.updateElement(DTO).subscribe();
          }
          return DTO;
        });
      })
    );
  }

  public getElementById(id: number): Observable<PurchaseOrderInterface> {
    return this.http.get<PurchaseOrderInterface>(this.URL_API + '/' + id);
  }

  public cancelElementById(id: number): Observable<PurchaseOrderInterface> {
    return this.http.get<PurchaseOrderInterface>(this.URL_API + '/' + id).pipe(
      map((DTO) => {
        DTO.isAvailable = false;
        DTO.state = 'Cancelado';
        this.http
          .put<PurchaseOrderInterface>(this.URL_API + '/' + id, DTO)
          .subscribe();
        return DTO;
      })
    );
  }

  public addElement(
    pOrder: PurchaseOrderInterface
  ): Observable<PurchaseOrderInterface> {
    pOrder.id = this.counter;
    pOrder.createdAt = this.datePipe.transform(
      new Date(),
      'yyyy-MM-dd HH:mm:ss'
    )!;
    pOrder.updatedAt = this.datePipe.transform(
      new Date(),
      'yyyy-MM-dd HH:mm:ss'
    )!;
    let credentials: UserCredentialsInterface = JSON.parse(
      localStorage.getItem('credentials') || '{}'
    ) as UserCredentialsInterface;
    pOrder.createdBy = credentials.username;
    pOrder.state = 'Pendiente';
    this.counter++;
    return this.http.post<PurchaseOrderInterface>(this.URL_API, pOrder);
  }

  public updateElement(
    pOrder: PurchaseOrderInterface
  ): Observable<PurchaseOrderInterface> {
    pOrder.updatedAt = this.datePipe.transform(
      new Date(),
      'yyyy-MM-dd HH:mm:ss'
    )!;
    return this.http.put<PurchaseOrderInterface>(
      this.URL_API + '/' + pOrder.id,
      pOrder
    );
  }

  public updateCounter() {
    this.getList().subscribe(
      (response) => (this.counter = response.length + 1)
    );
  }
}
