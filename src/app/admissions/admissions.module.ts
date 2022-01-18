import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmissionsRoutingModule } from './admissions-routing.module';
import { AdmissionsComponent } from './admissions.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AdmissionsComponent
  ],
  imports: [
    SharedModule,
    AdmissionsRoutingModule
  ]
})
export class AdmissionsModule { }
