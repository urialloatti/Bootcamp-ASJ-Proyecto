import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { ProductsNewComponent } from './components/products/products-new/products-new.component';
import { SupliersListComponent } from './components/supliers/supliers-list/supliers-list.component';
import { SupliersNewComponent } from './components/supliers/supliers-new/supliers-new.component';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PurchaseNewComponent } from './components/purchase-order/purchase-new/purchase-new.component';

const routes: Routes = [
  {
    path: "supliers",
    children: [
      {
        path: "",
        component: SupliersListComponent
      },
      {
        path: "new",
        component: SupliersNewComponent
      },
      {
        path: "update/:id",
        component: NotFoundComponent
      },
      {
        path: "**",
        redirectTo: "",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "products",
    children: [
      {
        path: "",
        component: ProductsListComponent
      },
      {
        path: "new",
        component: ProductsNewComponent
      },
      {
        path: "update/:id",
        component: NotFoundComponent
      },
      {
        path: "**",
        redirectTo: "",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "purchase-orders/new",
    children: [
      {
        path: "new",
        component: PurchaseNewComponent
      }
    ]
  },
  {
    path: "",
    component: MainComponent,
    pathMatch: "full"
  },
  {
    path: "404",
    component: NotFoundComponent
  },
  {
    path: "**",
    redirectTo: "404"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
