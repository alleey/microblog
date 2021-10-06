import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import { of, Subject, throwError } from 'rxjs';
import { BadgeComponent } from 'utils';
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
      declarations: [ 
        BookmarkBadgeComponent,
        MockComponent(BadgeComponent)
      ],
      providers: [
        { provide: BookmarksService, useValue: service },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkBadgeComponent);
    component = fixture.componentInstance;
  });

  it('should render active when bookmark is found', () => {

    const { debugElement } = fixture;

    const url = "http://localhost";
    const bookmark = { id: 1, caption: "localhost", url: "http://localhost", createdOn: new Date(), lastAccessedOn: new Date() };

    service.findByUrl.withArgs("", url).and.returnValue(of(bookmark));
    component.url = url;

    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.isActive).toBeTrue();
  });

  it('should render inactive when bookmark is found', () => {

    const { debugElement } = fixture;

    const url = "http://localhost";

    service.findByUrl.withArgs("", url).and.returnValue(throwError(new Error()));
    component.url = url;

    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.isActive).toBeFalse();
  });

  it('should refresh when service onChange is triggered', () => {

    const { debugElement } = fixture;

    const url = "http://localhost";
    const bookmark = { id: 1, caption: "localhost", url: "http://localhost", createdOn: new Date(), lastAccessedOn: new Date() };

    service.findByUrl.withArgs("", url).and.returnValue(of(bookmark));
    component.url = url;

    fixture.detectChanges();

    service.onChange.next({});
    fixture.detectChanges();

    expect(service.findByUrl).toHaveBeenCalledTimes(2);
  });

  it('should create bookmark', () => {

    const { debugElement } = fixture;
    const bookmark = { id: 1, caption: "localhost", url: "http://localhost", createdOn: new Date(), lastAccessedOn: new Date() };

    service.findByUrl.withArgs("", bookmark.url).and.returnValue(throwError(new Error()));
    service.create.withArgs("", bookmark.caption, bookmark.url).and.returnValue(of(bookmark));
    
    component.url = bookmark.url;
    component.caption = bookmark.caption;

    fixture.detectChanges();

    const badge = debugElement.query(By.css('utils-badge')).componentInstance;
    badge.onAdd.emit();
    fixture.detectChanges();

    expect(service.create).toHaveBeenCalled();
    expect(component.isActive).toBeTrue();
  });

  it('should delete', () => {

    const { debugElement } = fixture;
    const bookmark = { id: 1, caption: "localhost", url: "http://localhost", createdOn: new Date(), lastAccessedOn: new Date() };

    service.findByUrl.withArgs("", bookmark.url).and.returnValue(of(bookmark));    
    service.delete.withArgs("", bookmark.id).and.returnValue(of(undefined));

    component.url = bookmark.url;
    component.caption = bookmark.caption;

    fixture.detectChanges();

    const badge = debugElement.query(By.css('utils-badge')).componentInstance;
    badge.onRemove.emit();
    fixture.detectChanges();

    expect(service.delete).toHaveBeenCalled();
    expect(component.isActive).toBeFalse();
  });

});
