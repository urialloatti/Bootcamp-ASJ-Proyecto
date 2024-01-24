import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { supplierInterface } from '../interfaces/supplierInterface';
import { ProductsService } from './products.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class suppliersService {
  constructor(
    private datePipe: DatePipe,
    private http: HttpClient,
    private productService: ProductsService
  ) {}

  URL_API: string = 'http://localhost:3000/suppliers';
  private counter!: number;

  // GET methods

  public getList(): Observable<supplierInterface[]> {
    return this.http.get<supplierInterface[]>(this.URL_API).pipe(
      map((list: supplierInterface[]) => {
        const filtededList = list.filter((supplier) => supplier.isAvailable);
        return filtededList.sort((a, b) =>
          a.brand.toLowerCase().localeCompare(b.brand.toLowerCase())
        );
      })
    );
  }

  public getFullList(): Observable<supplierInterface[]> {
    return this.http.get<supplierInterface[]>(this.URL_API);
  }

  public getElementById(id: number): Observable<supplierInterface> {
    return this.http.get<supplierInterface>(this.URL_API + '/' + id);
  }

  // Delete methods

  public deleteElementById(id: number): Observable<supplierInterface> {
    return this.http.delete<supplierInterface>(this.URL_API + '/' + id);
  }

  cancelElementById(id: number): Observable<supplierInterface> {
    return this.http.get<supplierInterface>(this.URL_API + '/' + id).pipe(
      map((dto) => {
        dto.isAvailable = false;
        this.http
          .put<supplierInterface>(this.URL_API + '/' + id, dto)
          .subscribe();
        this.productService
          .getElementsBysupplierId(id)
          .subscribe((prodList) => {
            for (let product of prodList) {
              this.productService.cancelElementById(product.id!).subscribe();
            }
          });
        return dto;
      })
    );
  }

  // POST methods

  public addElement(
    supplier: supplierInterface
  ): Observable<supplierInterface> {
    supplier.id = this.counter;
    supplier.code = supplier.sector.substring(0, 3) + supplier.id.toString();
    supplier.createdAt = this.datePipe.transform(
      new Date(),
      'yyyy-MM-dd HH:mm:ss'
    )!;
    supplier.updatedAt = this.datePipe.transform(
      new Date(),
      'yyyy-MM-dd HH:mm:ss'
    )!;
    supplier.isAvailable = true;
    this.counter++;
    return this.http.post<supplierInterface>(this.URL_API, supplier);
  }

  // PUT methods

  public updateElement(
    supplier: supplierInterface
  ): Observable<supplierInterface> {
    supplier.updatedAt = this.datePipe.transform(
      new Date(),
      'yyyy-MM-dd HH:mm:ss'
    )!;
    return this.http
      .put<supplierInterface>(this.URL_API + '/' + supplier.id, supplier)
      .pipe(
        map((mapsupplier) => {
          this.productService
            .getElementsBysupplierId(mapsupplier.id!)
            .subscribe((prodList) => {
              for (let product of prodList) {
                product.supplier = mapsupplier.brand;
                this.productService.updateElement(product).subscribe();
              }
            });
          return mapsupplier;
        })
      );
  }

  public updateCounter() {
    this.getFullList().subscribe(
      (response) => (this.counter = response.length + 1)
    );
  }
}
