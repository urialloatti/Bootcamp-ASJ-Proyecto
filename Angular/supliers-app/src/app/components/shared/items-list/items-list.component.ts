import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ListTemplateInterface } from '../../../interfaces/listTemplateInterface';

@Component({
  selector: 'shared-items-list',
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.css',
})
export class ItemsListComponent {
  @Input()
  public listTemplate!: ListTemplateInterface;

  @Input()
  public itemsArray: any[] = [];

  @Input()
  public isLoaded!: boolean;

  @Output()
  deletedId: EventEmitter<number> = new EventEmitter();

  deleteElement(id: number): void {
    this.deletedId.emit(id);
  }
}
