import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PurchaseOrdersService } from '../../../services/purchase-orders.service';
import {
  PurchaseOrderInterface,
  PurchaseOrderResponseDTO,
} from '../../../interfaces/purchaseOrderInterface';
import { ModalService } from '../../../services/modal.service';
import {
  ModalConfirmInterface,
  ModalRedirectInterface,
} from '../../../interfaces/modalInterface';

@Component({
  selector: 'app-purchase-info',
  templateUrl: './purchase-info.component.html',
  styleUrl: './purchase-info.component.css',
})
export class PurchaseInfoComponent {
  constructor(
    private purchaseService: PurchaseOrdersService,
    private route: ActivatedRoute,
    private confirmService: ModalService
  ) {}

  pageLoadedFlag: boolean = false;
  currentPurchase!: PurchaseOrderResponseDTO;
  modalConfirmFlag: boolean = false;
  modalConfirmObject!: ModalConfirmInterface;
  modalRedirectFlag: boolean = false;
  modalRedirectObject!: ModalRedirectInterface;

  ngOnInit(): void {
    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      if (id) {
        this.loadPurchase(id);
      }
    });
  }

  deletePurchase(id: number): void {
    let deleted: PurchaseOrderResponseDTO;
    this.purchaseService.getElementById(id).subscribe((dto) => {
      deleted = dto;
      this.modalConfirmObject = {
        header: `Cancelar órden de compra ${deleted.id}`,
        message: `Está seguro de cancelar la órden de compra generada el ${deleted.createdAt}?`,
        cancel: 'Volver atrás',
        confirm: 'Cancelar órden de compra',
      };
      this.modalConfirmFlag = true;
      this.confirmService.confirm$.subscribe((response) => {
        this.modalConfirmFlag = false;
        if (response) {
          this.purchaseService.cancelElementById(id).subscribe(
            () => {
              (this.modalRedirectObject = {
                message: 'Órden de compra cancelada con éxito.',
                path: '/purchase-orders',
              }),
                (this.modalRedirectFlag = true);
            },
            (error) => {
              (this.modalRedirectObject = {
                message: 'Órden de compra ya se encuentra cancelada.',
                path: '/purchase-orders',
              }),
                (this.modalRedirectFlag = true);
              console.log(error);
            }
          );
        }
      });
    });
  }

  loadPurchase(id: string): void {
    this.purchaseService.getElementById(parseInt(id)).subscribe((response) => {
      this.pageLoadedFlag = true;
      this.currentPurchase = response;
    });
  }
}
