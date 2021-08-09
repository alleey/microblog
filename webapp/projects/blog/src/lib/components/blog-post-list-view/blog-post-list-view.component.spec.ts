import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostListViewComponent } from './blog-post-list-view.component';

describe('BlogPostListViewComponent', () => {
  let component: BlogPostListViewComponent;
  let fixture: ComponentFixture<BlogPostListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogPostListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
