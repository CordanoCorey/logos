import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'logos-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit, AfterViewInit {
  @Input() eagerSrc = null;
  @Input() lazySrc = null;
  @Input() src = null;
  @Input() heightPx = 0;
  @Input() widthPx = 0;

  constructor(public el: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit() {}
}
