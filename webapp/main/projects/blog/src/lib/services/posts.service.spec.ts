import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';
import { PostsServiceConfigToken } from '../config/config';
import { BlogPostListResponseModel, BlogPostResponseModel } from '../models/blog-post';
import { Pageable } from 'utils';

describe('PostsService', () => {
  let controller: HttpTestingController;
  let service: PostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService, 
        {
          provide: PostsServiceConfigToken,
          useValue: { serviceBaseUrl: "http://localhost", defaultEndpoint: "posts", pageSize: 10 }
        }]
    });
    controller = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PostsService);
  });

  it('returns list of posts with default pagination settings', () => {

    const posts: BlogPostListResponseModel = {
      _embedded: {
        posts: [
          { 
            id: 1, 
            slug: "slug",
            title: "title",
            text: "text",
            owner: "me",
            permalink: "http://post/1",
            createdOn: new Date(), 
            updateOn: new Date() 
          }
        ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    let apiResponse: BlogPostListResponseModel|undefined;
    service.all("").subscribe({
      next: (res: BlogPostListResponseModel) => {
        apiResponse = res;
      }
    });

    controller.expectOne(`http://localhost/posts?page=0&size=10&sort=createdOn,desc`).flush(posts);
    controller.verify();

    expect(apiResponse).toEqual(posts);
  });

  it('returns list of posts with custom pagination settings', () => {

    const posts: BlogPostListResponseModel = {
      _embedded: {
        posts: [
          { 
            id: 1, 
            slug: "slug",
            title: "title",
            text: "text",
            owner: "me",
            permalink: "http://post/1",
            createdOn: new Date(), 
            updateOn: new Date() 
          }
        ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };
    const pageable = { page: 10, limit: 100 };

    let apiResponse: BlogPostListResponseModel|undefined;
    service.all("", pageable).subscribe({
      next: (res: BlogPostListResponseModel) => {
        apiResponse = res;
      }
    });

    controller.expectOne(`http://localhost/posts?page=${pageable.page}&size=${pageable.limit}&sort=createdOn,desc`).flush(posts);
    controller.verify();

    expect(apiResponse).toEqual(posts);
  });

  it('returns list of posts with custom pagination settings', () => {

    const posts: BlogPostListResponseModel = {
      _embedded: {
        posts: [
          { 
            id: 1, 
            slug: "slug",
            title: "title",
            text: "text",
            owner: "me",
            permalink: "http://post/1",
            createdOn: new Date(), 
            updateOn: new Date() 
          }
        ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    let pageable: Pageable = { page: 3, limit: 20 };
    let apiResponse: BlogPostListResponseModel|undefined;
    service.all("", pageable).subscribe({
      next: (res: BlogPostListResponseModel) => {
        apiResponse = res;
      }
    });

    controller.expectOne(`http://localhost/posts?page=3&size=20&sort=createdOn,desc`).flush(posts);
    controller.verify();

    expect(apiResponse).toEqual(posts);
  });

  it('returns search results with default pagination settings', () => {

    const posts: BlogPostListResponseModel = {
      _embedded: {
        posts: [
          { 
            id: 1, 
            slug: "slug",
            title: "title",
            text: "text",
            owner: "me",
            permalink: "http://post/1",
            createdOn: new Date(), 
            updateOn: new Date() 
          }
        ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    let query = {
      "conditions": [
        { "attribute": "caption", "operator": "like", "value": `%something%` }
      ]
    };
    let apiResponse: BlogPostListResponseModel|undefined;
    service.search("", query).subscribe({
      next: (res: BlogPostListResponseModel) => {
        apiResponse = res;
      }
    });

    let encoded = encodeURI(JSON.stringify(query));
    controller.expectOne(`http://localhost/posts/search?q=${encoded}&page=0&size=10&sort=createdOn,desc`).flush(posts);
    controller.verify();

    expect(apiResponse).toEqual(posts);
  });

  it('returns search results with custom pagination settings', () => {

    const posts: BlogPostListResponseModel = {
      _embedded: {
        posts: [
          { 
            id: 1, 
            slug: "slug",
            title: "title",
            text: "text",
            owner: "me",
            permalink: "http://post/1",
            createdOn: new Date(), 
            updateOn: new Date() 
          }
        ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };
    const pageable = { page: 10, limit: 100 };

    let query = {
      "conditions": [
        { "attribute": "caption", "operator": "like", "value": `%something%` }
      ]
    };
    let apiResponse: BlogPostListResponseModel|undefined;
    service.search("", query, pageable).subscribe({
      next: (res: BlogPostListResponseModel) => {
        apiResponse = res;
      }
    });

    let encoded = encodeURI(JSON.stringify(query));
    controller.expectOne(`http://localhost/posts/search?q=${encoded}&page=${pageable.page}&size=${pageable.limit}&sort=createdOn,desc`).flush(posts);
    controller.verify();

    expect(apiResponse).toEqual(posts);
  });

  it('returns findBySlug results', () => {

    const posts: BlogPostListResponseModel = {
      _embedded: {
        posts: [
          { 
            id: 1, 
            slug: "slug",
            title: "title",
            text: "text",
            owner: "me",
            permalink: "http://post/1",
            createdOn: new Date(), 
            updateOn: new Date() 
          }
        ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    let query = {
      "conditions": [
        { "attribute": "slug", "operator": "eq", "value": `something` }
      ]
    };
    let apiResponse: BlogPostListResponseModel|undefined;
    service.findBySlug("", "something").subscribe({
      next: (res: BlogPostListResponseModel) => {
        apiResponse = res;
      }
    });

    let encoded = encodeURI(JSON.stringify(query));
    controller.expectOne(`http://localhost/posts/search?q=${encoded}&page=0&size=10&sort=createdOn,desc`).flush(posts);
    controller.verify();

    expect(apiResponse).toEqual(posts);
  });


  it('returns one result', () => {

    const post: BlogPostResponseModel = { 
      id: 1, 
      slug: "slug",
      title: "title",
      text: "text",
      owner: "me",
      permalink: "http://post/1",
      createdOn: new Date(), 
      updateOn: new Date() 
    };

    let query = {
      "conditions": [
        { "attribute": "url", "operator": "eq", "value": `something` }
      ]
    };
    let apiResponse: BlogPostResponseModel|undefined;
    service.one("", post.id).subscribe({
      next: (res: BlogPostResponseModel) => {
        apiResponse = res;
      }
    });

    let encoded = encodeURI(JSON.stringify(query));
    controller.expectOne(`http://localhost/posts/${post.id}`).flush(post);
    controller.verify();

    expect(apiResponse).toEqual(post);
  });

  it('user can create a post', () => {

    const post: BlogPostResponseModel = { 
      id: 1, 
      slug: "slug",
      title: "title",
      text: "text",
      owner: "me",
      permalink: "http://post/1",
      createdOn: new Date(), 
      updateOn: new Date() 
    }
;

    let apiResponse: BlogPostResponseModel|undefined;
    service.create("", "slug", "title", "text").subscribe({
      next: (res: BlogPostResponseModel) => {
        apiResponse = res;
      }
    });

    controller
      .expectOne({ method: 'POST', url: `http://localhost/posts`})
      .flush(post);
    controller.verify();

    expect(apiResponse).toEqual(post);
  });

  it('user can update a post', () => {

    const post: BlogPostResponseModel = { 
      id: 1, 
      slug: "slug",
      title: "title",
      text: "text",
      owner: "me",
      permalink: "http://post/1",
      createdOn: new Date(), 
      updateOn: new Date() 
    }
;

    let apiResponse = false;
    service.update("", 1, "slug", "title", "text").subscribe({
      next: () => {
        apiResponse = true;
      }
    });

    controller
      .expectOne({ method: 'PUT', url: `http://localhost/posts/${post.id}`})
      .flush(post);
    controller.verify();

    expect(apiResponse).toBeTrue();
  });

  it('user can delete a post', () => {

    let apiResponse = false;
    service.delete("", 1).subscribe({
      next: () => {
        apiResponse = true;
      }
    });

    controller
      .expectOne({ method: 'DELETE', url: `http://localhost/posts/1`})
      .flush({});
    controller.verify();

    expect(apiResponse).toEqual(true);
  });

  it('user can assign topics to post', () => {

    const topics = [1,2,3];

    let apiResponse = false;
    service.assignTopics("", 1, topics).subscribe({
      next: () => {
        apiResponse = true;
      }
    });

    controller
      .expectOne({ method: 'PUT', url: `http://localhost/posts/1/topics`}).flush({});
    controller.verify();

    expect(apiResponse).toBeTrue();
  });

});
