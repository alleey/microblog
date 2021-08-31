import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output, ViewChild, Injectable, Pipe, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as i1$1 from '@angular/common/http';
import * as moment from 'moment';

var SortDirection;
(function (SortDirection) {
    SortDirection["Asc"] = "asc";
    SortDirection["Desc"] = "desc";
})(SortDirection || (SortDirection = {}));

/*
 * Public API Surface of utils
 */

function AlertComponent_ng_template_1_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 5);
    i0.ɵɵlistener("click", function AlertComponent_ng_template_1_button_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const item_r2 = i0.ɵɵnextContext().$implicit; return item_r2.fireOnClose(); });
    i0.ɵɵelementStart(1, "span", 6);
    i0.ɵɵtext(2, "\u00D7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AlertComponent_ng_template_1_h4_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h4", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r2.title);
} }
const _c0$3 = function (a1) { return ["alert", a1]; };
function AlertComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtemplate(1, AlertComponent_ng_template_1_button_1_Template, 3, 0, "button", 3);
    i0.ɵɵtemplate(2, AlertComponent_ng_template_1_h4_2_Template, 2, 1, "h4", 4);
    i0.ɵɵprojection(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(3, _c0$3, "alert-" + item_r2.kind));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", item_r2.dismissable);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !item_r2.minimal);
} }
const _c1$1 = function (a0) { return { $implicit: a0 }; };
const _c2$1 = ["*"];
class AlertComponent {
    constructor() {
        this.minimal = false;
        this.dismissable = false;
        this.title = "Oops!";
        this.kind = "danger";
        this.onClosed = new EventEmitter();
    }
    ngOnInit() { }
    fireOnClose() {
        this.onClosed.emit();
    }
}
AlertComponent.ɵfac = function AlertComponent_Factory(t) { return new (t || AlertComponent)(); };
AlertComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AlertComponent, selectors: [["utils-alert"]], inputs: { minimal: "minimal", dismissable: "dismissable", title: "title", kind: "kind", controlTemplate: "controlTemplate" }, outputs: { onClosed: "onClosed" }, ngContentSelectors: _c2$1, decls: 3, vars: 4, consts: [[3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["defaultTemplate", ""], ["role", "alert", 3, "ngClass"], ["type", "button", "class", "close", "data-dismiss", "alert", "aria-label", "Close", 3, "click", 4, "ngIf"], ["class", "alert-heading", 4, "ngIf"], ["type", "button", "data-dismiss", "alert", "aria-label", "Close", 1, "close", 3, "click"], ["aria-hidden", "true"], [1, "alert-heading"]], template: function AlertComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵelementContainer(0, 0);
        i0.ɵɵtemplate(1, AlertComponent_ng_template_1_Template, 4, 5, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        const _r0 = i0.ɵɵreference(2);
        i0.ɵɵproperty("ngTemplateOutlet", ctx.controlTemplate || _r0)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c1$1, ctx));
    } }, directives: [i1.NgTemplateOutlet, i1.NgClass, i1.NgIf], styles: [""] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AlertComponent, [{
        type: Component,
        args: [{
                selector: 'utils-alert',
                templateUrl: './alert.component.html',
                styleUrls: ['./alert.component.scss']
            }]
    }], function () { return []; }, { minimal: [{
            type: Input
        }], dismissable: [{
            type: Input
        }], title: [{
            type: Input
        }], kind: [{
            type: Input
        }], controlTemplate: [{
            type: Input
        }], onClosed: [{
            type: Output
        }] }); })();

