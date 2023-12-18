import { Injectable } from '@angular/core';
import { suplierMockData } from '../../data/supliers';
import { SuplierInterface } from '../../interfaces/suplierInterface';

const data: SuplierInterface[] = suplierMockData;

@Injectable({
  providedIn: 'root'
})
export class SupliersService {

  private list: SuplierInterface[] = data;
  
  getList() {
    return this.list;
  }

  deleteElement(id: number) {
    this.list = this.list.filter((suplier) => suplier.id != id);
    return this.list;
  }

  addElement( suplier: SuplierInterface) {
    suplier.id = this.list.length;
    this.list.push(suplier);
  }
}
