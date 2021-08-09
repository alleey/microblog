import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserProfileServiceConfig, UserProfileServiceConfigToken } from '../config/service-config';
import { UserProfileResponseModel } from '../models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(
    @Inject(UserProfileServiceConfigToken) 
    private config: UserProfileServiceConfig,
    private httpClient: HttpClient) { 
  }

  public one(endpoint: string, id: string): Observable<UserProfileResponseModel> {

    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    return this.httpClient
              .get<UserProfileResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${id}`)
              .pipe(
                map(data => {
                  return data as UserProfileResponseModel;
                })
              );
  }}
