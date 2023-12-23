import { Component, OnInit } from '@angular/core';

import { SupliersService } from '../../../services/supliers.service';
import { PurchaseOrdersService } from '../../../services/purchase-orders.service';
import { PurchaseOrderInterface } from '../../../interfaces/purchaseOrderInterface';
import { ListTemplateInterface } from '../../../interfaces/listTemplateInterface';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrl: './purchase-list.component.css'
})
export class PurchaseListComponent implements OnInit{
  
  purchaseList: PurchaseOrderInterface[] = []

  purchaseFields: ListTemplateInterface = {
    section: "purchase-orders",
    label: "órdenes de compra",
    listFields: [
      {field: "Proveedor", key: "suplierName"},
      {field: "Fecha de emisión", key: "dateEmited", extras: "Date"},
      {field: "Total", key: "total", extras: "Currency"}
    ]
  }
  
  constructor(private purchaseService: PurchaseOrdersService, private supliersService: SupliersService){}

  ngOnInit(): void {
    this.loadList();
  }


  loadList() {
    this.purchaseList = this.purchaseService.getList();
    for (let purchase of this.purchaseList) {
      purchase.suplierName = this.getSuplierName(purchase.id!);
    }
  }

  deleteProduct(id: number): void {
    let deleted = this.purchaseService.deleteById(id);
    if (deleted) {
      alert(`Órden de compra del proveedor ${this.getSuplierName(deleted.id!)} eliminado con éxito.`);
      this.loadList();
    } else {
      alert("La órden de compra ya no se encuentra en la base de datos.");
    }
  }

  getSuplierName(id:number): string {
    let suplier = this.supliersService.getElementById(id);
    return suplier?.brand || "Proveedor no encontrado."
  }
  

}
