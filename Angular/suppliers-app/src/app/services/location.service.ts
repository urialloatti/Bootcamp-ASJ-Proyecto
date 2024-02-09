import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationResponseDTO } from './../interfaces/locationInterface';
import { Observable, catchError, map, of, throwError } from 'rxjs';

import { ErrorHandlerService } from './error-handler.service';

import { ApiResponse } from '../interfaces/apiResponseInterface';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  private URL_API = 'http://localhost:8080/app/locations';

  // GET methods
  public getList(): Observable<LocationResponseDTO[]> {
    return this.http.get<LocationResponseDTO[]>(this.URL_API).pipe(
      catchError((error) => {
        this.errorHandler.handleServerError(error);
        return throwError(() => error);
      })
    );
  }

  public getCountryId(provinceId: number): Observable<number> {
    return this.http
      .get<ApiResponse<number>>(this.URL_API + '/country-id/' + provinceId)
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          this.errorHandler.handleServerError(error);
          return of(-1);
        })
      );
  }
}
