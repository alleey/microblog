import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ResourcesServiceConfigToken } from '../config/config';
import { ResourceResponseModel } from '../models/resource';

import { ResourcesService } from './resources.service';

describe('ResourcesService', () => {
  let controller: HttpTestingController;
  let service: ResourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ResourcesService, 
        {
          provide: ResourcesServiceConfigToken,
          useValue: { serviceBaseUrl: "http://localhost", defaultEndpoint: "resources", pageSize: 10 }
        }]
    });
    controller = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ResourcesService);
  });

  it('user can create a resource', () => {

    const response: ResourceResponseModel = { 
      resource: "avatars", key: "default", 
      owner: "me", contentType: "iamge/png",
      createdOn: new Date()
    };

    let apiResponse: ResourceResponseModel|undefined;
    service.create("", response.resource, response.key, response.contentType, response).subscribe({
      next: (res: ResourceResponseModel) => {
        apiResponse = res;
      }
    });

    controller
      .expectOne({ method: 'POST', url: `http://localhost/resources`})
      .flush(response);
    controller.verify();

    expect(apiResponse).toEqual(response);
  });

  it('user can delete a resource', () => {

    let apiResponse = false;
    service.delete("", "avatars", "default").subscribe({
      next: () => {
        apiResponse = true;
      }
    });

    controller
      .expectOne({ method: 'DELETE', url: `http://localhost/resources/avatars/default`})
      .flush({});
    controller.verify();

    expect(apiResponse).toEqual(true);
  });
});
