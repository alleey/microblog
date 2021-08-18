import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkBadgeComponent } from './bookmark-badge.component';

describe('BookmarkBadgeComponent', () => {
  let component: BookmarkBadgeComponent;
  let fixture: ComponentFixture<BookmarkBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarkBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
