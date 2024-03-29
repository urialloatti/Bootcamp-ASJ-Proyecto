import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/users/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NewUserComponent } from './components/users/new-user/new-user.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductInfoComponent } from './components/products/product-info/product-info.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { ProductsNewComponent } from './components/products/products-new/products-new.component';
import { ProductsRecycleBinComponent } from './components/products/products-recycle-bin/products-recycle-bin.component';
import { PurchaseInfoComponent } from './components/purchase-order/purchase-info/purchase-info.component';
import { PurchaseListComponent } from './components/purchase-order/purchase-list/purchase-list.component';
import { PurchaseNewComponent } from './components/purchase-order/purchase-new/purchase-new.component';
import { SmallListComponent } from './components/small-cruds/small-list/small-list.component';
import { supplierInfoComponent } from './components/suppliers/supplier-info/supplier-info.component';
import { suppliersListComponent } from './components/suppliers/suppliers-list/suppliers-list.component';
import { suppliersNewComponent } from './components/suppliers/suppliers-new/suppliers-new.component';
import { SuppliersRecycleBinComponent } from './components/suppliers/suppliers-recycle-bin/suppliers-recycle-bin.component';

import { authGuard } from './guards/auth.guard';
import { isAdminGuard } from './guards/is-admin.guard';
import { leaveFormGuard } from './guards/leave-form.guard';

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
        canDeactivate: [leaveFormGuard],
      },
      {
        path: 'recycle-bin',
        canActivate: [isAdminGuard],
        component: SuppliersRecycleBinComponent,
        title: 'Restaurar proveedores',
      },
      {
        path: 'u/:id',
        component: suppliersNewComponent,
        canDeactivate: [leaveFormGuard],
      },
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
      {
        path: 'new',
        component: ProductsNewComponent,
        title: 'Nuevo producto',
        canDeactivate: [leaveFormGuard],
      },
      {
        path: 'recycle-bin',
        canActivate: [isAdminGuard],
        component: ProductsRecycleBinComponent,
        title: 'Restaurar productos',
      },
      {
        path: 'u/:id',
        component: ProductsNewComponent,
        canDeactivate: [leaveFormGuard],
      },
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
        canDeactivate: [leaveFormGuard],
      },
      {
        path: 'u/:id',
        component: PurchaseNewComponent,
        title: 'Editar órden de compra',
        canDeactivate: [leaveFormGuard],
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
    canActivate: [authGuard, isAdminGuard],
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
