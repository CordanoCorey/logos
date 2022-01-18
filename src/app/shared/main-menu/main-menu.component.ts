import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  animate,
  style,
  transition,
  trigger,
  state,
} from '@angular/animations';

@Component({
  selector: 'logos-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'opened',
        style({
          height: '*',
        })
      ),
      state(
        'closed',
        style({
          height: '0px',
        })
      ),
      state(
        'void',
        style({
          height: '0px',
        })
      ),
      transition('* <=> *', animate('500ms ease-out')),
    ]),
  ],
})
export class MainMenuComponent implements OnInit {
  @ViewChild('aboutEl') aboutEl: ElementRef | undefined = undefined;
  @ViewChild('academicsEl') academicsEl: ElementRef | undefined = undefined;
  @ViewChild('admissionsEl') admissionsEl: ElementRef | undefined = undefined;
  @ViewChild('contactEl') contactEl: ElementRef | undefined = undefined;
  submenu: 'ABOUT' | 'ACADEMICS' | 'ADMISSIONS' | 'CONTACT' | null = null;
  aboutSubmenuLeft = 0;
  academicsSubmenuLeft = 0;
  admissionsSubmenuLeft = 0;
  contactSubmenuLeft = 0;
  mainMenuLeft = 0;
  constructor(public el: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.mainMenuLeft = this.el ? this.el.nativeElement.offsetLeft : 0;
      this.aboutSubmenuLeft =
        this.mainMenuLeft +
        (this.aboutEl ? this.aboutEl.nativeElement.offsetLeft : 0);
      this.academicsSubmenuLeft =
        this.mainMenuLeft +
        (this.academicsEl ? this.academicsEl.nativeElement.offsetLeft : 0);
      this.admissionsSubmenuLeft =
        this.mainMenuLeft +
        (this.admissionsEl ? this.admissionsEl.nativeElement.offsetLeft : 0);
      this.contactSubmenuLeft =
        this.mainMenuLeft +
        (this.contactEl ? this.contactEl.nativeElement.offsetLeft : 0);
    }, 0);
  }
}
