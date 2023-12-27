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
  isListLoaded: boolean = false;

  constructor(private supliersService: SupliersService) {}

  ngOnInit(): void {
    this.supliersService.getList().subscribe((response) => {
      this.supliersArray = response;
      this.isListLoaded = true;
    });
  }

  deleteSuplier(id: number): void {
    let deleted: SuplierInterface;
    this.supliersService.getElementById(id).subscribe((response) => {
      deleted = response;
      if (confirm(`¿Está seguro de que desea eliminar ${deleted.brand}?`)) {
        this.supliersService.deleteElement(id).subscribe(
          (response) => {
            alert(`Producto ${deleted.brand} eliminado con éxito.`);
            this.supliersService.getList().subscribe((response) => {
              this.supliersArray = response;
            });
          },
          (error) => {
            alert('El proveedor ya no existe en la base de datos.');
            console.log(error);
          }
        );
      }
    });
  }
}
