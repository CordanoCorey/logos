import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, EffectsModule, RouterEffects } from '@caiu/library';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { ReducersService } from './reducers.service';

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<any>>(
  'Registered Reducers'
);

export function getReducers(reducersService: ReducersService) {
  return reducersService.getReducers();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    EffectsModule.forRoot([RouterEffects]),
    SharedModule,
    HomeModule,
    RouterModule.forRoot(),
    StoreModule.forRoot(REDUCER_TOKEN, {
      initialState: {},
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
  ],
  providers: [
    {
      provide: REDUCER_TOKEN,
      deps: [ReducersService],
      useFactory: getReducers,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
