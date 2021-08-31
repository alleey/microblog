(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs'), require('rxjs/operators'), require('@angular/common/http'), require('moment')) :
    typeof define === 'function' && define.amd ? define('utils', ['exports', '@angular/core', '@angular/common', 'rxjs', 'rxjs/operators', '@angular/common/http', 'moment'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.utils = {}, global.ng.core, global.ng.common, global.rxjs, global.rxjs.operators, global.ng.common.http, global.moment));
}(this, (function (exports, i0, i1, rxjs, operators, i1$1, moment) { 'use strict';

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
    var moment__namespace = /*#__PURE__*/_interopNamespace(moment);

    exports.SortDirection = void 0;
    (function (SortDirection) {
        SortDirection["Asc"] = "asc";
        SortDirection["Desc"] = "desc";
    })(exports.SortDirection || (exports.SortDirection = {}));

    /*
     * Public API Surface of utils
     */

    function AlertComponent_ng_template_1_button_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r7_1 = i0__namespace.ɵɵgetCurrentView();
            i0__namespace.ɵɵelementStart(0, "button", 5);
            i0__namespace.ɵɵlistener("click", function AlertComponent_ng_template_1_button_1_Template_button_click_0_listener() { i0__namespace.ɵɵrestoreView(_r7_1); var item_r2 = i0__namespace.ɵɵnextContext().$implicit; return item_r2.fireOnClose(); });
            i0__namespace.ɵɵelementStart(1, "span", 6);
            i0__namespace.ɵɵtext(2, "\u00D7");
            i0__namespace.ɵɵelementEnd();
            i0__namespace.ɵɵelementEnd();
        }
    }
    function AlertComponent_ng_template_1_h4_2_Template(rf, ctx) {
        if (rf & 1) {
            i0__namespace.ɵɵelementStart(0, "h4", 7);
            i0__namespace.ɵɵtext(1);
            i0__namespace.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r2 = i0__namespace.ɵɵnextContext().$implicit;
            i0__namespace.ɵɵadvance(1);
            i0__namespace.ɵɵtextInterpolate(item_r2.title);
        }
    }
    var _c0$3 = function (a1) { return ["alert", a1]; };
    function AlertComponent_ng_template_1_Template(rf, ctx) {
        if (rf & 1) {
            i0__namespace.ɵɵelementStart(0, "div", 2);
            i0__namespace.ɵɵtemplate(1, AlertComponent_ng_template_1_button_1_Template, 3, 0, "button", 3);
            i0__namespace.ɵɵtemplate(2, AlertComponent_ng_template_1_h4_2_Template, 2, 1, "h4", 4);
            i0__namespace.ɵɵprojection(3);
            i0__namespace.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r2 = ctx.$implicit;
            i0__namespace.ɵɵproperty("ngClass", i0__namespace.ɵɵpureFunction1(3, _c0$3, "alert-" + item_r2.kind));
            i0__namespace.ɵɵadvance(1);
            i0__namespace.ɵɵproperty("ngIf", item_r2.dismissable);
            i0__namespace.ɵɵadvance(1);
            i0__namespace.ɵɵproperty("ngIf", !item_r2.minimal);
        }
    }
    var _c1$1 = function (a0) { return { $implicit: a0 }; };
    var _c2$1 = ["*"];
    var AlertComponent = /** @class */ (function () {
        function AlertComponent() {
            this.minimal = false;
            this.dismissable = false;
            this.title = "Oops!";
            this.kind = "danger";
            this.onClosed = new i0.EventEmitter();
        }
        AlertComponent.prototype.ngOnInit = function () { };
        AlertComponent.prototype.fireOnClose = function () {
            this.onClosed.emit();
        };
        return AlertComponent;
    }());
    AlertComponent.ɵfac = function AlertComponent_Factory(t) { return new (t || AlertComponent)(); };
    AlertComponent.ɵcmp = /*@__PURE__*/ i0__namespace.ɵɵdefineComponent({ type: AlertComponent, selectors: [["utils-alert"]], inputs: { minimal: "minimal", dismissable: "dismissable", title: "title", kind: "kind", controlTemplate: "controlTemplate" }, outputs: { onClosed: "onClosed" }, ngContentSelectors: _c2$1, decls: 3, vars: 4, consts: [[3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["defaultTemplate", ""], ["role", "alert", 3, "ngClass"], ["type", "button", "class", "close", "data-dismiss", "alert", "aria-label", "Close", 3, "click", 4, "ngIf"], ["class", "alert-heading", 4, "ngIf"], ["type", "button", "data-dismiss", "alert", "aria-label", "Close", 1, "close", 3, "click"], ["aria-hidden", "true"], [1, "alert-heading"]], template: function AlertComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0__namespace.ɵɵprojectionDef();
                i0__namespace.ɵɵelementContainer(0, 0);
                i0__namespace.ɵɵtemplate(1, AlertComponent_ng_template_1_Template, 4, 5, "ng-template", null, 1, i0__namespace.ɵɵtemplateRefExtractor);
            }
            if (rf & 2) {
                var _r0 = i0__namespace.ɵɵreference(2);
                i0__namespace.ɵɵproperty("ngTemplateOutlet", ctx.controlTemplate || _r0)("ngTemplateOutletContext", i0__namespace.ɵɵpureFunction1(2, _c1$1, ctx));
            }
        }, directives: [i1__namespace.NgTemplateOutlet, i1__namespace.NgClass, i1__namespace.NgIf], styles: [""] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(AlertComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'utils-alert',
                        templateUrl: './alert.component.html',
                        styleUrls: ['./alert.component.scss']
                    }]
            }], function () { return []; }, { minimal: [{
                    type: i0.Input
                }], dismissable: [{
                    type: i0.Input
                }], title: [{
                    type: i0.Input
                }], kind: [{
                    type: i0.Input
                }], controlTemplate: [{
                    type: i0.Input
                }], onClosed: [{
                    type: i0.Output
                }] });
    })();

    var _c0$2 = function (a0) { return { $implicit: a0 }; };
    function BadgeComponent_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
            i0__namespace.ɵɵelementContainer(0, 3);
        }
        if (rf & 2) {
            var ctx_r0 = i0__namespace.ɵɵnextContext();
            var _r4 = i0__namespace.ɵɵreference(5);
            i0__namespace.ɵɵproperty("ngTemplateOutlet", ctx_r0.inactiveControlTemplate || _r4)("ngTemplateOutletContext", i0__namespace.ɵɵpureFunction1(2, _c0$2, ctx_r0));
        }
    }
    function BadgeComponent_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            i0__namespace.ɵɵelementContainer(0, 3);
        }
        if (rf & 2) {
            var ctx_r1 = i0__namespace.ɵɵnextContext();
            var _r2 = i0__namespace.ɵɵreference(3);
            i0__namespace.ɵɵproperty("ngTemplateOutlet", ctx_r1.activeControlTemplate || _r2)("ngTemplateOutletContext", i0__namespace.ɵɵpureFunction1(2, _c0$2, ctx_r1));
        }
    }
    function BadgeComponent_ng_template_2_span_5_Template(rf, ctx) {
        if (rf & 1) {
            i0__namespace.ɵɵelementStart(0, "span");
            i0__namespace.ɵɵelement(1, "i", 8);
            i0__namespace.ɵɵelementEnd();
        }
    }
    var _c1 = function (a1) { return ["btn", a1]; };
    function BadgeComponent_ng_template_2_Template(rf, ctx) {
        if (rf & 1) {
            i0__namespace.ɵɵelementStart(0, "a", 4);
            i0__namespace.ɵɵlistener("click", function BadgeComponent_ng_template_2_Template_a_click_0_listener() { var item_r6 = ctx.$implicit; return item_r6.fireRemove(); });
            i0__namespace.ɵɵtext(1);
            i0__namespace.ɵɵelementStart(2, "span", 5, 6);
            i0__namespace.ɵɵprojection(4);
            i0__namespace.ɵɵelementEnd();
            i0__namespace.ɵɵtemplate(5, BadgeComponent_ng_template_2_span_5_Template, 2, 0, "span", 7);
            i0__namespace.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r6 = ctx.$implicit;
            var _r7 = i0__namespace.ɵɵreference(3);
            i0__namespace.ɵɵproperty("ngClass", i0__namespace.ɵɵpureFunction1(3, _c1, "btn-" + item_r6.kind));
            i0__namespace.ɵɵadvance(1);
            i0__namespace.ɵɵtextInterpolate1(" ", item_r6.activeCaption, " ");
            i0__namespace.ɵɵadvance(4);
            i0__namespace.ɵɵproperty("ngIf", !_r7.innerHTML.trim());
        }
    }
    function BadgeComponent_ng_template_4_Template(rf, ctx) {
        if (rf & 1) {
            i0__namespace.ɵɵelementStart(0, "a", 4);
            i0__namespace.ɵɵlistener("click", function BadgeComponent_ng_template_4_Template_a_click_0_listener() { var item_r10 = ctx.$implicit; return item_r10.fireAdd(); });
            i0__namespace.ɵɵtext(1);
            i0__namespace.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r10 = ctx.$implicit;
            i0__namespace.ɵɵproperty("ngClass", i0__namespace.ɵɵpureFunction1(2, _c1, "btn-outline-" + item_r10.kind));
            i0__namespace.ɵɵadvance(1);
            i0__namespace.ɵɵtextInterpolate1(" ", item_r10.inactiveCaption || item_r10.activeCaption, " ");
        }
    }
    var _c2 = ["*"];
    var BadgeComponent = /** @class */ (function () {
        function BadgeComponent() {
            this.isActive = false;
            this.activeCaption = "";
            this.inactiveCaption = "";
            this.kind = "primary";
            this.onAdd = new i0.EventEmitter();
            this.onRemove = new i0.EventEmitter();
        }
        BadgeComponent.prototype.ngOnInit = function () { };
        BadgeComponent.prototype.fireAdd = function () {
            this.onAdd.emit();
        };
        BadgeComponent.prototype.fireRemove = function () {
            this.onRemove.emit();
        };
        return BadgeComponent;
    }());
    BadgeComponent.ɵfac = function BadgeComponent_Factory(t) { return new (t || BadgeComponent)(); };
    BadgeComponent.ɵcmp = /*@__PURE__*/ i0__namespace.ɵɵdefineComponent({ type: BadgeComponent, selectors: [["utils-badge"]], inputs: { isActive: "isActive", activeCaption: "activeCaption", inactiveCaption: "inactiveCaption", kind: "kind", activeControlTemplate: "activeControlTemplate", inactiveControlTemplate: "inactiveControlTemplate" }, outputs: { onAdd: "onAdd", onRemove: "onRemove" }, ngContentSelectors: _c2, decls: 6, vars: 2, consts: [[3, "ngTemplateOutlet", "ngTemplateOutletContext", 4, "ngIf"], ["defaultActiveControlTemplate", ""], ["defaultInactiveControlTemplate", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["type", "button", 3, "ngClass", "click"], [1, "badge", "badge-light"], ["ref", ""], [4, "ngIf"], [1, "fa", "fa-star"]], template: function BadgeComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0__namespace.ɵɵprojectionDef();
                i0__namespace.ɵɵtemplate(0, BadgeComponent_ng_container_0_Template, 1, 4, "ng-container", 0);
                i0__namespace.ɵɵtemplate(1, BadgeComponent_ng_container_1_Template, 1, 4, "ng-container", 0);
                i0__namespace.ɵɵtemplate(2, BadgeComponent_ng_template_2_Template, 6, 5, "ng-template", null, 1, i0__namespace.ɵɵtemplateRefExtractor);
                i0__namespace.ɵɵtemplate(4, BadgeComponent_ng_template_4_Template, 2, 4, "ng-template", null, 2, i0__namespace.ɵɵtemplateRefExtractor);
            }
            if (rf & 2) {
                i0__namespace.ɵɵproperty("ngIf", !ctx.isActive);
                i0__namespace.ɵɵadvance(1);
                i0__namespace.ɵɵproperty("ngIf", ctx.isActive);
            }
        }, directives: [i1__namespace.NgIf, i1__namespace.NgTemplateOutlet, i1__namespace.NgClass], styles: [""] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(BadgeComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'utils-badge',
                        templateUrl: './badge.component.html',
                        styleUrls: ['./badge.component.css']
                    }]
            }], function () { return []; }, { isActive: [{
                    type: i0.Input
                }], activeCaption: [{
                    type: i0.Input
                }], inactiveCaption: [{
                    type: i0.Input
                }], kind: [{
                    type: i0.Input
                }], activeControlTemplate: [{
                    type: i0.Input
                }], inactiveControlTemplate: [{
                    type: i0.Input
                }], onAdd: [{
                    type: i0.Output
                }], onRemove: [{
                    type: i0.Output
                }] });
    })();

    function PagerComponent_div_0_li_9_Template(rf, ctx) {
        if (rf & 1) {
            var _r4_1 = i0__namespace.ɵɵgetCurrentView();
            i0__namespace.ɵɵelementStart(0, "li", 2);
            i0__namespace.ɵɵelementStart(1, "a", 3);
            i0__namespace.ɵɵlistener("click", function PagerComponent_div_0_li_9_Template_a_click_1_listener() { var restoredCtx = i0__namespace.ɵɵrestoreView(_r4_1); var page_r2 = restoredCtx.$implicit; var ctx_r3 = i0__namespace.ɵɵnextContext(2); return ctx_r3.selectItem(page_r2); });
            i0__namespace.ɵɵtext(2);
            i0__namespace.ɵɵelementEnd();
            i0__namespace.ɵɵelementEnd();
        }
        if (rf & 2) {
            var page_r2 = ctx.$implicit;
            var ctx_r1 = i0__namespace.ɵɵnextContext(2);
            i0__namespace.ɵɵclassProp("active", (ctx_r1.currentPage == null ? null : ctx_r1.currentPage.number) === page_r2 - 1);
            i0__namespace.ɵɵadvance(2);
            i0__namespace.ɵɵtextInterpolate(page_r2);
        }
    }
    function PagerComponent_div_0_Template(rf, ctx) {
        if (rf & 1) {
            var _r6_1 = i0__namespace.ɵɵgetCurrentView();
            i0__namespace.ɵɵelementStart(0, "div");
            i0__namespace.ɵɵelementStart(1, "nav");
            i0__namespace.ɵɵelementStart(2, "ul", 1);
            i0__namespace.ɵɵelementStart(3, "li", 2);
            i0__namespace.ɵɵelementStart(4, "a", 3);
            i0__namespace.ɵɵlistener("click", function PagerComponent_div_0_Template_a_click_4_listener() { i0__namespace.ɵɵrestoreView(_r6_1); var ctx_r5 = i0__namespace.ɵɵnextContext(); return ctx_r5.selectItem(ctx_r5.previousPage); });
            i0__namespace.ɵɵelementStart(5, "span", 4);
            i0__namespace.ɵɵtext(6, "\u00AB");
            i0__namespace.ɵɵelementEnd();
            i0__namespace.ɵɵelementStart(7, "span", 5);
            i0__namespace.ɵɵtext(8, "Previous");
            i0__namespace.ɵɵelementEnd();
            i0__namespace.ɵɵelementEnd();
            i0__namespace.ɵɵelementEnd();
            i0__namespace.ɵɵtemplate(9, PagerComponent_div_0_li_9_Template, 3, 3, "li", 6);
            i0__namespace.ɵɵelementStart(10, "li", 2);
            i0__namespace.ɵɵelementStart(11, "a", 3);
            i0__namespace.ɵɵlistener("click", function PagerComponent_div_0_Template_a_click_11_listener() { i0__namespace.ɵɵrestoreView(_r6_1); var ctx_r7 = i0__namespace.ɵɵnextContext(); return ctx_r7.selectItem(ctx_r7.nextPage); });
            i0__namespace.ɵɵelementStart(12, "span", 4);
            i0__namespace.ɵɵtext(13, "\u00BB");
            i0__namespace.ɵɵelementEnd();
            i0__namespace.ɵɵelementStart(14, "span", 5);
            i0__namespace.ɵɵtext(15, "Next");
            i0__namespace.ɵɵelementEnd();
            i0__namespace.ɵɵelementEnd();
            i0__namespace.ɵɵelementEnd();
            i0__namespace.ɵɵelementEnd();
            i0__namespace.ɵɵelementEnd();
            i0__namespace.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0__namespace.ɵɵnextContext();
            i0__namespace.ɵɵadvance(3);
            i0__namespace.ɵɵclassProp("disabled", ctx_r0.previousPage == -1);
            i0__namespace.ɵɵadvance(6);
            i0__namespace.ɵɵproperty("ngForOf", ctx_r0.pageList);
            i0__namespace.ɵɵadvance(1);
            i0__namespace.ɵɵclassProp("disabled", ctx_r0.previousPage == -1);
        }
    }
    var PagerComponent = /** @class */ (function () {
        function PagerComponent() {
            this.prevNextLinks = true;
            this.maxPageLinks = 10;
            this.onSelectPage = new i0.EventEmitter();
            this.pageList = [];
        }
        Object.defineProperty(PagerComponent.prototype, "page", {
            get: function () {
                return this.currentPage;
            },
            set: function (value) {
                this.currentPage = value;
                this.pageList = [];
                if (this.currentPage)
                    this.pageList = Array.from({ length: this.numberOfPages }, function (v, k) { return k + 1; });
                //console.info("Current page " + this.currentPage);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PagerComponent.prototype, "numberOfPages", {
            get: function () {
                return this.currentPage ? this.currentPage.totalPages : 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PagerComponent.prototype, "previousPage", {
            get: function () {
                if (!this.prevNextLinks || !this.currentPage || this.currentPage.number == 0)
                    return -1;
                return (this.currentPage.number - 1);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PagerComponent.prototype, "nextPage", {
            get: function () {
                if (!this.prevNextLinks || !this.currentPage || this.currentPage.number >= this.currentPage.totalPages)
                    return -1;
                return (this.currentPage.number + 1);
            },
            enumerable: false,
            configurable: true
        });
        PagerComponent.prototype.ngOnInit = function () {
        };
        PagerComponent.prototype.selectItem = function (page) {
            this.onSelectPage.emit(page);
        };
        return PagerComponent;
    }());
    PagerComponent.ɵfac = function PagerComponent_Factory(t) { return new (t || PagerComponent)(); };
    PagerComponent.ɵcmp = /*@__PURE__*/ i0__namespace.ɵɵdefineComponent({ type: PagerComponent, selectors: [["utils-pager"]], inputs: { prevNextLinks: "prevNextLinks", maxPageLinks: "maxPageLinks", page: "page" }, outputs: { onSelectPage: "onSelectPage" }, decls: 1, vars: 1, consts: [[4, "ngIf"], [1, "pagination", "flex-wrap"], [1, "page-item"], [1, "page-link", 3, "click"], ["aria-hidden", "true"], [1, "sr-only"], ["class", "page-item", 3, "active", 4, "ngFor", "ngForOf"]], template: function PagerComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0__namespace.ɵɵtemplate(0, PagerComponent_div_0_Template, 16, 5, "div", 0);
            }
            if (rf & 2) {
                i0__namespace.ɵɵproperty("ngIf", ctx.numberOfPages);
            }
        }, directives: [i1__namespace.NgIf, i1__namespace.NgForOf], styles: [""] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(PagerComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'utils-pager',
                        templateUrl: './pager.component.html',
                        styleUrls: ['./pager.component.scss']
                    }]
            }], null, { prevNextLinks: [{
                    type: i0.Input
                }], maxPageLinks: [{
                    type: i0.Input
                }], onSelectPage: [{
                    type: i0.Output
                }], page: [{
                    type: i0.Input
                }] });
    })();

    var _c0$1 = ["searchBox"];
    var SearchBoxComponent = /** @class */ (function () {
        function SearchBoxComponent() {
            this.debounceTime = 500;
            this.onApplyFilter = new i0.EventEmitter();
            this.filter$ = new rxjs.Subject();
        }
        SearchBoxComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.subscription = this.filter$.pipe(operators.debounceTime(this.debounceTime), operators.distinctUntilChanged()).subscribe(function (filterValue) {
                _this.onApplyFilter.emit(filterValue);
            });
        };
        SearchBoxComponent.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
        };
        SearchBoxComponent.prototype.doSearch = function () {
            var value = this.searchBox.nativeElement.value;
            this.filter$.next(value);
        };
        return SearchBoxComponent;
    }());
    SearchBoxComponent.ɵfac = function SearchBoxComponent_Factory(t) { return new (t || SearchBoxComponent)(); };
    SearchBoxComponent.ɵcmp = /*@__PURE__*/ i0__namespace.ɵɵdefineComponent({ type: SearchBoxComponent, selectors: [["utils-search-box"]], viewQuery: function SearchBoxComponent_Query(rf, ctx) {
            if (rf & 1) {
                i0__namespace.ɵɵviewQuery(_c0$1, 5);
            }
            if (rf & 2) {
                var _t = void 0;
                i0__namespace.ɵɵqueryRefresh(_t = i0__namespace.ɵɵloadQuery()) && (ctx.searchBox = _t.first);
            }
        }, inputs: { debounceTime: "debounceTime" }, outputs: { onApplyFilter: "onApplyFilter" }, decls: 5, vars: 0, consts: [[1, "input-group", "rounded", "py-2"], ["type", "search", "placeholder", "Search", "aria-label", "Search", "aria-describedby", "search-addon", 1, "form-control", "rounded", 3, "input"], ["searchBox", ""], ["id", "search-addon", 1, "input-group-text", "border-0", 3, "click"], [1, "fas", "fa-search"]], template: function SearchBoxComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0__namespace.ɵɵelementStart(0, "div", 0);
                i0__namespace.ɵɵelementStart(1, "input", 1, 2);
                i0__namespace.ɵɵlistener("input", function SearchBoxComponent_Template_input_input_1_listener() { return ctx.doSearch(); });
                i0__namespace.ɵɵelementEnd();
                i0__namespace.ɵɵelementStart(3, "span", 3);
                i0__namespace.ɵɵlistener("click", function SearchBoxComponent_Template_span_click_3_listener() { return ctx.doSearch(); });
                i0__namespace.ɵɵelement(4, "i", 4);
                i0__namespace.ɵɵelementEnd();
                i0__namespace.ɵɵelementEnd();
            }
        }, styles: [""] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(SearchBoxComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'utils-search-box',
                        templateUrl: './search-box.component.html',
                        styleUrls: ['./search-box.component.css']
                    }]
            }], function () { return []; }, { searchBox: [{
                    type: i0.ViewChild,
                    args: ['searchBox']
                }], debounceTime: [{
                    type: i0.Input
                }], onApplyFilter: [{
                    type: i0.Output
                }] });
    })();

    function LoaderComponent_ng_template_1_Template(rf, ctx) {
        if (rf & 1) {
            i0__namespace.ɵɵelementStart(0, "div", 2);
            i0__namespace.ɵɵelementStart(1, "strong");
            i0__namespace.ɵɵtext(2, "Loading...");
            i0__namespace.ɵɵelementEnd();
            i0__namespace.ɵɵelement(3, "div", 3);
            i0__namespace.ɵɵelementEnd();
        }
    }
    var _c0 = function (a0) { return { $implicit: a0 }; };
    var LoaderComponent = /** @class */ (function () {
        function LoaderComponent() {
        }
        LoaderComponent.prototype.ngOnInit = function () {
        };
        return LoaderComponent;
    }());
    LoaderComponent.ɵfac = function LoaderComponent_Factory(t) { return new (t || LoaderComponent)(); };
    LoaderComponent.ɵcmp = /*@__PURE__*/ i0__namespace.ɵɵdefineComponent({ type: LoaderComponent, selectors: [["utils-loader"]], inputs: { controlTemplate: "controlTemplate" }, decls: 3, vars: 4, consts: [[3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["defaultTemplate", ""], [1, "d-flex", "align-items-center"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "ml-auto"]], template: function LoaderComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0__namespace.ɵɵelementContainer(0, 0);
                i0__namespace.ɵɵtemplate(1, LoaderComponent_ng_template_1_Template, 4, 0, "ng-template", null, 1, i0__namespace.ɵɵtemplateRefExtractor);
            }
            if (rf & 2) {
                var _r0 = i0__namespace.ɵɵreference(2);
                i0__namespace.ɵɵproperty("ngTemplateOutlet", ctx.controlTemplate || _r0)("ngTemplateOutletContext", i0__namespace.ɵɵpureFunction1(2, _c0, ctx));
            }
        }, directives: [i1__namespace.NgTemplateOutlet], styles: [""] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(LoaderComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'utils-loader',
                        templateUrl: './loader.component.html',
                        styleUrls: ['./loader.component.css']
                    }]
            }], function () { return []; }, { controlTemplate: [{
                    type: i0.Input
                }] });
    })();

    /*
     * Public API Surface of utils
     */

    var ConfigService = /** @class */ (function () {
        function ConfigService(httpClient) {
            this.httpClient = httpClient;
            this.uriPrefix = 'assets/data/config/';
            this.uriSuffix = '.json';
        }
        ConfigService.prototype.get = function (filename) {
            return this.httpClient.get(this.uriPrefix + filename + this.uriSuffix).toPromise();
        };
        return ConfigService;
    }());
    ConfigService.ɵfac = function ConfigService_Factory(t) { return new (t || ConfigService)(i0__namespace.ɵɵinject(i1__namespace$1.HttpClient)); };
    ConfigService.ɵprov = /*@__PURE__*/ i0__namespace.ɵɵdefineInjectable({ token: ConfigService, factory: ConfigService.ɵfac, providedIn: 'root' });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(ConfigService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], function () { return [{ type: i1__namespace$1.HttpClient }]; }, null);
    })();

    /*
     * Public API Surface of utils
     */

    var PrettyDatePipe = /** @class */ (function () {
        function PrettyDatePipe() {
        }
        PrettyDatePipe.prototype.transform = function (value) {
            return moment__namespace(value).calendar();
        };
        return PrettyDatePipe;
    }());
    PrettyDatePipe.ɵfac = function PrettyDatePipe_Factory(t) { return new (t || PrettyDatePipe)(); };
    PrettyDatePipe.ɵpipe = /*@__PURE__*/ i0__namespace.ɵɵdefinePipe({ name: "prettyDate", type: PrettyDatePipe, pure: true });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(PrettyDatePipe, [{
                type: i0.Pipe,
                args: [{
                        name: 'prettyDate'
                    }]
            }], null, null);
    })();

    /*
     * Public API Surface of utils
     */

    var UtilsModule = /** @class */ (function () {
        function UtilsModule() {
        }
        return UtilsModule;
    }());
    UtilsModule.ɵfac = function UtilsModule_Factory(t) { return new (t || UtilsModule)(); };
    UtilsModule.ɵmod = /*@__PURE__*/ i0__namespace.ɵɵdefineNgModule({ type: UtilsModule });
    UtilsModule.ɵinj = /*@__PURE__*/ i0__namespace.ɵɵdefineInjector({ imports: [[
                i1.CommonModule
            ]] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(UtilsModule, [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            PrettyDatePipe,
                            PagerComponent,
                            AlertComponent,
                            SearchBoxComponent,
                            LoaderComponent,
                            BadgeComponent
                        ],
                        imports: [
                            i1.CommonModule
                        ],
                        exports: [
                            PrettyDatePipe,
                            PagerComponent,
                            AlertComponent,
                            SearchBoxComponent,
                            LoaderComponent,
                            BadgeComponent
                        ]
                    }]
            }], null, null);
    })();
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0__namespace.ɵɵsetNgModuleScope(UtilsModule, { declarations: [PrettyDatePipe,
                PagerComponent,
                AlertComponent,
                SearchBoxComponent,
                LoaderComponent,
                BadgeComponent], imports: [i1.CommonModule], exports: [PrettyDatePipe,
                PagerComponent,
                AlertComponent,
                SearchBoxComponent,
                LoaderComponent,
                BadgeComponent] });
    })();

    /*
     * Public API Surface of utils
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AlertComponent = AlertComponent;
    exports.BadgeComponent = BadgeComponent;
    exports.ConfigService = ConfigService;
    exports.LoaderComponent = LoaderComponent;
    exports.PagerComponent = PagerComponent;
    exports.PrettyDatePipe = PrettyDatePipe;
    exports.SearchBoxComponent = SearchBoxComponent;
    exports.UtilsModule = UtilsModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=utils.umd.js.map
