import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './shared/notfound/notfound.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '', loadChildren: './home/home.module#HomeModule'},
  { path: 'cadastre', loadChildren: './cadastre/cadastre.module#CadastreModule'},
  { path: '', loadChildren: './user/user.module#UserModule'},
  { path: '', loadChildren: './catalogue/catalogue.module#CatalogueModule'},
  { path: '', loadChildren: './profile/profile.module#ProfileModule'},
  { path: '', loadChildren: './calendar/calendar.module#CalendarModule'},
  { path: '', loadChildren: './adverts/adverts.module#AdvertsModule'},
  { path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
