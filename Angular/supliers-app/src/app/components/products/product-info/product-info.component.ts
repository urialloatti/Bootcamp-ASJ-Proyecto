import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductsService } from '../../../services/products.service';
import {
  ModalConfirmInterface,
  ModalRedirectInterface,
} from '../../../interfaces/modalInterface';
import { ProductInterface } from '../../../interfaces/productInterface';
import { ModalsService } from '../../../services/modal-confirm.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css',
})
export class ProductInfoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private confirmService: ModalsService
  ) {}

  currentProduct!: ProductInterface;
  modalConfirmFlag: boolean = false;
  modalConfirmObject!: ModalConfirmInterface;
  modalRedirectFlag: boolean = false;
  modalRedirectObject!: ModalRedirectInterface;

  ngOnInit(): void {
    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      if (id) {
        this.productService
          .getElementById(parseInt(id))
          .subscribe((response) => {
            this.currentProduct = response;
          });
      }
    });
  }

  deleteProduct(id: number): void {
    this.modalConfirmObject = {
      header: `Eliminando producto ${this.currentProduct.code}`,
      message: `Está seguro de eliminar el producto ${this.currentProduct.name}`,
      cancel: 'Cancelar',
      confirm: 'Eliminar',
    };
    this.modalConfirmFlag = true;
    this.confirmService.confirm$.subscribe((confirmation) => {
      this.modalConfirmFlag = false;
      if (confirmation) {
        this.currentProduct.isAvailable = false;
        this.productService.cancelElementById(id).subscribe(
          (response) => {
            this.modalRedirectObject = {
              message: `Producto ${response.name} eliminado con éxito.`,
              path: '/products',
            };
            this.modalRedirectFlag = true;
          },
          (error) => {
            this.modalRedirectObject = {
              message: `Producto ${this.currentProduct.name} ya no se encuentra en la base de datos.`,
              path: '/products',
            };
            this.modalRedirectFlag = true;
            console.log(error);
          }
        );
      }
    });
  }

  imageNotFound(event: Event): void {
    (event.target as HTMLImageElement).src =
      '../../../../assets/image-not-found.jpg';
  }
}
