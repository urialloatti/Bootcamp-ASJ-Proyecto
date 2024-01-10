import { Component, Input, OnInit } from '@angular/core';
import {
  CategoryInterface,
  SectorInterface,
  smallCrudsType,
} from '../../../interfaces/smallCrudsInterfaces';
import { SectorService } from '../../../services/sector.service';
import { CategoriesService } from '../../../services/categories.service';
import { ModalService } from '../../../services/modal.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-modal-new',
  templateUrl: './modal-new.component.html',
  styleUrl: './modal-new.component.css',
})
export class ModalNewComponent implements OnInit {
  constructor(
    private sectorService: SectorService,
    private categoryService: CategoriesService,
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
      switch (this.currentCreate) {
        case 'sector':
          this.sectorService.getList().subscribe((list) => {
            for (let element of list) {
              if (
                element.sector.toLocaleLowerCase() ==
                this.elementName.toLocaleLowerCase()
              ) {
                this.elementExist = true;
              }
            }
            if (!this.elementExist) {
              this.sectorService.addElement(capitalizedName).subscribe((r) => {
                this.elementAddedMessage = 'Rubro creado con éxito';
                setTimeout(() => this.sendResponse(true), 1000);
              });
            }
          });
          break;
        case 'category':
          this.categoryService.getList().subscribe((list) => {
            for (let element of list) {
              if (
                element.category.toLocaleLowerCase() ==
                this.elementName.toLocaleLowerCase()
              ) {
                this.elementExist = true;
              }
            }
            if (!this.elementExist) {
              this.categoryService.addElement(capitalizedName).subscribe(() => {
                this.sendResponse(true);
              });
            }
          });
          break;
      }
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
