import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowedByBadgeComponent } from './followed-by-badge.component';

describe('FollowedByBadgeComponent', () => {
  let component: FollowedByBadgeComponent;
  let fixture: ComponentFixture<FollowedByBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowedByBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowedByBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
