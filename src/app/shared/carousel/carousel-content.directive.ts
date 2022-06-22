import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  ElementRef,
} from '@angular/core';

@Directive({
  selector: '[logosCarouselContent]',
})
export class CarouselContentDirective {
  constructor(public templateRef: TemplateRef<any>, public el: ElementRef) {}
}
