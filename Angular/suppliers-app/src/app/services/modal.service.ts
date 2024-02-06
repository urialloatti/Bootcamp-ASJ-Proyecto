import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private confirmSubject: Subject<boolean> = new Subject<boolean>();
  public confirmModal$: Observable<boolean> =
    this.confirmSubject.asObservable();

  private confirmLeaveSubject: Subject<boolean> = new Subject<boolean>();
  public confirmLeave$: Observable<boolean> =
    this.confirmLeaveSubject.asObservable();

  public openModal(response: boolean) {
    this.confirmSubject.next(response);
  }

  public sendConfirmLeaveNext(response: boolean) {
    this.confirmLeaveSubject.next(response);
  }
}
