import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SmallCrudInterface } from '../interfaces/smallCrudsInterfaces';

@Injectable({
  providedIn: 'root',
})
export class FiscalConditionService {
  constructor(private http: HttpClient) {}
  private URL_API = 'http://localhost:8080/app/fiscal-conditions';

  public getList(): Observable<SmallCrudInterface[]> {
    return this.http.get<SmallCrudInterface[]>(this.URL_API);
  }
}
