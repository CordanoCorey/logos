import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePreloadComponent } from './image-preload.component';

describe('ImagePreloadComponent', () => {
  let component: ImagePreloadComponent;
  let fixture: ComponentFixture<ImagePreloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagePreloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagePreloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
