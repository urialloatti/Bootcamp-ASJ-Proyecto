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

  @Input()
  isUpdating: boolean = false;
  @Input()
  elementId!: number;

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
        this.isUpdating
          ? (this.modalTitle = 'Actualizar rubro')
          : (this.modalTitle = 'Nuevo rubro');
        this.modalInputLabel = 'Rubro';
        this.alreadyExistsMessage = 'El rubro ya existe.';
        break;
      case 'category':
        this.isUpdating
          ? (this.modalTitle = 'Actualizar categoría')
          : (this.modalTitle = 'Nueva categoría');
        this.modalInputLabel = 'Categoría';
        this.alreadyExistsMessage = 'La categoría ya existe.';
        break;
    }
    if (this.isUpdating) {
      this.smallCrudsService
        .getElementById(this.elementId, this.currentCreate)
        .subscribe((response) => (this.elementName = response.data.name));
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
      this.smallCrudsService
        .existsByName(capitalizedName, this.currentCreate)
        .subscribe((exists) => {
          this.elementExist = exists;
          if (!exists) {
            if (this.isUpdating) {
              this.smallCrudsService
                .updateElement(
                  this.elementId,
                  capitalizedName,
                  this.currentCreate
                )
                .subscribe(() => {
                  this.elementAddedMessage =
                    this.currentCreate == 'sector'
                      ? 'Rubro actualizado con éxito'
                      : 'Categoría actualizada con éxito';
                  setTimeout(() => this.sendResponse(true), 1000);
                });
            } else {
              this.smallCrudsService
                .addElement(capitalizedName, this.currentCreate)
                .subscribe((r) => {
                  this.elementAddedMessage =
                    this.currentCreate == 'sector'
                      ? 'Rubro creado con éxito'
                      : 'Categoría creada con éxito';
                  setTimeout(() => this.sendResponse(true), 1000);
                });
            }
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
