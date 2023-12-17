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
    component: SupliersListComponent,
  },
  {
    path: "supliers/new",
    component: SupliersNewComponent
  },
  {
    path: "supliers/:id",
    component: NotFoundComponent
  },
  {
    path: "products",
    component: ProductsListComponent
  },
  {
    path: "products/new",
    component: ProductsNewComponent
  },
  {
    path: "purchase-orders/new",
    component: PurchaseNewComponent
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
