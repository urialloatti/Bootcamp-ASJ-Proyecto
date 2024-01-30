import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import {
  ModalMessageInterface,
  ModalRedirectInterface,
} from '../../../interfaces/modalInterface';
import {
  ProductInterface,
  ProductRequestDTO,
} from '../../../interfaces/productInterface';
import { SmallCrudInterface } from '../../../interfaces/smallCrudsInterfaces';
import { SupplierResponseDTO } from '../../../interfaces/supplierInterface';

import { ModalService } from '../../../services/modal.service';
import { ProductsService } from '../../../services/products.service';
import { SmallCrudsService } from '../../../services/small-cruds.service';
import { SuppliersService } from '../../../services/suppliers.service';

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
    private supplierService: SuppliersService
  ) {}

  currentProductId!: number;
  currentProduct: ProductRequestDTO = {
    categoryId: -1,
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

  suppliersList: SupplierResponseDTO[] = [];
  categories: SmallCrudInterface[] = [];

  isUpdating: boolean = false;
  isCreatingCategory: boolean = false;

  flagNewProductCreated: boolean = false;
  modalMessageFlag: boolean = false;
  modalMessageObject!: ModalMessageInterface;
  modalRedirectFlag: boolean = false;
  modalRedirectObject!: ModalRedirectInterface;

  ngOnInit(): void {
    this.supplierService.getList().subscribe((supList) => {
      this.suppliersList = supList;
    });
    this.smallCrudsService
      .getList('category')
      .subscribe((catList) => (this.categories = catList));
    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      if (id !== null && !isNaN(Number(id))) {
        this.currentProductId = Number(id);
        this.productService.getElementForUpdate(parseInt(id!)).subscribe(
          (response) => {
            this.currentProduct = response.data;
            this.titleService.setTitle(`Editar ${response.data.name}`);
            this.isUpdating = true;
          },
          (error) => {
            this.modalRedirectObject = {
              header: 'Producto no encontrado',
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
      if (this.isUpdating) {
        this.productService
          .updateElement(this.currentProductId, this.currentProduct)
          .subscribe(
            (response) => {
              this.modalRedirectObject = {
                header: 'Producto cargado con éxito.',
                path: '/products',
              };
              this.modalRedirectFlag = true;
            },
            (error) => {
              console.error(error.error.message);
              this.modalRedirectObject = {
                header: 'Hubo un error.',
                path: '/products',
              };
              this.modalRedirectFlag = true;
            }
          );
      } else {
        this.productService.addElement(this.currentProduct).subscribe(
          (response) => {
            this.modalRedirectObject = {
              header: 'Producto cargado con éxito.',
              path: '/products',
            };
            this.modalRedirectFlag = true;
          },
          (error) => {
            console.error(error.error.message);
            this.modalRedirectObject = {
              header: 'Hubo un error.',
              path: '/products',
            };
            this.modalRedirectFlag = true;
          }
        );
      }
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
    this.isProductInvalid.price =
      this.currentProduct.price === undefined || this.currentProduct.price < 1;
    this.isProductInvalid.category = this.currentProduct.categoryId == -1;
    this.isProductInvalid.supplierId = this.currentProduct.supplierId == -1;
  }

  hideModal(): void {
    this.modalMessageFlag = false;
  }
}
