import { Component, OnInit } from '@angular/core';

import { SmallCrudsService } from '../../../services/small-cruds.service';
import { ModalService } from '../../../services/modal.service';

import {
  Page,
  SmallCrudInterface,
  smallCrudsType,
} from '../../../interfaces/smallCrudsInterfaces';
import {
  ModalConfirmInterface,
  ModalMessageInterface,
} from '../../../interfaces/modalInterface';

@Component({
  selector: 'app-small-list',
  templateUrl: './small-list.component.html',
  styleUrl: './small-list.component.css',
})
export class SmallListComponent implements OnInit {
  constructor(
    private smallCrudsService: SmallCrudsService,
    private modalService: ModalService
  ) {}

  public listCreationObject: ListIterator[] = [
    { isLoaded: false, section: 'Rubro', itemsList: [] },
    { isLoaded: false, section: 'Categoría', itemsList: [] },
  ];

  public modalConfirmFlag: boolean = false;
  public modalConfirmObject!: ModalConfirmInterface;
  public modalMessageFlag: boolean = false;
  public modalMessageObject!: ModalMessageInterface;
  public isCreatingNew: boolean = false;
  public isUpdating: boolean = false;
  public updatingId: number = -1;
  public currentCreate: smallCrudsType = 'category';

  ngOnInit(): void {
    this.loadList('Categoría');
    this.loadList('Rubro');
  }

  public deleteItem(page: Page, id: number) {
    let deleted: SmallCrudInterface;
    let crudType: smallCrudsType = page == 'Categoría' ? 'category' : 'sector';
    this.smallCrudsService.getElementById(id, crudType).subscribe((element) => {
      deleted = element.data;
      this.modalConfirmObject = {
        header: `Eliminando ${page.toLowerCase()}.`,
        message: `Está seguro de eliminar ${deleted.name}?`,
        cancel: 'Cancelar',
        confirm: 'Eliminar',
      };
      this.modalConfirmFlag = true;
      let subscription = this.modalService.confirmModal$.subscribe(
        (confirmation) => {
          this.modalConfirmFlag = false;
          if (confirmation) {
            this.smallCrudsService.cancelElementById(id, crudType).subscribe(
              (apiResponse) => {
                let response = apiResponse.data;
                let deletedWord =
                  page == 'Categoría' ? 'eliminada' : 'eliminado';
                this.modalMessageObject = {
                  header: `${page} "${response.name}" ${deletedWord} con éxito.`,
                  confirm: 'Aceptar',
                };
                this.modalMessageFlag = true;
                this.loadList(page);
              },
              (error) => console.error(error)
            );
          } else subscription.unsubscribe();
        }
      );
    });
  }

  public createNew(page: Page) {
    this.currentCreate = page == 'Categoría' ? 'category' : 'sector';
    this.isCreatingNew = true;
    let subsciption = this.modalService.confirmModal$.subscribe(() => {
      this.loadList(page);
      this.isCreatingNew = false;
      subsciption.unsubscribe();
    });
  }

  public updateElement(page: Page, id: number) {
    this.currentCreate = page == 'Categoría' ? 'category' : 'sector';
    this.updatingId = id;
    this.isUpdating = true;
    let subsciption = this.modalService.confirmModal$.subscribe(() => {
      this.loadList(page);
      this.isUpdating = false;
      subsciption.unsubscribe();
    });
  }

  public hideModal(): void {
    this.modalMessageFlag = false;
  }

  private loadList(page: Page) {
    if (page == 'Categoría') {
      this.smallCrudsService.getList('category').subscribe((list) => {
        for (let section of this.listCreationObject) {
          if (section.section == 'Categoría') {
            section.itemsList = list;
            section.isLoaded = true;
          }
        }
      });
    } else {
      this.smallCrudsService.getList('sector').subscribe((list) => {
        for (let section of this.listCreationObject) {
          if (section.section == 'Rubro') {
            section.itemsList = list;
            section.isLoaded = true;
          }
        }
      });
    }
  }
}

interface ListIterator {
  isLoaded: boolean;
  section: Page;
  itemsList: SmallCrudInterface[];
}