const _c0$2 = function (a0) { return { $implicit: a0 }; };
function BadgeComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0, 3);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    const _r4 = i0.ɵɵreference(5);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r0.inactiveControlTemplate || _r4)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c0$2, ctx_r0));
} }
function BadgeComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0, 3);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    const _r2 = i0.ɵɵreference(3);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r1.activeControlTemplate || _r2)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c0$2, ctx_r1));
} }
function BadgeComponent_ng_template_2_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "i", 8);
    i0.ɵɵelementEnd();
} }
const _c1 = function (a1) { return ["btn", a1]; };
function BadgeComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 4);
    i0.ɵɵlistener("click", function BadgeComponent_ng_template_2_Template_a_click_0_listener() { const item_r6 = ctx.$implicit; return item_r6.fireRemove(); });
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "span", 5, 6);
    i0.ɵɵprojection(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, BadgeComponent_ng_template_2_span_5_Template, 2, 0, "span", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const _r7 = i0.ɵɵreference(3);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(3, _c1, "btn-" + item_r6.kind));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r6.activeCaption, " ");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", !_r7.innerHTML.trim());
} }
function BadgeComponent_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 4);
    i0.ɵɵlistener("click", function BadgeComponent_ng_template_4_Template_a_click_0_listener() { const item_r10 = ctx.$implicit; return item_r10.fireAdd(); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r10 = ctx.$implicit;
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(2, _c1, "btn-outline-" + item_r10.kind));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r10.inactiveCaption || item_r10.activeCaption, " ");
} }
const _c2 = ["*"];
class BadgeComponent {
    constructor() {
        this.isActive = false;
        this.activeCaption = "";
        this.inactiveCaption = "";
        this.kind = "primary";
        this.onAdd = new EventEmitter();
        this.onRemove = new EventEmitter();
    }
    ngOnInit() { }
    fireAdd() {
        this.onAdd.emit();
    }
    fireRemove() {
        this.onRemove.emit();
    }
}
BadgeComponent.ɵfac = function BadgeComponent_Factory(t) { return new (t || BadgeComponent)(); };
BadgeComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BadgeComponent, selectors: [["utils-badge"]], inputs: { isActive: "isActive", activeCaption: "activeCaption", inactiveCaption: "inactiveCaption", kind: "kind", activeControlTemplate: "activeControlTemplate", inactiveControlTemplate: "inactiveControlTemplate" }, outputs: { onAdd: "onAdd", onRemove: "onRemove" }, ngContentSelectors: _c2, decls: 6, vars: 2, consts: [[3, "ngTemplateOutlet", "ngTemplateOutletContext", 4, "ngIf"], ["defaultActiveControlTemplate", ""], ["defaultInactiveControlTemplate", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["type", "button", 3, "ngClass", "click"], [1, "badge", "badge-light"], ["ref", ""], [4, "ngIf"], [1, "fa", "fa-star"]], template: function BadgeComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵtemplate(0, BadgeComponent_ng_container_0_Template, 1, 4, "ng-container", 0);
        i0.ɵɵtemplate(1, BadgeComponent_ng_container_1_Template, 1, 4, "ng-container", 0);
        i0.ɵɵtemplate(2, BadgeComponent_ng_template_2_Template, 6, 5, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(4, BadgeComponent_ng_template_4_Template, 2, 4, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !ctx.isActive);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isActive);
    } }, directives: [i1.NgIf, i1.NgTemplateOutlet, i1.NgClass], styles: [""] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BadgeComponent, [{
        type: Component,
        args: [{
                selector: 'utils-badge',
                templateUrl: './badge.component.html',
                styleUrls: ['./badge.component.css']
            }]
    }], function () { return []; }, { isActive: [{
            type: Input
        }], activeCaption: [{
            type: Input
        }], inactiveCaption: [{
            type: Input
        }], kind: [{
            type: Input
        }], activeControlTemplate: [{
            type: Input
        }], inactiveControlTemplate: [{
            type: Input
        }], onAdd: [{
            type: Output
        }], onRemove: [{
            type: Output
        }] }); })();

