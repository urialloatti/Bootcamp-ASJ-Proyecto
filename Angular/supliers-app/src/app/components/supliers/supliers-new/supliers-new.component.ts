import { Component } from '@angular/core';

@Component({
  selector: 'supliers-new',
  templateUrl: './supliers-new.component.html',
  styleUrl: './supliers-new.component.css'
})
export class SupliersNewComponent {
  flagNewSuplierCreated: boolean = false;

  saveNewSuplier():void {
    this.flagNewSuplierCreated = true;
  }
}
