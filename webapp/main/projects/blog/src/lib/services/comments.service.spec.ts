import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CommentsService } from './comments.service';
import { CommentsServiceConfigToken } from '../config/config';
import { CommentListResponseModel, CommentResponseModel } from '../models/comment';
import { Pageable } from 'utils';

describe('CommentsService', () => {
  let controller: HttpTestingController;
  let service: CommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentsService, 
        {
          provide: CommentsServiceConfigToken,
          useValue: { serviceBaseUrl: "http://localhost", defaultEndpoint: "posts", pageSize: 10 }
        }]
    });
    controller = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CommentsService);
  });

  it('returns list of comments with default pagination settings', () => {

    const postId = 1;
    const comments: CommentListResponseModel = {
      _embedded: {
        comments: [
          { 
            id: 1, 
            text: "text",
            owner: "me",
            createdOn: new Date(), 
            updateOn: new Date() 
          }
        ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    let apiResponse: CommentListResponseModel|undefined;
    service.all("", postId).subscribe({
      next: (res: CommentListResponseModel) => {
        apiResponse = res;
      }
    });

    controller.expectOne(`http://localhost/posts/${postId}/comments?page=0&size=10&sort=createdOn,desc`).flush(comments);
    controller.verify();

    expect(apiResponse).toEqual(comments);
  });

  it('returns list of comments with custom pagination settings', () => {

    const postId = 1;
    const comments: CommentListResponseModel = {
      _embedded: {
        comments: [
          { 
            id: 1, 
            text: "text",
            owner: "me",
            createdOn: new Date(), 
            updateOn: new Date() 
          }
        ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };
    const pageable = { page: 10, limit: 100 };

    let apiResponse: CommentListResponseModel|undefined;
    service.all("", postId, pageable).subscribe({
      next: (res: CommentListResponseModel) => {
        apiResponse = res;
      }
    });

    controller.expectOne(`http://localhost/posts/${postId}/comments?page=${pageable.page}&size=${pageable.limit}&sort=createdOn,desc`).flush(comments);
    controller.verify();

    expect(apiResponse).toEqual(comments);
  });

  it('returns list of comments with custom pagination settings', () => {

    const postId = 1;
    const comments: CommentListResponseModel = {
      _embedded: {
        comments: [
          { 
            id: 1, 
            text: "text",
            owner: "me",
            createdOn: new Date(), 
            updateOn: new Date() 
          }
        ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    let pageable: Pageable = { page: 3, limit: 20 };
    let apiResponse: CommentListResponseModel|undefined;
    service.all("", postId, pageable).subscribe({
      next: (res: CommentListResponseModel) => {
        apiResponse = res;
      }
    });

    controller.expectOne(`http://localhost/posts/${postId}/comments?page=3&size=20&sort=createdOn,desc`).flush(comments);
    controller.verify();

    expect(apiResponse).toEqual(comments);
  });

  it('returns one result', () => {

    const postId = 1;
    const comment: CommentResponseModel = { 
      id: 1, 
      text: "text",
      owner: "me",
      createdOn: new Date(), 
      updateOn: new Date() 
    };

    let query = {
      "conditions": [
        { "attribute": "url", "operator": "eq", "value": `something` }
      ]
    };
    let apiResponse: CommentResponseModel|undefined;
    service.one("", postId, comment.id).subscribe({
      next: (res: CommentResponseModel) => {
        apiResponse = res;
      }
    });

    let encoded = encodeURI(JSON.stringify(query));
    controller.expectOne(`http://localhost/posts/${postId}/comments/${comment.id}`).flush(comment);
    controller.verify();

    expect(apiResponse).toEqual(comment);
  });

  it('user can create a comment', () => {

    const postId = 1;
    const comment: CommentResponseModel = { 
      id: 1, 
      text: "text",
      owner: "me",
      createdOn: new Date(), 
      updateOn: new Date() 
    }
;

    let apiResponse: CommentResponseModel|undefined;
    service.create("", postId, "text").subscribe({
      next: (res: CommentResponseModel) => {
        apiResponse = res;
      }
    });

    controller
      .expectOne({ method: 'POST', url: `http://localhost/posts/${postId}/comments`})
      .flush(comment);
    controller.verify();

    expect(apiResponse).toEqual(comment);
  });

  it('user can update a comment', () => {

    const postId = 1;
    const comment: CommentResponseModel = { 
      id: 1, 
      text: "text",
      owner: "me",
      createdOn: new Date(), 
      updateOn: new Date() 
    }
;

    let apiResponse = false;
    service.update("", postId, 1, "text").subscribe({
      next: () => {
        apiResponse = true;
      }
    });

    controller
      .expectOne({ method: 'PUT', url: `http://localhost/posts/${postId}/comments/${comment.id}`})
      .flush(comment);
    controller.verify();

    expect(apiResponse).toBeTrue();
  });

  it('user can delete a comment', () => {

    const postId = 1;
    let apiResponse = false;
    service.delete("", postId, 1).subscribe({
      next: () => {
        apiResponse = true;
      }
    });

    controller
      .expectOne({ method: 'DELETE', url: `http://localhost/posts/${postId}/comments/1`})
      .flush({});
    controller.verify();

    expect(apiResponse).toEqual(true);
  });

});
