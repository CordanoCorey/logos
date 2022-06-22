import { Component, OnInit, ElementRef, Input } from '@angular/core';
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
  @Input() splash = false;
  constructor(public el: ElementRef) {}

  ngOnInit(): void {}
}
