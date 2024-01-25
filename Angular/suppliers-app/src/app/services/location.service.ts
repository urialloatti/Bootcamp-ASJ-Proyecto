import { LocationResponseDTO } from './../interfaces/locationInterface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  private URL_API = 'http://localhost:8080/app/locations';

  public getList(): Observable<LocationResponseDTO[]> {
    return this.http.get<LocationResponseDTO[]>(this.URL_API);
  }

  public getCountryId(provinceId: number): Observable<number> {
    return this.http.get<number>(this.URL_API + '/country-id/' + provinceId);
  }
}
