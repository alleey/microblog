import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserProfileServiceConfigToken } from '../config/config';
import { UserProfileService } from './user-profile.service';
import { UserProfileResponseModel } from '../models/user-profile';

describe('UserProfileService', () => {
  let controller: HttpTestingController;
  let service: UserProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserProfileService, 
        {
          provide: UserProfileServiceConfigToken,
          useValue: { serviceBaseUrl: "http://localhost", defaultEndpoint: "users" }
        }]
    });
    controller = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserProfileService);
  });

  it('returns user profile', () => {

    const userId = "useruseruser";
    const userProfile: UserProfileResponseModel = {
      id: userId,
      firstName: "first name",
      lastName: "last name",
      username: "username",
    };

    let apiResponse: UserProfileResponseModel|undefined;
    service.one("", userId).subscribe({
      next: (res: UserProfileResponseModel) => {
        apiResponse = res;
      }
    });

    controller.expectOne(`http://localhost/users/${userId}`).flush(userProfile);
    controller.verify();

    expect(apiResponse).toEqual(userProfile);
  });

});
