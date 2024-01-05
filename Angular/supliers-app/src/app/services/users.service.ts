import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public confirmCredentials: Subject<boolean> = new Subject<boolean>();
  public checkCredentials$: Observable<boolean> =
    this.confirmCredentials.asObservable();

  public succesfullLogin() {
    this.confirmCredentials.next(true);
  }
}
