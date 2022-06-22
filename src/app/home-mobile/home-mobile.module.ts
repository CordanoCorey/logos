import { NgModule } from '@angular/core';

import { HomeMobileRoutingModule } from './home-mobile-routing.module';
import { HomeMobileComponent } from './home-mobile.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeMobileComponent],
  imports: [SharedModule, HomeMobileRoutingModule],
})
export class HomeMobileModule {}
