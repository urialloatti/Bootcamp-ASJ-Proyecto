import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductInfoComponent } from './components/products/product-info/product-info.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { ProductsNewComponent } from './components/products/products-new/products-new.component';
import { PurchaseInfoComponent } from './components/purchase-order/purchase-info/purchase-info.component';
import { PurchaseListComponent } from './components/purchase-order/purchase-list/purchase-list.component';
import { PurchaseNewComponent } from './components/purchase-order/purchase-new/purchase-new.component';
import { SuplierInfoComponent } from './components/supliers/suplier-info/suplier-info.component';
import { SupliersListComponent } from './components/supliers/supliers-list/supliers-list.component';
import { SupliersNewComponent } from './components/supliers/supliers-new/supliers-new.component';

const routes: Routes = [
  {
    path: 'supliers',
    children: [
      {
        path: '',
        component: SupliersListComponent,
        title: 'Lista de proveedores',
      },
      {
        path: 'new',
        component: SupliersNewComponent,
        title: 'Nuevo proveedor',
      },
      { path: 'u/:id', component: SupliersNewComponent },
      { path: ':id', component: SuplierInfoComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        component: ProductsListComponent,
        title: 'Lista de productos',
      },
      { path: 'new', component: ProductsNewComponent, title: 'Nuevo producto' },
      { path: 'u/:id', component: ProductsNewComponent },
      { path: ':id', component: ProductInfoComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
  {
    path: 'purchase-orders',
    children: [
      {
        path: '',
        component: PurchaseListComponent,
        title: 'Lista de órdenes de compra',
      },
      {
        path: 'new',
        component: PurchaseNewComponent,
        title: 'Nueva órden de compra',
      },
      {
        path: 'u/:id',
        component: PurchaseNewComponent,
        title: 'Editar órden de compra',
      },
      {
        path: ':id',
        component: PurchaseInfoComponent,
        title: 'Órden de compra',
      },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    component: MainComponent,
    title: 'Gestión de compras',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: NotFoundComponent,
    title: 'Algo salió mal...',
  },
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
