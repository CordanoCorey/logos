import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Control, SmartComponent } from '@caiu/library';
import { Store } from '@ngrx/store';
import { slideInLeftOnEnterAnimation } from 'angular-animations';
import { CustomerAddress, CreditCard } from '../shared/models';

@Component({
  selector: 'logos-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss'],
  animations: [slideInLeftOnEnterAnimation()],
})
export class PayComponent extends SmartComponent implements OnInit {
  @Control(CustomerAddress) customerAddressForm: FormGroup;
  @Control(CreditCard) creditCardForm: FormGroup;

  activeLink: 'DONATE' | 'PAY';
  constructor(public store: Store<any>) {
    super(store);
  }

  get canSubmit(): boolean {
    return this.customerAddressForm.valid && this.creditCardForm.valid;
  }

  ngOnInit(): void {}
}
