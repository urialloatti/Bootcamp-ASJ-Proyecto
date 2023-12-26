import { Component, OnInit } from '@angular/core';

import { ListTemplateInterface } from '../../../interfaces/listTemplateInterface';
import { PurchaseOrderInterface } from '../../../interfaces/purchaseOrderInterface';
import { PurchaseOrdersService } from '../../../services/purchase-orders.service';
import { SupliersService } from '../../../services/supliers.service';

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
        keys: [{ key: 'id', extras: 'PurchaseOrder' }],
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

  constructor(
    private purchaseService: PurchaseOrdersService,
    private supliersService: SupliersService
  ) {}

  ngOnInit(): void {
    this.loadList();
    console.log(this.purchaseList);
  }

  loadList() {
    this.purchaseList = this.purchaseService.getList();
  }

  deleteProduct(id: number): void {
    let deleted = this.purchaseService.deleteById(id);
    if (deleted) {
      alert(`Órden de compra del proveedor ${deleted.suplierName} cancelada.`);
      this.loadList();
    } else {
      alert('La órden de compra ya no se encuentra en la base de datos.');
    }
    this.purchaseList = [];
    setTimeout(() => this.loadList(), 1);
  }
}
