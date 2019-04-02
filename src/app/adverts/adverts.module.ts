import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ImageCropperModule } from 'ng2-img-cropper';
import { AdvertsRoutingModule } from './adverts-routing.module';
import { AdvertComponent } from './advert/advert.component';
import { RegisterAdOneComponent } from './register-ad-one/register-ad-one.component';
import { RegisterComponent } from './register/register.component';
import { RegisterAdTwoComponent } from './register-ad-two/register-ad-two.component';
import { RegisterAdThreeComponent } from './register-ad-three/register-ad-three.component';
import { AdvertDetailComponent } from './advert-detail/advert-detail.component';
import { TalkSupplierComponent } from './talk-supplier/talk-supplier.component';

@NgModule({
  declarations: [AdvertComponent, 
                RegisterAdOneComponent, 
                RegisterComponent, 
                RegisterAdTwoComponent, 
                RegisterAdThreeComponent, 
                AdvertDetailComponent, TalkSupplierComponent],
  imports: [
    CommonModule,
    AdvertsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    CurrencyMaskModule,
    ImageCropperModule
  ]
})
export class AdvertsModule { }
