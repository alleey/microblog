import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileBadgeViewComponent } from './user-profile-badge-view.component';

describe('UserProfileBadgeViewComponent', () => {
  let component: UserProfileBadgeViewComponent;
  let fixture: ComponentFixture<UserProfileBadgeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileBadgeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileBadgeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
