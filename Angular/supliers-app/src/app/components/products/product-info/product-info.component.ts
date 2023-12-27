import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { ProductInterface } from '../../../interfaces/productInterface';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css',
})
export class ProductInfoComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
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
}
