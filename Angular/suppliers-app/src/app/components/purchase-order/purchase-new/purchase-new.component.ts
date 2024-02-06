import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import { ModalService } from '../../../services/modal.service';
import { ProductsService } from '../../../services/products.service';
import { PurchaseOrdersService } from '../../../services/purchase-orders.service';
import { SuppliersService } from '../../../services/suppliers.service';

import {
  PurchaseProductResponseDTO,
  PurchaseOrderRequestDTO,
} from '../../../interfaces/purchaseOrderInterface';
import { SupplierResponseDTO } from '../../../interfaces/supplierInterface';
import { ProductResponseDTO } from '../../../interfaces/productInterface';
import {
  ModalMessageInterface,
  ModalRedirectInterface,
} from '../../../interfaces/modalInterface';

@Component({
  selector: 'app-purchase-new',
  templateUrl: './purchase-new.component.html',
  styleUrl: './purchase-new.component.css',
})
export class PurchaseNewComponent implements OnInit {
  constructor(
    private purchaseService: PurchaseOrdersService,
    private productService: ProductsService,
    private supplierService: SuppliersService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  currentOrderId!: number;
  currentPurchaseOrder: PurchaseOrderRequestDTO = {
    dateArriving: '',
    createdAt: this.datePipe.transform(new Date(), 'yyyy-MM-dd')!,
    products: [],
    shippingRequirements: '',
    supplierId: -1,
    userId: 1,
  };
  dateShipping: Date = new Date();

  selectedProductId: number = -1;
  selectedQuantity: number = 1;
  selectedPrice: number = 0;

  orderProductsList: PurchaseProductResponseDTO[] = [];
  currentOrderTotal: number = 0;

  suppliersList: SupplierResponseDTO[] = [];
  supplierProducts: ProductResponseDTO[] = [];

  isSupplierSelected: boolean = false;
  currentSupplierLogo: string = '';
  isProductAdded: boolean = false;
  isCartEmpty: boolean = false;

  isProductEmpty: boolean = false;
  isProductQuantityInvalid: boolean = false;
  isDateInvalid: boolean = false;
  isDescriptionInvalid: boolean = false;

  flagNewPurchaseOrderCreated: boolean = false;
  modalMessageFlag: boolean = false;
  modalMessageObject!: ModalMessageInterface;
  modalRedirectFlag: boolean = false;
  modalRedirectObject!: ModalRedirectInterface;
  triedToLeave: boolean = false;

  isUpdating: boolean = false;

  ngOnInit(): void {
    this.modalService.confirmLeave$.subscribe(
      (response) => (this.triedToLeave = response)
    );

    this.supplierService
      .getList()
      .subscribe((supList) => (this.suppliersList = supList));
    this.currentPurchaseOrder.dateArriving = this.getMinDateShippingTemplate();

    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      if (id !== null && !isNaN(Number(id))) {
        this.currentOrderId = Number(id);
        this.getUpdateOrder();
        this.isUpdating = true;
        this.isSupplierSelected = true;
      }
    });
  }

  public getsupplierProducts(id: number): void {
    let supplier = this.suppliersList.find((supp) => supp.id == id);
    this.currentSupplierLogo = supplier?.picture || '';
    this.productService.getElementsBySupplierId(id).subscribe((prodList) => {
      this.supplierProducts = prodList;
    });
    this.selectedProductId = -1;
  }

  public getProductPrice(id: number): void {
    this.productService.getElementById(id).subscribe((response) => {
      this.selectedPrice = response.data.price;
    });
    this.isProductEmpty = false;
  }

  savePurchase() {
    this.validateForm();
    if (this.isDateInvalid || this.isCartEmpty || this.isDescriptionInvalid) {
      this.modalMessageObject = {
        header: `Hay errores en el formulario.`,
        confirm: 'Continuar editando',
      };
      this.modalMessageFlag = true;
    } else {
      if (!this.isUpdating) {
        this.purchaseService.addElement(this.currentPurchaseOrder).subscribe({
          next: (response) => {
            this.modalRedirectObject = {
              header: `Órden de compra cargada con Id ${response.data.id}.`,
              path: '/purchase-orders',
            };
            this.modalRedirectFlag = true;
          },
          error: (error) => this.handleError(error),
        });
      } else {
        this.purchaseService
          .updateElement(this.currentOrderId, this.currentPurchaseOrder)
          .subscribe({
            next: (response) => {
              this.modalRedirectObject = {
                header: `Órden de compra con Id ${response.data.id} actualizada.`,
                path: '/purchase-orders',
              };
              this.modalRedirectFlag = true;
            },
            error: (error) => this.handleError(error),
          });
      }
    }
  }

  addProduct() {
    this.isProductQuantityInvalid = false;
    if (this.selectedQuantity > 0 && this.selectedProductId != -1) {
      this.isSupplierSelected = true;
      this.productService.getElementById(this.selectedProductId).subscribe({
        next: (apiResponse) => {
          let response = apiResponse.data;
          let productAlreadyAdded: boolean = false;
          for (let i = 0; i < this.currentPurchaseOrder.products.length; i++) {
            if (
              this.currentPurchaseOrder.products[i].productId ==
              this.selectedProductId
            ) {
              this.currentPurchaseOrder.products[i].productQuantity +=
                this.selectedQuantity;
              this.orderProductsList[i].productQuantity +=
                this.selectedQuantity;
              productAlreadyAdded = true;
              break;
            }
          }
          if (!productAlreadyAdded) {
            this.currentPurchaseOrder.products.push({
              productId: this.selectedProductId,
              productQuantity: this.selectedQuantity,
            });
            this.orderProductsList.push({
              productId: response.id,
              price: response.price,
              productName: response.name,
              productQuantity: this.selectedQuantity,
            });
          }
          this.calculateTotal();
          this.selectedQuantity = 1;
          this.isProductAdded = true;
          setTimeout(() => (this.isProductAdded = false), 2000);
        },
        error: (error) => {
          console.log(error.error.message);
        },
      });
    } else if (this.selectedQuantity < 1) {
      this.isProductQuantityInvalid = true;
    } else {
      this.isProductEmpty = true;
    }
  }

  emptyCart() {
    this.currentPurchaseOrder.products = [];
    this.orderProductsList = [];
    this.currentOrderTotal = 0;
    this.isSupplierSelected = false;
  }

  removeItemFromCart(id: number) {
    for (let i = 0; i < this.currentPurchaseOrder.products.length; i++) {
      if (this.orderProductsList[i].productId == id) {
        this.currentPurchaseOrder.products.splice(i, 1);
        this.orderProductsList.splice(i, 1);
        break;
      }
    }
    this.calculateTotal();
    if (this.currentPurchaseOrder.products.length == 0) {
      this.isSupplierSelected = false;
    }
  }

  calculateTotal(): void {
    let total: number = 0;
    for (const product of this.orderProductsList) {
      total += product.price * product.productQuantity;
    }
    this.currentOrderTotal = total;
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

  private getUpdateOrder() {
    this.purchaseService.getElementForUpdate(this.currentOrderId).subscribe({
      next: (purchaseDTO) => {
        this.currentPurchaseOrder = purchaseDTO.data;
        (this.currentPurchaseOrder.createdAt = this.datePipe.transform(
          purchaseDTO.data.createdAt,
          'yyyy-MM-dd'
        )!),
          (this.currentPurchaseOrder.dateArriving = this.datePipe.transform(
            purchaseDTO.data.dateArriving,
            'yyyy-MM-dd'
          )!),
          (this.dateShipping = this.getDateObject(
            this.currentPurchaseOrder.dateArriving
          ));
        this.purchaseService
          .getElementById(this.currentOrderId)
          .subscribe((response) => {
            this.orderProductsList = response.data.products;
          });
      },
      error: (error) => {
        this.modalRedirectObject = {
          header: 'Órden de compra no encontrado',
          path: '/purchase-orders',
        };
        this.modalRedirectFlag = true;
        console.error(error);
      },
    });
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

  imageNotFound(event: Event): void {
    (event.target as HTMLImageElement).src =
      '../../../../assets/image-not-found.jpg';
  }

  hideModal(): void {
    this.modalMessageFlag = false;
  }

  private handleError(error: HttpErrorResponse): void {
    if (error.status == 0) {
      this.modalRedirectObject = {
        header: 'Error',
        message: 'Hubo un error con el servidor.',
        path: '/purchase-orders',
      };
      this.modalRedirectFlag = true;
    } else {
      this.modalMessageObject = {
        header: 'Hubo errores con el formulario.',
        message: error.error.message,
        confirm: 'Continuar editando',
      };
      this.modalMessageFlag = true;
    }
  }
}
