import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SuplierInterface } from '../../../interfaces/suplierInterface';
import { SupliersService } from '../../../services/supliers.service';

@Component({
  selector: 'app-suplier-info',
  templateUrl: './suplier-info.component.html',
  styleUrl: './suplier-info.component.css',
})
export class SuplierInfoComponent {
  constructor(
    private suplierService: SupliersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  currentSuplier!: SuplierInterface;

  ngOnInit(): void {
    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      if (id) {
        this.suplierService
          .getElementById(parseInt(id))
          .subscribe((response) => {
            this.currentSuplier = response;
          });
      }
    });
  }

  deleteSuplier(id: number): void {
    let deleted: SuplierInterface;
    this.suplierService.getElementById(id).subscribe((response) => {
      deleted = response;
      if (confirm(`¿Está seguro de que desea eliminar ${deleted.brand}?`)) {
        this.suplierService.deleteElementById(id).subscribe(
          () => {
            alert(`Proveedor ${deleted.brand} eliminado con éxito.`);
            setTimeout(() => this.router.navigateByUrl('/supliers'), 1000);
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
