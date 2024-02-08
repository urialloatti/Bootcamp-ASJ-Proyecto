import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, of } from 'rxjs';
import { Router, UrlTree } from '@angular/router';

import { ApiResponse } from '../interfaces/apiResponseInterface';
import {
  UserCredentialsDTO,
  UserValidationResponseDTO,
  UserResponseDTO,
  UserRequestDTO,
} from '../interfaces/userInterface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private router: Router) {}

  private URL_API_TEST: string = 'http://localhost:8080/app/users';

  private userCredentialsSubject: Subject<boolean> = new Subject<boolean>();
  public checkCredentials$: Observable<boolean> =
    this.userCredentialsSubject.asObservable();

  private userExistsSubject: Subject<boolean> = new Subject<boolean>();
  public checkUserExists$ = this.userExistsSubject.asObservable();

  public get isLoggedInGuard$(): Observable<boolean | UrlTree> {
    let userCredentialsDTO = this.getCredentials();
    return this.http
      .post<UserValidationResponseDTO>(
        this.URL_API_TEST + '/check-credentials',
        userCredentialsDTO
      )
      .pipe(
        map((value) => {
          return value.valid;
        }),
        catchError((error) => {
          console.error(error);
          if (error.status === 0) {
            alert('El servidor se encuentra caído');
            return of(this.router.parseUrl('/404'));
          }
          return of(this.router.parseUrl('/login'));
        })
      );
  }

  public get hasAdminPermits$(): Observable<boolean | UrlTree> {
    let userCredentialsDTO = this.getCredentials();
    return this.http
      .post<ApiResponse<UserResponseDTO>>(
        `${this.URL_API_TEST}/login`,
        userCredentialsDTO
      )
      .pipe(
        map((apiResponse) => {
          if (apiResponse.data.rol == 'admin') return true;
          return this.router.parseUrl('/');
        }),
        catchError(() => of(false))
      );
  }

  public checkLoggedIn(): void {
    let userCredentialsDTO = this.getCredentials();
    this.checkCredentials(userCredentialsDTO);
  }

  public checkCredentials(userCredentialsDTO: UserCredentialsDTO): void {
    this.http
      .post<UserValidationResponseDTO>(
        this.URL_API_TEST + '/check-credentials',
        userCredentialsDTO
      )
      .subscribe((value) => {
        this.userCredentialsSubject.next(value.valid);
      });
  }

  public checkUsername(username: string): Observable<boolean> {
    let userCredentialsDTO: UserCredentialsDTO = {
      username: username,
      passwordHash: '',
    };
    return this.http.patch<boolean>(
      this.URL_API_TEST + '/check-username',
      userCredentialsDTO
    );
  }

  // CRUD
  public addElement(
    user: UserRequestDTO
  ): Observable<ApiResponse<UserResponseDTO>> {
    return this.http.post<ApiResponse<UserResponseDTO>>(
      this.URL_API_TEST + '/signup',
      user
    );
  }

  public getCurrentUser(): Observable<ApiResponse<UserResponseDTO>> {
    let userCredentialsDTO = this.getCredentials();
    return this.http.post<ApiResponse<UserResponseDTO>>(
      `${this.URL_API_TEST}/login`,
      userCredentialsDTO
    );
  }

  private getCredentials(): UserCredentialsDTO {
    return JSON.parse(
      localStorage.getItem('credentials') || '{}'
    ) as UserCredentialsDTO;
  }
}
