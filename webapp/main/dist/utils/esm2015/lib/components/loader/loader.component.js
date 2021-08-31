import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function LoaderComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2, "Loading...");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "div", 3);
    i0.ɵɵelementEnd();
} }
const _c0 = function (a0) { return { $implicit: a0 }; };
export class LoaderComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3V0aWxzL3NyYy9saWIvY29tcG9uZW50cy9sb2FkZXIvbG9hZGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3V0aWxzL3NyYy9saWIvY29tcG9uZW50cy9sb2FkZXIvbG9hZGVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUF1QixNQUFNLGVBQWUsQ0FBQzs7OztJQ09sRSw4QkFBdUM7SUFDbkMsOEJBQVE7SUFBQSwwQkFBVTtJQUFBLGlCQUFTO0lBQzNCLHlCQUEyRTtJQUMvRSxpQkFBTTs7O0FESFYsTUFBTSxPQUFPLGVBQWU7SUFJMUIsZ0JBQWdCLENBQUM7SUFFakIsUUFBUTtJQUNSLENBQUM7OzhFQVBVLGVBQWU7a0VBQWYsZUFBZTtRQ041QiwyQkFHZTtRQUVmLGlIQUtjOzs7UUFUViw2REFBdUQsNERBQUE7O3VGREs5QyxlQUFlO2NBTDNCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsV0FBVyxFQUFFLHlCQUF5QjtnQkFDdEMsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7YUFDdEM7c0NBR1UsZUFBZTtrQkFBdkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXRpbHMtbG9hZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2xvYWRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2xvYWRlci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTG9hZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBjb250cm9sVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgfVxuXG59XG4iLCJcbjxuZy1jb250YWluZXIgXG4gICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udHJvbFRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXG4gICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiB0aGlzIH1cIj5cbjwvbmctY29udGFpbmVyPlxuXG48bmctdGVtcGxhdGUgI2RlZmF1bHRUZW1wbGF0ZSBsZXQtaXRlbT5cbiAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4IGFsaWduLWl0ZW1zLWNlbnRlclwiPlxuICAgICAgICA8c3Ryb25nPkxvYWRpbmcuLi48L3N0cm9uZz5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItYm9yZGVyIG1sLWF1dG9cIiByb2xlPVwic3RhdHVzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9kaXY+XG4gICAgPC9kaXY+XG48L25nLXRlbXBsYXRlPlxuIl19