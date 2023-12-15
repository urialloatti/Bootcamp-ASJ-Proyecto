import { Component } from '@angular/core';

import { SuplierInterface } from '../../../interfaces/suplierInterface';

@Component({
  selector: 'supliers-list',
  templateUrl: './supliers-list.component.html',
  styleUrl: './supliers-list.component.css'
})
export class SupliersListComponent {

  supliersList: SuplierInterface[] = supliersArrayMock;

  deleteSuplier(id: number): void {
    this.supliersList = this.supliersList.filter((suplier) => suplier.id != id);
  }
}


let supliersArrayMock: SuplierInterface[] = [
  {
      id: 1,
      brand: "Monmouth Real Estate Investment Corporation",
      category: "Medical/Dental Instruments",
      web: "php.net",
      fullAddress: {
          address: "Grasskamp",
          addressNumber: "80668",
          region: "Katy",
          state: "Texas",
          country: "United States",
      },
      cuit: "01-02407518-7".replace(/\D/g, ""),
      iva: 1,
      contact: {
          name: "Sabina",
          surname: "Besse",
          phone: "156-468-8305".replace(/\D/g, ""),
          mail: "sbesse0@oakley.com",
          rol: "Research and Development"
      }
  },
  {
      id:  2,
      brand:  "BB&T Corporation",
      category:  "Packaged Foods",
      web:  "amazonaws.com",
      fullAddress: {
          address:  "Clarendon",
          addressNumber:  "92",
          region:  "Shediac",
          state:  "New Brunswick",
          country:  "Canada",
      },
      cuit:  "47-72368854-2".replace(/\D/g, ""),
      iva:  4,
      contact: {
          name:  "Walt",
          surname:  "Authers",
          phone:  "416-358-9636".replace(/\D/g, ""),
          mail:  "wauthers7@booking.com",
          rol:  "Sales"
      }
  },
];