function PagerComponent_div_0_li_9_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 2);
    i0.ɵɵelementStart(1, "a", 3);
    i0.ɵɵlistener("click", function PagerComponent_div_0_li_9_Template_a_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r4); const page_r2 = restoredCtx.$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return ctx_r3.selectItem(page_r2); });
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const page_r2 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", (ctx_r1.currentPage == null ? null : ctx_r1.currentPage.number) === page_r2 - 1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(page_r2);
} }
function PagerComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "nav");
    i0.ɵɵelementStart(2, "ul", 1);
    i0.ɵɵelementStart(3, "li", 2);
    i0.ɵɵelementStart(4, "a", 3);
    i0.ɵɵlistener("click", function PagerComponent_div_0_Template_a_click_4_listener() { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.selectItem(ctx_r5.previousPage); });
    i0.ɵɵelementStart(5, "span", 4);
    i0.ɵɵtext(6, "\u00AB");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 5);
    i0.ɵɵtext(8, "Previous");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, PagerComponent_div_0_li_9_Template, 3, 3, "li", 6);
    i0.ɵɵelementStart(10, "li", 2);
    i0.ɵɵelementStart(11, "a", 3);
    i0.ɵɵlistener("click", function PagerComponent_div_0_Template_a_click_11_listener() { i0.ɵɵrestoreView(_r6); const ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.selectItem(ctx_r7.nextPage); });
    i0.ɵɵelementStart(12, "span", 4);
    i0.ɵɵtext(13, "\u00BB");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span", 5);
    i0.ɵɵtext(15, "Next");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("disabled", ctx_r0.previousPage == -1);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngForOf", ctx_r0.pageList);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("disabled", ctx_r0.previousPage == -1);
} }
class PagerComponent {
    constructor() {
        this.prevNextLinks = true;
        this.maxPageLinks = 10;
        this.onSelectPage = new EventEmitter();
        this.pageList = [];
    }
    set page(value) {
        this.currentPage = value;
        this.pageList = [];
        if (this.currentPage)
            this.pageList = Array.from({ length: this.numberOfPages }, (v, k) => k + 1);
        //console.info("Current page " + this.currentPage);
    }
    get page() {
        return this.currentPage;
    }
    get numberOfPages() {
        return this.currentPage ? this.currentPage.totalPages : 0;
    }
    get previousPage() {
        if (!this.prevNextLinks || !this.currentPage || this.currentPage.number == 0)
            return -1;
        return (this.currentPage.number - 1);
    }
    get nextPage() {
        if (!this.prevNextLinks || !this.currentPage || this.currentPage.number >= this.currentPage.totalPages)
            return -1;
        return (this.currentPage.number + 1);
    }
    ngOnInit() {
    }
    selectItem(page) {
        this.onSelectPage.emit(page);
    }
}
PagerComponent.ɵfac = function PagerComponent_Factory(t) { return new (t || PagerComponent)(); };
PagerComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PagerComponent, selectors: [["utils-pager"]], inputs: { prevNextLinks: "prevNextLinks", maxPageLinks: "maxPageLinks", page: "page" }, outputs: { onSelectPage: "onSelectPage" }, decls: 1, vars: 1, consts: [[4, "ngIf"], [1, "pagination", "flex-wrap"], [1, "page-item"], [1, "page-link", 3, "click"], ["aria-hidden", "true"], [1, "sr-only"], ["class", "page-item", 3, "active", 4, "ngFor", "ngForOf"]], template: function PagerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, PagerComponent_div_0_Template, 16, 5, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.numberOfPages);
    } }, directives: [i1.NgIf, i1.NgForOf], styles: [""] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PagerComponent, [{
        type: Component,
        args: [{
                selector: 'utils-pager',
                templateUrl: './pager.component.html',
                styleUrls: ['./pager.component.scss']
            }]
    }], null, { prevNextLinks: [{
            type: Input
        }], maxPageLinks: [{
            type: Input
        }], onSelectPage: [{
            type: Output
        }], page: [{
            type: Input
        }] }); })();

