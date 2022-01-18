import { Component, Input, OnInit } from '@angular/core';
import { build } from '@caiu/library';
import { Quote, Citation } from '../models';

@Component({
  selector: 'logos-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss'],
})
export class QuoteComponent implements OnInit {
  @Input() words = '';
  @Input() citation: Citation = new Citation();
  @Input() cite = true;
  @Input() htmlString = null;

  constructor() {}

  @Input()
  set quote(value: Quote) {
    this.words = value.words;
  }

  get quote(): Quote {
    return build(Quote, {
      words: this.words,
    });
  }

  ngOnInit(): void {}
}
