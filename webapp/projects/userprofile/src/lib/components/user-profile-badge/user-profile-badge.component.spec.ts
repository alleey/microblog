import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileBadgeComponent } from './user-profile-badge.component';

describe('UserProfileBadgeComponent', () => {
  let component: UserProfileBadgeComponent;
  let fixture: ComponentFixture<UserProfileBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
