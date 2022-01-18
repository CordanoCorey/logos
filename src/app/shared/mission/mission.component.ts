import { Component, OnInit, ElementRef } from '@angular/core';
import {
  lightSpeedInOnEnterAnimation,
  rotateInDownLeftOnEnterAnimation,
} from 'angular-animations';

@Component({
  selector: 'logos-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss'],
  animations: [
    lightSpeedInOnEnterAnimation(),
    rotateInDownLeftOnEnterAnimation(),
  ],
})
export class MissionComponent implements OnInit {
  constructor(public el: ElementRef) {}

  ngOnInit(): void {}
}
