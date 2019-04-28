import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
//import { HeaderComponent } from './shared/header/header.component';
import { StorageUtils } from './utils/storage-utils';
import { SharedModule } from './shared/shared.module';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap';
//import {MyDatePickerModule} from 'mydatepicker';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
   // HeaderComponent
  ],
  imports: [
    BrowserModule,
    NgxMaskModule.forRoot(),
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot()
  ],
  providers: [StorageUtils],
  bootstrap: [AppComponent]
})
export class AppModule { }