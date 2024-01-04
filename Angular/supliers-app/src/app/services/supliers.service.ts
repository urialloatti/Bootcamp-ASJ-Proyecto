import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { suplierMockData } from '../data/mock-data';
import { SuplierInterface } from '../interfaces/suplierInterface';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class SupliersService {
  constructor(private http: HttpClient) {}

  URL_API: string = 'http://localhost:3000/supliers';
  private counter: number = 2;

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

  public getElementById(id: number): Observable<SuplierInterface> {
    return this.http.get<SuplierInterface>(this.URL_API + '/' + id);
  }

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
        return dto;
      })
    );
  }

  // POST methods

  public addElement(suplier: SuplierInterface): Observable<SuplierInterface> {
    suplier.id = this.counter;
    suplier.code = suplier.category.substring(0, 3) + suplier.id.toString();
    this.counter++;
    return this.http.post<SuplierInterface>(this.URL_API, suplier);
  }

  // PUT methods
  public updateElement(
    suplier: SuplierInterface
  ): Observable<SuplierInterface> {
    return this.http.put<SuplierInterface>(
      this.URL_API + '/' + suplier.id,
      suplier
    );
  }
}
