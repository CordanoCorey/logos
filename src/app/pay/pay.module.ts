import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { PayRoutingModule } from './pay-routing.module';
import { PayComponent } from './pay.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PayComponent],
  imports: [SharedModule, MatTabsModule, PayRoutingModule],
})
export class PayModule {}
