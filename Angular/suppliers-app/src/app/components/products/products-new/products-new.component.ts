import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import {
  ModalMessageInterface,
  ModalRedirectInterface,
} from '../../../interfaces/modalInterface';
import { ProductInterface } from '../../../interfaces/productInterface';
import { SmallCrudInterface } from '../../../interfaces/smallCrudsInterfaces';
import { supplierInterface } from '../../../interfaces/supplierInterface';

import { ModalService } from '../../../services/modal.service';
import { ProductsService } from '../../../services/products.service';
import { SmallCrudsService } from '../../../services/small-cruds.service';
import { suppliersService } from '../../../services/suppliers.service';

@Component({
  selector: 'products-new',
  templateUrl: './products-new.component.html',
  styleUrl: './products-new.component.css',
})
export class ProductsNewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private titleService: Title,

    private modalService: ModalService,
    private productService: ProductsService,
    private smallCrudsService: SmallCrudsService,
    private supplierService: suppliersService
  ) {}

  currentProduct: ProductInterface = {
    category: 'Otro',
    description: '',
    name: '',
    picture: '',
    price: 0,
    supplierId: -1,
  };
  isProductInvalid: any = {
    category: false,
    description: false,
    name: false,
    price: false,
    supplierId: false,
  };
  suppliersList: supplierInterface[] = [];
  categories: SmallCrudInterface[] = [];
  flagNewProductCreated: boolean = false;
  modalMessageFlag: boolean = false;
  modalMessageObject!: ModalMessageInterface;
  modalRedirectFlag: boolean = false;
  modalRedirectObject!: ModalRedirectInterface;
  isUpdating: boolean = false;
  isCreatingCategory: boolean = false;

  ngOnInit(): void {
    this.productService.updateCounter();
    this.supplierService.getList().subscribe((supList) => {
      this.suppliersList = supList;
    });
    this.smallCrudsService
      .getList('category')
      .subscribe((catList) => (this.categories = catList));
    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      if (id !== null) {
        this.productService.getElementById(parseInt(id!)).subscribe(
          (response) => {
            this.currentProduct = response;
            this.titleService.setTitle(`Editar ${response.name}`);
            this.isUpdating = true;
          },
          (error) => {
            this.modalRedirectObject = {
              message: 'Producto no encontrado',
              path: '/products',
            };
            this.modalRedirectFlag = true;
            console.error(error);
          }
        );
      }
    });
  }

  saveProduct() {
    let isFormValid = true;
    this.validateSubmite();
    Object.keys(this.isProductInvalid).forEach((key) => {
      if (isFormValid && this.isProductInvalid[key]) {
        this.modalMessageObject = {
          message: `Hay errores en el formulario.`,
          confirm: 'Continuar editando',
        };
        this.modalMessageFlag = true;
        isFormValid = false;
      }
    });
    if (isFormValid) {
      let supplierName =
        this.suppliersList.find(
          (supplier) => supplier.id == this.currentProduct.supplierId
        )?.brand || 'Otro';
      this.currentProduct.supplier = supplierName;
      if (this.isUpdating) {
        this.productService.updateElement(this.currentProduct).subscribe();
      } else {
        this.currentProduct.isAvailable = true;
        this.productService.addElement(this.currentProduct).subscribe();
      }
      this.modalRedirectObject = {
        message: 'Producto cargado con éxito.',
        path: '/products',
      };
      this.modalRedirectFlag = true;
    }
  }

  createNewCategory() {
    this.isCreatingCategory = true;
    let subsciption = this.modalService.confirm$.subscribe(() => {
      this.smallCrudsService
        .getList('category')
        .subscribe((catList) => (this.categories = catList));
      this.isCreatingCategory = false;
      subsciption.unsubscribe();
    });
  }
  validateSubmite() {
    this.isProductInvalid.name =
      this.currentProduct.name.length < 4 ||
      this.currentProduct.name.length > 40;
    this.isProductInvalid.description =
      this.currentProduct.description.length < 1 ||
      this.currentProduct.description.length > 500;
    this.isProductInvalid.price = this.currentProduct.price < 1;
    this.isProductInvalid.category = this.currentProduct.category == 'Otro';
    this.isProductInvalid.supplierId = this.currentProduct.supplierId == -1;
  }

  hideModal(): void {
    this.modalMessageFlag = false;
  }
}
