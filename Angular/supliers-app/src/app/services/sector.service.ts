import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';

import { SectorInterface } from '../interfaces/smallCrudsInterfaces';

@Injectable({
  providedIn: 'root',
})
export class SectorService implements OnInit {
  constructor(private http: HttpClient) {}

  private URL_API: string = 'http://localhost:3000/sectors';
  private counter!: number;

  ngOnInit(): void {
    let subscription = this.getList().subscribe(
      (response) => (this.counter = response.length + 1)
    );
    subscription.unsubscribe();
  }

  public getList(): Observable<SectorInterface[]> {
    return this.http.get<SectorInterface[]>(this.URL_API).pipe(
      map((list: SectorInterface[]) => {
        return list.sort((a, b) =>
          a.sector.toLowerCase().localeCompare(b.sector.toLowerCase())
        );
      })
    );
  }

  public addElement(sector: string): Observable<SectorInterface> {
    let newSector: SectorInterface = { id: this.counter, sector: sector };
    this.counter++;
    return this.http.post<SectorInterface>(this.URL_API, newSector);
  }

  public deleteElement(id: number): Observable<SectorInterface> {
    return this.http.delete<SectorInterface>(this.URL_API + '/' + id);
  }
}
