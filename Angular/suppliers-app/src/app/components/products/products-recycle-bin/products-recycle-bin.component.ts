import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ModalService } from '../../../services/modal.service';
import { ProductsService } from '../../../services/products.service';

import { ListTemplateInterface } from '../../../interfaces/listTemplateInterface';
import {
  ModalConfirmInterface,
  ModalMessageInterface,
} from '../../../interfaces/modalInterface';
import { ProductResponseDTO } from '../../../interfaces/productInterface';

@Component({
  selector: 'app-products-recycle-bin',
  templateUrl: './products-recycle-bin.component.html',
  styleUrl: './products-recycle-bin.component.css',
})
export class ProductsRecycleBinComponent {
  constructor(
    private productsService: ProductsService,
    private confirmService: ModalService
  ) {}

  productsFields: ListTemplateInterface = {
    section: 'products',
    label: 'productos eliminados',
    listFields: [
      { field: 'Proveedor', keys: [{ key: 'supplier', isNumeric: false }] },
      { field: 'Nombre', keys: [{ key: 'name', isNumeric: false }] },
      { field: 'Categoría', keys: [{ key: 'category', isNumeric: false }] },
      { field: 'SKU', keys: [{ key: 'code', isNumeric: false }] },
    ],
  };
  modalConfirmFlag: boolean = false;
  modalConfirmObject!: ModalConfirmInterface;
  modalMessageFlag: boolean = false;
  modalMessageObject!: ModalMessageInterface;
  isListLoaded: boolean = false;
  productsList$!: Observable<ProductResponseDTO[]>;

  ngOnInit(): void {
    this.productsList$ = this.productsService.getListDeleted();
  }

  restoreProduct(id: number): void {
    let deleted: ProductResponseDTO;
    this.productsService.getElementById(id).subscribe((response) => {
      deleted = response.data;
      this.modalConfirmObject = {
        header: `Eliminando producto`,
        message: `Está seguro de que desea restaurar ${deleted.name}?`,
        cancel: 'Cancelar',
        confirm: 'Restaurar',
      };
      this.modalConfirmFlag = true;
      let subscription = this.confirmService.confirmModal$.subscribe(
        (confirmed) => {
          this.modalConfirmFlag = false;
          if (confirmed) {
            this.productsService.restoreElementByIdB(id).subscribe({
              next: (response) => {
                this.modalMessageObject = {
                  header: `Producto ${response.data.name} recuperado con éxito.`,
                  confirm: 'Aceptar',
                };
                this.modalMessageFlag = true;
              },
              error: (error) => {
                this.modalMessageObject = {
                  header: 'Error!',
                  message: error.error.message,
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

  public hideModal(): void {
    this.modalMessageFlag = false;
  }
}
