import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibleCitationComponent } from './bible-citation.component';

describe('BibleCitationComponent', () => {
  let component: BibleCitationComponent;
  let fixture: ComponentFixture<BibleCitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BibleCitationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BibleCitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
