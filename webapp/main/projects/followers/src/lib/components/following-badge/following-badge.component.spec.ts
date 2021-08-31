import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingBadgeComponent } from './following-badge.component';

describe('FollowingBadgeComponent', () => {
  let component: FollowingBadgeComponent;
  let fixture: ComponentFixture<FollowingBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowingBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowingBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
