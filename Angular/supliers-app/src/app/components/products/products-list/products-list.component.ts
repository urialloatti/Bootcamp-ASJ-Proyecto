import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../../services/products-service/products.service';

import { ProductInterface } from '../../../interfaces/productsInterface';
import { ListTemplateInterface } from '../../../interfaces/listTemplateInterface';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {
  
  producsArray!: ProductInterface[];

  constructor(private pService: ProductsService) {}
  
  ngOnInit(): void {
    this.producsArray = this.pService.getList();
  }
  
  deleteProduct(id: number): void {
    this.producsArray = this.pService.deleteElement(id);
  }

  productsFields: ListTemplateInterface = {
    section: "products",
    label: "productos",
    listFields: [
      {field: "#", key: "id"},
      {field: "Nombre", key: "name"},
      {field: "Proveedor", key: "suplier"},
      {field: "Categoría", key: "category"},
      {field: "Precio", key: "price"}
    ]
  }
}
