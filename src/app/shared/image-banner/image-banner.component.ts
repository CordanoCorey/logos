import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'logos-image-banner',
  templateUrl: './image-banner.component.html',
  styleUrls: ['./image-banner.component.scss'],
})
export class ImageBannerComponent implements OnInit {
  @Input() imageSrc = '';
  @Input() heightPx = 100;

  constructor() {}

  ngOnInit(): void {}
}
