import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { SuplierInterface } from '../interfaces/suplierInterface';
import { ProductsService } from './products.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SupliersService {
  constructor(
    private datePipe: DatePipe,
    private http: HttpClient,
    private productService: ProductsService
  ) {}

  URL_API: string = 'http://localhost:3000/supliers';
  private counter!: number;

  // GET methods

  public getList(): Observable<SuplierInterface[]> {
    return this.http.get<SuplierInterface[]>(this.URL_API).pipe(
      map((list: SuplierInterface[]) => {
        const filtered_list = list.filter((suplier) => suplier.isAvailable);
        return filtered_list.sort((a, b) =>
          a.brand.toLowerCase().localeCompare(b.brand.toLowerCase())
        );
      })
    );
  }

  public getFullList(): Observable<SuplierInterface[]> {
    return this.http.get<SuplierInterface[]>(this.URL_API);
  }

  public getElementById(id: number): Observable<SuplierInterface> {
    return this.http.get<SuplierInterface>(this.URL_API + '/' + id);
  }

  // Delete methods

  public deleteElementById(id: number): Observable<SuplierInterface> {
    return this.http.delete<SuplierInterface>(this.URL_API + '/' + id);
  }

  cancelElementById(id: number): Observable<SuplierInterface> {
    return this.http.get<SuplierInterface>(this.URL_API + '/' + id).pipe(
      map((dto) => {
        dto.isAvailable = false;
        this.http
          .put<SuplierInterface>(this.URL_API + '/' + id, dto)
          .subscribe();
        this.productService.getElementsBySuplierId(id).subscribe((prodList) => {
          for (let product of prodList) {
            this.productService.cancelElementById(product.id!).subscribe();
          }
        });
        return dto;
      })
    );
  }

  // POST methods

  public addElement(suplier: SuplierInterface): Observable<SuplierInterface> {
    suplier.id = this.counter;
    suplier.code = suplier.sector.substring(0, 3) + suplier.id.toString();
    suplier.createdAt = this.datePipe.transform(
      new Date(),
      'yyyy-MM-dd HH:mm:ss'
    )!;
    suplier.updatedAt = this.datePipe.transform(
      new Date(),
      'yyyy-MM-dd HH:mm:ss'
    )!;
    suplier.isAvailable = true;
    this.counter++;
    return this.http.post<SuplierInterface>(this.URL_API, suplier);
  }

  // PUT methods

  public updateElement(
    suplier: SuplierInterface
  ): Observable<SuplierInterface> {
    suplier.updatedAt = this.datePipe.transform(
      new Date(),
      'yyyy-MM-dd HH:mm:ss'
    )!;
    return this.http
      .put<SuplierInterface>(this.URL_API + '/' + suplier.id, suplier)
      .pipe(
        map((mapSuplier) => {
          this.productService
            .getElementsBySuplierId(mapSuplier.id!)
            .subscribe((prodList) => {
              for (let product of prodList) {
                product.suplier = mapSuplier.brand;
                this.productService.updateElement(product).subscribe();
              }
            });
          return mapSuplier;
        })
      );
  }

  public updateCounter() {
    this.getFullList().subscribe(
      (response) => (this.counter = response.length + 1)
    );
  }
}
