import { Component, OnInit } from '@angular/core';
import { slideInLeftOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'logos-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  animations: [slideInLeftOnEnterAnimation()],
})
export class ContactUsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
