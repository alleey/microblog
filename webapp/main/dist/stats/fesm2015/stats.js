import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Inject, NgModule } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import * as i1 from '@angular/common/http';
import { CommonModule } from '@angular/common';
import * as i1$1 from 'auth-oidc';
import { OidcAuthModule } from 'auth-oidc';
import { UtilsModule } from 'utils';

const CountersServiceConfigToken = new InjectionToken("CountersServiceConfig");
const StatsModuleConfigToken = new InjectionToken("StatsModuleConfig");

/*
 * Public API Surface of bookmarks
 */

/*
 * Public API Surface of bookmarks
 */

;
;
class CountersService {
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

/*
 * Public API Surface of bookmarks
 */

class StatsModule {
    static forRoot(config) {
        return {
            ngModule: StatsModule,
            providers: [
                {
                    provide: CountersServiceConfigToken,
                    useValue: config.counters
                }
            ]
        };
    }
}
StatsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: StatsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StatsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: StatsModule, imports: [CommonModule, i1$1.OidcAuthModule, UtilsModule] });
StatsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: StatsModule, imports: [[
            CommonModule,
            OidcAuthModule.forChild(),
            UtilsModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: StatsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [],
                    imports: [
                        CommonModule,
                        OidcAuthModule.forChild(),
                        UtilsModule
                    ],
                    exports: []
                }]
        }] });

/*
 * Public API Surface of stats
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CountersService, CountersServiceConfigToken, StatsModule, StatsModuleConfigToken };
//# sourceMappingURL=stats.js.map
