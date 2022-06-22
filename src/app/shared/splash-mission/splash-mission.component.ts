import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import {
  fadeInLeftBigOnEnterAnimation,
  fadeInRightBigOnEnterAnimation,
} from 'angular-animations';

@Component({
  selector: 'logos-splash-mission',
  templateUrl: './splash-mission.component.html',
  styleUrls: ['./splash-mission.component.scss'],
  animations: [
    fadeInLeftBigOnEnterAnimation(),
    fadeInRightBigOnEnterAnimation(),
  ],
})
export class SplashMissionComponent implements OnInit {
  @Input() isMobile = false;
  _contentHeight = 0;
  view1Top = 0;
  view2Top = 0;
  view3Top = 0;
  view4Top = 0;
  view5Top = 0;
  view6Top = 0;

  constructor() {}

  @Input()
  set contentHeight(value: number) {
    console.log(value);
    this._contentHeight = value;
    const unspaced = 4 * 35 + 3 * 67;
    const margin = Math.max((value - unspaced) / 7, 10);
    this.view1Top = margin;
    this.view2Top = 2 * margin + 10;
    this.view3Top = 3 * margin;
    this.view4Top = 4 * margin;
    this.view5Top = 5 * margin;
    this.view6Top = 6 * margin + 20;
  }

  get contentHeight(): number {
    return this._contentHeight;
  }

  ngOnInit(): void {}
}
