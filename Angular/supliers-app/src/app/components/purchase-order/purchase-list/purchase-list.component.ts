import { Component, OnInit } from '@angular/core';

import { ListTemplateInterface } from '../../../interfaces/listTemplateInterface';
import { PurchaseOrderInterface } from '../../../interfaces/purchaseOrderInterface';
import { PurchaseOrdersService } from '../../../services/purchase-orders.service';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrl: './purchase-list.component.css',
})
export class PurchaseListComponent implements OnInit {
  purchaseList: PurchaseOrderInterface[] = [];

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
        keys: [{ key: 'dateEmited', extras: 'FullDate' }],
      },
      {
        field: 'Fecha de arribo',
        keys: [{ key: 'dateArriving', extras: 'Date' }],
      },
      { field: 'Total', keys: [{ key: 'total', extras: 'Currency' }] },
    ],
  };

  isListLoaded: boolean = true;

  constructor(private purchaseService: PurchaseOrdersService) {}

  ngOnInit(): void {
    this.loadList();
  }

  loadList() {
    this.purchaseService.getList().subscribe((response) => {
      this.purchaseList = response;
    });
  }

  deletePurchase(id: number): void {
    let deleted: PurchaseOrderInterface;
    this.purchaseService.getElementById(id).subscribe((dto) => {
      deleted = dto;
      if (
        confirm(
          `¿Está seguro de que desea cancelar la órden de compra del ${deleted.dateEmited} del provedor ${deleted.suplierName}?`
        )
      ) {
        this.purchaseService.deleteById(id).subscribe(() => this.loadList());
      }
    });
  }
}
