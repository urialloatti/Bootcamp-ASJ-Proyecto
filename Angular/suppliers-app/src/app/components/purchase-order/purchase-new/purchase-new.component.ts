import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { PurchaseOrdersService } from '../../../services/purchase-orders.service';
import { ProductsService } from '../../../services/products.service';
import { suppliersService } from '../../../services/suppliers.service';

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
    private supplierService: suppliersService,
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

  issupplierSelected: boolean = false;
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

  isUpdating: boolean = false;

  ngOnInit(): void {
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
        this.issupplierSelected = true;
      }
    });
  }

  public getsupplierProducts(id: number): void {
    this.productService.getElementsBySupplierId(id).subscribe((prodList) => {
      this.supplierProducts = prodList;
    });
    this.selectedProductId = -1;
  }

  public getProductPrice(id: number): void {
    this.productService.getElementById(id).subscribe((response) => {
      this.selectedPrice = response.price;
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
      if (!this.isUpdating) {
        this.purchaseService.addElement(this.currentPurchaseOrder).subscribe();
      } else {
        this.purchaseService
          .updateElement(this.currentOrderId, this.currentPurchaseOrder)
          .subscribe();
      }
      this.modalRedirectObject = {
        message: 'Órden de compra cargada con éxito',
        path: '/purchase-orders',
      };
      this.modalRedirectFlag = true;
    }
  }

  addProduct() {
    this.isProductQuantityInvalid = false;
    if (this.selectedQuantity > 0 && this.selectedProductId != -1) {
      this.issupplierSelected = true;
      // let product: ProductResponseDTO;
      this.productService
        .getElementById(this.selectedProductId)
        .subscribe((response) => {
          // product = response;

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
    this.issupplierSelected = false;
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
      this.issupplierSelected = false;
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
    this.purchaseService.getElementForUpdate(this.currentOrderId).subscribe(
      (purchaseDTO) => {
        this.currentPurchaseOrder = purchaseDTO;
        (this.currentPurchaseOrder.createdAt = this.datePipe.transform(
          purchaseDTO.createdAt,
          'yyyy-MM-dd'
        )!),
          (this.currentPurchaseOrder.dateArriving = this.datePipe.transform(
            purchaseDTO.dateArriving,
            'yyyy-MM-dd'
          )!),
          (this.dateShipping = this.getDateObject(
            this.currentPurchaseOrder.dateArriving
          ));
        this.purchaseService
          .getElementById(this.currentOrderId)
          .subscribe((response) => {
            this.orderProductsList = response.products;
          });
      },
      (error) => {
        this.modalRedirectObject = {
          message: 'Órden de compra no encontrado',
          path: '/purchase-orders',
        };
        this.modalRedirectFlag = true;
        console.error(error);
      }
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
