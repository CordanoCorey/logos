import { NgModule } from '@angular/core';

import { LinksRoutingModule } from './links-routing.module';
import { LinksComponent } from './links.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LinksComponent],
  imports: [SharedModule, LinksRoutingModule],
})
export class LinksModule {}
