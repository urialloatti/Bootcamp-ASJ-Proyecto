import { Component, OnInit } from '@angular/core';

import { SupliersService } from '../../../services/supliers.service';

import { SuplierInterface } from '../../../interfaces/suplierInterface';
import { ListTemplateInterface } from '../../../interfaces/listTemplateInterface';

@Component({
  selector: 'supliers-list',
  templateUrl: './supliers-list.component.html',
  styleUrl: './supliers-list.component.css',
})
export class SupliersListComponent implements OnInit {
  supliersArray!: SuplierInterface[];

  constructor(private supliersService: SupliersService) {}

  ngOnInit(): void {
    this.supliersArray = this.supliersService.getList();
    console.log(this.supliersArray);
  }

  deleteSuplier(id: number): void {
    let deletedSuplier = this.supliersService.deleteElement(id);
    if (deletedSuplier) {
      alert(`Proveedor ${deletedSuplier.brand} eliminado con éxito.`);
      this.supliersArray = this.supliersService.getList();
    } else {
      alert('El proveedor ya no existe en la base de datos.');
    }
  }

  supliersFields: ListTemplateInterface = {
    section: 'supliers',
    label: 'proveedores',
    listFields: [
      { field: 'Razón social', keys: [{ key: 'brand' }] },
      { field: 'Nombre', keys: [{ key: 'contact', extras: 'contactName' }] },
      {
        field: 'Datos de contacto',
        keys: [
          { key: 'contact', extras: 'contactPhone' },
          { key: 'contact', extras: 'contactMails' },
          { key: 'web' },
        ],
      },
    ],
  };
}
