import { Component, Input } from '@angular/core';
import { ModalInterface } from '../../../interfaces/modalInterface';

@Component({
  selector: 'shared-modal-saved',
  templateUrl: './modal-saved.component.html',
  styleUrl: './modal-saved.component.css',
})
export class ModalSavedComponent {
  @Input()
  public modalData!: ModalInterface;
}
