import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterCadastreComponent } from './register-cadastre/register-cadastre.component';

const routes: Routes = [
  { path: '', component: RegisterCadastreComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastreRoutingModule { }
