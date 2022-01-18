import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'logos-toggle-arrows',
  templateUrl: './toggle-arrows.component.html',
  styleUrls: ['./toggle-arrows.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleArrowsComponent implements OnInit {
  @Input() isMobile = false;
  @Output() toggle = new EventEmitter();
  _readMore = false;

  constructor() {}

  @Input()
  set readMore(value: boolean) {
    this._readMore = value;
  }

  get readMore(): boolean {
    return this._readMore;
  }

  ngOnInit(): void {}
}
