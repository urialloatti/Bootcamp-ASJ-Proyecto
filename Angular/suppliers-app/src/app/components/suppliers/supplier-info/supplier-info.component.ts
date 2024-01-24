import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { supplierInterface } from '../../../interfaces/supplierInterface';
import { suppliersService } from '../../../services/suppliers.service';
import {
  ModalConfirmInterface,
  ModalRedirectInterface,
} from '../../../interfaces/modalInterface';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-supplier-info',
  templateUrl: './supplier-info.component.html',
  styleUrl: './supplier-info.component.css',
})
export class supplierInfoComponent {
  constructor(
    private route: ActivatedRoute,
    private confirmService: ModalService,
    private supplierService: suppliersService,
    private titleService: Title
  ) {}

  currentsupplier!: supplierInterface;
  modalConfirmFlag: boolean = false;
  modalConfirmObject!: ModalConfirmInterface;
  modalRedirectFlag: boolean = false;
  modalRedirectObject!: ModalRedirectInterface;

  ngOnInit(): void {
    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      if (id) {
        this.supplierService
          .getElementById(parseInt(id))
          .subscribe((response) => {
            this.currentsupplier = response;
            this.titleService.setTitle(response.brand);
          });
      }
    });
  }

  deletesupplier(id: number): void {
    this.modalConfirmObject = {
      header: `Eliminando proveedor ${this.currentsupplier.code}`,
      message: `Está seguro de eliminar el proveedor ${this.currentsupplier.brand}`,
      cancel: 'Cancelar',
      confirm: 'Eliminar',
    };
    this.modalConfirmFlag = true;
    this.confirmService.confirm$.subscribe((confirmation) => {
      this.modalConfirmFlag = false;
      if (confirmation) {
        this.currentsupplier.isAvailable = false;
        this.supplierService.cancelElementById(id).subscribe(
          (response) => {
            this.modalRedirectObject = {
              message: `Proveedor ${response.brand} eliminado con éxito.`,
              path: '/suppliers',
            };
            this.modalRedirectFlag = true;
          },
          (error) => {
            this.modalRedirectObject = {
              message: `Proveedor ${this.currentsupplier.brand} ya no se encuentra en la base de datos.`,
              path: '/suppliers',
            };
            this.modalRedirectFlag = true;
            console.log(error);
          }
        );
      }
    });
  }
}
