import { Component, OnInit } from '@angular/core';

import { ListTemplateInterface } from '../../../interfaces/listTemplateInterface';
import { SuplierInterface } from '../../../interfaces/suplierInterface';
import { SupliersService } from '../../../services/supliers.service';
import { ModalsService } from '../../../services/modal-confirm.service';
import {
  ModalConfirmInterface,
  ModalMessageInterface,
} from '../../../interfaces/modalInterface';

@Component({
  selector: 'supliers-list',
  templateUrl: './supliers-list.component.html',
  styleUrl: './supliers-list.component.css',
})
export class SupliersListComponent implements OnInit {
  constructor(
    private supliersService: SupliersService,
    private confirmService: ModalsService
  ) {}
  supliersArray!: SuplierInterface[];
  supliersFields: ListTemplateInterface = {
    section: 'supliers',
    label: 'proveedores',
    listFields: [
      { field: 'Razón social', keys: [{ key: 'brand' }] },
      { field: 'Nombre', keys: [{ key: 'contact', extras: 'contactName' }] },
      {
        field: 'Datos de contacto',
        keys: [
          { key: 'contact', extras: 'contactPhone' },
          { key: 'contact', extras: 'contactMails' },
          { key: 'web' },
        ],
      },
    ],
  };
  isListLoaded: boolean = false;
  modalConfirmFlag: boolean = false;
  modalConfirmObject!: ModalConfirmInterface;
  modalMessageFlag: boolean = false;
  modalMessageObject!: ModalMessageInterface;

  ngOnInit(): void {
    this.supliersService.getList().subscribe((response) => {
      this.supliersArray = response;
      this.isListLoaded = true;
    });
  }

  deleteSuplier(id: number): void {
    let deleted: SuplierInterface;
    this.supliersService.getElementById(id).subscribe((response) => {
      deleted = response;
      this.modalConfirmObject = {
        header: `Eliminando proveedor ${deleted.code}`,
        message: `Está seguro de eliminar el proveedor ${deleted.brand}`,
        cancel: 'Cancelar',
        confirm: 'Eliminar',
      };
      this.modalConfirmFlag = true;
      this.confirmService.confirm$.subscribe((confirmation) => {
        this.modalConfirmFlag = false;
        if (confirmation) {
          deleted.isAvailable = false;
          this.supliersService.cancelElementById(id).subscribe(
            (response) => {
              this.modalMessageObject = {
                message: `Proveedor ${response.brand} eliminado con éxito.`,
                confirm: 'Aceptar',
              };
              this.modalMessageFlag = true;
              this.supliersService.getList().subscribe((response) => {
                this.supliersArray = response;
              });
            },
            (error) => {
              this.modalMessageObject = {
                message: `El proveedor ya no existe en la base de datos.`,
                confirm: 'Aceptar',
              };
              this.modalMessageFlag = true;
              console.log(error);
            }
          );
        }
      });
    });
  }

  hideModal(): void {
    this.modalMessageFlag = false;
  }
}
