import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { toArray } from '@caiu/library';
import { MenuItem } from '../models';

@Component({
  selector: 'logos-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavMenuComponent implements OnInit {
  @Input() vertical = false;
  _menuItems: MenuItem[] = [];
  menuItemWidthPct = 0;
  constructor() {}

  @Input()
  set menuItems(value: MenuItem[]) {
    this._menuItems = toArray(value);
    this.menuItemWidthPct =
      this._menuItems.length > 0 ? 100 / this._menuItems.length : 0;
  }

  get menuItems(): MenuItem[] {
    return this._menuItems;
  }

  ngOnInit(): void {}
}
