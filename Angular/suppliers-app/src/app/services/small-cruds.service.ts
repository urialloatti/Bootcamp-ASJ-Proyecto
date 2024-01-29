import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

import {
  SmallCrudInterface,
  smallCrudsType,
} from '../interfaces/smallCrudsInterfaces';
import { ApiResponse } from '../interfaces/apiResponseInterface';

@Injectable({
  providedIn: 'root',
})
export class SmallCrudsService {
  constructor(private http: HttpClient) {}

  private URL_SECTOR: string = 'http://localhost:8080/app/sectors';
  private URL_CATEGORY: string = 'http://localhost:8080/app/categories';

  public getList(crudType: smallCrudsType): Observable<SmallCrudInterface[]> {
    let URL_API = crudType == 'category' ? this.URL_CATEGORY : this.URL_SECTOR;
    return this.http
      .get<SmallCrudInterface[]>(URL_API)
      .pipe(
        map((list: SmallCrudInterface[]) =>
          list.sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          )
        )
      );
  }

  public addElement(
    name: string,
    crudType: smallCrudsType
  ): Observable<SmallCrudInterface> {
    let URL_API = crudType == 'category' ? this.URL_CATEGORY : this.URL_SECTOR;
    return this.http
      .post<ApiResponse<SmallCrudInterface>>(URL_API, { name: name })
      .pipe(map((response) => response.data));
  }

  public getElementById(
    id: number,
    crudType: smallCrudsType
  ): Observable<SmallCrudInterface> {
    let URL_API = crudType == 'category' ? this.URL_CATEGORY : this.URL_SECTOR;
    return this.http
      .get<ApiResponse<SmallCrudInterface>>(URL_API + '/' + id)
      .pipe(map((response) => response.data));
  }

  public cancelElementById(
    id: number,
    crudType: smallCrudsType
  ): Observable<SmallCrudInterface> {
    let URL_API = crudType == 'category' ? this.URL_CATEGORY : this.URL_SECTOR;
    return this.http
      .patch<ApiResponse<SmallCrudInterface>>(URL_API + '/delete/' + id, {
        available: false,
      })
      .pipe(map((response) => response.data));
  }
}
