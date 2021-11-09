import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserPostsListComponent } from './app-user-posts-list.component';

describe('AppUserPostsListComponent', () => {
  let component: AppUserPostsListComponent;
  let fixture: ComponentFixture<AppUserPostsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppUserPostsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserPostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
