import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageResourceUploadComponent } from './image-resource-upload.component';

describe('ImageResourceUploadComponent', () => {
  let component: ImageResourceUploadComponent;
  let fixture: ComponentFixture<ImageResourceUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageResourceUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageResourceUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
