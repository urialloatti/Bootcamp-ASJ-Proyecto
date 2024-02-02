import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';

import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { ItemsListComponent } from './components/shared/items-list/items-list.component';
import { LoginComponent } from './components/users/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ModalConfirmComponent } from './components/shared/modal-confirm/modal-confirm.component';
import { ModalMessageComponent } from './components/shared/modal-message/modal-message.component';
import { ModalNewComponent } from './components/small-cruds/modal-new/modal-new.component';
import { ModalRedirectComponent } from './components/shared/modal-redirect/modal-redirect.component';
import { NewUserComponent } from './components/users/new-user/new-user.component';
import { NoItemsAlertComponent } from './components/shared/no-items-alert/no-items-alert.component';
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

import { CuitPipePipe } from './pipes/cuit-pipe.pipe';
import { FilterListPipe } from './pipes/filter-list.pipe';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';
import { PurchaseStatePipe } from './pipes/purchase-state.pipe';
import { ShowContactPhonePipe } from './pipes/show-contact-phone.pipe';
import { ShowContactPipe } from './pipes/show-contact.pipe';
import { ShowCountryPipe } from './pipes/show-country.pipe';
import { ShowMailPipe } from './pipes/show-mail.pipe';
import { ShowProvincePipe } from './pipes/show-province.pipe';
import { TableTransformPipe } from './pipes/table-transform.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,

    FooterComponent,
    HeaderComponent,
    ItemsListComponent,
    LoginComponent,
    MainComponent,
    ModalConfirmComponent,
    ModalMessageComponent,
    ModalNewComponent,
    ModalRedirectComponent,
    NewUserComponent,
    NoItemsAlertComponent,
    NotFoundComponent,
    ProductInfoComponent,
    ProductsListComponent,
    ProductsNewComponent,
    ProductsRecycleBinComponent,
    PurchaseInfoComponent,
    PurchaseListComponent,
    PurchaseNewComponent,
    SmallListComponent,
    supplierInfoComponent,
    suppliersListComponent,
    suppliersNewComponent,
    SuppliersRecycleBinComponent,

    CuitPipePipe,
    FilterListPipe,
    PhoneNumberPipe,
    PurchaseStatePipe,
    ShowContactPhonePipe,
    ShowContactPipe,
    ShowCountryPipe,
    ShowMailPipe,
    ShowProvincePipe,
    TableTransformPipe,
  ],
  imports: [AppRoutingModule, BrowserModule, FormsModule, HttpClientModule, NgbModule],
  providers: [
    CuitPipePipe,
    CurrencyPipe,
    DatePipe,
    JsonPipe,

    FilterListPipe,
    PhoneNumberPipe,
    ShowContactPhonePipe,
    ShowContactPipe,
    ShowCountryPipe,
    ShowMailPipe,
    ShowProvincePipe,
    TableTransformPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
