import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NguCarouselModule } from '@ngu/carousel';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxMasonryModule } from 'ngx-masonry';
@NgModule({
  declarations: [HomeComponent, SolutionsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NguCarouselModule,
    NgxMasonryModule
  ]
})
export class HomeModule { }
