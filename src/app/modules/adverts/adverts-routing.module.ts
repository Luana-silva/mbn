import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvertComponent } from './advert/advert.component';
import { AdvertDetailComponent } from './advert-detail/advert-detail.component';
import { RegisterAdOneComponent } from './register-ad-one/register-ad-one.component';
import { RegisterAdTwoComponent } from './register-ad-two/register-ad-two.component';
import { RegisterAdThreeComponent } from './register-ad-three/register-ad-three.component';
import { TalkSupplierComponent } from './talk-supplier/talk-supplier.component';
import { HireServiceComponent } from './hire-service/hire-service.component';
import { FinalizeHiringComponent } from './finalize-hiring/finalize-hiring.component';
const routes: Routes = [
  { path: 'adverts', component: AdvertComponent },
  { path: 'advert/:id', component: AdvertDetailComponent },
  { path: 'price-settings', component: RegisterAdOneComponent },
  { path: 'listing-details/:id', component: RegisterAdTwoComponent },
  { path: 'comprehensiveness/:id', component: RegisterAdThreeComponent },
  { path: 'talksupplier/:id', component: TalkSupplierComponent },
  { path: 'hireservice/:id', component: HireServiceComponent },
  { path: 'finalizeservice/:id', component: FinalizeHiringComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvertsRoutingModule { }
