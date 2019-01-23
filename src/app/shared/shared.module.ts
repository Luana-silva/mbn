import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
//import { ProductComponent } from './product/product.component';
//import { FooterComponent } from './footer/footer.component';
//import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [NotfoundComponent],
  declarations: [NotfoundComponent] //[ProductComponent, FooterComponent]
})
export class SharedModule { }
