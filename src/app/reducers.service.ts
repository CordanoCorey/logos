import { Injectable } from '@angular/core';
import {
  actionsStreamReducer,
  configReducer,
  errorsReducer,
  eventsReducer,
  lookupReducer,
  messagesReducer,
  redirectsReducer,
  routerReducer,
  sidenavReducer,
  windowReducer,
} from '@caiu/library';
import { ActionReducerMap } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class ReducersService {
  constructor() {}

  getReducers(): ActionReducerMap<any> {
    return {
      actions: actionsStreamReducer,
      config: configReducer,
      errors: errorsReducer,
      events: eventsReducer,
      lookup: lookupReducer,
      messages: messagesReducer,
      redirects: redirectsReducer,
      route: routerReducer,
      sidenav: sidenavReducer,
      window: windowReducer,
    };
  }
}
