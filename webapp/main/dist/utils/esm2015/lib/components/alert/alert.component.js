import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
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
const _c0 = function (a1) { return ["alert", a1]; };
function AlertComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtemplate(1, AlertComponent_ng_template_1_button_1_Template, 3, 0, "button", 3);
    i0.ɵɵtemplate(2, AlertComponent_ng_template_1_h4_2_Template, 2, 1, "h4", 4);
    i0.ɵɵprojection(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(3, _c0, "alert-" + item_r2.kind));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", item_r2.dismissable);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !item_r2.minimal);
} }
const _c1 = function (a0) { return { $implicit: a0 }; };
const _c2 = ["*"];
export class AlertComponent {
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
AlertComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AlertComponent, selectors: [["utils-alert"]], inputs: { minimal: "minimal", dismissable: "dismissable", title: "title", kind: "kind", controlTemplate: "controlTemplate" }, outputs: { onClosed: "onClosed" }, ngContentSelectors: _c2, decls: 3, vars: 4, consts: [[3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["defaultTemplate", ""], ["role", "alert", 3, "ngClass"], ["type", "button", "class", "close", "data-dismiss", "alert", "aria-label", "Close", 3, "click", 4, "ngIf"], ["class", "alert-heading", 4, "ngIf"], ["type", "button", "data-dismiss", "alert", "aria-label", "Close", 1, "close", 3, "click"], ["aria-hidden", "true"], [1, "alert-heading"]], template: function AlertComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵelementContainer(0, 0);
        i0.ɵɵtemplate(1, AlertComponent_ng_template_1_Template, 4, 5, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        const _r0 = i0.ɵɵreference(2);
        i0.ɵɵproperty("ngTemplateOutlet", ctx.controlTemplate || _r0)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c1, ctx));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdXRpbHMvc3JjL2xpYi9jb21wb25lbnRzL2FsZXJ0L2FsZXJ0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3V0aWxzL3NyYy9saWIvY29tcG9uZW50cy9hbGVydC9hbGVydC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFlLE1BQU0sZUFBZSxDQUFDOzs7OztJQ1FwRixpQ0FBa0k7SUFBdEQsdUxBQVMscUJBQWtCLElBQUM7SUFDcEcsK0JBQXlCO0lBQUEsc0JBQU87SUFBQSxpQkFBTztJQUMzQyxpQkFBUzs7O0lBQ1QsNkJBQWdEO0lBQUEsWUFBYztJQUFBLGlCQUFLOzs7SUFBbkIsZUFBYztJQUFkLG1DQUFjOzs7O0lBSmxFLDhCQUE4RDtJQUMxRCxtRkFFUztJQUNULDJFQUFtRTtJQUNuRSxrQkFBeUI7SUFDN0IsaUJBQU07OztJQU5ELDZFQUEyQztJQUM4RCxlQUFzQjtJQUF0QiwwQ0FBc0I7SUFHckcsZUFBbUI7SUFBbkIsdUNBQW1COzs7O0FESnRELE1BQU0sT0FBTyxjQUFjO0lBVXpCO1FBUlMsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixVQUFLLEdBQVcsT0FBTyxDQUFDO1FBQ3hCLFNBQUksR0FBVyxRQUFRLENBQUM7UUFHdkIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFFaEMsQ0FBQztJQUVqQixRQUFRLEtBQVcsQ0FBQztJQUVwQixXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs0RUFoQlUsY0FBYztpRUFBZCxjQUFjOztRQ04zQiwyQkFHZTtRQUVmLGdIQVFjOzs7UUFaViw2REFBdUQsNERBQUE7O3VGREs5QyxjQUFjO2NBTDFCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsV0FBVyxFQUFFLHdCQUF3QjtnQkFDckMsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7YUFDdEM7c0NBR1UsT0FBTztrQkFBZixLQUFLO1lBQ0csV0FBVztrQkFBbkIsS0FBSztZQUNHLEtBQUs7a0JBQWIsS0FBSztZQUNHLElBQUk7a0JBQVosS0FBSztZQUNHLGVBQWU7a0JBQXZCLEtBQUs7WUFFSSxRQUFRO2tCQUFqQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXRpbHMtYWxlcnQnLFxuICB0ZW1wbGF0ZVVybDogJy4vYWxlcnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9hbGVydC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEFsZXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBtaW5pbWFsOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRpc21pc3NhYmxlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmcgPSBcIk9vcHMhXCI7XG4gIEBJbnB1dCgpIGtpbmQ6IHN0cmluZyA9IFwiZGFuZ2VyXCI7XG4gIEBJbnB1dCgpIGNvbnRyb2xUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICBAT3V0cHV0KCkgb25DbG9zZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQgeyB9XG5cbiAgZmlyZU9uQ2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5vbkNsb3NlZC5lbWl0KCk7XG4gIH1cbn1cbiIsIlxuPG5nLWNvbnRhaW5lciBcbiAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250cm9sVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IHRoaXMgfVwiPlxuPC9uZy1jb250YWluZXI+XG5cbjxuZy10ZW1wbGF0ZSAjZGVmYXVsdFRlbXBsYXRlIGxldC1pdGVtPlxuICAgIDxkaXYgW25nQ2xhc3NdPVwiWydhbGVydCcsICdhbGVydC0nICsgaXRlbS5raW5kXVwiIHJvbGU9XCJhbGVydFwiPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIiAoY2xpY2spPVwiaXRlbS5maXJlT25DbG9zZSgpXCIgKm5nSWY9XCJpdGVtLmRpc21pc3NhYmxlXCI+XG4gICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGg0IGNsYXNzPVwiYWxlcnQtaGVhZGluZ1wiICpuZ0lmPVwiIWl0ZW0ubWluaW1hbFwiPnt7aXRlbS50aXRsZX19PC9oND5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==