import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { GOALS } from '../models';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'logos-vision',
  templateUrl: './vision.component.html',
  styleUrls: ['./vision.component.scss'],
  animations: [
    trigger('toggle', [
      state('show', style({ minHeight: '*' })),
      state('hide', style({ minHeight: '0px', height: '45px' })),
      transition('show <=> hide', [animate('500ms ease-out')]),
    ]),
    trigger('flip', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('rotated => default', animate('500ms ease-out')),
      transition('default => rotated', animate('500ms ease-in')),
    ]),
  ],
})
export class VisionComponent implements OnInit {
  @Input() isMobile = false;
  expanded = [false, false, false, false, false, false, false];
  goals = GOALS;
  constructor(public el: ElementRef) {}

  ngOnInit(): void {}

  toggle(e: number) {
    this.expanded = this.expanded.map((x, i) => (i === e ? !x : x));
  }
}
