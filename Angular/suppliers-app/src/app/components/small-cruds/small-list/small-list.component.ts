import { Component, OnInit } from '@angular/core';
import {
  Page,
  SmallCrudInterface,
  smallCrudsType,
} from '../../../interfaces/smallCrudsInterfaces';
import {
  ModalConfirmInterface,
  ModalMessageInterface,
} from '../../../interfaces/modalInterface';
import { SmallCrudsService } from '../../../services/small-cruds.service';
import { ModalService } from '../../../services/modal.service';

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
  public currentCreate: smallCrudsType = 'category';

  ngOnInit(): void {
    this.loadList('Categoría');
    this.loadList('Rubro');
  }

  loadList(page: Page) {
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

  deleteItem(page: Page, id: number) {
    let deleted: SmallCrudInterface;
    let crudType: smallCrudsType = page == 'Categoría' ? 'category' : 'sector';
    this.smallCrudsService.getElementById(id, crudType).subscribe((element) => {
      deleted = element;
      this.modalConfirmObject = {
        header: `Eliminando ${page.toLowerCase()}.`,
        message: `Está seguro de eliminar ${deleted.name}?`,
        cancel: 'Cancelar',
        confirm: 'Eliminar',
      };
      this.modalConfirmFlag = true;
      let subscription = this.modalService.confirm$.subscribe(
        (confirmation) => {
          this.modalConfirmFlag = false;
          if (confirmation) {
            this.smallCrudsService
              .cancelElementById(id, crudType)
              .subscribe((response) => {
                let deletedWord =
                  page == 'Categoría' ? 'eliminada' : 'eliminado';
                this.modalMessageObject = {
                  message: `${page} "${response.name}" ${deletedWord} con éxito.`,
                  confirm: 'Aceptar',
                };
                this.modalMessageFlag = true;
                this.loadList(page);
              });
          } else subscription.unsubscribe();
        }
      );
    });
  }

  createNew(page: Page) {
    this.currentCreate = page == 'Categoría' ? 'category' : 'sector';
    this.isCreatingNew = true;
    let subsciption = this.modalService.confirm$.subscribe(() => {
      this.loadList(page);
      this.isCreatingNew = false;
      subsciption.unsubscribe();
    });
  }

  hideModal(): void {
    this.modalMessageFlag = false;
  }
}

interface ListIterator {
  isLoaded: boolean;
  section: Page;
  itemsList: SmallCrudInterface[];
}
