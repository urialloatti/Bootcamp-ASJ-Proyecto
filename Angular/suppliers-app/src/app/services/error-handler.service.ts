import { HttpErrorResponse } from '@angular/common/http';
import { ModalService } from './modal.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private modalService: ModalService) {}

  public handleServerError(error: HttpErrorResponse): HttpErrorResponse | null {
    if (error.status == 0 || error.status == 500) {
      this.modalService.sendHttpErrorFlag(true);
      return null;
    }
    return error;
  }
}
