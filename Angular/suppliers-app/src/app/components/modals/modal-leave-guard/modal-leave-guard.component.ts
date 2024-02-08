import { Component } from '@angular/core';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'modal-leave-guard',
  templateUrl: './modal-leave-guard.component.html',
  styleUrl: './modal-leave-guard.component.css',
})
export class ModalLeaveGuardComponent {
  constructor(private modalService: ModalService) {}

  triedToEscape: boolean = false;

  backClick() {
    this.triedToEscape = true;
    setTimeout(() => (this.triedToEscape = false), 250);
  }

  sendResponse(response: boolean): void {
    this.modalService.sendConfirmLeaveNext(response);
  }
}
