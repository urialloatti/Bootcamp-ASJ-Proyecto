import { ModalService } from '../../../services/modal.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  ListTemplateInterface,
  keyValue,
} from '../../../interfaces/listTemplateInterface';
import { Observable } from 'rxjs';
import { TableTransformPipe } from '../../../pipes/table-transform.pipe';
import { FilterListPipe } from '../../../pipes/filter-list.pipe';

@Component({
  selector: 'shared-items-list',
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.css',
})
export class ItemsListComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private tablePipe: TableTransformPipe,
    private filterPipe: FilterListPipe
  ) {}
  @Input()
  public listTemplate!: ListTemplateInterface;

  @Input()
  public itemsArray$!: Observable<any[]>;

  @Input()
  public hasPicture!: boolean;

  @Input()
  public isDeleted: boolean = false;

  @Output()
  private deletedId: EventEmitter<number> = new EventEmitter();

  public fullItemsLiist: any[] = [];
  public itemsShowed: any[] = [];
  public pageList: pageInterface[] = [];
  public hasPagination: boolean = false;
  public currentPage: number = 0;
  public fromPage: number = 0;
  public toPage: number = 3;
  public isOrdered: Order[] = [];
  public isLoaded: boolean = false;

  public filterIndex: number = -1;
  public filterArg: string = '';

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

  loadPages() {
    this.isLoaded = false;
    this.itemsArray$.subscribe(
      (response: any[]) => {
        this.fullItemsLiist = response;
        this.makePagination();
        this.isLoaded = true;
      },
      (error) => {
        console.log(error);
        this.isLoaded = true;
      }
    );
  }

  private makePagination(): void {
    if (this.fullItemsLiist.length == 0) {
      this.itemsShowed = [];
      return;
    }
    this.pageList = [];
    let page = [];
    let counter = 0;
    let pageCounter = 0;
    this.hasPagination = false;
    for (const obj of this.fullItemsLiist) {
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
      this.selectPage(this.pageList.length - 1);
    } else this.selectPage(this.currentPage);
    this.itemsShowed = this.pageList[this.currentPage].page;
    this.hasPagination = this.pageList.length > 1;
    this.isLoaded = true;
  }

  public selectPage(index: number) {
    this.itemsShowed = this.pageList[index].page;
    this.currentPage = index;
    index - 2 > 0 ? (this.fromPage = index - 2) : (this.fromPage = 0);
    index + 2 < this.pageList.length - 1
      ? (this.toPage = index + 2)
      : (this.toPage = this.pageList.length);
  }

  public changePage(direction: number) {
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
        this.orderList(fieldIndex, 'ascendent');
        this.selectPage(0);
        break;
      case 'ascendent':
        this.isOrdered[fieldIndex] = 'descendent';
        this.orderList(fieldIndex, 'descendent');
        this.selectPage(0);
        break;
      case 'descendent':
        this.isOrdered[fieldIndex] = 'unordered';
        this.orderList(fieldIndex, 'unordered');
        this.selectPage(0);
        break;
    }
    for (let i = 0; i < this.isOrdered.length; i++) {
      if (i != fieldIndex) this.isOrdered[i] = 'unordered';
    }
  }

  private orderList(orderBy: number = 0, order: Order = 'ascendent'): void {
    if (order == 'unordered') {
      this.fullItemsLiist = this.fullItemsLiist.sort(
        (obj1, obj2) => obj1['id'] - obj2['id']
      );
      this.makePagination();
      return;
    }
    let extra = this.listTemplate.listFields[orderBy].keys[0].extras;
    if (extra == 'country') {
      this.fullItemsLiist = this.fullItemsLiist.sort((obj1, obj2) =>
        this.tablePipe
          .transform(
            obj1[this.listTemplate.listFields[orderBy].keys[1].key],
            'province'
          )
          .localeCompare(
            this.tablePipe.transform(
              obj2[this.listTemplate.listFields[orderBy].keys[1].key],
              'province'
            )
          )
      );
    }
    if (extra !== undefined && extra !== 'Currency') {
      if (order == 'descendent') {
        this.fullItemsLiist = this.fullItemsLiist.sort((obj1, obj2) =>
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
        this.makePagination();
        return;
      }
      this.fullItemsLiist = this.fullItemsLiist.sort((obj1, obj2) =>
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
      this.makePagination();
      return;
    }
    if (this.listTemplate.listFields[orderBy].keys[0].isNumeric) {
      if (order == 'descendent') {
        this.fullItemsLiist = this.fullItemsLiist.sort(
          (obj1, obj2) =>
            obj2[this.listTemplate.listFields[orderBy].keys[0].key] -
            obj1[this.listTemplate.listFields[orderBy].keys[0].key]
        );
        this.makePagination();
        return;
      }
      this.fullItemsLiist = this.fullItemsLiist.sort(
        (obj1, obj2) =>
          obj1[this.listTemplate.listFields[orderBy].keys[0].key] -
          obj2[this.listTemplate.listFields[orderBy].keys[0].key]
      );
      this.makePagination();
      return;
    } else {
      if (order == 'descendent') {
        this.fullItemsLiist = this.fullItemsLiist.sort((obj1, obj2) =>
          obj2[this.listTemplate.listFields[orderBy].keys[0].key].localeCompare(
            obj1[this.listTemplate.listFields[orderBy].keys[0].key]
          )
        );
        this.makePagination();
        return;
      }
      this.fullItemsLiist = this.fullItemsLiist.sort((obj1, obj2) =>
        obj1[this.listTemplate.listFields[orderBy].keys[0].key].localeCompare(
          obj2[this.listTemplate.listFields[orderBy].keys[0].key]
        )
      );
      this.makePagination();
      return;
    }
  }

  public toggleAvailable(id: number): void {
    this.deletedId.emit(id);
    this.modalService.confirmModal$.subscribe(() => {
      setTimeout(() => {
        this.loadPages();
      }, 200);
    });
  }

  public filterList(): void {
    let keys: keyValue[] = [];
    keys.push(...this.listTemplate.listFields[this.filterIndex].keys);
    if (this.listTemplate.listFields[this.filterIndex].toolTip != undefined) {
      keys.push(...this.listTemplate.listFields[this.filterIndex].toolTip!);
    }
    this.fullItemsLiist = this.filterPipe.transform(
      this.fullItemsLiist,
      this.filterArg,
      keys
    );
    this.makePagination();
    this.itemsArray$.subscribe(
      (response: any[]) => {
        this.fullItemsLiist = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

interface pageInterface {
  index: number;
  page: any[];
}

type Order = 'unordered' | 'ascendent' | 'descendent';
