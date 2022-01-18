import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleArrowsComponent } from './toggle-arrows.component';

describe('ToggleArrowsComponent', () => {
  let component: ToggleArrowsComponent;
  let fixture: ComponentFixture<ToggleArrowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToggleArrowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleArrowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
