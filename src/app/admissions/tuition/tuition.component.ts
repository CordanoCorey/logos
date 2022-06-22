import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'logos-tuition',
  templateUrl: './tuition.component.html',
  styleUrls: ['./tuition.component.scss'],
})
export class TuitionComponent implements OnInit {
  discounts = [
    // {
    //   name: 'Paid in full before May 1',
    //   amount: '$4200 ($600 discount)',
    // },
    {
      name: 'Paid in full before August 1',
      amount: '$4500 ($300 discount)',
    },
    {
      name: '2nd Student',
      amount: '$4200',
    },
    {
      name: '3rd Student',
      amount: '$3600',
    },
    {
      name: '4th Student',
      amount: '$2400',
    },
    {
      name: '5th Student or more',
      amount: '$1200',
    },
  ];
  discountsColumns = ['name', 'amount'];
  fees = [
    {
      name: 'Application Fee',
      amount: '$50',
    },
    // {
    //   name: 'Enrollment Fee',
    //   amount: '$150',
    // },
  ];
  feesColumns = ['name', 'amount'];
  tuition = [
    {
      name: 'K - 12',
      yearly: '$4800',
      monthly: '$400',
    },
  ];
  tuitionColumns = ['name', 'yearly', 'monthly'];
  constructor() {}

  ngOnInit(): void {}
}
