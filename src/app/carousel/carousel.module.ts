import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    CarouselComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    CarouselComponent
  ]
})
export class CarouselModule { }
