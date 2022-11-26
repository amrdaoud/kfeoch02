import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule } from '../carousel/carousel.module';
import { CarouselModule as CarouselListModule }  from 'ngx-owl-carousel-o';
import { WelcomeSectionComponent } from './welcome-section/welcome-section.component';
import { OfficeSliderComponent } from './office-slider/office-slider.component';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NewsSectionComponent } from './news-section/news-section.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    HomeComponent,
    WelcomeSectionComponent,
    OfficeSliderComponent,
    NewsSectionComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    CarouselModule,
    CarouselListModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslateModule
  ]
})
export class HomeModule { }
