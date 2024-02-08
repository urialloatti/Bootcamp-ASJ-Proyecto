import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-no-items-alert',
  templateUrl: './no-items-alert.component.html',
  styleUrl: './no-items-alert.component.css',
})
export class NoItemsAlertComponent {
  @Input()
  public alerLabel!: string;

  @Input()
  public hasFilter: boolean = false;
}
