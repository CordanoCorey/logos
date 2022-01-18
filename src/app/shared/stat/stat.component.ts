import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'logos-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss'],
})
export class StatComponent implements OnInit {
  @Input() prop = '';
  @Input() number = '';
  constructor() {}

  ngOnInit(): void {}
}
