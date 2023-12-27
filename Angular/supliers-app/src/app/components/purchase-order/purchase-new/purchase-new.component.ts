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
import { timeout } from 'rxjs';
import { DatePipe } from '@angular/common';

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
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  flagNewPurchaseOrderCreated: boolean = false;
  isCartEmpty: boolean = false;
  isDateInvalid: boolean = false;
  isDescriptionInvalid: boolean = false;
  isProductAdded: boolean = false;
  isProductInvalid: boolean = false;
  isSuplierSelected: boolean = false;
  isUpdating: boolean = false;

  currentPurchaseOrder: PurchaseOrderInterface = {
    dateArriving: new Date(),
    dateEmited: this.datePipe.transform(new Date(), 'yyyy-MM-dd')!,
    isCanceled: false,
    products: [],
    shippingRequirements: '',
    suplierId: 0,
    suplierName: '',
    total: 0,
  };
  dateShipping: Date = new Date();

  currentProduct: ProductGroup = {
    productId: 0,
    productName: undefined,
    price: -1,
    productQuantity: 1,
  };

  supliersList: SuplierInterface[] = [];

  ngOnInit(): void {
    this.supliersList = this.suplierService.getList();
    this.currentPurchaseOrder.dateArriving = this.getMinDateShippingTemplate();

    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      if (id != undefined) {
        this.currentPurchaseOrder = this.purchaseService.getElementById(
          parseInt(id)
        )!;
        this.isUpdating = true;
        this.isSuplierSelected = true;
      }
    });
  }

  getSuplierProducts(id: number): ProductInterface[] {
    let list = this.productService.getElementsBySuplierId(id);
    return list;
  }

  getProductPrice(id: number): number {
    let product = this.productService.getElementById(id);
    return product?.price || 0;
  }

  savePurchase() {
    this.validateForm();
    if (this.isDateInvalid || this.isCartEmpty || this.isDescriptionInvalid) {
      alert('Hay errores en el formulario.');
    } else {
      let suplier = this.suplierService.getElementById(
        this.currentPurchaseOrder.suplierId
      );
      this.currentPurchaseOrder.suplierName = suplier?.brand;
      this.purchaseService.addElement(this.currentPurchaseOrder);
      this.flagNewPurchaseOrderCreated = true;
    }
  }

  addProduct() {
    this.isProductInvalid = false;
    if (this.currentProduct.productQuantity > 0) {
      this.isSuplierSelected = true;
      let product = this.productService.getElementById(
        this.currentProduct.productId
      )!;
      let productSearched = this.currentPurchaseOrder.products.find(
        (prod) => prod.productId == this.currentProduct.productId
      );
      let price = product.price;
      let total = price * this.currentProduct.productQuantity;
      if (productSearched) {
        productSearched.productQuantity += this.currentProduct.productQuantity;
      } else {
        this.currentProduct.productName = product.name;
        this.currentProduct.price = price;
        this.currentPurchaseOrder.products.push(
          structuredClone(this.currentProduct)
        );
      }
      !this.currentPurchaseOrder.total
        ? (this.currentPurchaseOrder.total = total)
        : (this.currentPurchaseOrder.total =
            this.currentPurchaseOrder.total + total);
      this.currentProduct.productQuantity = 1;
      this.isProductAdded = true;
      setTimeout(() => (this.isProductAdded = false), 2000);
    } else {
      this.isProductInvalid = true;
    }
  }

  emptyCart() {
    this.currentPurchaseOrder.products = [];
    this.currentPurchaseOrder.total = 0;
  }

  getMinDateShippingTemplate(): string {
    let dateShipping = this.getMinDateShipping();
    return this.datePipe.transform(dateShipping, 'yyyy-MM-dd') || '2024-01-01';
  }

  getMinDateShipping(): Date {
    const day = 1000 * 60 * 60 * 24;
    let daysDelay = 2;
    let dateCreated = this.getDateObject(this.currentPurchaseOrder.dateEmited);
    return new Date(day * daysDelay + dateCreated.getTime());
  }

  getDateObject(date: string | Date): Date {
    let dateCreatedArray =
      this.datePipe.transform(date, 'yyyy&MM&dd')?.split('&') || '';
    return new Date(
      +dateCreatedArray[0],
      +dateCreatedArray[1] - 1,
      +dateCreatedArray[2]
    );
  }

  validateForm() {
    this.getDateObject(this.currentPurchaseOrder.dateArriving).getTime() <
    this.getMinDateShipping().getTime()
      ? (this.isDateInvalid = true)
      : (this.isDateInvalid = false);

    this.currentPurchaseOrder.products.length < 1
      ? (this.isCartEmpty = true)
      : (this.isCartEmpty = false);
    this.currentPurchaseOrder.shippingRequirements.length < 1 ||
    this.currentPurchaseOrder.shippingRequirements.length > 500
      ? (this.isDescriptionInvalid = true)
      : (this.isDescriptionInvalid = false);
  }
}
