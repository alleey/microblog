import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserProfileEditorComponent } from './app-user-profile-editor.component';

describe('AppUserProfileEditorComponent', () => {
  let component: AppUserProfileEditorComponent;
  let fixture: ComponentFixture<AppUserProfileEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppUserProfileEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserProfileEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
