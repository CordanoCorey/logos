import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashAnnouncementComponent } from './splash-announcement.component';

describe('SplashAnnouncementComponent', () => {
  let component: SplashAnnouncementComponent;
  let fixture: ComponentFixture<SplashAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplashAnnouncementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
