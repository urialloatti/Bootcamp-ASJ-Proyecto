import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ProductInterface } from '../../../interfaces/productInterface';
import { ProductsService } from '../../../services/products.service';
import { SuplierInterface } from '../../../interfaces/suplierInterface';
import { SupliersService } from '../../../services/supliers.service';
import {
  ModalMessageInterface,
  ModalRedirectInterface,
} from '../../../interfaces/modalInterface';
import { Title } from '@angular/platform-browser';
import { ModalService } from '../../../services/modal.service';
import { CategoriesService } from '../../../services/categories.service';
import { CategoryInterface } from '../../../interfaces/smallCrudsInterfaces';

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
    private categoryService: CategoriesService,
    private productService: ProductsService,
    private suplierService: SupliersService
  ) {}

  currentProduct: ProductInterface = {
    category: 'Otro',
    description: '',
    name: '',
    picture: '',
    price: 0,
    suplierId: -1,
  };
  isProductInvalid: any = {
    category: false,
    description: false,
    name: false,
    price: false,
    suplierId: false,
  };
  supliersList: SuplierInterface[] = [];
  categories: CategoryInterface[] = [];
  flagNewProductCreated: boolean = false;
  modalMessageFlag: boolean = false;
  modalMessageObject!: ModalMessageInterface;
  modalRedirectFlag: boolean = false;
  modalRedirectObject!: ModalRedirectInterface;
  isUpdating: boolean = false;
  isCreatingCategory: boolean = false;

  ngOnInit(): void {
    this.suplierService.getList().subscribe((supList) => {
      this.supliersList = supList;
    });
    this.categoryService
      .getList()
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
      let suplierName =
        this.supliersList.find(
          (suplier) => suplier.id == this.currentProduct.suplierId
        )?.brand || 'Otro';
      this.currentProduct.suplier = suplierName;
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
      this.categoryService
        .getList()
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
    this.isProductInvalid.suplierId = this.currentProduct.suplierId == -1;
  }

  hideModal(): void {
    this.modalMessageFlag = false;
  }
}
