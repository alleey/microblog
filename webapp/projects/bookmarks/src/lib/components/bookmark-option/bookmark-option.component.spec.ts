import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkOptionComponent } from './bookmark-option.component';

describe('BookmarkOptionComponent', () => {
  let component: BookmarkOptionComponent;
  let fixture: ComponentFixture<BookmarkOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarkOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
