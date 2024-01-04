import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ListTemplateInterface } from '../../../interfaces/listTemplateInterface';
import { Observable } from 'rxjs';

@Component({
  selector: 'shared-items-list',
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.css',
})
export class ItemsListComponent implements OnInit {
  @Input()
  public listTemplate!: ListTemplateInterface;

  @Input()
  public itemsArray$!: Observable<any[]>;

  @Input()
  public isLoaded!: boolean;

  @Input()
  public hasPicture!: boolean;

  @Output()
  private deletedId: EventEmitter<number> = new EventEmitter();

  public itemsShowed: any[] = [];
  public pageList: any[][] = [];
  public hasPagination: boolean = false;
  public currentPage: number = 0;

  ngOnInit(): void {
    this.itemsArray$.subscribe((response: any[]) => {
      this.itemsShowed = response;
      let page = [];
      let counter = 0;
      for (const obj of response) {
        if (counter < 10) {
          page.push(obj);
        } else if (counter == 10) {
          this.pageList.push(JSON.parse(JSON.stringify(page)));
          page = [];
          counter = 0;
        }
        counter++;
      }
      if (page.length > 0) {
        this.pageList.push(page);
      }
      this.itemsShowed = this.pageList[0];
      if (this.pageList.length > 1) {
        this.hasPagination = true;
      }
    });
  }

  selectPage(index: number) {
    this.itemsShowed = this.pageList[index];
    this.currentPage = index;
  }
  changePage(direction: number) {
    this.currentPage += direction;
    this.itemsShowed = this.pageList[this.currentPage];
  }

  deleteElement(id: number): void {
    this.deletedId.emit(id);
    this.itemsArray$.subscribe((obj: any[]) => {
      this.pageList = obj;
    });
  }

  imageNotFound(event: Event): void {
    (event.target as HTMLImageElement).src =
      '../../../../assets/image-not-found.jpg';
  }
}
