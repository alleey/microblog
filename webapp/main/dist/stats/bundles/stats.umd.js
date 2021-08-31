(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/common/http'), require('@angular/common'), require('auth-oidc'), require('utils')) :
    typeof define === 'function' && define.amd ? define('stats', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/common/http', '@angular/common', 'auth-oidc', 'utils'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.stats = {}, global.ng.core, global.rxjs, global.rxjs.operators, global.ng.common.http, global.ng.common, global.i1$1, global.utils));
}(this, (function (exports, i0, rxjs, operators, i1, common, i1$1, utils) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);

    var CountersServiceConfigToken = new i0.InjectionToken("CountersServiceConfig");
    var StatsModuleConfigToken = new i0.InjectionToken("StatsModuleConfig");

    /*
     * Public API Surface of bookmarks
     */

    /*
     * Public API Surface of bookmarks
     */

    ;
    ;
    var CountersService = /** @class */ (function () {
        function CountersService(config, httpClient) {
            this.config = config;
            this.httpClient = httpClient;
            this.onChange = new rxjs.Subject();
        }
        CountersService.prototype.getCounterStatistics = function (endpoint, counter) {
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient
                .get(this.config.serviceBaseUrl + "/" + apiEndpoint + "/" + counter)
                .pipe(operators.map(function (data) {
                return data;
            }));
        };
        CountersService.prototype.batchUpdate = function (endpoint, counters) {
            var _this = this;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient
                .post(this.config.serviceBaseUrl + "/" + apiEndpoint + "/batch", counters)
                .pipe(operators.map(function (data) {
                return data;
            }), operators.tap({
                next: function (x) { _this.onChange.next(x); }
            }));
        };
        CountersService.prototype.deleteCounter = function (endpoint, counter) {
            var _this = this;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient
                .delete(this.config.serviceBaseUrl + "/" + apiEndpoint + "/" + counter)
                .pipe(operators.catchError(function (error) {
                return rxjs.throwError(new Error(error.status));
            }), operators.tap({
                next: function (x) { _this.onChange.next(x); }
            }));
        };
        return CountersService;
    }());
    CountersService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: CountersService, deps: [{ token: CountersServiceConfigToken }, { token: i1__namespace.HttpClient }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    CountersService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: CountersService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: CountersService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [CountersServiceConfigToken]
                        }] }, { type: i1__namespace.HttpClient }];
        } });

    /*
     * Public API Surface of bookmarks
     */

    var StatsModule = /** @class */ (function () {
        function StatsModule() {
        }
        StatsModule.forRoot = function (config) {
            return {
                ngModule: StatsModule,
                providers: [
                    {
                        provide: CountersServiceConfigToken,
                        useValue: config.counters
                    }
                ]
            };
        };
        return StatsModule;
    }());
    StatsModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: StatsModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    StatsModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: StatsModule, imports: [common.CommonModule, i1__namespace$1.OidcAuthModule, utils.UtilsModule] });
    StatsModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: StatsModule, imports: [[
                common.CommonModule,
                i1$1.OidcAuthModule.forChild(),
                utils.UtilsModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: StatsModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [],
                        imports: [
                            common.CommonModule,
                            i1$1.OidcAuthModule.forChild(),
                            utils.UtilsModule
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

    exports.CountersService = CountersService;
    exports.CountersServiceConfigToken = CountersServiceConfigToken;
    exports.StatsModule = StatsModule;
    exports.StatsModuleConfigToken = StatsModuleConfigToken;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=stats.umd.js.map
