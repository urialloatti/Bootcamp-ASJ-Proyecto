import { Component, OnInit } from '@angular/core';

import { ListTemplateInterface } from '../../../interfaces/listTemplateInterface';
import { PurchaseOrderInterface } from '../../../interfaces/purchaseOrderInterface';
import { PurchaseOrdersService } from '../../../services/purchase-orders.service';
import { ModalService } from '../../../services/modal.service';
import { ModalConfirmInterface } from '../../../interfaces/modalInterface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrl: './purchase-list.component.css',
})
export class PurchaseListComponent implements OnInit {
  constructor(
    private purchaseService: PurchaseOrdersService,
    private confirmService: ModalService
  ) {}

  purchaseArray: PurchaseOrderInterface[] = [];
  purchaseList$!: Observable<PurchaseOrderInterface[]>;

  purchaseFields: ListTemplateInterface = {
    section: 'purchase-orders',
    label: 'órdenes de compra',
    listFields: [
      {
        field: 'Proveedor',
        keys: [
          { key: 'suplierName' },
          { key: 'isAvailable', extras: 'PurchaseOrder' },
        ],
      },
      {
        field: 'Fecha de emisión',
        keys: [{ key: 'createdAt', extras: 'FullDate' }],
      },
      {
        field: 'Fecha de arribo',
        keys: [{ key: 'dateArriving', extras: 'Date' }],
      },
      { field: 'Total', keys: [{ key: 'total', extras: 'Currency' }] },
    ],
  };
  modalConfirmFlag: boolean = false;
  modalConfirmObject!: ModalConfirmInterface;
  isListLoaded: boolean = true;

  ngOnInit(): void {
    this.purchaseList$ = this.purchaseService.getList();
    this.loadList();
  }

  loadList() {
    this.purchaseService.getList().subscribe((response) => {
      this.purchaseArray = response;
    });
  }

  deletePurchase(id: number): void {
    let deleted: PurchaseOrderInterface;
    this.purchaseService.getElementById(id).subscribe((dto) => {
      deleted = dto;
      this.modalConfirmObject = {
        header: `Cancelar órden de compra ${deleted.id}`,
        message: `Está seguro de cancelar la órden de compra generada el ${deleted.createdAt}?`,
        cancel: 'Volver atrás',
        confirm: 'Cancelar órden de compra',
      };
      this.modalConfirmFlag = true;
      let subscription = this.confirmService.confirm$.subscribe((response) => {
        this.modalConfirmFlag = false;
        if (response) {
          this.purchaseService
            .cancelElementById(id)
            .subscribe(() => this.loadList());
        } else {
          subscription.unsubscribe();
        }
      });
    });
  }
}
