import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';

import { BookmarksService } from '../../services/bookmarks.service';
import { BookmarkBadgeComponent } from './bookmark-badge.component';

describe('BookmarkBadgeComponent', () => {
  let component: BookmarkBadgeComponent;
  let fixture: ComponentFixture<BookmarkBadgeComponent>;
  let service: jasmine.SpyObj<BookmarksService>;

  beforeEach(async () => {

    service = jasmine.createSpyObj<BookmarksService>('FollowingService',
      ['findByUrl', 'create', 'delete'], {
        onChange: new Subject()
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ BookmarkBadgeComponent ],
      providers: [
        { provide: BookmarksService, useValue: service },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkBadgeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {

    const url = "http://localhost";
    const bookmark = { id: 1, caption: "localhost", url: "http://localhost", createdOn: new Date(), lastAccessedOn: new Date() };

    service.findByUrl.withArgs("", url).and.returnValue(of(bookmark));
    component.url = url;

    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.isActive).toBeTrue();
  });
});
