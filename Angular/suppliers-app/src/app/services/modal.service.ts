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

  private errorMessagesSubject: Subject<boolean> = new Subject<boolean>();
  public errorMessageFlag$: Observable<boolean> =
    this.errorMessagesSubject.asObservable();

  private formChanged: boolean = false;

  public openModal(response: boolean): void {
    this.confirmSubject.next(response);
  }

  public sendConfirmLeaveNext(response: boolean): void {
    this.confirmLeaveSubject.next(response);
  }

  public hasFormChanged(): boolean {
    return this.formChanged;
  }

  public setFormChanged(hasChanged: boolean): void {
    this.formChanged = hasChanged;
  }

  public sendHttpErrorFlag(flag: boolean): void {
    this.errorMessagesSubject.next(flag);
  }
}
