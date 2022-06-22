import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'logos-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
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
export class AccordionComponent implements OnInit {
  @Input() expanded = false;
  @Input() hideHeadingWhenExpanded = false;
  @Input() hideSubheadingWhenExpanded = false;
  @Input() isMobile = false;
  @Output() toggle = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
