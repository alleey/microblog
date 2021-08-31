import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingListViewComponent } from './following-list-view.component';

describe('FollowingListViewComponent', () => {
  let component: FollowingListViewComponent;
  let fixture: ComponentFixture<FollowingListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowingListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowingListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
