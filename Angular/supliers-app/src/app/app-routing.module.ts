import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { ProductsNewComponent } from './components/products/products-new/products-new.component';
import { SupliersListComponent } from './components/supliers/supliers-list/supliers-list.component';
import { SupliersNewComponent } from './components/supliers/supliers-new/supliers-new.component';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PurchaseNewComponent } from './components/purchase-order/purchase-new/purchase-new.component';
import { PurchaseListComponent } from './components/purchase-order/purchase-list/purchase-list.component';
import { SuplierInfoComponent } from './components/supliers/suplier-info/suplier-info.component';
import { ProductInfoComponent } from './components/products/product-info/product-info.component';
import { PurchaseInfoComponent } from './components/purchase-order/purchase-info/purchase-info.component';
import { ModalConfirmComponent } from './components/shared/modal-confirm/modal-confirm.component';

const routes: Routes = [
  {
    path: 'supliers',
    children: [
      { path: '', component: SupliersListComponent },
      { path: 'new', component: SupliersNewComponent },
      { path: 'u/:id', component: SupliersNewComponent },
      { path: ':id', component: SuplierInfoComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
  {
    path: 'products',
    children: [
      { path: '', component: ProductsListComponent },
      { path: 'new', component: ProductsNewComponent },
      { path: 'u/:id', component: ProductsNewComponent },
      { path: ':id', component: ProductInfoComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
  {
    path: 'purchase-orders',
    children: [
      { path: '', component: PurchaseListComponent },
      { path: 'new', component: PurchaseNewComponent },
      { path: 'u/:id', component: PurchaseNewComponent },
      { path: ':id', component: PurchaseInfoComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full',
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  { path: 'modal', component: ModalConfirmComponent },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
