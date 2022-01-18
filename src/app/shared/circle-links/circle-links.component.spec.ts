import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleLinksComponent } from './circle-links.component';

describe('CircleLinksComponent', () => {
  let component: CircleLinksComponent;
  let fixture: ComponentFixture<CircleLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
