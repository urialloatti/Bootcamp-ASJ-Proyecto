import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ModalService } from '../../../services/modal.service';
import { ProductsService } from '../../../services/products.service';

import {
  ModalConfirmInterface,
  ModalRedirectInterface,
} from '../../../interfaces/modalInterface';
import { ProductResponseDTO } from '../../../interfaces/productInterface';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css',
})
export class ProductInfoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private router: Router,

    private confirmService: ModalService,
    private productService: ProductsService
  ) {}

  currentProduct!: ProductResponseDTO;
  isLoaded: boolean = false;
  modalConfirmFlag: boolean = false;
  modalConfirmObject!: ModalConfirmInterface;
  modalRedirectFlag: boolean = false;
  modalRedirectObject!: ModalRedirectInterface;

  ngOnInit(): void {
    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      if (id !== null && !isNaN(Number(id))) {
        this.productService.getElementById(parseInt(id)).subscribe(
          (response) => {
            this.currentProduct = response.data;
            this.isLoaded = true;
            this.titleService.setTitle(response.data.name);
          },
          (error) => {
            this.modalRedirectObject = {
              header: 'Error',
              message: error.error.message,
              path: '/products',
            };
            this.modalRedirectFlag = true;
            console.error(error);
          }
        );
      } else {
        this.router.navigateByUrl('404');
      }
    });
  }

  public deleteProduct(id: number): void {
    this.modalConfirmObject = {
      header: `Eliminando producto ${this.currentProduct.code}`,
      message: `Está seguro de eliminar el producto ${this.currentProduct.name}`,
      cancel: 'Cancelar',
      confirm: 'Eliminar',
    };
    this.modalConfirmFlag = true;
    this.confirmService.confirmModal$.subscribe((confirmation) => {
      this.modalConfirmFlag = false;
      if (confirmation) {
        this.productService.cancelElementByIdB(id).subscribe(
          (response) => {
            this.modalRedirectObject = {
              header: `Producto ${response.data.name} eliminado con éxito.`,
              path: '/products',
            };
            this.modalRedirectFlag = true;
          },
          (error) => {
            this.modalRedirectObject = {
              header: 'Error',
              message: error.error.message,
              path: '/products',
            };
            this.modalRedirectFlag = true;
            console.error(error);
          }
        );
      }
    });
  }

  public imageNotFound(event: Event): void {
    (event.target as HTMLImageElement).src =
      '../../../../assets/image-not-found.jpg';
  }
}
