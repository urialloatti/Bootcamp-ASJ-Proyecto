import { Component, OnInit } from '@angular/core';

import { ListTemplateInterface } from '../../../interfaces/listTemplateInterface';
import { SupplierResponseDTO } from '../../../interfaces/supplierInterface';
import { suppliersService } from '../../../services/suppliers.service';
import { ModalService } from '../../../services/modal.service';
import {
  ModalConfirmInterface,
  ModalMessageInterface,
} from '../../../interfaces/modalInterface';
import { Observable } from 'rxjs';

@Component({
  selector: 'suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrl: './suppliers-list.component.css',
})
export class suppliersListComponent implements OnInit {
  constructor(
    private suppliersService: suppliersService,
    private confirmService: ModalService
  ) {}

  suppliersArray!: SupplierResponseDTO[];
  supplierList$!: Observable<SupplierResponseDTO[]>;
  suppliersFields: ListTemplateInterface = {
    section: 'suppliers',
    label: 'proveedores',
    listFields: [
      { field: 'Razón social', keys: [{ key: 'brand', isNumeric: false }] },
      {
        field: 'Nombre',
        keys: [{ key: 'contact', extras: 'contactName', isNumeric: false }],
      },
      {
        field: 'Datos de contacto',
        keys: [
          { key: 'contact', extras: 'contactPhone', isNumeric: false },
          { key: 'contact', extras: 'contactMails', isNumeric: false },
          { key: 'web', isNumeric: false },
        ],
      },
    ],
  };
  modalConfirmFlag: boolean = false;
  modalConfirmObject!: ModalConfirmInterface;
  modalMessageFlag: boolean = false;
  modalMessageObject!: ModalMessageInterface;

  ngOnInit(): void {
    this.supplierList$ = this.suppliersService.getList();
  }

  deletesupplier(id: number): void {
    let deleted: SupplierResponseDTO;
    this.suppliersService.getElementById(id).subscribe((response) => {
      deleted = response;
      this.modalConfirmObject = {
        header: `Eliminando proveedor ${deleted.code}`,
        message: `Está seguro de eliminar el proveedor ${deleted.brand}?`,
        cancel: 'Cancelar',
        confirm: 'Eliminar',
      };
      this.modalConfirmFlag = true;
      let subscription = this.confirmService.confirm$.subscribe(
        (confirmation) => {
          this.modalConfirmFlag = false;
          if (confirmation) {
            deleted.available = false;
            this.suppliersService.cancelElementById(id).subscribe(
              (response) => {
                this.modalMessageObject = {
                  message: `Proveedor ${response.brand} eliminado con éxito.`,
                  confirm: 'Aceptar',
                };
                this.modalMessageFlag = true;
                this.suppliersService.getList().subscribe();
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
          } else {
            subscription.unsubscribe();
          }
        }
      );
    });
  }

  hideModal(): void {
    this.modalMessageFlag = false;
  }
}
