import { Component, OnInit } from '@angular/core';
import { slideInLeftOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'logos-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
  animations: [slideInLeftOnEnterAnimation()],
})
export class LinksComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
