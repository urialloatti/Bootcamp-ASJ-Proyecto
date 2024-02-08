import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

import {
  ModalMessageInterface,
  ModalRedirectInterface,
} from '../../../interfaces/modalInterface';
import { ProductRequestDTO } from '../../../interfaces/productInterface';
import { SmallCrudInterface } from '../../../interfaces/smallCrudsInterfaces';
import { SupplierResponseDTO } from '../../../interfaces/supplierInterface';

import { ModalService } from '../../../services/modal.service';
import { ProductsService } from '../../../services/products.service';
import { SmallCrudsService } from '../../../services/small-cruds.service';
import { SuppliersService } from '../../../services/suppliers.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'products-new',
  templateUrl: './products-new.component.html',
  styleUrl: './products-new.component.css',
})
export class ProductsNewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,

    private modalService: ModalService,
    private productService: ProductsService,
    private smallCrudsService: SmallCrudsService,
    private supplierService: SuppliersService
  ) {}

  @ViewChild('myForm', { static: true }) myForm!: NgForm;
  formChangesCounter: number = 0;

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
  triedToLeave: boolean = false;

  ngOnInit(): void {
    this.modalService.setFormChanged(false);
    this.modalService.confirmLeave$.subscribe(
      (response) => (this.triedToLeave = response)
    );

    this.supplierService.getList().subscribe((supList) => {
      this.suppliersList = supList;
    });
    this.smallCrudsService
      .getList('category')
      .subscribe((catList) => (this.categories = catList));
    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      if (id !== null) {
        if (!isNaN(Number(id))) {
          this.isUpdating = true;
          this.loadProduct(id);
        } else this.router.navigateByUrl('/404');
      } else {
        setTimeout(() => {
          this.myForm.valueChanges?.subscribe(() => {
            this.formChangesCounter++;
            if (this.formChangesCounter > 2) {
              this.modalService.setFormChanged(true);
            }
          }),
            5;
        });
      }
    });
  }

  private loadProduct(id: string) {
    this.currentProductId = Number(id);
    this.productService.getElementForUpdate(parseInt(id!)).subscribe({
      next: (response) => {
        this.currentProduct = response.data;
        this.titleService.setTitle(`Editar ${response.data.name}`);
      },
      error: (error) => {
        this.modalRedirectObject = {
          header: 'Error',
          message: error.error.message,
          path: '/products',
        };
        this.modalRedirectFlag = true;
        console.error(error);
      },
      complete: () => {
        setTimeout(() => {
          this.myForm.valueChanges?.subscribe(() => {
            this.formChangesCounter++;
            if (this.formChangesCounter > 2) {
              this.modalService.setFormChanged(true);
            }
          }),
            500;
        });
      },
    });
  }

  public saveProduct() {
    let isFormValid = true;
    this.validateSubmite();
    Object.keys(this.isProductInvalid).forEach((key) => {
      if (isFormValid && this.isProductInvalid[key]) {
        this.modalMessageObject = {
          header: `Hay errores en el formulario.`,
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
          .subscribe({
            next: () => {
              this.modalRedirectObject = {
                header: 'Producto actualizado con éxito.',
                path: '/products',
              };
              this.modalRedirectFlag = true;
              this.modalService.setFormChanged(false);
            },
            error: (error) => this.handleError(error),
          });
      } else {
        this.productService.addElement(this.currentProduct).subscribe({
          next: () => {
            this.modalRedirectObject = {
              header: 'Producto cargado con éxito.',
              path: '/products',
            };
            this.modalRedirectFlag = true;
            this.modalService.setFormChanged(false);
          },
          error: (error) => this.handleError(error),
        });
      }
    }
  }

  public createNewCategory() {
    this.isCreatingCategory = true;
    let subsciption = this.modalService.confirmModal$.subscribe(() => {
      this.smallCrudsService
        .getList('category')
        .subscribe((catList) => (this.categories = catList));
      this.isCreatingCategory = false;
      subsciption.unsubscribe();
    });
  }

  private validateSubmite() {
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

  public hideModal(): void {
    this.modalMessageFlag = false;
  }

  private handleError(error: HttpErrorResponse): void {
    this.modalMessageObject = {
      header: 'Hubo errores con el formulario.',
      message: error.error.message,
      confirm: 'Continuar editando',
    };
    this.modalMessageFlag = true;
    console.error(error);
  }
}
