import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileMainMenuComponent } from './mobile-main-menu.component';

describe('MobileMainMenuComponent', () => {
  let component: MobileMainMenuComponent;
  let fixture: ComponentFixture<MobileMainMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileMainMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileMainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
