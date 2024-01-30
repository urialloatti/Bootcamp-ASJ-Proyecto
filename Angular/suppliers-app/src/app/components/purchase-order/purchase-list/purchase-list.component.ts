import { Component, OnInit } from '@angular/core';

import { ListTemplateInterface } from '../../../interfaces/listTemplateInterface';
import {
  PurchaseOrderInterface,
  PurchaseOrderResponseDTO,
} from '../../../interfaces/purchaseOrderInterface';
import { PurchaseOrdersService } from '../../../services/purchase-orders.service';
import { ModalService } from '../../../services/modal.service';
import { ModalConfirmInterface } from '../../../interfaces/modalInterface';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrl: './purchase-list.component.css',
})
export class PurchaseListComponent implements OnInit {
  constructor(
    private purchaseService: PurchaseOrdersService,
    private datePipe: DatePipe,
    private confirmService: ModalService
  ) {}

  purchaseList$!: Observable<PurchaseOrderResponseDTO[]>;

  purchaseFields: ListTemplateInterface = {
    section: 'purchase-orders',
    label: 'órdenes de compra',
    listFields: [
      {
        field: 'Proveedor',
        keys: [{ key: 'supplierName', isNumeric: false }],
      },
      {
        field: 'Fecha de emisión',
        keys: [{ key: 'createdAt', extras: 'FullDate', isNumeric: false }],
      },
      {
        field: 'Fecha de arribo',
        keys: [{ key: 'dateArriving', extras: 'Date', isNumeric: false }],
      },
      {
        field: 'Total',
        keys: [{ key: 'total', extras: 'Currency', isNumeric: true }],
      },
      { field: 'Estado', keys: [{ key: 'state', isNumeric: false }] },
    ],
  };
  modalConfirmFlag: boolean = false;
  modalConfirmObject!: ModalConfirmInterface;
  isListLoaded: boolean = true;

  ngOnInit(): void {
    this.purchaseList$ = this.purchaseService.getList();
  }

  loadList() {
    this.purchaseService.getList().subscribe();
  }

  deletePurchase(id: number): void {
    let deleted: PurchaseOrderResponseDTO;
    this.purchaseService.getElementById(id).subscribe((dto) => {
      deleted = dto.data;
      this.modalConfirmObject = {
        header: `Cancelar órden de compra ${deleted.id}`,
        message: `Está seguro de cancelar la órden de compra generada el ${this.datePipe.transform(
          deleted.createdAt,
          'yyyy/MM/dd HH:mm'
        )}?`,
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
