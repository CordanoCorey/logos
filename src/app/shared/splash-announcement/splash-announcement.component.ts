import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'logos-splash-announcement',
  templateUrl: './splash-announcement.component.html',
  styleUrls: ['./splash-announcement.component.scss'],
})
export class SplashAnnouncementComponent implements OnInit {
  @Input() hidden = false;
  constructor() {}

  ngOnInit(): void {}
}
