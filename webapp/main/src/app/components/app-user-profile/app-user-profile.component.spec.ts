import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserProfileComponent } from './app-user-profile.component';

describe('AppUserProfileComponent', () => {
  let component: AppUserProfileComponent;
  let fixture: ComponentFixture<AppUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppUserProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
