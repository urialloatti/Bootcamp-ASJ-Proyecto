import { ModalService } from '../../../services/modal.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ListTemplateInterface } from '../../../interfaces/listTemplateInterface';
import { Observable } from 'rxjs';
import { TableTransformPipe } from '../../../pipes/table-transform.pipe';

@Component({
  selector: 'shared-items-list',
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.css',
})
export class ItemsListComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private tablePipe: TableTransformPipe
  ) {}
  @Input()
  public listTemplate!: ListTemplateInterface;

  @Input()
  public itemsArray$!: Observable<any[]>;

  @Input()
  public isLoaded: boolean = false;

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
    for (let i = 0; i < this.listTemplate.listFields.length; i++) {
      this.isOrdered.push('unordered');
    }
    this.isOrdered[0] = 'ascendent';
    this.loadPages();
  }

  imageNotFound(event: Event): void {
    (event.target as HTMLImageElement).src =
      '../../../../assets/image-not-found.jpg';
  }

  loadPages(orderBy: number = 0, order: Order = 'ascendent') {
    this.itemsArray$.subscribe(
      (response: any[]) => {
        response = this.orderList(response, orderBy, order);
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
        this.isLoaded = true;
      },
      (error) => {
        console.log(error);
        this.isLoaded = true;
      }
    );
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

  public toggleOrder(fieldIndex: number): void {
    switch (this.isOrdered[fieldIndex]) {
      case 'unordered':
        this.isOrdered[fieldIndex] = 'ascendent';
        this.loadPages(fieldIndex, 'ascendent');
        this.selectPage(0);
        break;
      case 'ascendent':
        this.isOrdered[fieldIndex] = 'descendent';
        this.loadPages(fieldIndex, 'descendent');
        this.selectPage(0);
        break;
      case 'descendent':
        this.isOrdered[fieldIndex] = 'unordered';
        this.loadPages(fieldIndex, 'unordered');
        this.selectPage(0);
        break;
    }
    for (let i = 0; i < this.isOrdered.length; i++) {
      if (i != fieldIndex) this.isOrdered[i] = 'unordered';
    }
  }

  private orderList(
    list: any[],
    orderBy: number = 0,
    order: Order = 'ascendent'
  ): any[] {
    if (order == 'unordered') {
      return list.sort((obj1, obj2) => obj1['id'] - obj2['id']);
    }
    let extra = this.listTemplate.listFields[orderBy].keys[0].extras;
    if (extra !== undefined && extra !== 'Currency') {
      if (order == 'ascendent') {
        return list.sort((obj1, obj2) =>
          this.tablePipe
            .transform(
              obj1[this.listTemplate.listFields[orderBy].keys[0].key],
              extra
            )
            .localeCompare(
              this.tablePipe.transform(
                obj2[this.listTemplate.listFields[orderBy].keys[0].key],
                extra
              )
            )
        );
      }
      return list.sort((obj1, obj2) =>
        this.tablePipe
          .transform(
            obj2[this.listTemplate.listFields[orderBy].keys[0].key],
            extra
          )
          .localeCompare(
            this.tablePipe.transform(
              obj1[this.listTemplate.listFields[orderBy].keys[0].key],
              extra
            )
          )
      );
    }
    if (this.listTemplate.listFields[orderBy].keys[0].isNumeric) {
      if (order == 'descendent') {
        return list.sort(
          (obj1, obj2) =>
            obj2[this.listTemplate.listFields[orderBy].keys[0].key] -
            obj1[this.listTemplate.listFields[orderBy].keys[0].key]
        );
      }
      return list.sort(
        (obj1, obj2) =>
          obj1[this.listTemplate.listFields[orderBy].keys[0].key] -
          obj2[this.listTemplate.listFields[orderBy].keys[0].key]
      );
    } else {
      if (order == 'descendent') {
        return list.sort((obj1, obj2) =>
          obj2[this.listTemplate.listFields[orderBy].keys[0].key].localeCompare(
            obj1[this.listTemplate.listFields[orderBy].keys[0].key]
          )
        );
      }
      return list.sort((obj1, obj2) =>
        obj1[this.listTemplate.listFields[orderBy].keys[0].key].localeCompare(
          obj2[this.listTemplate.listFields[orderBy].keys[0].key]
        )
      );
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
}

interface pageInterface {
  index: number;
  page: any[];
}

type Order = 'unordered' | 'ascendent' | 'descendent';