const _c0$1 = ["searchBox"];
class SearchBoxComponent {
    constructor() {
        this.debounceTime = 500;
        this.onApplyFilter = new EventEmitter();
        this.filter$ = new Subject();
    }
    ngOnInit() {
        this.subscription = this.filter$.pipe(debounceTime(this.debounceTime), distinctUntilChanged()).subscribe((filterValue) => {
            this.onApplyFilter.emit(filterValue);
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    doSearch() {
        const value = this.searchBox.nativeElement.value;
        this.filter$.next(value);
    }
}
SearchBoxComponent.ɵfac = function SearchBoxComponent_Factory(t) { return new (t || SearchBoxComponent)(); };
SearchBoxComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SearchBoxComponent, selectors: [["utils-search-box"]], viewQuery: function SearchBoxComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0$1, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.searchBox = _t.first);
    } }, inputs: { debounceTime: "debounceTime" }, outputs: { onApplyFilter: "onApplyFilter" }, decls: 5, vars: 0, consts: [[1, "input-group", "rounded", "py-2"], ["type", "search", "placeholder", "Search", "aria-label", "Search", "aria-describedby", "search-addon", 1, "form-control", "rounded", 3, "input"], ["searchBox", ""], ["id", "search-addon", 1, "input-group-text", "border-0", 3, "click"], [1, "fas", "fa-search"]], template: function SearchBoxComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "input", 1, 2);
        i0.ɵɵlistener("input", function SearchBoxComponent_Template_input_input_1_listener() { return ctx.doSearch(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(3, "span", 3);
        i0.ɵɵlistener("click", function SearchBoxComponent_Template_span_click_3_listener() { return ctx.doSearch(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } }, styles: [""] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SearchBoxComponent, [{
        type: Component,
        args: [{
                selector: 'utils-search-box',
                templateUrl: './search-box.component.html',
                styleUrls: ['./search-box.component.css']
            }]
    }], function () { return []; }, { searchBox: [{
            type: ViewChild,
            args: ['searchBox']
        }], debounceTime: [{
            type: Input
        }], onApplyFilter: [{
            type: Output
        }] }); })();

function LoaderComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2, "Loading...");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "div", 3);
    i0.ɵɵelementEnd();
} }
const _c0 = function (a0) { return { $implicit: a0 }; };
class LoaderComponent {
    constructor() { }
    ngOnInit() {
    }
}
LoaderComponent.ɵfac = function LoaderComponent_Factory(t) { return new (t || LoaderComponent)(); };
LoaderComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoaderComponent, selectors: [["utils-loader"]], inputs: { controlTemplate: "controlTemplate" }, decls: 3, vars: 4, consts: [[3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["defaultTemplate", ""], [1, "d-flex", "align-items-center"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "ml-auto"]], template: function LoaderComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementContainer(0, 0);
        i0.ɵɵtemplate(1, LoaderComponent_ng_template_1_Template, 4, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        const _r0 = i0.ɵɵreference(2);
        i0.ɵɵproperty("ngTemplateOutlet", ctx.controlTemplate || _r0)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c0, ctx));
    } }, directives: [i1.NgTemplateOutlet], styles: [""] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoaderComponent, [{
        type: Component,
        args: [{
                selector: 'utils-loader',
                templateUrl: './loader.component.html',
                styleUrls: ['./loader.component.css']
            }]
    }], function () { return []; }, { controlTemplate: [{
            type: Input
        }] }); })();

/*
 * Public API Surface of utils
 */

class ConfigService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.uriPrefix = 'assets/data/config/';
        this.uriSuffix = '.json';
    }
    get(filename) {
        return this.httpClient.get(this.uriPrefix + filename + this.uriSuffix).toPromise();
    }
}
ConfigService.ɵfac = function ConfigService_Factory(t) { return new (t || ConfigService)(i0.ɵɵinject(i1$1.HttpClient)); };
ConfigService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ConfigService, factory: ConfigService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ConfigService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1$1.HttpClient }]; }, null); })();

/*
 * Public API Surface of utils
 */

class PrettyDatePipe {
    transform(value) {
        return moment(value).calendar();
    }
}
PrettyDatePipe.ɵfac = function PrettyDatePipe_Factory(t) { return new (t || PrettyDatePipe)(); };
PrettyDatePipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "prettyDate", type: PrettyDatePipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PrettyDatePipe, [{
        type: Pipe,
        args: [{
                name: 'prettyDate'
            }]
    }], null, null); })();

/*
 * Public API Surface of utils
 */

class UtilsModule {
}
UtilsModule.ɵfac = function UtilsModule_Factory(t) { return new (t || UtilsModule)(); };
UtilsModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: UtilsModule });
UtilsModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[
            CommonModule
        ]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UtilsModule, [{
        type: NgModule,
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
                    CommonModule
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
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(UtilsModule, { declarations: [PrettyDatePipe,
        PagerComponent,
        AlertComponent,
        SearchBoxComponent,
        LoaderComponent,
        BadgeComponent], imports: [CommonModule], exports: [PrettyDatePipe,
        PagerComponent,
        AlertComponent,
        SearchBoxComponent,
        LoaderComponent,
        BadgeComponent] }); })();

/*
 * Public API Surface of utils
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AlertComponent, BadgeComponent, ConfigService, LoaderComponent, PagerComponent, PrettyDatePipe, SearchBoxComponent, SortDirection, UtilsModule };
//# sourceMappingURL=utils.js.map
