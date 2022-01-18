import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MenuItem } from '../models';

@Component({
  selector: 'logos-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavMenuComponent implements OnInit {
  @Input() menuItems: MenuItem[] = [];
  @Input() vertical = false;
  constructor() {}

  ngOnInit(): void {}
}
