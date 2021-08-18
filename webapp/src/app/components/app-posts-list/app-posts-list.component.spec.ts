import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPostsListComponent } from './app-posts-list.component';

describe('AppPostsListComponent', () => {
  let component: AppPostsListComponent;
  let fixture: ComponentFixture<AppPostsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppPostsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
