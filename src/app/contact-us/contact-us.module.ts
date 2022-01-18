import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsComponent } from './contact-us.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ContactUsComponent
  ],
  imports: [
    SharedModule,
    ContactUsRoutingModule
  ]
})
export class ContactUsModule { }
