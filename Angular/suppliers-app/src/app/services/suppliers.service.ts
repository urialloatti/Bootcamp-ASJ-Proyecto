import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import {
  SupplierCreateDTO,
  supplierInterface,
  SupplierResponseDTO,
} from '../interfaces/supplierInterface';
import { ProductsService } from './products.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class suppliersService {
  constructor(
    private http: HttpClient,
    private productService: ProductsService
  ) {}

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

  public getElementById(id: number): Observable<SupplierResponseDTO> {
    return this.http.get<SupplierResponseDTO>(this.URL_API + '/' + id);
  }

  public getElementForUpdate(id: number): Observable<SupplierCreateDTO> {
    return this.http.get<SupplierCreateDTO>(this.URL_API + '/u/' + id);
  }

  // Delete methods

  public cancelElementById(id: number): Observable<SupplierResponseDTO> {
    return this.http.patch<SupplierResponseDTO>(
      this.URL_API + '/delete/' + id,
      { available: false }
    );
  }

  // POST methods

  public addElement(
    supplier: SupplierCreateDTO
  ): Observable<SupplierResponseDTO> {
    return this.http.post<SupplierResponseDTO>(this.URL_API, supplier);
  }

  // PUT methods

  public updateElement(id: number, supplier: SupplierCreateDTO) {
    return this.http.put<SupplierResponseDTO>(
      this.URL_API + '/' + id,
      supplier
    );
  }
}
