import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvertComponent } from './advert/advert.component';
import { RegisterAdOneComponent } from './register-ad-one/register-ad-one.component';
import { RegisterAdTwoComponent } from './register-ad-two/register-ad-two.component';
import { RegisterAdThreeComponent } from './register-ad-three/register-ad-three.component';

const routes: Routes = [
  { path: 'adverts', component: AdvertComponent },
  { path: 'price-settings', component: RegisterAdOneComponent },
  { path: 'listing-details', component: RegisterAdTwoComponent },
  { path: 'comprehensiveness', component: RegisterAdThreeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvertsRoutingModule { }
