import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateChildFn } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductInfoComponent } from './components/products/product-info/product-info.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { ProductsNewComponent } from './components/products/products-new/products-new.component';
import { PurchaseInfoComponent } from './components/purchase-order/purchase-info/purchase-info.component';
import { PurchaseListComponent } from './components/purchase-order/purchase-list/purchase-list.component';
import { PurchaseNewComponent } from './components/purchase-order/purchase-new/purchase-new.component';
import { supplierInfoComponent } from './components/suppliers/supplier-info/supplier-info.component';
import { suppliersListComponent } from './components/suppliers/suppliers-list/suppliers-list.component';
import { suppliersNewComponent } from './components/suppliers/suppliers-new/suppliers-new.component';
import { LoginComponent } from './components/users/login/login.component';
import { NewUserComponent } from './components/users/new-user/new-user.component';
import { authGuard } from './guards/auth.guard';
import { SmallListComponent } from './components/small-cruds/small-list/small-list.component';

const routes: Routes = [
  {
    path: 'suppliers',
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        component: suppliersListComponent,
        title: 'Lista de proveedores',
      },
      {
        path: 'new',
        component: suppliersNewComponent,
        title: 'Nuevo proveedor',
      },
      { path: 'u/:id', component: suppliersNewComponent },
      { path: ':id', component: supplierInfoComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
  {
    path: 'products',
    canActivateChild: [authGuard],
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
    canActivateChild: [authGuard],
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
    path: 'sectors&categories',
    component: SmallListComponent,
    title: 'Rubros y categorías',
    canActivate: [authGuard],
  },
  {
    path: '',
    component: MainComponent,
    title: 'Gestión de compras',
    pathMatch: 'full',
    canActivate: [authGuard],
  },
  {
    path: 'login',
    children: [
      { path: '', component: LoginComponent },
      { path: 'register', component: NewUserComponent },
    ],
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
