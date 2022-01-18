import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[logosCarouselContent]',
})
export class CarouselContentDirective {
  constructor(
    public templateRef: TemplateRef<any>
  ) {}
}
