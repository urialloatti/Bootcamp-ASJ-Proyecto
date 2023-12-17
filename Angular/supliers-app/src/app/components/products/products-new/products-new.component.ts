import { Component } from '@angular/core';
import { ProductInterface } from '../../../interfaces/productsInterface';

@Component({
  selector: 'products-new',
  templateUrl: './products-new.component.html',
  styleUrl: './products-new.component.css'
})
export class ProductsNewComponent {
  flagNewProductCreated: boolean = false;
  currentProduct!: ProductInterface;

  saveProduct() {
    this.flagNewProductCreated = true;
  }
}
