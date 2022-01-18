import { Component, Input, OnInit } from '@angular/core';
import { toArray } from '@caiu/library';

@Component({
  selector: 'logos-bible-verse',
  templateUrl: './bible-verse.component.html',
  styleUrls: ['./bible-verse.component.scss'],
})
export class BibleVerseComponent implements OnInit {
  @Input() ref = '';
  @Input() vertical = false;
  _words: string | string[] = '';
  wordsArray: string[] = [];

  isArray = false;
  constructor() {}

  @Input()
  set words(value: string | string[]) {
    this._words = value;
    this.isArray = Array.isArray(value);
    this.wordsArray = toArray(value);
  }

  get words(): string | string[] {
    return this._words;
  }

  ngOnInit(): void {}
}
