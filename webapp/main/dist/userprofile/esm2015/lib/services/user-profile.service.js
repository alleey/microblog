import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserProfileServiceConfigToken } from '../config/config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class UserProfileService {
    constructor(config, httpClient) {
        this.config = config;
        this.httpClient = httpClient;
    }
    one(endpoint, id) {
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        return this.httpClient
            .get(`${this.config.serviceBaseUrl}/${apiEndpoint}/${id}`)
            .pipe(map(data => {
            return data;
        }));
    }
}
UserProfileService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: UserProfileService, deps: [{ token: UserProfileServiceConfigToken }, { token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
UserProfileService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: UserProfileService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: UserProfileService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [UserProfileServiceConfigToken]
                }] }, { type: i1.HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wcm9maWxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy91c2VycHJvZmlsZS9zcmMvbGliL3NlcnZpY2VzL3VzZXItcHJvZmlsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQTRCLDZCQUE2QixFQUFFLE1BQU0sa0JBQWtCLENBQUM7OztBQU0zRixNQUFNLE9BQU8sa0JBQWtCO0lBRTdCLFlBRVUsTUFBZ0MsRUFDaEMsVUFBc0I7UUFEdEIsV0FBTSxHQUFOLE1BQU0sQ0FBMEI7UUFDaEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUNoQyxDQUFDO0lBRU0sR0FBRyxDQUFDLFFBQWdCLEVBQUUsRUFBVTtRQUVyQyxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUM7UUFDdEUsT0FBTyxJQUFJLENBQUMsVUFBVTthQUNYLEdBQUcsQ0FBMkIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsSUFBSSxXQUFXLElBQUksRUFBRSxFQUFFLENBQUM7YUFDbkYsSUFBSSxDQUNILEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNULE9BQU8sSUFBZ0MsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ2QsQ0FBQzs7K0dBbEJVLGtCQUFrQixrQkFHbkIsNkJBQTZCO21IQUg1QixrQkFBa0IsY0FGakIsTUFBTTsyRkFFUCxrQkFBa0I7a0JBSDlCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzswQkFJSSxNQUFNOzJCQUFDLDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFVzZXJQcm9maWxlU2VydmljZUNvbmZpZywgVXNlclByb2ZpbGVTZXJ2aWNlQ29uZmlnVG9rZW4gfSBmcm9tICcuLi9jb25maWcvY29uZmlnJztcbmltcG9ydCB7IFVzZXJQcm9maWxlUmVzcG9uc2VNb2RlbCB9IGZyb20gJy4uL21vZGVscy91c2VyLXByb2ZpbGUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBVc2VyUHJvZmlsZVNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoVXNlclByb2ZpbGVTZXJ2aWNlQ29uZmlnVG9rZW4pIFxuICAgIHByaXZhdGUgY29uZmlnOiBVc2VyUHJvZmlsZVNlcnZpY2VDb25maWcsXG4gICAgcHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50KSB7IFxuICB9XG5cbiAgcHVibGljIG9uZShlbmRwb2ludDogc3RyaW5nLCBpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyUHJvZmlsZVJlc3BvbnNlTW9kZWw+IHtcblxuICAgIGNvbnN0IGFwaUVuZHBvaW50ID0gZW5kcG9pbnQgPyBlbmRwb2ludCA6IHRoaXMuY29uZmlnLmRlZmF1bHRFbmRwb2ludDtcbiAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50XG4gICAgICAgICAgICAgIC5nZXQ8VXNlclByb2ZpbGVSZXNwb25zZU1vZGVsPihgJHt0aGlzLmNvbmZpZy5zZXJ2aWNlQmFzZVVybH0vJHthcGlFbmRwb2ludH0vJHtpZH1gKVxuICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YSBhcyBVc2VyUHJvZmlsZVJlc3BvbnNlTW9kZWw7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKTtcbiAgfVxufVxuIl19