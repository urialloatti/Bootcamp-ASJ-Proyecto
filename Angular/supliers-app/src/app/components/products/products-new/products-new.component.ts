import { Component } from '@angular/core';
import { ProductInterface } from '../../../interfaces/productsInterface';
import { ProductsService } from '../../../services/products-service/products.service';

@Component({
  selector: 'products-new',
  templateUrl: './products-new.component.html',
  styleUrl: './products-new.component.css'
})
export class ProductsNewComponent {
  constructor(private pService: ProductsService) { }

  flagNewProductCreated: boolean = false;
  flagProductError: boolean = false;
  currentProduct: ProductInterface = {
    suplier: "",
    category: "",
    name: "",
    description: "",
    price: 0
  }

  saveProduct() {
    this.pService.addElement(this.currentProduct);
    this.flagNewProductCreated = true;
  }

  validateString(input: string): boolean {
    return (!(input.length == 0 || input.length > 80))
  }

  validateSubmit() {
    return !(this.validateString(this.currentProduct.category) && this.validateString(this.currentProduct.category) && this.currentProduct.description.length > 0 && this.currentProduct.price > 0 && this.currentProduct.price < 999999999 && this.currentProduct.suplier.length > 0)
  }
}
