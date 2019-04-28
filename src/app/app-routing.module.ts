import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './shared/notfound/notfound.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '', loadChildren: './modules/home/home.module#HomeModule'},
  { path: 'cadastre', loadChildren: './modules/cadastre/cadastre.module#CadastreModule'},
  { path: '', loadChildren: './modules/user/user.module#UserModule'},
  { path: '', loadChildren: './modules/catalogue/catalogue.module#CatalogueModule'},
  { path: '', loadChildren: './modules/profile/profile.module#ProfileModule'},
  { path: '', loadChildren: './modules/calendar/calendar.module#CalendarModule'},
  { path: '', loadChildren: './modules/adverts/adverts.module#AdvertsModule'},
  { path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
