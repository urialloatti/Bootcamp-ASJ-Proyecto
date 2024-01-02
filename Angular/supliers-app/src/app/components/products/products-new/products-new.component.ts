import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ProductInterface } from '../../../interfaces/productInterface';
import { ProductsService } from '../../../services/products.service';
import { SuplierInterface } from '../../../interfaces/suplierInterface';
import { SupliersService } from '../../../services/supliers.service';
import { ModalMessageInterface } from '../../../interfaces/modalInterface';

@Component({
  selector: 'products-new',
  templateUrl: './products-new.component.html',
  styleUrl: './products-new.component.css',
})
export class ProductsNewComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
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
  productValidator: any = {
    category: false,
    description: false,
    name: false,
    price: false,
    suplierId: false,
  };
  supliersList: SuplierInterface[] = [];
  flagNewProductCreated: boolean = false;
  modalMessageFlag: boolean = false;
  modalMessageObject!: ModalMessageInterface;
  isUpdating: boolean = false;

  ngOnInit(): void {
    this.suplierService.getList().subscribe((response) => {
      this.supliersList = response;
    });

    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      if (id != undefined) {
        this.productService
          .getElementById(parseInt(id))
          .subscribe((response) => {
            this.currentProduct = response;
          });
        this.isUpdating = true;
      }
    });
  }

  saveProduct() {
    let isFormValid = true;
    this.validateSubmite();
    Object.keys(this.productValidator).forEach((key) => {
      if (isFormValid && this.productValidator[key]) {
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
      this.flagNewProductCreated = true;
    }
  }

  validateSubmite() {
    this.currentProduct.name.length < 4 || this.currentProduct.name.length > 40
      ? (this.productValidator.name = true)
      : (this.productValidator.name = false);
    this.currentProduct.description.length < 1 ||
    this.currentProduct.description.length > 500
      ? (this.productValidator.description = true)
      : (this.productValidator.description = false);
    this.currentProduct.price < 1
      ? (this.productValidator.price = true)
      : (this.productValidator.price = false);
    this.currentProduct.category == 'Otro'
      ? (this.productValidator.category = true)
      : (this.productValidator.category = false);
    this.currentProduct.suplierId == -1
      ? (this.productValidator.suplierId = true)
      : (this.productValidator.suplierId = false);
  }

  hideModal(): void {
    this.modalMessageFlag = false;
  }
}
