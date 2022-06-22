import { NgModule } from '@angular/core';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    EventsComponent
  ],
  imports: [
    SharedModule,
    EventsRoutingModule
  ]
})
export class EventsModule { }
