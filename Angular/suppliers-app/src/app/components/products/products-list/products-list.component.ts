import { Component, OnInit } from '@angular/core';

import { ListTemplateInterface } from '../../../interfaces/listTemplateInterface';
import { ProductResponseDTO } from '../../../interfaces/productInterface';
import { ProductsService } from '../../../services/products.service';
import { ModalService } from '../../../services/modal.service';
import {
  ModalConfirmInterface,
  ModalMessageInterface,
} from '../../../interfaces/modalInterface';
import { Observable } from 'rxjs';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private confirmService: ModalService
  ) {}

  productsFields: ListTemplateInterface = {
    section: 'products',
    label: 'productos',
    listFields: [
      {
        field: 'Nombre',
        keys: [{ key: 'name', isNumeric: false }],
        toolTip: [{ key: 'description', isNumeric: false }],
      },
      { field: 'Categoría', keys: [{ key: 'category', isNumeric: false }] },
      { field: 'SKU', keys: [{ key: 'code', isNumeric: false }] },
      { field: 'Proveedor', keys: [{ key: 'supplier', isNumeric: false }] },
      {
        field: 'Precio',
        keys: [{ key: 'price', extras: 'Currency', isNumeric: true }],
      },
    ],
  };
  modalConfirmFlag: boolean = false;
  modalConfirmObject!: ModalConfirmInterface;
  modalMessageFlag: boolean = false;
  modalMessageObject!: ModalMessageInterface;
  isListLoaded: boolean = false;
  productsList$!: Observable<ProductResponseDTO[]>;

  ngOnInit(): void {
    this.productsList$ = this.productsService.getList();
  }

  public deleteProduct(id: number): void {
    let deleted: ProductResponseDTO;
    this.productsService.getElementById(id).subscribe((response) => {
      deleted = response.data;
      this.modalConfirmObject = {
        header: `Eliminando producto`,
        message: `Está seguro de que desea eliminar ${deleted.name}?`,
        cancel: 'Cancelar',
        confirm: 'Eliminar',
      };
      this.modalConfirmFlag = true;
      let subscription = this.confirmService.confirmModal$.subscribe(
        (confirmed) => {
          this.modalConfirmFlag = false;
          if (confirmed) {
            this.productsService.cancelElementByIdB(id).subscribe({
              next: (response) => {
                this.modalMessageObject = {
                  header: `Producto ${response.data.name} eliminado con éxito.`,
                  confirm: 'Aceptar',
                };
                this.modalMessageFlag = true;
                this.productsService.getList().subscribe();
              },
              error: (error) => {
                this.modalMessageObject = {
                  header: `Error!`,
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
