import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ModalService } from '../../../services/modal.service';
import { PurchaseOrdersService } from '../../../services/purchase-orders.service';

import { PurchaseOrderResponseDTO } from '../../../interfaces/purchaseOrderInterface';
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
    private router: Router,
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
      if (id !== null && !isNaN(Number(id))) {
        this.loadPurchase(id);
      } else {
        this.router.navigateByUrl('404');
      }
    });
  }

  public deletePurchase(id: number): void {
    let deleted: PurchaseOrderResponseDTO;
    this.purchaseService.getElementById(id).subscribe((dto) => {
      deleted = dto.data;
      this.modalConfirmObject = {
        header: `Cancelar órden de compra ${deleted.id}`,
        message: `Está seguro de cancelar la órden de compra generada el ${deleted.createdAt}?`,
        cancel: 'Volver atrás',
        confirm: 'Cancelar órden de compra',
      };
      this.modalConfirmFlag = true;
      this.confirmService.confirmModal$.subscribe((response) => {
        this.modalConfirmFlag = false;
        if (response) {
          this.purchaseService.cancelElementById(id).subscribe({
            next: () => {
              (this.modalRedirectObject = {
                header: 'Órden de compra cancelada con éxito.',
                path: '/purchase-orders',
              }),
                (this.modalRedirectFlag = true);
            },
            error: (error) => {
              this.modalRedirectObject = {
                header: error.error.message,
                path: '/purchase-orders',
              };
              this.modalRedirectFlag = true;
              console.error(error);
            },
          });
        }
      });
    });
  }

  private loadPurchase(id: string): void {
    this.purchaseService.getElementById(parseInt(id)).subscribe({
      next: (response) => {
        this.pageLoadedFlag = true;
        this.currentPurchase = response.data;
      },
      error: (error) => {
        this.modalRedirectObject = {
          header: 'Error',
          message: error.error.message,
          path: '/purchase-orders',
        };
        this.modalRedirectFlag = true;
        console.error(error);
      },
    });
  }
}
