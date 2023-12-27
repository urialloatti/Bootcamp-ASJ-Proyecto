import { Injectable } from '@angular/core';
import { suplierMockData } from '../data/mock-data';
import { SuplierInterface } from '../interfaces/suplierInterface';

@Injectable({
  providedIn: 'root',
})
export class SupliersService {
  private list: SuplierInterface[] = suplierMockData || [];

  public getList() {
    return this.list.sort((a, b) =>
      a.brand.toLowerCase().localeCompare(b.brand.toLowerCase())
    );
  }

  public getElementById(id: number): SuplierInterface | undefined {
    return this.list.find((suplier) => suplier.id == id);
  }

  public deleteElement(id: number) {
    const deleted = this.list.find((suplier) => suplier.id == id);
    this.list = this.list.filter((suplier) => suplier.id != id);
    return deleted;
  }

  public addElement(suplier: SuplierInterface) {
    suplier.id = this.list.length;
    suplier.code = suplier.category.substring(0, 3) + suplier.id.toString();
    this.list.push(suplier);
  }

  public updateElement(newSuplier: SuplierInterface) {
    let updated = this.list.find((suplier) => suplier.id == newSuplier.id);
    updated = newSuplier;
  }
}