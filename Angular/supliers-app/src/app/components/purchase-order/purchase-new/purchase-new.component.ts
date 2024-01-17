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
    createdAt: this.datePipe.transform(new Date(), 'yyyy-MM-dd')!,
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
  isProductQuantityInvalid: boolean = false;
  isProductEmpty: boolean = false;
  isSuplierSelected: boolean = false;
  modalMessageFlag: boolean = false;
  modalMessageObject!: ModalMessageInterface;
  isUpdating: boolean = false;

  ngOnInit(): void {
    this.purchaseService.updateCounter();
    this.suplierService
      .getList()
      .subscribe((supList) => (this.supliersList = supList));
    this.currentPurchaseOrder.dateArriving = this.getMinDateShippingTemplate();

    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      if (id != undefined) {
        this.purchaseService
          .getElementById(parseInt(id))
          .subscribe((purchaseDTO) => {
            this.currentPurchaseOrder = purchaseDTO;
            this.dateShipping = this.getDateObject(
              this.currentPurchaseOrder.dateArriving
            );
            console.log(this.dateShipping);
          });
        this.isUpdating = true;
        this.isSuplierSelected = true;
      }
    });
  }

  getSuplierProducts(id: number): void {
    this.productService.getElementsBySuplierId(id).subscribe((prodList) => {
      this.suplierProducts = prodList;
    });
    this.currentProduct.productId = -1;
  }

  getProductPrice(id: number): void {
    this.productService.getElementById(id).subscribe((response) => {
      this.currentProduct.price = response.price;
    });
    this.isProductEmpty = false;
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
    this.isProductQuantityInvalid = false;
    if (
      this.currentProduct.productQuantity > 0 &&
      this.currentProduct.productId != -1
    ) {
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
          this.calculateTotal();
          this.currentProduct.productQuantity = 1;
          this.isProductAdded = true;
          setTimeout(() => (this.isProductAdded = false), 2000);
        });
    } else if (this.currentProduct.productQuantity < 1) {
      this.isProductQuantityInvalid = true;
    } else {
      this.isProductEmpty = true;
    }
  }

  emptyCart() {
    this.currentPurchaseOrder.products = [];
    this.currentPurchaseOrder.total = 0;
    this.isSuplierSelected = false;
  }

  removeItemFromCart(id: number) {
    const filtered = this.currentPurchaseOrder.products.filter(
      (product) => product.productId != id
    );
    this.currentPurchaseOrder.products = filtered;
    this.calculateTotal();
    if (this.currentPurchaseOrder.products.length == 0) {
      this.isSuplierSelected = false;
    }
  }

  calculateTotal(): void {
    let total: number = 0;
    for (const product of this.currentPurchaseOrder.products) {
      total += product.price * product.productQuantity;
    }
    this.currentPurchaseOrder.total = total;
  }

  getMinDateShippingTemplate(): string {
    if (!this.isUpdating) {
      let dateShipping = this.getMinDateShipping();
      return this.datePipe.transform(dateShipping, 'yyyy-MM-dd')!;
    } else {
      return this.datePipe.transform(this.dateShipping, 'yyyy-MM-dd')!;
    }
  }

  getMinDateShipping(): Date {
    if (!this.isUpdating) {
      const day = 1000 * 60 * 60 * 24;
      let daysDelay = 3;
      let dateCreated = this.getDateObject(
        this.currentPurchaseOrder.createdAt!
      );
      return new Date(day * daysDelay + dateCreated.getTime());
    } else {
      return this.getDateObject(this.dateShipping);
    }
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
    this.isDateInvalid =
      this.getDateObject(this.currentPurchaseOrder.dateArriving).getTime() <
      this.getMinDateShipping().getTime();
    this.isCartEmpty = this.currentPurchaseOrder.products.length < 1;
    this.isDescriptionInvalid =
      this.currentPurchaseOrder.shippingRequirements.length < 1 ||
      this.currentPurchaseOrder.shippingRequirements.length > 500;
  }

  hideModal(): void {
    this.modalMessageFlag = false;
  }
}
