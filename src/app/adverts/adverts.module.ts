import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdvertsRoutingModule } from './adverts-routing.module';
import { AdvertComponent } from './advert/advert.component';
import { RegisterAdOneComponent } from './register-ad-one/register-ad-one.component';
import { RegisterComponent } from './register/register.component';
import { RegisterAdTwoComponent } from './register-ad-two/register-ad-two.component';
import { RegisterAdThreeComponent } from './register-ad-three/register-ad-three.component';
import { AdvertDetailComponent } from './advert-detail/advert-detail.component';

@NgModule({
  declarations: [AdvertComponent, RegisterAdOneComponent, RegisterComponent, RegisterAdTwoComponent, RegisterAdThreeComponent, AdvertDetailComponent],
  imports: [
    CommonModule,
    AdvertsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdvertsModule { }
