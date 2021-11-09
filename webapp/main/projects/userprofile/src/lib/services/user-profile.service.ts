import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserProfileServiceConfig, UserProfileServiceConfigToken } from '../config/config';
import { UserProfileResponseModel } from '../models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  public onChange: Subject<any> = new Subject<any>();

  constructor(
    @Inject(UserProfileServiceConfigToken)
    private config: UserProfileServiceConfig,
    private httpClient: HttpClient) {
  }

  public one(endpoint: string, id: string): Observable<UserProfileResponseModel> {

    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    return this.httpClient
              .get<UserProfileResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${id}`);
  }

  public update(endpoint: string, id: string, about: string): Observable<void> {

    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    let userRepr = {
      "about": about
    };
    return this.httpClient
            .put<void>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${id}`, userRepr)
            .pipe(
              tap({
                next: x => { this.onChange.next(x); }
              })
            );
  }
}

