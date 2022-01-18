import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { build } from '@caiu/library';
import {
  ABOUT_SUBMENU,
  MenuItem,
  ACADEMICS_SUBMENU,
  ADMISSIONS_SUBMENU,
  CONTACT_SUBMENU,
} from '../models';

@Component({
  selector: 'logos-mobile-main-menu',
  templateUrl: './mobile-main-menu.component.html',
  styleUrls: ['./mobile-main-menu.component.scss'],
})
export class MobileMainMenuComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Output() goTo = new EventEmitter<string>();
  aboutUsSubmenu = ABOUT_SUBMENU;
  academicsSubmenu = ACADEMICS_SUBMENU;
  admissionsSubmenu = ADMISSIONS_SUBMENU;
  contactUsSubmenu = CONTACT_SUBMENU;
  constructor() {}

  ngOnInit(): void {}
}
