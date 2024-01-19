import { ModalService } from '../../../services/modal.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ListTemplateInterface } from '../../../interfaces/listTemplateInterface';
import { Observable } from 'rxjs';

@Component({
  selector: 'shared-items-list',
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.css',
})
export class ItemsListComponent implements OnInit {
  constructor(private modalService: ModalService) {}
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
  public pageList: pageInterface[] = [];
  public hasPagination: boolean = false;
  public currentPage: number = 0;
  public fromPage: number = 0;
  public toPage: number = 3;
  isOrdered: Order[] = [];

  ngOnInit(): void {
    for (let field of this.listTemplate.listFields) {
      this.isOrdered.push('unordered');
    }
    this.loadPages();
  }

  selectPage(index: number) {
    this.itemsShowed = this.pageList[index].page;
    this.currentPage = index;
    index - 2 > 0 ? (this.fromPage = index - 2) : (this.fromPage = 0);
    index + 2 < this.pageList.length - 1
      ? (this.toPage = index + 2)
      : (this.toPage = this.pageList.length);
  }

  changePage(direction: number) {
    if (
      !(
        (direction == -1 && this.currentPage == 0) ||
        (direction == 1 && this.currentPage == this.pageList.length - 1)
      )
    ) {
      this.currentPage += direction;
      this.currentPage - 2 > 0
        ? (this.fromPage = this.currentPage - 2)
        : (this.fromPage = 0);
      this.currentPage + 2 < this.pageList.length - 1
        ? (this.toPage = this.currentPage + 2)
        : (this.toPage = this.pageList.length);
      this.itemsShowed = this.pageList[this.currentPage].page;
    }
  }

  deleteElement(id: number): void {
    this.deletedId.emit(id);
    this.modalService.confirm$.subscribe(() => {
      setTimeout(() => {
        this.loadPages();
      }, 200);
    });
  }

  imageNotFound(event: Event): void {
    (event.target as HTMLImageElement).src =
      '../../../../assets/image-not-found.jpg';
  }

  loadPages() {
    this.itemsArray$.subscribe((response: any[]) => {
      // response = response.sort((obj1, obj2) => obj1[this.listTemplate.listFields[0].keys[0].key].localeCompare(obj2[this.listTemplate.listFields[0].keys[0].key]))
      this.pageList = [];
      let page = [];
      let counter = 0;
      let pageCounter = 0;
      for (const obj of response) {
        if (counter < 10) {
          page.push(obj);
        } else if (counter == 10) {
          this.pageList.push({ index: pageCounter, page: page });
          page = [];
          counter = 0;
          pageCounter++;
        }
        counter++;
      }
      if (page.length > 0) {
        this.pageList.push({ index: pageCounter, page: page });
      }
      this.itemsShowed = [];
      if (this.currentPage >= this.pageList.length) {
        this.currentPage = this.pageList.length - 1;
      }
      this.itemsShowed = this.pageList[this.currentPage].page;
      this.hasPagination = this.pageList.length > 1;
    });
  }
}

interface pageInterface {
  index: number;
  page: any[];
}

type Order = 'unordered' | 'ascendent' | 'descendent';
