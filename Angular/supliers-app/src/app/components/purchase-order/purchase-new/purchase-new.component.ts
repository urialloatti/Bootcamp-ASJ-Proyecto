import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PurchaseOrdersService } from '../../../services/purchase-orders.service';
import { ProductsService } from '../../../services/products.service';
import { SupliersService } from '../../../services/supliers.service';
import {
  ProductGroup,
  PurchaseOrderInterface,
} from '../../../interfaces/purchaseOrderInterface';
import { SuplierInterface } from '../../../interfaces/suplierInterface';
import { ProductInterface } from '../../../interfaces/productInterface';

@Component({
  selector: 'app-purchase-new',
  templateUrl: './purchase-new.component.html',
  styleUrl: './purchase-new.component.css',
})
export class PurchaseNewComponent implements OnInit {
  constructor(
    private purchaseService: PurchaseOrdersService,
    private productService: ProductsService,
    private suplierService: SupliersService,
    private route: ActivatedRoute
  ) {}

  currentPurchaseOrder: PurchaseOrderInterface = {
    dateEmited: new Date(),
    dateArriving: new Date(),
    shippingRequirements: '',
    suplierId: 0,
    products: [],
    total: 0,
  };

  currentProduct: ProductGroup = {
    productId: 0,
    productQuantity: 1,
  };

  supliersList: SuplierInterface[] = [];
  isSuplierSelected: boolean = false;

  ngOnInit(): void {
    this.supliersList = this.suplierService.getList();
  }

  getSuplierProducts(id: number): ProductInterface[] {
    let list = this.productService.getElementsBySuplierId(id);
    return list;
  }

  getProductPrice(id: number): number {
    let product = this.productService.getElementById(id);
    return product?.price || 0;
  }

  savePurchase() {}

  addProduct() {
    this.isSuplierSelected = true;
    let product = this.productService.getElementById(
      this.currentProduct.productId
    )!;
    let price = product.price * this.currentProduct.productQuantity;
    this.currentProduct.productName = product.name;
    if (!this.currentPurchaseOrder.total) {
      this.currentPurchaseOrder.total = price;
    } else {
      this.currentPurchaseOrder.total = this.currentPurchaseOrder.total + price;
    }
    this.currentPurchaseOrder.total = this.currentPurchaseOrder.total + price;
    this.currentPurchaseOrder.products.push(this.currentProduct);
  }
}
