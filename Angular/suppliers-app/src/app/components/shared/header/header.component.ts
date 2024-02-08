import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../../services/users.service';
import { UserResponseDTO } from '../../../interfaces/userInterface';
import { ModalRedirectInterface } from '../../../interfaces/modalInterface';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor(private route: Router, private userService: UsersService) {}

  linksList: Section[] = [
    {
      sectionName: 'Proveedores',
      sectionPath: '/suppliers',
      pages: [
        {
          pageName: 'Listado',
          path: 'suppliers',
        },
        {
          pageName: 'Nuevo',
          path: 'suppliers/new',
        },
      ],
    },
    {
      sectionName: 'Productos',
      sectionPath: '/products',
      pages: [
        {
          pageName: 'Listado',
          path: 'products',
        },
        {
          pageName: 'Nuevo',
          path: 'products/new',
        },
      ],
    },
    {
      sectionName: 'Órdenes de compra',
      sectionPath: '/purchase-orders',
      pages: [
        {
          pageName: 'Listado',
          path: 'purchase-orders',
        },
        {
          pageName: 'Nueva órden de compra',
          path: 'purchase-orders/new',
        },
      ],
    },
  ];

  userData!: UserResponseDTO;
  isUserLoaded: boolean = false;
  modalRedirectFlag: boolean = false;
  modalRedirectObject!: ModalRedirectInterface;

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      (response) => {
        this.userData = response.data;
        this.isUserLoaded = true;
      },
      (error) => {
        this.modalRedirectObject = {
          header: 'Error',
          message: error.error.message,
          path: '/login',
        };
        this.modalRedirectFlag = true;
        console.error(error);
      }
    );
  }

  public checkActive(path: string): boolean {
    return this.route.url.startsWith(path);
  }

  public logOut() {
    if (localStorage.getItem('credentials')) {
      localStorage.removeItem('credentials');
      location.reload();
    }
  }
}

type Section = {
  sectionName: string;
  sectionPath: string;
  pages: Page[];
};

type Page = {
  pageName: string;
  path: string;
};
