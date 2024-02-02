import { Observable } from 'rxjs';
import { ListTemplateInterface } from '../../../interfaces/listTemplateInterface';
import {
  ModalConfirmInterface,
  ModalMessageInterface,
} from '../../../interfaces/modalInterface';
import { SupplierResponseDTO } from '../../../interfaces/supplierInterface';
import { SuppliersService } from './../../../services/suppliers.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'suppliers-recycle-bin',
  templateUrl: './suppliers-recycle-bin.component.html',
  styleUrl: './suppliers-recycle-bin.component.css',
})
export class SuppliersRecycleBinComponent implements OnInit {
  constructor(
    private suppliersService: SuppliersService,
    private confirmService: ModalService
  ) {}

  suppliersArray!: SupplierResponseDTO[];
  supplierList$!: Observable<SupplierResponseDTO[]>;
  suppliersFields: ListTemplateInterface = {
    section: 'suppliers',
    label: 'proveedores eliminados',
    listFields: [
      { field: 'Razón social', keys: [{ key: 'brand', isNumeric: false }] },
      {
        field: 'Nombre',
        keys: [{ key: 'contact', extras: 'contactName', isNumeric: false }],
      },
    ],
  };
  modalConfirmFlag: boolean = false;
  modalConfirmObject!: ModalConfirmInterface;
  modalMessageFlag: boolean = false;
  modalMessageObject!: ModalMessageInterface;

  ngOnInit(): void {
    this.supplierList$ = this.suppliersService.getListDeleted();
  }

  restoreSupplier(id: number): void {
    let deleted: SupplierResponseDTO;
    this.suppliersService.getElementById(id).subscribe((response) => {
      deleted = response.data;
      this.modalConfirmObject = {
        header: `Eliminando proveedor ${deleted.code}`,
        message: `Está seguro de restaurar el proveedor ${deleted.brand}?`,
        cancel: 'Cancelar',
        confirm: 'Restaurar',
      };
      this.modalConfirmFlag = true;
      let subscription = this.confirmService.confirm$.subscribe((confirmed) => {
        this.modalConfirmFlag = false;
        if (confirmed) {
          deleted.available = false;
          this.suppliersService.restoreElementById(id).subscribe({
            next: (apiResponse) => {
              let response = apiResponse.data;
              this.modalMessageObject = {
                header: `Proveedor ${response.brand} recuperado con éxito.`,
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
      });
    });
  }

  hideModal(): void {
    this.modalMessageFlag = false;
  }
}
