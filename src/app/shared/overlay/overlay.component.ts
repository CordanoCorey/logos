import { AfterViewInit } from '@angular/core';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'logos-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  animations: [
    trigger('toggle', [
      state('*', style({ height: '0px' })),
      state('show', style({ height: '*' })),
      state('hide', style({ height: '0px' })),
      transition('show <=> hide', [animate('300ms ease-out')]),
    ]),
  ],
})
export class OverlayComponent implements OnInit, AfterViewInit {
  @ViewChild('wrapperEl') wrapperEl: ElementRef;
  @Input() background = 'rgba(0, 0, 0, 0.9)';
  @Output() minimize = new EventEmitter();
  @Output() changeHeight = new EventEmitter<number>();
  @Input() heightPx = 0;
  @Input() widthPx = 0;
  _expanded = false;
  animating = false;

  constructor(private elementRef: ElementRef) {}

  @Input()
  set expanded(value: boolean) {
    this._expanded = value;
  }

  get expanded(): boolean {
    return this._expanded;
  }

  // get heightPx(): number {
  //   return this.wrapperEl ? this.wrapperEl.nativeElement.offsetHeight : 0;
  // }

  ngOnInit(): void {}

  ngAfterViewInit() {
    // this.changeHeight.emit(this.heightPx);
  }

  onDone(e) {
    this.animating = false;
  }

  onStart(e) {
    this.animating = true;
  }

  onClose() {
    this.expanded = false;
    this.minimize.emit();
  }

  // @HostListener('document:click', ['$event'])
  // clickout(event) {
  //   if (!this.elementRef.nativeElement.contains(event.target)) {
  //     if (!this.animating && this.expanded) {
  //       this.minimize.emit();
  //     }
  //   }
  // }
}
