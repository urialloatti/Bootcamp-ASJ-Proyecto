import { Component } from '@angular/core';

import { ProductInterface } from '../../../interfaces/productsInterface';
import { ListTemplateInterface } from '../../../interfaces/listTemplateInterface';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
  producsArray: ProductInterface[] = productsArrayMock;

  productsFields: ListTemplateInterface = {
    section: "products",
    label: "productos",
    listFields: [
      {field: "#", key: "code"},
      {field: "Nombre", key: "name"},
      {field: "Proveedor", key: "suplier"},
      {field: "Categoría", key: "category"},
      {field: "Precio", key: "price"}
    ]
  }

  deleteProduct(code: number): void {
    this.producsArray = this.producsArray.filter((product) => product.code != code);
  }

}

let productsArrayMock: ProductInterface[] = [
  {
    code: 1,
    name: "Albahaca",
    category: "Botánicos",
    description: "Lorem ipsum dolor sit amet.",
    suplier: "Monmouth Real Estate Investment Corporation",
    price: 125
  },
  {
    code: 2,
    name: "Paracetamol",
    category: "Medicamentos",
    description: "Lorem ipsum dolor sit amet.",
    suplier: "Arena Pharmaceuticals, Inc.",
    price: 350
  }
];