import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { of, Subject, throwError } from 'rxjs';
import { PagerComponent, SearchBoxComponent } from 'utils';
import { BookmarkListResponseModel } from '../../models/bookmark';
import { BookmarksService } from '../../services/bookmarks.service';
import { BookmarkListViewComponent } from '../bookmark-list-view/bookmark-list-view.component';
import { BookmarkListComponent, BookmarkListEvent } from './bookmark-list.component';


describe('BookmarkListComponent', () => {
  let component: BookmarkListComponent;
  let fixture: ComponentFixture<BookmarkListComponent>;
  let service: jasmine.SpyObj<BookmarksService>;
  let route: ActivatedRoute;

  beforeEach(async () => {

    service = jasmine.createSpyObj<BookmarksService>('FollowingService',
      ['all','findMatchingCaption','findByUrl', 'create', 'delete'], {
        onChange: new Subject()
      }
    );

    await TestBed.configureTestingModule({
      declarations: [
        BookmarkListComponent,
        MockComponent(BookmarkListViewComponent),
        MockComponent(PagerComponent),
        MockComponent(SearchBoxComponent)
      ],
      imports: [RouterTestingModule],
      providers: [
        { provide: BookmarksService, useValue: service },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkListComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
  });

  it('should render bookmarks list when found', () => {

    const pageable = { page: 0 };
    const bookmarksResponse: BookmarkListResponseModel = {
      _embedded: {
        bookmarks: [
          { id: 1,  caption: "localhost",  url: "http://localhost",  createdOn: new Date(),  lastAccessedOn: new Date() }
         ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    service.all.withArgs("", pageable).and.returnValue(of(bookmarksResponse));

    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.hasItems).toBeTrue();
    expect(component.page?.number).toEqual(0);
    expect(component.items).toEqual(bookmarksResponse._embedded.bookmarks);
  });

  it('should NOT render bookmarks list when NOT found', () => {

    const pageable = { page: 0 };
    service.all.withArgs("", pageable).and.returnValue(throwError(new Error()));

    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.hasItems).toBeFalse();
    expect(component.page?.number).toBeFalsy();
    expect(component.items).toBeFalsy();
  });

  it('should render search results when filter is supplied', () => {

    const pageable = { page: 0 };
    const bookmarksResponse: BookmarkListResponseModel = {
      _embedded: {
        bookmarks: [
          { id: 1,  caption: "localhost",  url: "http://localhost",  createdOn: new Date(),  lastAccessedOn: new Date() }
         ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    service.findMatchingCaption.withArgs("", "localhost", pageable).and.returnValue(of(bookmarksResponse));
    component.filterText = "localhost";

    fixture.detectChanges();
    expect(component.hasItems).toBeTrue();
    expect(component.page?.number).toEqual(0);
    expect(component.items).toEqual(bookmarksResponse._embedded.bookmarks);
  });

  it('should requery when filter is applied from search box', () => {

    const { debugElement } = fixture;

    const pageable = { page: 0 };
    const bookmarksResponse: BookmarkListResponseModel = {
      _embedded: {
        bookmarks: [
          { id: 1,  caption: "localhost",  url: "http://localhost",  createdOn: new Date(),  lastAccessedOn: new Date() }
         ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    service.all.withArgs("", pageable).and.returnValue(of(bookmarksResponse));
    service.findMatchingCaption.withArgs("", "findthis", pageable).and.returnValue(of(bookmarksResponse));
    fixture.detectChanges();

    const search = debugElement.query(By.directive(SearchBoxComponent)).componentInstance;
    search.onApplyFilter.emit("findthis");
    fixture.detectChanges();

    expect(component.hasItems).toBeTrue();
    expect(component.page?.number).toEqual(0);
    expect(component.items).toEqual(bookmarksResponse._embedded.bookmarks);
  });

  it('should refresh when service onChange is triggered', () => {

    const pageable = { page: 0 };
    const bookmarksResponse: BookmarkListResponseModel = {
      _embedded: {
        bookmarks: [
          { id: 1,  caption: "localhost",  url: "http://localhost",  createdOn: new Date(),  lastAccessedOn: new Date() }
         ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    service.all.withArgs("", pageable).and.returnValue(of(bookmarksResponse));
    fixture.detectChanges();

    service.onChange.next({});
    fixture.detectChanges();

    expect(service.all).toHaveBeenCalledTimes(2);
  });

  it('should go to page number passed as parameter', () => {

    const pageable = { page: 1 };
    const bookmarksResponse: BookmarkListResponseModel = {
      _embedded: {
        bookmarks: [
          { id: 1,  caption: "localhost",  url: "http://localhost",  createdOn: new Date(),  lastAccessedOn: new Date() }
         ]
      },
      page: { number: 1, size: 1, totalElements:1, totalPages: 1 }
    };

    spyOnProperty(route, "paramMap").and.returnValue(
      of(convertToParamMap({ pageNum: 1 }))
    );
    service.all.withArgs("", pageable).and.returnValue(of(bookmarksResponse));

    fixture.detectChanges();
    expect(service.all).toHaveBeenCalled();
    expect(component.page?.number).toEqual(1);
  });

  it('should go to page number selected by pager', () => {

    const { debugElement } = fixture;

    const bookmarksResponse: BookmarkListResponseModel = {
      _embedded: {
        bookmarks: [
          { id: 1,  caption: "localhost",  url: "http://localhost",  createdOn: new Date(),  lastAccessedOn: new Date() }
         ]
      },
      page: { number: 1, size: 1, totalElements:1, totalPages: 1 }
    };

    service.all.withArgs("", { page: 0 }).and.returnValue(of(bookmarksResponse));
    fixture.detectChanges();

    service.all.withArgs("", { page: 1 }).and.returnValue(of(bookmarksResponse));

    const pager = debugElement.query(By.directive(PagerComponent)).componentInstance;
    pager.onSelectPage.emit(2);
    fixture.detectChanges();

    expect(service.all).toHaveBeenCalled();
  });

  it('should fire onEvent when clicked', fakeAsync(() => {

    const pageable = { page: 0 };
    const bookmarksResponse: BookmarkListResponseModel = {
      _embedded: {
        bookmarks: [
          { id: 1,  caption: "localhost",  url: "http://localhost",  createdOn: new Date(),  lastAccessedOn: new Date() }
         ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    service.all.withArgs("", pageable).and.returnValue(of(bookmarksResponse));
    fixture.detectChanges();

    const { debugElement } = fixture;
    const view = debugElement.query(By.directive(BookmarkListViewComponent)).componentInstance;

    let firedEvent: BookmarkListEvent|undefined = undefined;
    component.onEvent.subscribe((evt: BookmarkListEvent) => {
      firedEvent = evt;
    });
    view.onEvent.emit({ opcode: 'select', item: bookmarksResponse._embedded.bookmarks[0] });
    tick();
    fixture.detectChanges();

    expect(firedEvent).toBeTruthy();
    expect(firedEvent!.item).toEqual(bookmarksResponse._embedded.bookmarks[0]);
  }));


  it('should delete bookmark when delete clicked', fakeAsync(() => {

    const pageable = { page: 0 };
    const bookmarksResponse: BookmarkListResponseModel = {
      _embedded: {
        bookmarks: [
          { id: 1,  caption: "localhost",  url: "http://localhost",  createdOn: new Date(),  lastAccessedOn: new Date() }
         ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    service.all.withArgs("", pageable).and.returnValue(of(bookmarksResponse));
    service.delete.withArgs("", bookmarksResponse._embedded.bookmarks[0].id).and.returnValue(of());
    fixture.detectChanges();

    const { debugElement } = fixture;
    const view = debugElement.query(By.directive(BookmarkListViewComponent)).componentInstance;

    view.onEvent.emit({ opcode: 'delete', item: bookmarksResponse._embedded.bookmarks[0] });
    tick();
    fixture.detectChanges();

    expect(service.delete).toHaveBeenCalled();
  }));

});
