import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PurchaseOrdersService } from '../../../services/purchase-orders.service';
import { PurchaseOrderInterface } from '../../../interfaces/purchaseOrderInterface';
import { ModalsService } from '../../../services/modal-confirm.service';
import { ModalConfirmInterface } from '../../../interfaces/modalInterface';

@Component({
  selector: 'app-purchase-info',
  templateUrl: './purchase-info.component.html',
  styleUrl: './purchase-info.component.css',
})
export class PurchaseInfoComponent {
  constructor(
    private purchaseService: PurchaseOrdersService,
    private route: ActivatedRoute,
    private confirmService: ModalsService
  ) {}

  pageLoadedFlag: boolean = false;
  currentPurchase!: PurchaseOrderInterface;
  modalRedirectFlag: boolean = false;
  modalConfirmFlag: boolean = false;
  modalConfirmObject!: ModalConfirmInterface;
  path: string = '/purchase-orders/';

  ngOnInit(): void {
    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      if (id) {
        this.loadPurchase(id);
        this.path += id;
      }
    });
  }

  deletePurchase(id: number): void {
    let deleted: PurchaseOrderInterface;
    this.purchaseService.getElementById(id).subscribe((dto) => {
      deleted = dto;
      this.modalConfirmObject = {
        header: `Cancelar órden de compra ${deleted.id}`,
        message: `Está seguro de cancelar la órden de compra generada el ${deleted.dateEmited}?`,
        cancel: 'Volver atrás',
        confirm: 'Cancelar órden de compra',
      };
      this.modalConfirmFlag = true;
      this.confirmService.confirm$.subscribe((response) => {
        this.modalConfirmFlag = false;
        if (response) {
          this.purchaseService.deleteById(id).subscribe(() => {
            this.modalRedirectFlag = true;
            this.loadPurchase(id.toString());
          });
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
