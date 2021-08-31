import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkListViewComponent } from './bookmark-list-view.component';

describe('BookmarkListViewComponent', () => {
  let component: BookmarkListViewComponent;
  let fixture: ComponentFixture<BookmarkListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarkListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
