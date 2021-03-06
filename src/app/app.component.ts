import { Component, HostListener } from '@angular/core';
import {
  WindowActions,
  build,
  WindowResize,
  SmartComponent,
} from '@caiu/library';
import { Store } from '@ngrx/store';

@Component({
  selector: 'logos-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends SmartComponent {
  _windowHeight = 0;
  _windowWidth = 0;

  constructor(public store: Store<any>) {
    super(store);
  }

  get windowHeight(): number {
    return parseInt(localStorage.getItem('WINDOW_HEIGHT') || '0', 10) || 0;
  }

  set windowHeight(value: number) {
    if (value !== this._windowHeight) {
      // console.log(`Previous window height:\t`, this._windowHeight);
      // console.log(`New window height:\t`, value);
      this._windowHeight = value;
      localStorage.setItem('WINDOW_HEIGHT', value.toString());
    }
  }

  get windowWidth(): number {
    return parseInt(localStorage.getItem('WINDOW_WIDTH') || '0', 10) || 0;
  }

  set windowWidth(value: number) {
    // console.log(`Previous window width:\t`, this._windowHeight);
    // console.log(`New window width:\t`, value);
    if (value !== this._windowWidth) {
      this._windowWidth = value;
      localStorage.setItem('WINDOW_WIDTH', value.toString());
    }
  }

  @HostListener('window:load', ['$event']) onLoad(e: any) {
    const windowHeight =
      e && e.currentTarget && e.currentTarget.innerHeight
        ? e.currentTarget.innerHeight
        : 0;
    const windowWidth =
      e && e.currentTarget && e.currentTarget.innerWidth
        ? e.currentTarget.innerWidth
        : 0;
    console.log(windowHeight, windowWidth);
    this.dispatch(
      WindowActions.resize(
        build(WindowResize, {
          windowHeight,
          windowWidth,
        })
      )
    );
  }

  @HostListener('window:resize', ['$event']) onResize(e: any) {
    const windowHeight =
      e && e.currentTarget && e.currentTarget.innerHeight
        ? e.currentTarget.innerHeight
        : 0;
    const windowWidth =
      e && e.currentTarget && e.currentTarget.innerWidth
        ? e.currentTarget.innerWidth
        : 0;
    console.log(windowHeight, windowWidth);
    this.dispatch(
      WindowActions.resize(
        build(WindowResize, {
          windowHeight,
          windowWidth,
        })
      )
    );
  }

  @HostListener('window:orientationchange', ['$event']) onOrientationChange(
    e: any
  ) {
    const windowHeight =
      e && e.currentTarget && e.currentTarget.innerHeight
        ? e.currentTarget.innerHeight
        : 0;
    const windowWidth =
      e && e.currentTarget && e.currentTarget.innerWidth
        ? e.currentTarget.innerWidth
        : 0;
    console.log(windowHeight, windowWidth);
    this.dispatch(
      WindowActions.resize(
        build(WindowResize, {
          windowHeight,
          windowWidth,
        })
      )
    );
  }
}
