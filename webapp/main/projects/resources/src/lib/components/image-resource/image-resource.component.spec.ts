import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageResourceComponent } from './image-resource.component';

describe('ImageResourceComponent', () => {
  let component: ImageResourceComponent;
  let fixture: ComponentFixture<ImageResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageResourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
