import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'logos-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss'],
})
export class WordsComponent implements OnInit {
  @Input() title = '';
  constructor() {}

  ngOnInit(): void {}
}
