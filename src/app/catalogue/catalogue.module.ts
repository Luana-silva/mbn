import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { CatalogueComponent } from './catalogue/catalogue.component';

@NgModule({
  declarations: [CatalogueComponent],
  imports: [
    CommonModule,
    FormsModule,
    CatalogueRoutingModule,
    ReactiveFormsModule
  ]
})
export class CatalogueModule { }
