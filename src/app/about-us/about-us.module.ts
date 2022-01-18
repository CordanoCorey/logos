import { NgModule } from '@angular/core';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    SharedModule,
    AboutUsRoutingModule
  ]
})
export class AboutUsModule { }
