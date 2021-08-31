import { Inject, Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";
import { CommentsServiceConfigToken } from '../config/config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class CommentsService {
    constructor(config, httpClient) {
        this.config = config;
        this.httpClient = httpClient;
        this.onChange = new Subject();
    }
    all(endpoint, postId, pageable) {
        const page = pageable ? pageable.page : 0;
        const pageSize = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        return this.httpClient
            .get(`${this.config.serviceBaseUrl}/${apiEndpoint}/${postId}/comments`, {
            params: {
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "createdOn,desc"
            }
        })
            .pipe(map(data => {
            return data;
        }));
    }
    one(endpoint, postId, id) {
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        return this.httpClient
            .get(`${this.config.serviceBaseUrl}/${apiEndpoint}/${postId}/comments/${id}`)
            .pipe(map(data => {
            return data;
        }));
    }
    create(endpoint, postId, text) {
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        let commentRepr = {
            "text": text
        };
        return this.httpClient
            .post(`${this.config.serviceBaseUrl}/${apiEndpoint}/${postId}/comments`, commentRepr)
            .pipe(map(data => {
            return data;
        }), tap({
            next: x => { this.onChange.next(x); }
        }));
    }
    update(endpoint, postId, id, text) {
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        let commentRepr = {
            "text": text
        };
        return this.httpClient
            .put(`${this.config.serviceBaseUrl}/${apiEndpoint}/${postId}/comments/${id}`, commentRepr)
            .pipe(map(data => {
            return data;
        }), tap({
            next: x => { this.onChange.next(x); }
        }));
    }
    delete(endpoint, postId, id) {
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        return this.httpClient
            .delete(`${this.config.serviceBaseUrl}/${apiEndpoint}/${postId}/comments/${id}`)
            .pipe(catchError((error) => {
            return throwError(new Error(error.status));
        }), tap({
            next: x => { this.onChange.next(x); }
        }));
    }
}
CommentsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: CommentsService, deps: [{ token: CommentsServiceConfigToken }, { token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
CommentsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: CommentsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: CommentsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [CommentsServiceConfigToken]
                }] }, { type: i1.HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2Jsb2cvc3JjL2xpYi9zZXJ2aWNlcy9jb21tZW50cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFBa0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0RCxPQUFPLEVBQXlCLDBCQUEwQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7OztBQUtyRixNQUFNLE9BQU8sZUFBZTtJQUkxQixZQUF3RCxNQUE2QixFQUFVLFVBQXNCO1FBQTdELFdBQU0sR0FBTixNQUFNLENBQXVCO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUY5RyxhQUFRLEdBQWlCLElBQUksT0FBTyxFQUFPLENBQUM7SUFHakQsQ0FBQztJQUVJLEdBQUcsQ0FBQyxRQUFnQixFQUFFLE1BQWMsRUFBRSxRQUFtQjtRQUU5RCxNQUFNLElBQUksR0FBVyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRCxNQUFNLFFBQVEsR0FBVyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQzlGLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQztRQUV0RSxPQUFPLElBQUksQ0FBQyxVQUFVO2FBQ1gs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QUFlLENBQUM7UUFDdEUsT0FBTyxJQUFJLENBQUMsVUFBVTthQUNiLE1BQU0sQ0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxJQUFJLFdBQVcsSUFBSSxNQUFNLGFBQWEsRUFBRSxFQUFFLENBQUM7YUFDckYsSUFBSSxDQUNILFVBQVUsQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQ3hCLE9BQU8sVUFBVSxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxFQUNGLEdBQUcsQ0FBQztZQUNGLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QyxDQUFDLENBQ0gsQ0FBQztJQUNaLENBQUM7OzRHQXJGVSxlQUFlLGtCQUlOLDBCQUEwQjtnSEFKbkMsZUFBZSxjQUZkLE1BQU07MkZBRVAsZUFBZTtrQkFIM0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQUtjLE1BQU07MkJBQUMsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnZWFibGUgfSBmcm9tICd1dGlscyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgU3ViamVjdCwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCB0YXAgfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcbmltcG9ydCB7IENvbW1lbnRSZXNwb25zZU1vZGVsLCBDb21tZW50TGlzdFJlc3BvbnNlTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvY29tbWVudCc7XG5pbXBvcnQgeyBDb21tZW50c1NlcnZpY2VDb25maWcsIENvbW1lbnRzU2VydmljZUNvbmZpZ1Rva2VuIH0gZnJvbSAnLi4vY29uZmlnL2NvbmZpZyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIENvbW1lbnRzU2VydmljZSB7XG5cbiAgcHVibGljIG9uQ2hhbmdlOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChDb21tZW50c1NlcnZpY2VDb25maWdUb2tlbikgcHJpdmF0ZSBjb25maWc6IENvbW1lbnRzU2VydmljZUNvbmZpZywgcHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50KSBcbiAgeyB9XG5cbiAgcHVibGljIGFsbChlbmRwb2ludDogc3RyaW5nLCBwb3N0SWQ6IG51bWJlciwgcGFnZWFibGU/OiBQYWdlYWJsZSk6IE9ic2VydmFibGU8Q29tbWVudExpc3RSZXNwb25zZU1vZGVsPiB7XG5cbiAgICBjb25zdCBwYWdlOiBudW1iZXIgPSBwYWdlYWJsZSA/IHBhZ2VhYmxlLnBhZ2UgOiAwO1xuICAgIGNvbnN0IHBhZ2VTaXplOiBudW1iZXIgPSAocGFnZWFibGUgJiYgcGFnZWFibGUubGltaXQpID8gcGFnZWFibGUubGltaXQgOiB0aGlzLmNvbmZpZy5wYWdlU2l6ZTtcbiAgICBjb25zdCBhcGlFbmRwb2ludCA9IGVuZHBvaW50ID8gZW5kcG9pbnQgOiB0aGlzLmNvbmZpZy5kZWZhdWx0RW5kcG9pbnQ7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50XG4gICAgICAgICAgICAgIC5nZXQ8Q29tbWVudExpc3RSZXNwb25zZU1vZGVsPihgJHt0aGlzLmNvbmZpZy5zZXJ2aWNlQmFzZVVybH0vJHthcGlFbmRwb2ludH0vJHtwb3N0SWR9L2NvbW1lbnRzYCwge1xuICAgICAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgXCJwYWdlXCI6IHBhZ2UudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgIFwic2l6ZVwiOiBwYWdlU2l6ZS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgXCJzb3J0XCI6IFwiY3JlYXRlZE9uLGRlc2NcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEgYXMgQ29tbWVudExpc3RSZXNwb25zZU1vZGVsO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICk7XG4gIH1cblxuICBwdWJsaWMgb25lKGVuZHBvaW50OiBzdHJpbmcsIHBvc3RJZDogbnVtYmVyLCBpZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxDb21tZW50UmVzcG9uc2VNb2RlbD4ge1xuICAgIGNvbnN0IGFwaUVuZHBvaW50ID0gZW5kcG9pbnQgPyBlbmRwb2ludCA6IHRoaXMuY29uZmlnLmRlZmF1bHRFbmRwb2ludDtcbiAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50XG4gICAgICAgICAgICAgIC5nZXQ8Q29tbWVudFJlc3BvbnNlTW9kZWw+KGAke3RoaXMuY29uZmlnLnNlcnZpY2VCYXNlVXJsfS8ke2FwaUVuZHBvaW50fS8ke3Bvc3RJZH0vY29tbWVudHMvJHtpZH1gKVxuICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YSBhcyBDb21tZW50UmVzcG9uc2VNb2RlbDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICApO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZShlbmRwb2ludDogc3RyaW5nLCBwb3N0SWQ6IG51bWJlciwgdGV4dDogc3RyaW5nKTogT2JzZXJ2YWJsZTxDb21tZW50UmVzcG9uc2VNb2RlbD4ge1xuICAgIGNvbnN0IGFwaUVuZHBvaW50ID0gZW5kcG9pbnQgPyBlbmRwb2ludCA6IHRoaXMuY29uZmlnLmRlZmF1bHRFbmRwb2ludDtcbiAgICBsZXQgY29tbWVudFJlcHIgPSB7XG4gICAgICBcInRleHRcIjogdGV4dFxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudFxuICAgICAgICAgICAgLnBvc3Q8Q29tbWVudFJlc3BvbnNlTW9kZWw+KGAke3RoaXMuY29uZmlnLnNlcnZpY2VCYXNlVXJsfS8ke2FwaUVuZHBvaW50fS8ke3Bvc3RJZH0vY29tbWVudHNgLCBjb21tZW50UmVwcilcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEgYXMgQ29tbWVudFJlc3BvbnNlTW9kZWw7XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICB0YXAoe1xuICAgICAgICAgICAgICAgIG5leHQ6IHggPT4geyB0aGlzLm9uQ2hhbmdlLm5leHQoeCk7IH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKGVuZHBvaW50OiBzdHJpbmcsIHBvc3RJZDogbnVtYmVyLCBpZDogbnVtYmVyLCB0ZXh0OiBzdHJpbmcpOiBPYnNlcnZhYmxlPENvbW1lbnRSZXNwb25zZU1vZGVsPiB7XG4gICAgY29uc3QgYXBpRW5kcG9pbnQgPSBlbmRwb2ludCA/IGVuZHBvaW50IDogdGhpcy5jb25maWcuZGVmYXVsdEVuZHBvaW50O1xuICAgIGxldCBjb21tZW50UmVwciA9IHtcbiAgICAgIFwidGV4dFwiOiB0ZXh0XG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50XG4gICAgICAgICAgICAucHV0PENvbW1lbnRSZXNwb25zZU1vZGVsPihgJHt0aGlzLmNvbmZpZy5zZXJ2aWNlQmFzZVVybH0vJHthcGlFbmRwb2ludH0vJHtwb3N0SWR9L2NvbW1lbnRzLyR7aWR9YCwgY29tbWVudFJlcHIpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhIGFzIENvbW1lbnRSZXNwb25zZU1vZGVsO1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgdGFwKHtcbiAgICAgICAgICAgICAgICBuZXh0OiB4ID0+IHsgdGhpcy5vbkNoYW5nZS5uZXh0KHgpOyB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICB9XG5cbiAgcHVibGljIGRlbGV0ZShlbmRwb2ludDogc3RyaW5nLCBwb3N0SWQ6IG51bWJlciwgaWQ6IG51bWJlcik6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIGNvbnN0IGFwaUVuZHBvaW50ID0gZW5kcG9pbnQgPyBlbmRwb2ludCA6IHRoaXMuY29uZmlnLmRlZmF1bHRFbmRwb2ludDtcbiAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50XG4gICAgICAgICAgICAuZGVsZXRlPHZvaWQ+KGAke3RoaXMuY29uZmlnLnNlcnZpY2VCYXNlVXJsfS8ke2FwaUVuZHBvaW50fS8ke3Bvc3RJZH0vY29tbWVudHMvJHtpZH1gKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihuZXcgRXJyb3IoZXJyb3Iuc3RhdHVzKSk7XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICB0YXAoe1xuICAgICAgICAgICAgICAgIG5leHQ6IHggPT4geyB0aGlzLm9uQ2hhbmdlLm5leHQoeCk7IH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gIH1cbn1cbiJdfQ==