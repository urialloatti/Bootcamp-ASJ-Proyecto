import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { PurchaseOrdersService } from '../../../services/purchase-orders.service';
import { ProductsService } from '../../../services/products.service';
import { SupliersService } from '../../../services/supliers.service';
import {
  ProductGroup,
  PurchaseOrderInterface,
} from '../../../interfaces/purchaseOrderInterface';
import { SuplierInterface } from '../../../interfaces/suplierInterface';
import { ProductInterface } from '../../../interfaces/productInterface';
import { ModalMessageInterface } from '../../../interfaces/modalInterface';

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

  currentPurchaseOrder: PurchaseOrderInterface = {
    dateArriving: new Date(),
    dateEmited: this.datePipe.transform(new Date(), 'yyyy-MM-dd')!,
    isAvailable: true,
    products: [],
    shippingRequirements: '',
    suplierId: -1,
    suplierName: '',
    total: 0,
  };
  currentProduct: ProductGroup = {
    productId: -1,
    productName: undefined,
    price: 0,
    productQuantity: 1,
  };
  supliersList: SuplierInterface[] = [];
  suplierProducts: ProductInterface[] = [];
  dateShipping: Date = new Date();
  flagNewPurchaseOrderCreated: boolean = false;
  isCartEmpty: boolean = false;
  isDateInvalid: boolean = false;
  isDescriptionInvalid: boolean = false;
  isProductAdded: boolean = false;
  isProductInvalid: boolean = false;
  isSuplierSelected: boolean = false;
  modalMessageFlag: boolean = false;
  modalMessageObject!: ModalMessageInterface;
  isUpdating: boolean = false;

  ngOnInit(): void {
    this.suplierService.getList().subscribe((response) => {
      this.supliersList = response;
    });
    this.currentPurchaseOrder.dateArriving = this.getMinDateShippingTemplate();

    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      if (id != undefined) {
        this.purchaseService
          .getElementById(parseInt(id))
          .subscribe((response) => {
            this.currentPurchaseOrder = response;
          });
        this.isUpdating = true;
        this.isSuplierSelected = true;
      }
    });
  }

  getSuplierProducts(id: number): void {
    this.productService.getElementsBySuplierId(id).subscribe((response) => {
      this.suplierProducts = response;
    });
  }

  getProductPrice(id: number): void {
    this.productService.getElementById(id).subscribe((response) => {
      this.currentProduct.price = response.price;
    });
  }

  savePurchase() {
    this.validateForm();
    if (this.isDateInvalid || this.isCartEmpty || this.isDescriptionInvalid) {
      this.modalMessageObject = {
        message: `Hay errores en el formulario.`,
        confirm: 'Continuar editando',
      };
      this.modalMessageFlag = true;
    } else {
      let suplier: SuplierInterface;
      this.suplierService
        .getElementById(this.currentPurchaseOrder.suplierId)
        .subscribe((response) => {
          suplier = response;
          this.currentPurchaseOrder.suplierName = suplier?.brand;
          if (!this.isUpdating) {
            this.currentPurchaseOrder.dateEmited = new Date();
            this.purchaseService
              .addElement(this.currentPurchaseOrder)
              .subscribe();
          } else {
            this.purchaseService
              .updateElement(this.currentPurchaseOrder)
              .subscribe();
          }
          this.flagNewPurchaseOrderCreated = true;
        });
    }
  }

  addProduct() {
    this.isProductInvalid = false;
    if (this.currentProduct.productQuantity > 0) {
      this.isSuplierSelected = true;
      let product: ProductInterface;
      this.productService
        .getElementById(this.currentProduct.productId)
        .subscribe((response) => {
          product = response;
          let productSearched = this.currentPurchaseOrder.products.find(
            (prod) => prod.productId == this.currentProduct.productId
          );
          let price = product?.price;
          let total = price * this.currentProduct.productQuantity;
          if (productSearched) {
            productSearched.productQuantity +=
              this.currentProduct.productQuantity;
          } else {
            this.currentProduct.productName = product?.name;
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
        });
    } else {
      this.isProductInvalid = true;
    }
  }

  emptyCart() {
    this.currentPurchaseOrder.products = [];
    this.currentPurchaseOrder.total = 0;
  }
  removeItemFromCart(id: number) {
    const filtered = this.currentPurchaseOrder.products.filter(
      (product) => product.productId != id
    );
    this.currentPurchaseOrder.products = filtered;
  }

  getMinDateShippingTemplate(): string {
    let dateShipping = this.getMinDateShipping();
    return this.datePipe.transform(dateShipping, 'yyyy-MM-dd') || '2024-01-01';
  }

  getMinDateShipping(): Date {
    const day = 1000 * 60 * 60 * 24;
    let daysDelay = 3;
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

  hideModal(): void {
    this.modalMessageFlag = false;
  }
}
