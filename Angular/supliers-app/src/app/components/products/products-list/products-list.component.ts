import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../../services/products.service';
import { ProductInterface } from '../../../interfaces/productInterface';
import { ListTemplateInterface } from '../../../interfaces/listTemplateInterface';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements OnInit {
  producsArray!: ProductInterface[];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.producsArray = this.productsService.getList();
  }

  deleteProduct(id: number): void {
    let deletedProduct = this.productsService.deleteElement(id);
    if (deletedProduct) {
      alert(`Producto ${deletedProduct.name} eliminado con éxito.`);
      this.producsArray = this.productsService.getList();
    } else {
      alert('El producto ya no existe en la base de datos.');
    }
  }

  productsFields: ListTemplateInterface = {
    section: 'products',
    label: 'productos',
    listFields: [
      { field: 'Nombre', keys: [{ key: 'name' }] },
      { field: 'Categoría', keys: [{ key: 'category' }] },
      { field: 'Proveedor', keys: [{ key: 'suplier' }] },
      { field: 'Precio', keys: [{ key: 'price', extras: 'Currency' }] },
    ],
  };
}
