import { Component, OnInit } from '@angular/core';

import { ListTemplateInterface } from '../../../interfaces/listTemplateInterface';
import { ProductInterface } from '../../../interfaces/productInterface';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements OnInit {
  producsArray!: ProductInterface[];
  isListLoaded: boolean = false;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getList().subscribe((response) => {
      this.producsArray = response;
      this.isListLoaded = true;
    });
  }

  deleteProduct(id: number): void {
    let deleted: ProductInterface;
    this.productsService.getElementById(id).subscribe((response) => {
      deleted = response;
      if (confirm(`¿Está seguro de que desea eliminar ${deleted.name}?`)) {
        this.productsService.deleteElementById(id).subscribe(
          () => {
            alert(`Producto ${deleted.name} eliminado con éxito.`);
            this.productsService.getList().subscribe((response) => {
              this.producsArray = response;
            });
          },
          (error) => {
            alert('El producto ya no existe en la base de datos.');
            console.log(error);
          }
        );
      }
    });
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
