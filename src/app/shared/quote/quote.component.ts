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
  @Input() dark = false;
  @Input() hasContent = false;
  @Input() italics = false;
  @Input() isMobile = false;
  @Input() showQuote = true;
  @Input() underlineOnHover = true;

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
