import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import {
  UserCredentialsInterface,
  UserInterface,
} from '../interfaces/userInterface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  private URL_API: string = 'http://localhost:3000/users';

  public userValidSubject: Subject<boolean> = new Subject<boolean>();
  public checkCredentials$: Observable<boolean> =
    this.userValidSubject.asObservable();

  public checkCredentials(userCredentialsDTO: UserCredentialsInterface) {
    this.getList().subscribe((userList) => {
      const isUserValid: boolean = userList.some(
        (user) =>
          user.username == userCredentialsDTO.username &&
          user.password == userCredentialsDTO.password
      );
      this.userValidSubject.next(isUserValid);
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
}
