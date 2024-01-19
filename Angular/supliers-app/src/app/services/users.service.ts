import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';

import {
  UserCredentialsInterface,
  UserInterface,
  userDataInterface,
} from '../interfaces/userInterface';
import { Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private router: Router
  ) {}
  private URL_API: string = 'http://localhost:3000/users';

  private userCredentialsSubject: Subject<boolean> = new Subject<boolean>();
  public checkCredentials$: Observable<boolean> =
    this.userCredentialsSubject.asObservable();
  private userExistsSubject: Subject<boolean> = new Subject<boolean>();
  public checkUserExists$ = this.userExistsSubject.asObservable();
  private counter!: number;
  private userDTO!: userDataInterface;

  private isLoggedIn: boolean = false;

  public get isLoggedInGuard$(): Observable<boolean> {
    return this.http.get<UserInterface[]>(this.URL_API).pipe(
      map((list: UserInterface[]) => {
        let userCredentialsDTO: UserCredentialsInterface = JSON.parse(
          localStorage.getItem('credentials') || '{}'
        ) as UserCredentialsInterface;
        const isUserValid: boolean = list.some(
          (user) =>
            user.username == userCredentialsDTO.username &&
            user.passwordHash == userCredentialsDTO.password
        );
        if (isUserValid) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  public checkLoggedIn(): void {
    let userCredentialsDTO: UserCredentialsInterface = JSON.parse(
      localStorage.getItem('credentials') || '{}'
    ) as UserCredentialsInterface;
    this.checkCredentials(userCredentialsDTO);
  }

  public checkCredentials(userCredentialsDTO: UserCredentialsInterface): void {
    this.getList().subscribe((userList) => {
      const isUserValid: boolean = userList.some(
        (user) =>
          user.username == userCredentialsDTO.username &&
          user.password == userCredentialsDTO.password
      );
      if (isUserValid) {
        this.getUserData(userCredentialsDTO.username).subscribe((user) => {
          this.userDTO = user;
          this.userCredentialsSubject.next(isUserValid);
        });
      } else {
        this.userCredentialsSubject.next(isUserValid);
      }
    });
  }

  public checkUsername(username: string): void {
    this.getList().subscribe((userList) => {
      const userAlreadyExists: boolean = userList.some(
        (user) => user.username == username
      );
      this.userExistsSubject.next(userAlreadyExists);
    });
  }

  private getList(): Observable<UserCredentialsInterface[]> {
    return this.http.get<UserInterface[]>(this.URL_API).pipe(
      map((list: UserInterface[]) => {
        const usersCredentials: UserCredentialsInterface[] = [];
        for (const user of list) {
          usersCredentials.push({
            username: user.username,
            password: user.passwordHash,
          });
        }
        return usersCredentials;
      })
    );
  }

  private getUserData(username: string): Observable<userDataInterface> {
    return this.http.get<UserInterface[]>(this.URL_API).pipe(
      map((list: UserInterface[]) => {
        const fullUser = list.find((user) => user.username == username)!;
        const userData: userDataInterface = {
          email: fullUser.email,
          name: fullUser.name,
          surname: fullUser.surname,
          username: fullUser.username,
        };
        return userData;
      })
    );
  }

  // CRUD
  public addElement(user: UserInterface): Observable<UserInterface> {
    user.id = this.counter;
    user.isAvailable = true;
    user.createdAt = this.datePipe.transform(
      new Date(),
      'yyyy-MM-dd HH:mm:ss'
    )!;
    user.updatedAt = this.datePipe.transform(
      new Date(),
      'yyyy-MM-dd HH:mm:ss'
    )!;
    this.counter++;
    return this.http.post<UserInterface>(this.URL_API, user);
  }

  public getCurrentUser(): userDataInterface {
    return this.userDTO;
  }

  public updateCounter() {
    this.getList().subscribe((list) => (this.counter = list.length + 1));
  }
}
