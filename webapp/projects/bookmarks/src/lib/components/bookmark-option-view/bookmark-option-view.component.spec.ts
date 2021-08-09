import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkOptionViewComponent } from './bookmark-option-view.component';

describe('BookmarkOptionViewComponent', () => {
  let component: BookmarkOptionViewComponent;
  let fixture: ComponentFixture<BookmarkOptionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarkOptionViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkOptionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
