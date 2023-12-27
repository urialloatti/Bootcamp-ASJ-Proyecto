import { Component } from '@angular/core';
import { SupliersService } from '../../../services/supliers.service';
import { ActivatedRoute } from '@angular/router';
import { SuplierInterface } from '../../../interfaces/suplierInterface';

@Component({
  selector: 'app-suplier-info',
  templateUrl: './suplier-info.component.html',
  styleUrl: './suplier-info.component.css',
})
export class SuplierInfoComponent {
  constructor(
    private suplierService: SupliersService,
    private route: ActivatedRoute
  ) {}

  currentSuplier!: SuplierInterface;

  ngOnInit(): void {
    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      if (id) {
        this.currentSuplier = this.suplierService.getElementById(parseInt(id))!;
      }
    });
  }
}
