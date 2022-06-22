import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashMissionComponent } from './splash-mission.component';

describe('SplashMissionComponent', () => {
  let component: SplashMissionComponent;
  let fixture: ComponentFixture<SplashMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplashMissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
