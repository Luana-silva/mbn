import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NguCarouselModule } from '@ngu/carousel';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SolutionsComponent } from './solutions/solutions.component';

@NgModule({
  declarations: [HomeComponent, SolutionsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NguCarouselModule
  ]
})
export class HomeModule { }
