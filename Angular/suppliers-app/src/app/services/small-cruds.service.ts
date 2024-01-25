import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';

import {
  SmallCrudInterface,
  smallCrudsType,
} from '../interfaces/smallCrudsInterfaces';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SmallCrudsService implements OnInit {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  private URL_API_SECTOR: string = 'http://localhost:3000/sectors';
  private URL_API_CATEGORY: string = 'http://localhost:3000/categories';

  private URL_TEST_SECTOR: string = 'http://localhost:8080/app/sectors';
  private URL_TEST_CATEGORY: string = 'http://localhost:8080/app/categories';

  ngOnInit(): void {}

  public getList(crudType: smallCrudsType): Observable<SmallCrudInterface[]> {
    let URL_API =
      crudType == 'category' ? this.URL_TEST_CATEGORY : this.URL_TEST_SECTOR;
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
    crudType: smallCrudsType,
    name: string
  ): Observable<SmallCrudInterface> {
    let URL_API =
      crudType == 'category' ? this.URL_TEST_CATEGORY : this.URL_TEST_SECTOR;
    return this.http.post<SmallCrudInterface>(URL_API, { name: name });
  }

  public getElementById(
    id: number,
    crudType: smallCrudsType
  ): Observable<SmallCrudInterface> {
    let URL_API =
      crudType == 'category' ? this.URL_TEST_CATEGORY : this.URL_TEST_SECTOR;
    return this.http.get<SmallCrudInterface>(URL_API + '/' + id);
  }

  public cancelElementByIdBack(
    id: number,
    crudType: smallCrudsType
  ): Observable<SmallCrudInterface> {
    let URL_API =
      crudType == 'category' ? this.URL_TEST_CATEGORY : this.URL_TEST_SECTOR;
    return this.http.patch<SmallCrudInterface>(URL_API + '/delete/' + id, {
      available: false,
    });
  }
}
