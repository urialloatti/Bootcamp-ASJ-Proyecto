import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { SupplierResponseDTO } from '../../../interfaces/supplierInterface';
import { SuppliersService } from '../../../services/suppliers.service';
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
    private router: Router,
    private confirmService: ModalService,
    private supplierService: SuppliersService,
    private titleService: Title
  ) {}

  isSupplierLoaded: boolean = false;
  currentsupplier!: SupplierResponseDTO;
  modalConfirmFlag: boolean = false;
  modalConfirmObject!: ModalConfirmInterface;
  modalRedirectFlag: boolean = false;
  modalRedirectObject!: ModalRedirectInterface;

  ngOnInit(): void {
    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      if (id !== null && !isNaN(Number(id))) {
        this.supplierService.getElementById(parseInt(id)).subscribe(
          (apiResponse) => {
            let response = apiResponse.data;
            this.currentsupplier = response;
            this.titleService.setTitle(response.brand);
            this.isSupplierLoaded = true;
          },
          (error) => {
            this.modalRedirectObject = {
              header: 'Error',
              message: error.error.message,
              path: '/suppliers',
            };
            this.modalRedirectFlag = true;
            console.error(error);
          }
        );
      } else {
        this.router.navigateByUrl('404');
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
        this.currentsupplier.available = false;
        this.supplierService.cancelElementById(id).subscribe(
          (apiResponse) => {
            let response = apiResponse.data;
            this.modalRedirectObject = {
              header: `Proveedor ${response.brand} eliminado con éxito.`,
              path: '/suppliers',
            };
            this.modalRedirectFlag = true;
          },
          (error) => {
            this.modalRedirectObject = {
              header: error.error.message,
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
