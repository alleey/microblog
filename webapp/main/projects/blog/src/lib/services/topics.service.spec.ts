import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TopicsService } from './topics.service';
import { TopicsServiceConfigToken } from '../config/config';
import { TopicListResponseModel, TopicResponseModel } from '../models/topic';
import { Pageable } from 'utils';

describe('TopicsService', () => {
  let controller: HttpTestingController;
  let service: TopicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TopicsService, 
        {
          provide: TopicsServiceConfigToken,
          useValue: { serviceBaseUrl: "http://localhost", defaultEndpoint: "topics", pageSize: 10 }
        }]
    });
    controller = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TopicsService);
  });


  it('returns list of topics with default pagination settings', () => {

    const topics: TopicListResponseModel = {
      _embedded: {
        topics: [
          { id: 1,  caption: "text" }
        ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    let apiResponse: TopicListResponseModel|undefined;
    service.all("").subscribe({
      next: (res: TopicListResponseModel) => {
        apiResponse = res;
      }
    });

    controller.expectOne(`http://localhost/topics?page=0&size=10&sort=caption,asc`).flush(topics);
    controller.verify();

    expect(apiResponse).toEqual(topics);
  });

  it('returns list of topics with custom pagination settings', () => {

    const topics: TopicListResponseModel = {
      _embedded: {
        topics: [
          { id: 1,  caption: "text" }        ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };
    const pageable = { page: 10, limit: 100 };

    let apiResponse: TopicListResponseModel|undefined;
    service.all("", pageable).subscribe({
      next: (res: TopicListResponseModel) => {
        apiResponse = res;
      }
    });

    controller.expectOne(`http://localhost/topics?page=${pageable.page}&size=${pageable.limit}&sort=caption,asc`).flush(topics);
    controller.verify();

    expect(apiResponse).toEqual(topics);
  });

  it('returns list of topics with custom pagination settings', () => {

    const topics: TopicListResponseModel = {
      _embedded: {
        topics: [
          { id: 1,  caption: "text" }        ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    let pageable: Pageable = { page: 3, limit: 20 };
    let apiResponse: TopicListResponseModel|undefined;
    service.all("", pageable).subscribe({
      next: (res: TopicListResponseModel) => {
        apiResponse = res;
      }
    });

    controller.expectOne(`http://localhost/topics?page=3&size=20&sort=caption,asc`).flush(topics);
    controller.verify();

    expect(apiResponse).toEqual(topics);
  });

  it('returns search results with default pagination settings', () => {

    const topics: TopicListResponseModel = {
      _embedded: {
        topics: [
          { id: 1,  caption: "text" }        ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    let query = {
      "conditions": [
        { "attribute": "caption", "operator": "like", "value": `%something%` }
      ]
    };
    let apiResponse: TopicListResponseModel|undefined;
    service.search("", query).subscribe({
      next: (res: TopicListResponseModel) => {
        apiResponse = res;
      }
    });

    let encoded = encodeURI(JSON.stringify(query));
    controller.expectOne(`http://localhost/topics/search?q=${encoded}&page=0&size=10&sort=caption,asc`).flush(topics);
    controller.verify();

    expect(apiResponse).toEqual(topics);
  });

  it('returns search results with custom pagination settings', () => {

    const topics: TopicListResponseModel = {
      _embedded: {
        topics: [
          { id: 1,  caption: "text" }        ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };
    const pageable = { page: 10, limit: 100 };

    let query = {
      "conditions": [
        { "attribute": "caption", "operator": "like", "value": `%something%` }
      ]
    };
    let apiResponse: TopicListResponseModel|undefined;
    service.search("", query, pageable).subscribe({
      next: (res: TopicListResponseModel) => {
        apiResponse = res;
      }
    });

    let encoded = encodeURI(JSON.stringify(query));
    controller.expectOne(`http://localhost/topics/search?q=${encoded}&page=${pageable.page}&size=${pageable.limit}&sort=caption,asc`).flush(topics);
    controller.verify();

    expect(apiResponse).toEqual(topics);
  });

  it('returns findByCaption results', () => {

    const topics: TopicListResponseModel = {
      _embedded: {
        topics: [
          { id: 1,  caption: "text" }        ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    let query = {
      "conditions": [
        { "attribute": "caption", "operator": "eq", "value": `something` }
      ]
    };
    let apiResponse: TopicListResponseModel|undefined;
    service.findByCaption("", "something").subscribe({
      next: (res: TopicListResponseModel) => {
        apiResponse = res;
      }
    });

    let encoded = encodeURI(JSON.stringify(query));
    controller.expectOne(`http://localhost/topics/search?q=${encoded}&page=0&size=10&sort=caption,asc`).flush(topics);
    controller.verify();

    expect(apiResponse).toEqual(topics);
  });


  it('returns findMatchingCaption results', () => {

    const topics: TopicListResponseModel = {
      _embedded: {
        topics: [
          { id: 1,  caption: "text" }        ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    let query = {
      "conditions": [
        { "attribute": "caption", "operator": "like", "value": `%something%` }
      ]
    };
    let apiResponse: TopicListResponseModel|undefined;
    service.findMatchingCaption("", "something").subscribe({
      next: (res: TopicListResponseModel) => {
        apiResponse = res;
      }
    });

    let encoded = encodeURI(JSON.stringify(query));
    controller.expectOne(`http://localhost/topics/search?q=${encoded}&page=0&size=10&sort=caption,asc`).flush(topics);
    controller.verify();

    expect(apiResponse).toEqual(topics);
  });

  it('returns one result', () => {

    const topic: TopicResponseModel = { id: 1,  caption: "text" };

    let query = {
      "conditions": [
        { "attribute": "url", "operator": "eq", "value": `something` }
      ]
    };
    let apiResponse: TopicResponseModel|undefined;
    service.one("", topic.id).subscribe({
      next: (res: TopicResponseModel) => {
        apiResponse = res;
      }
    });

    let encoded = encodeURI(JSON.stringify(query));
    controller.expectOne(`http://localhost/topics/${topic.id}`).flush(topic);
    controller.verify();

    expect(apiResponse).toEqual(topic);
  });

  it('user can create a topic', () => {

    const topic: TopicResponseModel = { id: 1,  caption: "text" };

    let apiResponse: TopicResponseModel|undefined;
    service.create("", "text").subscribe({
      next: (res: TopicResponseModel) => {
        apiResponse = res;
      }
    });

    controller
      .expectOne({ method: 'POST', url: `http://localhost/topics`})
      .flush(topic);
    controller.verify();

    expect(apiResponse).toEqual(topic);
  });

  it('user can update a topic', () => {

    const topic: TopicResponseModel = { id: 1,  caption: "text" };

    let apiResponse = false;
    service.update("", 1, "text").subscribe({
      next: () => {
        apiResponse = true;
      }
    });

    controller
      .expectOne({ method: 'PUT', url: `http://localhost/topics/${topic.id}`})
      .flush(topic);
    controller.verify();

    expect(apiResponse).toBeTrue();
  });

  it('user can delete a topic', () => {

    let apiResponse = false;
    service.delete("", 1).subscribe({
      next: () => {
        apiResponse = true;
      }
    });

    controller
      .expectOne({ method: 'DELETE', url: `http://localhost/topics/1`})
      .flush({});
    controller.verify();

    expect(apiResponse).toEqual(true);
  });

});
