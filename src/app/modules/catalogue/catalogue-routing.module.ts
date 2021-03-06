import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogueComponent } from './catalogue/catalogue.component';

const routes: Routes = [
	{ path: 'catalogue', component: CatalogueComponent},
	{ path: 'catalogue/:id', component: CatalogueComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule { }
