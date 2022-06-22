import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'logos-spacer',
  templateUrl: './spacer.component.html',
  styleUrls: ['./spacer.component.scss'],
})
export class SpacerComponent implements OnInit {
  @Input() heightPx = 3;
  @Input() rotate = false;
  @Input() underline = true;
  constructor() {}

  ngOnInit(): void {}
}
