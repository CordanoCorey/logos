import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../models';

@Component({
  selector: 'logos-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss'],
})
export class SubMenuComponent implements OnInit {
  @Input() menuItems: MenuItem[] = [];

  constructor() {}

  ngOnInit(): void {}
}
