import { Component, OnInit } from '@angular/core';
import { PurchaseOrdersService } from '../../../services/purchase-orders.service';

@Component({
  selector: 'app-purchase-new',
  templateUrl: './purchase-new.component.html',
  styleUrl: './purchase-new.component.css'
})
export class PurchaseNewComponent implements OnInit{

  constructor(private purchaseService: PurchaseOrdersService,){};
  ngOnInit(): void {
    ;
  }

}
