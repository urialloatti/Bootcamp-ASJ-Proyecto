import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
  ) {}

  currentPurchase!: PurchaseOrderInterface;

  ngOnInit(): void {
    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      if (id) {
        this.currentPurchase = this.purchaseService.getElementById(
          parseInt(id)
        )!;
      }
    });
  }
}
