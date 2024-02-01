import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { ApiResponse } from '../interfaces/apiResponseInterface';
import {
  SmallCrudInterface,
  smallCrudsType,
} from '../interfaces/smallCrudsInterfaces';

@Injectable({
  providedIn: 'root',
})
export class SmallCrudsService {
  constructor(private http: HttpClient) {}

  private URL_SECTOR: string = 'http://localhost:8080/app/sectors';
  private URL_CATEGORY: string = 'http://localhost:8080/app/categories';

  //  GET methods
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

  public getElementById(
    id: number,
    crudType: smallCrudsType
  ): Observable<ApiResponse<SmallCrudInterface>> {
    let URL_API = crudType == 'category' ? this.URL_CATEGORY : this.URL_SECTOR;
    return this.http.get<ApiResponse<SmallCrudInterface>>(URL_API + '/' + id);
  }

  // POST methods
  public addElement(
    name: string,
    crudType: smallCrudsType
  ): Observable<ApiResponse<SmallCrudInterface>> {
    let URL_API = crudType == 'category' ? this.URL_CATEGORY : this.URL_SECTOR;
    return this.http.post<ApiResponse<SmallCrudInterface>>(URL_API, {
      name: name,
    });
  }

  // PUT methods
  public updateElement(
    id: number,
    name: string,
    crudType: smallCrudsType
  ): Observable<ApiResponse<SmallCrudInterface>> {
    let URL_API = crudType == 'category' ? this.URL_CATEGORY : this.URL_SECTOR;
    return this.http.put<ApiResponse<SmallCrudInterface>>(URL_API + '/' + id, {
      name: name,
    });
  }

  // PATCH methods
  public cancelElementById(
    id: number,
    crudType: smallCrudsType
  ): Observable<ApiResponse<SmallCrudInterface>> {
    let URL_API = crudType == 'category' ? this.URL_CATEGORY : this.URL_SECTOR;
    return this.http.patch<ApiResponse<SmallCrudInterface>>(
      URL_API + '/delete/' + id,
      { available: false }
    );
  }

  public existsByName(
    name: string,
    crudType: smallCrudsType
  ): Observable<boolean> {
    let URL_API = crudType == 'category' ? this.URL_CATEGORY : this.URL_SECTOR;
    return this.http.patch<boolean>(URL_API + '/exitst-by-name', {
      name: name,
    });
  }
}
