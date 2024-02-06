import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public confirmSubject: Subject<boolean> = new Subject<boolean>();
  public confirmModal$: Observable<boolean> =
    this.confirmSubject.asObservable();

  public confirmLeaveSubject: Subject<boolean> = new Subject<boolean>();

  public openModal(response: boolean) {
    this.confirmSubject.next(response);
  }
}
