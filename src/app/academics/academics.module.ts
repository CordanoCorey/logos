import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcademicsRoutingModule } from './academics-routing.module';
import { AcademicsComponent } from './academics.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AcademicsComponent
  ],
  imports: [
    SharedModule,
    AcademicsRoutingModule
  ]
})
export class AcademicsModule { }
