import {
  Component,
  OnInit,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ElementRef,
  ViewChildren,
  AfterViewInit,
  ViewChild,
  Input,
} from '@angular/core';
import { CarouselContentDirective } from './carousel-content.directive';

@Component({
  selector: 'logos-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent
  implements OnInit, AfterContentInit, AfterViewInit
{
  @Input() isMobile = false;
  @ViewChild('carouselEl') carouselEl: ElementRef;
  @ContentChildren(CarouselContentDirective)
  content: QueryList<CarouselContentDirective>;
  @ViewChildren('contentWrapper')
  els: QueryList<ElementRef>;
  children: ElementRef[] = [];
  overflowed = false;
  viewCount = 0;
  views: CarouselContentDirective[] = [];
  wrapperWidthPx = 0;

  constructor() {}

  get contentWidthPx(): number {
    return this.carouselEl ? this.carouselEl.nativeElement.clientWidth : 0;
  }

  ngOnInit(): void {}

  ngAfterContentInit() {
    this.content.forEach((x) => {
      this.views = [...this.views, x];
    });
    this.viewCount = this.views.length;
  }

  ngAfterViewInit() {
    if (this.els) {
      this.els.forEach((x) => {
        this.children = [...this.children, x];
      });
      setTimeout(() => {
        this.wrapperWidthPx = this.els.reduce((acc, x) => {
          return (
            acc +
            (x && x.nativeElement ? x.nativeElement.clientWidth || 0 : 0) +
            40
          );
        }, 0);
        this.overflowed = this.wrapperWidthPx > this.contentWidthPx;
      }, 0);
    }
  }
}
