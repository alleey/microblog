import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPostEditorComponent } from './app-post-editor.component';

describe('AppPostEditorComponent', () => {
  let component: AppPostEditorComponent;
  let fixture: ComponentFixture<AppPostEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppPostEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPostEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
