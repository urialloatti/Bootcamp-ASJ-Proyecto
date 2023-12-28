import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductInterface } from '../../../interfaces/productInterface';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css',
})
export class ProductInfoComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  currentProduct!: ProductInterface;

  ngOnInit(): void {
    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      if (id) {
        this.productService
          .getElementById(parseInt(id))
          .subscribe((response) => {
            this.currentProduct = response;
          });
      }
    });
  }

  deleteProduct(id: number): void {
    let deleted: ProductInterface;
    this.productService.getElementById(id).subscribe((response) => {
      deleted = response;
      if (confirm(`¿Está seguro de que desea eliminar ${deleted.name}?`)) {
        this.productService.deleteElementById(id).subscribe(
          () => {
            alert(`Producto ${deleted.name} eliminado con éxito.`);
            setTimeout(() => this.router.navigateByUrl('/products'), 1000);
          },
          (error) => {
            alert('El producto ya no existe en la base de datos.');
            console.log(error);
          }
        );
      }
    });
  }

  imageNotFound(event: Event): void {
    (event.target as HTMLImageElement).src =
      '../../../../assets/image-not-found.jpg';
  }
}
