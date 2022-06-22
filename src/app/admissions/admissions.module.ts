import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmissionsRoutingModule } from './admissions-routing.module';
import { AdmissionsComponent } from './admissions.component';
import { SharedModule } from '../shared/shared.module';
import { TuitionComponent } from './tuition/tuition.component';


@NgModule({
  declarations: [
    AdmissionsComponent,
    TuitionComponent
  ],
  imports: [
    SharedModule,
    AdmissionsRoutingModule
  ]
})
export class AdmissionsModule { }
