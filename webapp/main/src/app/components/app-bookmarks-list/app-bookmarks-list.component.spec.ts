import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBookmarksListComponent } from './app-bookmarks-list.component';

describe('AppBookmarksListComponent', () => {
  let component: AppBookmarksListComponent;
  let fixture: ComponentFixture<AppBookmarksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppBookmarksListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppBookmarksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
