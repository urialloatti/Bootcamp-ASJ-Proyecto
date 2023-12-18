import { Component, OnInit } from '@angular/core';

import { SupliersService } from '../../../services/supliers-service/supliers.service';

import { SuplierInterface } from '../../../interfaces/suplierInterface';
import { ListTemplateInterface } from '../../../interfaces/listTemplateInterface';

@Component({
  selector: 'supliers-list',
  templateUrl: './supliers-list.component.html',
  styleUrl: './supliers-list.component.css'
})
export class SupliersListComponent implements OnInit{
  constructor(private sService: SupliersService) {}
  
  supliersList!: SuplierInterface[];
  
  ngOnInit(): void {
    this.supliersList = this.sService.getList();
  }

  deleteSuplier(id: number): void {
    this.supliersList = this.sService.deleteElement(id);
  }

  supliersFields: ListTemplateInterface = {
    section: "supliers",
    label: "proveedores",
    listFields: [
      {field: "#", key: "id"},
      {field: "Razón social", key: "brand"},
      {field: "Rubro", key: "category"}
    ] 
  }


}