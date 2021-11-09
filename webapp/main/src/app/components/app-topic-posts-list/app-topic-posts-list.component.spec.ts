import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTopicPostsListComponent } from './app-topic-posts-list.component';

describe('AppTopicPostsListComponent', () => {
  let component: AppTopicPostsListComponent;
  let fixture: ComponentFixture<AppTopicPostsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppTopicPostsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTopicPostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
