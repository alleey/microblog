import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Pageable } from 'utils';
import { ResourcesServiceConfig, ResourcesServiceConfigToken } from '../config/config';
import { ResourceListResponseModel, ResourceResponseModel } from '../models/resource';

export interface ResourcesServiceChangeNotification {
  resource: string; 
  key: string;
}

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  public onChange = new Subject<ResourcesServiceChangeNotification>();

  constructor(
    @Inject(ResourcesServiceConfigToken) 
    private config: ResourcesServiceConfig,
    private httpClient: HttpClient) 
  { }

	getResource(endpoint: string, resource: string, key: string): Observable<ResourceResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const resourceId = encodeURIComponent(resource);
    const keyId = encodeURIComponent(key);
    return this.httpClient
            .get<ResourceResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${resourceId}/${keyId}`);
  }

	getResources(endpoint: string, resource: string, pageable?: Pageable): Observable<ResourceListResponseModel> {

    const page: number = pageable ? pageable.page : 0;
    const pageSize: number = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const resourceId = encodeURIComponent(resource);

    return this.httpClient
            .get<ResourceListResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${resourceId}`, {
              params: {
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "caption,asc"
              }
            });
  }
  
  public create(endpoint: string, resource: string, key: string, contentType: string, content: File): Observable<ResourceResponseModel> {

    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const resourceRepr = {
      "resource": resource, "key": key, "contentType": contentType
    };
    const formData = new FormData();
    formData.append("resource", new Blob([JSON.stringify(resourceRepr)], {type:"application/json"}));
    formData.append("file", content, content.name);

    return this.httpClient
            .post<ResourceResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}`, formData)
            .pipe(
              tap({
                next: x => { this.onChange.next({ resource, key }); }
              })
            );
  }

  public update(endpoint: string, resource: string, key: string, contentType: string, content: File): Observable<void> {

    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const resourceId = encodeURIComponent(resource);
    const keyId = encodeURIComponent(key);
    const resourceRepr = {
      "resource": resource, "key": key, "contentType": contentType
    };
    const formData = new FormData();
    formData.append("resource", new Blob([JSON.stringify(resourceRepr)], {type:"application/json"}));
    formData.append("file", content, content.name);

    return this.httpClient
            .put<void>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${resourceId}/${keyId}`, formData)
            .pipe(
              tap({
                next: () => { this.onChange.next({ resource, key }); }
              })
            );
  }

  public delete(endpoint: string, resource: string, key: string): Observable<void> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const resourceId = encodeURIComponent(resource);
    const keyId = encodeURIComponent(key);
    return this.httpClient
            .delete<void>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${resourceId}/${keyId}`)
            .pipe(
              tap({
                next: () => { this.onChange.next({ resource, key }); }
              })
            );
  }
}
