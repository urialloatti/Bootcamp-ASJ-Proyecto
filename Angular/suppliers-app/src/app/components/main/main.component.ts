import { ProductsService } from '../../services/products.service';
import { PurchaseOrdersService } from '../../services/purchase-orders.service';
import { SuppliersService } from './../../services/suppliers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  constructor(
    private suppliersService: SuppliersService,
    private productsService: ProductsService,
    private ordersService: PurchaseOrdersService
  ) {}

  public suppliersCount: number = 0;
  public productsCount: number = 0;
  public ordersCount: number = 0;

  ngOnInit(): void {
    this.suppliersService
      .getCount()
      .subscribe((count) => (this.suppliersCount = count));
    this.productsService
      .getCount()
      .subscribe((count) => (this.productsCount = count));
    this.ordersService
      .getCount()
      .subscribe((count) => (this.ordersCount = count));
  }
}
