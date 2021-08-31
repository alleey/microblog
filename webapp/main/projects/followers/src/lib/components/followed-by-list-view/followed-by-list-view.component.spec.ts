import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowersListViewComponent } from './followed-by-list-view.component';

describe('FollowersListViewComponent', () => {
  let component: FollowersListViewComponent;
  let fixture: ComponentFixture<FollowersListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowersListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowersListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
