import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { SuplierInterface } from '../../../interfaces/suplierInterface';
import { SupliersService } from '../../../services/supliers.service';
import {
  ModalConfirmInterface,
  ModalRedirectInterface,
} from '../../../interfaces/modalInterface';
import { ModalsService } from '../../../services/modal-confirm.service';

@Component({
  selector: 'app-suplier-info',
  templateUrl: './suplier-info.component.html',
  styleUrl: './suplier-info.component.css',
})
export class SuplierInfoComponent {
  constructor(
    private route: ActivatedRoute,
    private confirmService: ModalsService,
    private suplierService: SupliersService,
    private titleService: Title
  ) {}

  currentSuplier!: SuplierInterface;
  modalConfirmFlag: boolean = false;
  modalConfirmObject!: ModalConfirmInterface;
  modalRedirectFlag: boolean = false;
  modalRedirectObject!: ModalRedirectInterface;

  ngOnInit(): void {
    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      if (id) {
        this.suplierService
          .getElementById(parseInt(id))
          .subscribe((response) => {
            this.currentSuplier = response;
            this.titleService.setTitle(response.brand);
          });
      }
    });
  }

  deleteSuplier(id: number): void {
    this.modalConfirmObject = {
      header: `Eliminando proveedor ${this.currentSuplier.code}`,
      message: `Está seguro de eliminar el proveedor ${this.currentSuplier.brand}`,
      cancel: 'Cancelar',
      confirm: 'Eliminar',
    };
    this.modalConfirmFlag = true;
    this.confirmService.confirm$.subscribe((confirmation) => {
      this.modalConfirmFlag = false;
      if (confirmation) {
        this.currentSuplier.isAvailable = false;
        this.suplierService.cancelElementById(id).subscribe(
          (response) => {
            this.modalRedirectObject = {
              message: `Proveedor ${response.brand} eliminado con éxito.`,
              path: '/supliers',
            };
            this.modalRedirectFlag = true;
          },
          (error) => {
            this.modalRedirectObject = {
              message: `Proveedor ${this.currentSuplier.brand} ya no se encuentra en la base de datos.`,
              path: '/supliers',
            };
            this.modalRedirectFlag = true;
            console.log(error);
          }
        );
      }
    });
  }
}
