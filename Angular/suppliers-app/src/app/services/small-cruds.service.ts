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
  private sectorCounter!: number;
  private categoryCounter!: number;

  ngOnInit(): void {}

  public getList(crudType: smallCrudsType): Observable<SmallCrudInterface[]> {
    let URL_API =
      crudType == 'category' ? this.URL_API_CATEGORY : this.URL_API_SECTOR;
    return this.http.get<SmallCrudInterface[]>(URL_API).pipe(
      map((list: SmallCrudInterface[]) => {
        const filteredList = list.filter((item) => item.isAvailable);
        return filteredList.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
      })
    );
  }

  public getElementById(
    id: number,
    crudType: smallCrudsType
  ): Observable<SmallCrudInterface> {
    let URL_API =
      crudType == 'category' ? this.URL_API_CATEGORY : this.URL_API_SECTOR;
    return this.http.get<SmallCrudInterface>(URL_API + '/' + id);
  }

  public addElement(
    name: string,
    crudType: smallCrudsType
  ): Observable<SmallCrudInterface> {
    let URL_API =
      crudType == 'category' ? this.URL_API_CATEGORY : this.URL_API_SECTOR;
    let counter =
      crudType == 'category' ? this.categoryCounter : this.sectorCounter;
    let newName: SmallCrudInterface = {
      id: counter,
      name: name,
      createdAt: this.datePipe.transform(new Date(), 'yyyy-MM-dd')!,
      isAvailable: true,
    };
    if (crudType == 'category') {
      this.categoryCounter = counter;
    } else this.sectorCounter = counter;

    return this.http.post<SmallCrudInterface>(URL_API, newName);
  }

  public deleteElement(
    id: number,
    crudType: smallCrudsType
  ): Observable<SmallCrudInterface> {
    let URL_API =
      crudType == 'category' ? this.URL_API_CATEGORY : this.URL_API_SECTOR;

    return this.http.delete<SmallCrudInterface>(URL_API + '/' + id);
  }

  public cancelElementById(
    id: number,
    crudType: smallCrudsType
  ): Observable<SmallCrudInterface> {
    let URL_API =
      crudType == 'category' ? this.URL_API_CATEGORY : this.URL_API_SECTOR;

    return this.http.get<SmallCrudInterface>(URL_API + '/' + id).pipe(
      map((item: SmallCrudInterface) => {
        item.isAvailable = false;
        this.http.put<SmallCrudInterface>(URL_API + '/' + id, item).subscribe();
        return item;
      })
    );
  }

  public updateCounters(): void {
    this.http
      .get<SmallCrudInterface[]>(this.URL_API_CATEGORY)
      .subscribe((list) => (this.categoryCounter = list.length + 1));
    this.http
      .get<SmallCrudInterface[]>(this.URL_API_SECTOR)
      .subscribe((list) => (this.sectorCounter = list.length + 1));
  }
}
