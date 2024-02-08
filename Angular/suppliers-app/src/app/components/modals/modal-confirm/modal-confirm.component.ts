import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ModalConfirmInterface } from '../../../interfaces/modalInterface';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'shared-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrl: './modal-confirm.component.css',
})
export class ModalConfirmComponent {
  constructor(private modalService: ModalService) {}

  @Input()
  modalData!: ModalConfirmInterface;

  triedToEscape: boolean = false;

  backClick() {
    this.triedToEscape = true;
    setTimeout(() => (this.triedToEscape = false), 250);
  }

  sendResponse(response: boolean): void {
    this.modalService.openModal(response);
  }
}
