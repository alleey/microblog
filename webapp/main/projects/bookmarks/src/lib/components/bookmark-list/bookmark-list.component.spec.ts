import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject } from 'rxjs';

import { BookmarksService } from '../../services/bookmarks.service';
import { BookmarkListComponent } from './bookmark-list.component';

describe('BookmarkListComponent', () => {
  let component: BookmarkListComponent;
  let fixture: ComponentFixture<BookmarkListComponent>;
  let service: jasmine.SpyObj<BookmarksService>;

  beforeEach(async () => {

    service = jasmine.createSpyObj<BookmarksService>('FollowingService',
      ['findByUrl', 'create', 'delete'], {
        onChange: new Subject()
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ BookmarkListComponent ],
      imports: [RouterTestingModule],
      providers: [
        { provide: BookmarksService, useValue: service },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
