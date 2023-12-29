import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalMessageInterface } from '../../../interfaces/modalInterface';

@Component({
  selector: 'shared-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrl: './modal-message.component.css',
})
export class ModalMessageComponent {
  @Input()
  public modalData!: ModalMessageInterface;

  @Output()
  modalViewed: EventEmitter<boolean> = new EventEmitter<boolean>();

  sendData(): void {
    this.modalViewed.emit(true);
  }
}
