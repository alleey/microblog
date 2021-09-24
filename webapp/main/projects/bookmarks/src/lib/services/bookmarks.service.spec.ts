import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BookmarkResponseModel } from 'bookmarks';
import { Pageable, SortDirection } from 'utils';
import { BookmarksServiceConfigToken } from '../config/config';
import { BookmarkListResponseModel } from '../models/bookmark';

import { BookmarksService } from './bookmarks.service';

describe('BookmarksService', () => {
  let controller: HttpTestingController;
  let service: BookmarksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookmarksService, 
        {
          provide: BookmarksServiceConfigToken,
          useValue: { serviceBaseUrl: "http://localhost", defaultEndpoint: "bookmarks", pageSize: 10 }
        }]
    });
    controller = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BookmarksService);
  });

  it('returns list of bookmarks with default pagination settings', () => {

    const bookmarks: BookmarkListResponseModel = {
      _embedded: {
        bookmarks: [
          { id: 1, caption: "localhost", url: "http://localhost", createdOn: new Date(), lastAccessedOn: new Date() }
        ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    let apiResponse: BookmarkListResponseModel|undefined;
    service.all("").subscribe({
      next: (res: BookmarkListResponseModel) => {
        apiResponse = res;
      }
    });

    controller.expectOne(`http://localhost/bookmarks?page=0&size=10&sort=caption,asc`).flush(bookmarks);
    controller.verify();

    expect(apiResponse).toEqual(bookmarks);
  });

  it('returns list of bookmarks with custom pagination settings', () => {

    const bookmarks: BookmarkListResponseModel = {
      _embedded: {
        bookmarks: [
          { id: 1, caption: "localhost", url: "http://localhost", createdOn: new Date(), lastAccessedOn: new Date() }
        ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    let pageable: Pageable = { page: 3, limit: 20 };
    let apiResponse: BookmarkListResponseModel|undefined;
    service.all("", pageable).subscribe({
      next: (res: BookmarkListResponseModel) => {
        apiResponse = res;
      }
    });

    controller.expectOne(`http://localhost/bookmarks?page=3&size=20&sort=caption,asc`).flush(bookmarks);
    controller.verify();

    expect(apiResponse).toEqual(bookmarks);
  });

  it('returns search results with default pagination settings', () => {

    const bookmarks: BookmarkListResponseModel = {
      _embedded: {
        bookmarks: [
          { id: 1, caption: "localhost", url: "http://localhost", createdOn: new Date(), lastAccessedOn: new Date() }
        ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    let query = {
      "conditions": [
        { "attribute": "caption", "operator": "like", "value": `%something%` }
      ]
    };
    let apiResponse: BookmarkListResponseModel|undefined;
    service.search("", query).subscribe({
      next: (res: BookmarkListResponseModel) => {
        apiResponse = res;
      }
    });

    let encoded = encodeURI(JSON.stringify(query));
    controller.expectOne(`http://localhost/bookmarks/search?q=${encoded}&page=0&size=10&sort=caption,asc`).flush(bookmarks);
    controller.verify();

    expect(apiResponse).toEqual(bookmarks);
  });

  it('returns findMatchingCaption results with default pagination settings', () => {

    const bookmarks: BookmarkListResponseModel = {
      _embedded: {
        bookmarks: [
          { id: 1, caption: "localhost", url: "http://localhost", createdOn: new Date(), lastAccessedOn: new Date() }
        ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    let query = {
      "conditions": [
        { "attribute": "caption", "operator": "like", "value": `%something%` }
      ]
    };
    let apiResponse: BookmarkListResponseModel|undefined;
    service.findMatchingCaption("", "something").subscribe({
      next: (res: BookmarkListResponseModel) => {
        apiResponse = res;
      }
    });

    let encoded = encodeURI(JSON.stringify(query));
    controller.expectOne(`http://localhost/bookmarks/search?q=${encoded}&page=0&size=10&sort=caption,asc`).flush(bookmarks);
    controller.verify();

    expect(apiResponse).toEqual(bookmarks);
  });


  it('returns findByUrl result', () => {

    const bookmarks: BookmarkListResponseModel = {
      _embedded: {
        bookmarks: [
          { id: 1, caption: "localhost", url: "http://localhost", createdOn: new Date(), lastAccessedOn: new Date() }
        ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    let query = {
      "conditions": [
        { "attribute": "url", "operator": "eq", "value": `something` }
      ]
    };
    let apiResponse: BookmarkResponseModel|undefined;
    service.findByUrl("", "something").subscribe({
      next: (res: BookmarkResponseModel) => {
        apiResponse = res;
      }
    });

    let encoded = encodeURI(JSON.stringify(query));
    controller.expectOne(`http://localhost/bookmarks/search?q=${encoded}&page=0&size=10&sort=caption,asc`).flush(bookmarks);
    controller.verify();

    expect(apiResponse).toEqual(bookmarks._embedded.bookmarks[0]);
  });


  it('user can create a bookmark', () => {

    const followsResponse: BookmarkResponseModel = { 
      id: 1, caption: "localhost", url: "http://localhost", createdOn: new Date(), lastAccessedOn: new Date() 
    };

    let apiResponse: BookmarkResponseModel|undefined;
    service.create("", "localhost", "http://localhost").subscribe({
      next: (res: BookmarkResponseModel) => {
        apiResponse = res;
      }
    });

    controller
      .expectOne({ method: 'POST', url: `http://localhost/bookmarks`})
      .flush(followsResponse);
    controller.verify();

    expect(apiResponse).toEqual(followsResponse);
  });

  it('user can delete a bookmark', () => {

    let apiResponse = false;
    service.delete("", 1).subscribe({
      next: () => {
        apiResponse = true;
      }
    });

    controller
      .expectOne({ method: 'DELETE', url: `http://localhost/bookmarks/1`})
      .flush({});
    controller.verify();

    expect(apiResponse).toEqual(true);
  });

});
