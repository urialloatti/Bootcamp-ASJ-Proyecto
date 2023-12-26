import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';

import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { ItemsListComponent } from './components/shared/items-list/items-list.component';
import { MainComponent } from './components/main/main.component';
import { ModalSavedComponent } from './components/shared/modal-saved/modal-saved.component';
import { NoItemsAlertComponent } from './components/shared/no-items-alert/no-items-alert.component';
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

import { CuitPipePipe } from './pipes/cuit-pipe.pipe';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';
import { ShowContactPhonePipe } from './pipes/show-contact-phone.pipe';
import { ShowContactPipe } from './pipes/show-contact.pipe';
import { ShowMailPipe } from './pipes/show-mail.pipe';
import { TableTransformPipe } from './pipes/table-transform.pipe';

@NgModule({
  declarations: [
    AppComponent,

    CuitPipePipe,
    FooterComponent,
    HeaderComponent,
    ItemsListComponent,
    MainComponent,
    ModalSavedComponent,
    NoItemsAlertComponent,
    NotFoundComponent,
    PhoneNumberPipe,
    ProductInfoComponent,
    ProductsListComponent,
    ProductsNewComponent,
    PurchaseInfoComponent,
    PurchaseListComponent,
    PurchaseNewComponent,
    ShowContactPhonePipe,
    ShowContactPipe,
    ShowMailPipe,
    SuplierInfoComponent,
    SupliersListComponent,
    SupliersNewComponent,
    TableTransformPipe,
  ],
  imports: [AppRoutingModule, BrowserModule, FormsModule],
  providers: [
    CurrencyPipe,
    DatePipe,
    JsonPipe,
    CuitPipePipe,
    PhoneNumberPipe,
    ShowContactPhonePipe,
    ShowContactPipe,
    ShowMailPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
