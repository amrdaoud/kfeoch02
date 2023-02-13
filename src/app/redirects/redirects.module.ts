import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RedirectsRoutingModule } from './redirects-routing.module';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    UnauthorizedComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RedirectsRoutingModule,
    MatButtonModule,
    TranslateModule
  ]
})
export class RedirectsModule { }
