import {
  Component,
  OnInit,
  ContentChildren,
  QueryList,
  AfterContentInit,
} from '@angular/core';
import { CarouselContentComponent } from './carousel-content.component';
import { CarouselContentDirective } from './carousel-content.directive';

@Component({
  selector: 'logos-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit, AfterContentInit {
  @ContentChildren(CarouselContentDirective)
  content: QueryList<CarouselContentDirective>;
  @ContentChildren(CarouselContentComponent)
  contentCmpts: QueryList<CarouselContentComponent>;
  views: CarouselContentDirective[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngAfterContentInit() {
    this.content.forEach((x) => {
      this.views = [...this.views, x];
    });
  }
}
