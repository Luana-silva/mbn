import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { CadastreRoutingModule } from './cadastre-routing.module';
import { RegisterCadastreComponent } from './register-cadastre/register-cadastre.component';

@NgModule({
  declarations: [RegisterCadastreComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    CadastreRoutingModule
  ]
})
export class CadastreModule { }
