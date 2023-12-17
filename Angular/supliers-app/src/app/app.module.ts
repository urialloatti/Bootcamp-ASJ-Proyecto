import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { MainComponent } from './components/main/main.component';
import { ModalSavedComponent } from './components/shared/modal-saved/modal-saved.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { ProductsNewComponent } from './components/products/products-new/products-new.component';
import { PurchaseNewComponent } from './components/purchase-order/purchase-new/purchase-new.component';
import { SupliersListComponent } from './components/supliers/supliers-list/supliers-list.component';
import { SupliersNewComponent } from './components/supliers/supliers-new/supliers-new.component';
import { NoItemsAlertComponent } from './components/shared/no-items-alert/no-items-alert.component';
import { ItemsListComponent } from './components/shared/items-list/items-list.component';

@NgModule({
  declarations: [
    AppComponent,
    
    FooterComponent,
    HeaderComponent,
    MainComponent,
    ModalSavedComponent,
    NotFoundComponent,
    ProductsListComponent,
    ProductsNewComponent,
    PurchaseNewComponent,
    SupliersListComponent,
    SupliersNewComponent,
    NoItemsAlertComponent,
    ItemsListComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
