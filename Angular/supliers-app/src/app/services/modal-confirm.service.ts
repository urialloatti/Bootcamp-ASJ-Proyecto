import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalsService {
  public confirmSubject: Subject<boolean> = new Subject<boolean>();
  public confirm$: Observable<boolean> = this.confirmSubject.asObservable();

  public openModal() {
    this.confirmSubject.next(true);
  }
}
