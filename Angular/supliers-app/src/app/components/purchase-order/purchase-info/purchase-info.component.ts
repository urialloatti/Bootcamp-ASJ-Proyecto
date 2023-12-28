import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PurchaseOrdersService } from '../../../services/purchase-orders.service';
import { PurchaseOrderInterface } from '../../../interfaces/purchaseOrderInterface';

@Component({
  selector: 'app-purchase-info',
  templateUrl: './purchase-info.component.html',
  styleUrl: './purchase-info.component.css',
})
export class PurchaseInfoComponent {
  constructor(
    private purchaseService: PurchaseOrdersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  currentPurchase!: PurchaseOrderInterface;
  flag: boolean = false;
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
      if (
        confirm(
          `¿Está seguro de que desea cancelar la órden de compra del ${deleted.dateEmited} del provedor ${deleted.suplierName}?`
        )
      ) {
        this.purchaseService.deleteById(id).subscribe(() => {
          this.loadPurchase(id.toString());
          // window.location.reload();
          this.flag = true;
        });
      }
    });
  }

  loadPurchase(id: string): void {
    this.purchaseService.getElementById(parseInt(id)).subscribe((response) => {
      this.currentPurchase = response;
    });
  }
}
