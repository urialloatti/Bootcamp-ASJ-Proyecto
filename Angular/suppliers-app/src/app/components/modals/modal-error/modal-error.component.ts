import { Component, Input } from '@angular/core';
import { ModalRedirectInterface } from '../../../interfaces/modalInterface';
import { Router } from '@angular/router';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'modal-error',
  templateUrl: './modal-error.component.html',
  styleUrl: './modal-error.component.css',
})
export class ModalErrorComponent {
  constructor(private router: Router, private modalService: ModalService) {}
  @Input()
  public modalData!: ModalRedirectInterface;

  public redirect() {
    this.modalService.sendHttpErrorFlag(false);
    this.router.navigateByUrl(this.modalData.path);
  }
}
