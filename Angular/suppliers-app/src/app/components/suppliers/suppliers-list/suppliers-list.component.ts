import { Component, OnInit } from '@angular/core';

import { ListTemplateInterface } from '../../../interfaces/listTemplateInterface';
import { SupplierResponseDTO } from '../../../interfaces/supplierInterface';
import { SuppliersService } from '../../../services/suppliers.service';
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
    private suppliersService: SuppliersService,
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
        field: 'Datos de contacto',
        keys: [{ key: 'contact', extras: 'contactName', isNumeric: false }],
        toolTip: [
          { key: 'contact', extras: 'contactPhone', isNumeric: false },
          { key: 'contact', extras: 'contactMails', isNumeric: false },
        ],
      },
      {
        field: 'Página web',
        keys: [{ key: 'web', isNumeric: false }],
      },
      {
        field: 'Ubicación',
        keys: [
          { key: 'fullAddress', extras: 'country', isNumeric: false },
          { key: 'fullAddress', extras: 'province', isNumeric: false },
        ],
      },
      {
        field: 'Código',
        keys: [{ key: 'code', isNumeric: false }],
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
      deleted = response.data;
      this.modalConfirmObject = {
        header: `Eliminando proveedor ${deleted.code}`,
        message: `Está seguro de eliminar el proveedor ${deleted.brand}?`,
        cancel: 'Cancelar',
        confirm: 'Eliminar',
      };
      this.modalConfirmFlag = true;
      let subscription = this.confirmService.confirmModal$.subscribe(
        (confirmed) => {
          this.modalConfirmFlag = false;
          if (confirmed) {
            this.suppliersService.cancelElementById(id).subscribe({
              next: (apiResponse) => {
                let response = apiResponse.data;
                this.modalMessageObject = {
                  header: `Proveedor ${response.brand} eliminado con éxito.`,
                  confirm: 'Aceptar',
                };
                this.modalMessageFlag = true;
                this.suppliersService.getList().subscribe();
              },
              error: (error) => {
                this.modalMessageObject = {
                  header: error.error.message,
                  confirm: 'Aceptar',
                };
                this.modalMessageFlag = true;
                console.error(error);
              },
              complete: () => subscription.unsubscribe(),
            });
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
