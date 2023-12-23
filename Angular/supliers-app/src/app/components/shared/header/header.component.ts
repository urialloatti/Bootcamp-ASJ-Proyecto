import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private route: Router) {}

  linksList: Section[] = [
    {
      sectionName: "Proveedores",
      sectionPath: "/supliers",
      pages: [
        {
          pageName: "Listado",
          path: "supliers"
        },
        {
          pageName: "Nuevo",
          path: "supliers/new"
        }
      ]
    },
    {
      sectionName: "Productos",
      sectionPath: "/products",
      pages: [
        {
          pageName: "Listado",
          path: "products"
        },
        {
          pageName: "Nuevo",
          path: "products/new"
        }
      ]
    },
    {
      sectionName: "Órdenes de compra",
      sectionPath: "/purchase-orders",
      pages: [
        {
          pageName: "Listado",
          path: "purchase-orders"
        },
        {
          pageName: "Nueva órden de compra",
          path: "purchase-orders/new"
        }
        ]
    }
  ]

  checkActive(path: string): boolean {
    return this.route.url.startsWith(path)
  }

}

type Section = {
  sectionName: string,
  sectionPath: string,
  pages: Page[]
}

type Page = {
  pageName: string,
  path: string
}