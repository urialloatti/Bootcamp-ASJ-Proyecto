import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { SupliersListComponent } from './components/supliers/supliers-list/supliers-list.component';
import { SupliersNewComponent } from './components/supliers/supliers-new/supliers-new.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { ProductsNewComponent } from './components/products/products-new/products-new.component';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { PurchaseNewComponent } from './components/purchase-order/purchase-new/purchase-new.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SupliersListComponent,
    SupliersNewComponent,
    ProductsListComponent,
    ProductsNewComponent,
    MainComponent,
    NotFoundComponent,
    FooterComponent,
    PurchaseNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
