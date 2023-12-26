import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ProductInterface } from '../../../interfaces/productInterface';
import { ProductsService } from '../../../services/products.service';
import { SupliersService } from '../../../services/supliers.service';
import { SuplierInterface } from '../../../interfaces/suplierInterface';

@Component({
  selector: 'products-new',
  templateUrl: './products-new.component.html',
  styleUrl: './products-new.component.css',
})
export class ProductsNewComponent implements OnInit {
  flagNewProductCreated: boolean = false;
  isUpdating: boolean = false;
  supliersList: SuplierInterface[] = [];

  currentProduct: ProductInterface = {
    suplierId: -1,
    category: 'Otro',
    name: '',
    description: '',
    price: 0,
  };

  productValidator: any = {
    category: false,
    name: false,
    description: false,
    price: false,
  };

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private suplierService: SupliersService
  ) {}

  ngOnInit(): void {
    this.supliersList = this.suplierService.getList();

    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      if (id != undefined) {
        this.currentProduct = this.productService.getElementById(parseInt(id))!;
        this.isUpdating = true;
      }
    });
  }

  saveProduct() {
    let isFormValid = true;
    this.validateSubmite();
    Object.keys(this.productValidator).forEach((key) => {
      if (isFormValid && this.productValidator[key]) {
        alert('Hay errores en el formulario.');
        isFormValid = false;
      }
    });
    if (isFormValid) {
      if (this.isUpdating) {
        this.productService.updateElement(this.currentProduct);
      } else {
        this.productService.addElement(this.currentProduct);
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
  }
}
