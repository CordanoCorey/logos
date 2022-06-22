import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'logos-bible-citation',
  templateUrl: './bible-citation.component.html',
  styleUrls: ['./bible-citation.component.scss'],
})
export class BibleCitationComponent implements OnInit {
  citations = '';
  constructor() {}

  @Input()
  set cite(value: string) {
    this.citations = value;
  }

  get cite(): string {
    return this.citations;
  }

  ngOnInit(): void {}
}
