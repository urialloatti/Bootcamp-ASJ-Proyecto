import { Component, Input, OnInit } from '@angular/core';

import { smallCrudsType } from '../../../interfaces/smallCrudsInterfaces';
import { ModalService } from '../../../services/modal.service';
import { SmallCrudsService } from '../../../services/small-cruds.service';

@Component({
  selector: 'app-modal-new',
  templateUrl: './modal-new.component.html',
  styleUrl: './modal-new.component.css',
})
export class ModalNewComponent implements OnInit {
  constructor(
    private smallCrudsService: SmallCrudsService,
    private modalService: ModalService
  ) {}

  @Input()
  currentCreate: smallCrudsType = 'sector';

  modalTitle!: string;
  modalInputLabel!: string;
  alreadyExistsMessage!: string;
  elementName: string = '';
  triedToEscape: boolean = false;
  isElementInvalid: boolean = false;
  elementExist: boolean = false;
  elementAddedMessage: string = '';

  ngOnInit(): void {
    switch (this.currentCreate) {
      case 'sector':
        this.modalTitle = 'Nuevo rubro';
        this.modalInputLabel = 'Rubro';
        this.alreadyExistsMessage = 'El rubro ya existe.';
        break;
      case 'category':
        this.modalTitle = 'Nueva categoría';
        this.modalInputLabel = 'Categoría';
        this.alreadyExistsMessage = 'La categoría ya existe.';
        break;
    }
  }

  backClick() {
    this.triedToEscape = true;
    setTimeout(() => (this.triedToEscape = false), 250);
    console.log(crypto.randomUUID());
  }

  addElement(): void {
    this.validateInput();
    if (!this.isElementInvalid) {
      this.elementExist = false;
      let capitalizedName =
        this.elementName.charAt(0).toUpperCase() + this.elementName.slice(1);
      this.smallCrudsService.getList(this.currentCreate).subscribe((list) => {
        for (let element of list) {
          if (
            element.name.toLocaleLowerCase() ==
            this.elementName.toLocaleLowerCase()
          ) {
            this.elementExist = true;
          }
        }
        if (!this.elementExist) {
          this.smallCrudsService
            .addElement(this.currentCreate, capitalizedName)
            .subscribe((r) => {
              this.elementAddedMessage =
                this.currentCreate == 'sector'
                  ? 'Rubro creado con éxito'
                  : 'Categoría creada con éxito';
              setTimeout(() => this.sendResponse(true), 1000);
            });
        }
      });
    }
  }

  validateInput() {
    this.isElementInvalid =
      this.elementName.length < 4 || this.elementName.length > 25;
  }

  sendResponse(response: boolean) {
    this.modalService.confirmSubject.next(response);
  }
}
