import { Component, OnInit } from '@angular/core';

import { ListTemplateInterface } from '../../../interfaces/listTemplateInterface';
import { ProductInterface } from '../../../interfaces/productInterface';
import { ProductsService } from '../../../services/products.service';
import { ModalsService } from '../../../services/modal-confirm.service';
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
    private confirmService: ModalsService
  ) {}

  productsArray!: ProductInterface[];
  productsFields: ListTemplateInterface = {
    section: 'products',
    label: 'productos',
    listFields: [
      { field: 'Nombre', keys: [{ key: 'name' }] },
      { field: 'Categoría', keys: [{ key: 'category' }] },
      { field: 'Proveedor', keys: [{ key: 'suplier' }] },
      { field: 'Precio', keys: [{ key: 'price', extras: 'Currency' }] },
    ],
  };
  modalConfirmFlag: boolean = false;
  modalConfirmObject!: ModalConfirmInterface;
  modalMessageFlag: boolean = false;
  modalMessageObject!: ModalMessageInterface;
  isListLoaded: boolean = false;
  productsList$!: Observable<ProductInterface[]>;

  ngOnInit(): void {
    this.productsList$ = this.productsService.getList();
    this.productsService.getList().subscribe((response) => {
      this.productsArray = response;
      this.isListLoaded = true;
    });
  }

  deleteProduct(id: number): void {
    let deleted: ProductInterface;
    this.productsService.getElementById(id).subscribe((response) => {
      deleted = response;
      this.modalConfirmObject = {
        header: `Eliminando producto`,
        message: `Está seguro de que desea eliminar ${deleted.name}?`,
        cancel: 'Cancelar',
        confirm: 'Eliminar',
      };
      this.modalConfirmFlag = true;
      this.confirmService.confirm$.subscribe((response) => {
        this.modalConfirmFlag = false;
        if (response) {
          deleted.isAvailable = false;
          this.productsService.cancelElementById(id).subscribe(
            (response) => {
              this.modalMessageObject = {
                message: `Producto ${response.name} eliminado con éxito.`,
                confirm: 'Aceptar',
              };
              this.modalMessageFlag = true;
              this.productsService.getList().subscribe((response) => {
                this.productsArray = response;
              });
            },
            (error) => {
              this.modalMessageObject = {
                message: `El producto ya no existe en la base de datos.`,
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
