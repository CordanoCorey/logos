import { Component, OnInit, ElementRef } from '@angular/core';
import {
  lightSpeedInOnEnterAnimation,
  rotateInUpRightOnEnterAnimation,
  zoomInLeftOnEnterAnimation,
} from 'angular-animations';

@Component({
  selector: 'logos-beliefs',
  templateUrl: './beliefs.component.html',
  styleUrls: ['./beliefs.component.scss'],
  animations: [
    lightSpeedInOnEnterAnimation(),
    rotateInUpRightOnEnterAnimation(),
    zoomInLeftOnEnterAnimation()
  ],
})
export class BeliefsComponent implements OnInit {
  beliefs = [
    {
      message:
        'We believe the Bible alone to be the word of God, the ultimate and infallible authority for faith and practice.',
    },
    {
      message:
        'We believe that there is one God, eternally existent in three persons: Father, Son, and Holy Spirit. He is omnipotent, omniscient, and omnipresent.',
    },
    {
      message:
        'We believe in the deity of our Lord Jesus Christ, in His virgin birth, in His sinless life, in His miracles, in His vicarious and atoning death through His shed blood, in His bodily resurrection, in His ascension to the right hand of the Father, and in His personal return in power and glory.',
    },
    {
      message:
        'We believe that, for the salvation of lost and sinful men, regeneration by the Holy Spirit is absolutely necessary.',
    },
    {
      message: 'We believe that salvation is by grace through faith alone.',
    },
    {
      message: 'We believe that faith without works is dead.',
    },
    {
      message:
        'We believe in the present ministry of the Holy Spirit, by whose indwelling the Christian is enabled to live a godly life.',
    },
    {
      message:
        'We believe in the resurrection of both the saved and the lost; they that are saved to the resurrection of life and they that are lost to the resurrection of damnation.',
    },
    {
      message:
        'We believe in the spiritual unity of all believers in our Lord Jesus Christ.',
    },
  ];
  constructor(public el: ElementRef) {}

  ngOnInit(): void {}
}
