import { Inject, Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CountersServiceConfigToken } from '../config/config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
;
;
export class CountersService {
    constructor(config, httpClient) {
        this.config = config;
        this.httpClient = httpClient;
        this.onChange = new Subject();
    }
    getCounterStatistics(endpoint, counter) {
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        return this.httpClient
            .get(`${this.config.serviceBaseUrl}/${apiEndpoint}/${counter}`)
            .pipe(map(data => {
            return data;
        }));
    }
    batchUpdate(endpoint, counters) {
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        return this.httpClient
            .post(`${this.config.serviceBaseUrl}/${apiEndpoint}/batch`, counters)
            .pipe(map(data => {
            return data;
        }), tap({
            next: x => { this.onChange.next(x); }
        }));
    }
    deleteCounter(endpoint, counter) {
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        return this.httpClient
            .delete(`${this.config.serviceBaseUrl}/${apiEndpoint}/${counter}`)
            .pipe(catchError((error) => {
            return throwError(new Error(error.status));
        }), tap({
            next: x => { this.onChange.next(x); }
        }));
    }
}
CountersService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: CountersService, deps: [{ token: CountersServiceConfigToken }, { token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
CountersService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: CountersService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: CountersService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [CountersServiceConfigToken]
                }] }, { type: i1.HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnRlcnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0YXRzL3NyYy9saWIvc2VydmljZXMvY291bnRlcnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQWMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RCxPQUFPLEVBQXlCLDBCQUEwQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7OztBQU9wRixDQUFDO0FBR0QsQ0FBQztBQUtGLE1BQU0sT0FBTyxlQUFlO0lBSTFCLFlBRVUsTUFBNkIsRUFDN0IsVUFBc0I7UUFEdEIsV0FBTSxHQUFOLE1BQU0sQ0FBdUI7UUFDN0IsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUx6QixhQUFRLEdBQWlCLElBQUksT0FBTyxFQUFPLENBQUM7SUFNakQsQ0FBQztJQUVKLG9CQUFvQixDQUFDLFFBQWdCLEVBQUUsT0FBZTtRQUNuRCxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUM7UUFDdEUsT0FBTyxJQUFJLENBQUMsVUFBVTthQUNiLEdBQUcsQ0FBeUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsSUFBSSxXQUFXLElBQUksT0FBTyxFQUFFLENBQUM7YUFDdEYsSUFBSSxDQUNILEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNULE9BQU8sSUFBOEIsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ1osQ0FBQztJQUVGLFdBQVcsQ0FBQyxRQUFnQixFQUFFLFFBQStCO1FBQzFELE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQztRQUN0RSxPQUFPLElBQUksQ0FBQyxVQUFVO2FBQ2IsSUFBSSxDQUEyQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxJQUFJLFdBQVcsUUFBUSxFQUFFLFFBQVEsQ0FBQzthQUM5RixJQUFJLENBQ0gsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ1QsT0FBTyxJQUFnQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxFQUNGLEdBQUcsQ0FBQztZQUNGLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QyxDQUFDLENBQ0gsQ0FBQztJQUNaLENBQUM7SUFFRixhQUFhLENBQUMsUUFBZ0IsRUFBRSxPQUFlO1FBQzVDLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQztRQUN0RSxPQUFPLElBQUksQ0FBQyxVQUFVO2FBQ2IsTUFBTSxDQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLElBQUksV0FBVyxJQUFJLE9BQU8sRUFBRSxDQUFDO2FBQ3ZFLElBQUksQ0FDSCxVQUFVLENBQUMsQ0FBQyxLQUFVLEVBQUUsRUFBRTtZQUN4QixPQUFPLFVBQVUsQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsRUFDRixHQUFHLENBQUM7WUFDRixJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEMsQ0FBQyxDQUNILENBQUM7SUFDWixDQUFDOzs0R0EvQ1UsZUFBZSxrQkFLaEIsMEJBQTBCO2dIQUx6QixlQUFlLGNBRmQsTUFBTTsyRkFFUCxlQUFlO2tCQUgzQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBTUksTUFBTTsyQkFBQywwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENvdW50ZXJzU2VydmljZUNvbmZpZywgQ291bnRlcnNTZXJ2aWNlQ29uZmlnVG9rZW4gfSBmcm9tICcuLi9jb25maWcvY29uZmlnJztcbmltcG9ydCB7IENvdW50ZXJMaXN0UmVzcG9uc2VNb2RlbCB9IGZyb20gJy4uL21vZGVscy9jb3VudGVyJztcbmltcG9ydCB7IENvdW50ZXJTdGF0aXN0aWNzTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvY291bnRlci1zdGF0aXN0aWNzJztcblxuZXhwb3J0IGludGVyZmFjZSBDb3VudGVyUmVxdWVzdCB7XG4gIGNvdW50ZXI6IHN0cmluZztcbiAgdmFsdWU6IE51bWJlcjtcbn07XG5leHBvcnQgaW50ZXJmYWNlIEJhdGNoQ291bnRlclJlcXVlc3QgZXh0ZW5kcyBDb3VudGVyUmVxdWVzdCB7XG4gIG9wZXJhdGlvbjogc3RyaW5nO1xufTtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQ291bnRlcnNTZXJ2aWNlIHtcblxuICBwdWJsaWMgb25DaGFuZ2U6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KENvdW50ZXJzU2VydmljZUNvbmZpZ1Rva2VuKSBcbiAgICBwcml2YXRlIGNvbmZpZzogQ291bnRlcnNTZXJ2aWNlQ29uZmlnLFxuICAgIHByaXZhdGUgaHR0cENsaWVudDogSHR0cENsaWVudCkgXG4gIHsgfVxuXG5cdGdldENvdW50ZXJTdGF0aXN0aWNzKGVuZHBvaW50OiBzdHJpbmcsIGNvdW50ZXI6IHN0cmluZyk6IE9ic2VydmFibGU8Q291bnRlclN0YXRpc3RpY3NNb2RlbD4ge1xuICAgIGNvbnN0IGFwaUVuZHBvaW50ID0gZW5kcG9pbnQgPyBlbmRwb2ludCA6IHRoaXMuY29uZmlnLmRlZmF1bHRFbmRwb2ludDtcbiAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50XG4gICAgICAgICAgICAuZ2V0PENvdW50ZXJTdGF0aXN0aWNzTW9kZWw+KGAke3RoaXMuY29uZmlnLnNlcnZpY2VCYXNlVXJsfS8ke2FwaUVuZHBvaW50fS8ke2NvdW50ZXJ9YClcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEgYXMgQ291bnRlclN0YXRpc3RpY3NNb2RlbDtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gIH1cblxuXHRiYXRjaFVwZGF0ZShlbmRwb2ludDogc3RyaW5nLCBjb3VudGVyczogQmF0Y2hDb3VudGVyUmVxdWVzdFtdKTogT2JzZXJ2YWJsZTxDb3VudGVyTGlzdFJlc3BvbnNlTW9kZWw+IHtcbiAgICBjb25zdCBhcGlFbmRwb2ludCA9IGVuZHBvaW50ID8gZW5kcG9pbnQgOiB0aGlzLmNvbmZpZy5kZWZhdWx0RW5kcG9pbnQ7XG4gICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudFxuICAgICAgICAgICAgLnBvc3Q8Q291bnRlckxpc3RSZXNwb25zZU1vZGVsPihgJHt0aGlzLmNvbmZpZy5zZXJ2aWNlQmFzZVVybH0vJHthcGlFbmRwb2ludH0vYmF0Y2hgLCBjb3VudGVycylcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEgYXMgQ291bnRlckxpc3RSZXNwb25zZU1vZGVsO1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgdGFwKHtcbiAgICAgICAgICAgICAgICBuZXh0OiB4ID0+IHsgdGhpcy5vbkNoYW5nZS5uZXh0KHgpOyB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICB9XG5cblx0ZGVsZXRlQ291bnRlcihlbmRwb2ludDogc3RyaW5nLCBjb3VudGVyOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICBjb25zdCBhcGlFbmRwb2ludCA9IGVuZHBvaW50ID8gZW5kcG9pbnQgOiB0aGlzLmNvbmZpZy5kZWZhdWx0RW5kcG9pbnQ7XG4gICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudFxuICAgICAgICAgICAgLmRlbGV0ZTx2b2lkPihgJHt0aGlzLmNvbmZpZy5zZXJ2aWNlQmFzZVVybH0vJHthcGlFbmRwb2ludH0vJHtjb3VudGVyfWApXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKG5ldyBFcnJvcihlcnJvci5zdGF0dXMpKTtcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIHRhcCh7XG4gICAgICAgICAgICAgICAgbmV4dDogeCA9PiB7IHRoaXMub25DaGFuZ2UubmV4dCh4KTsgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgfVxufVxuIl19