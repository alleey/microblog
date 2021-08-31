import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
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
export class PagerComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdXRpbHMvc3JjL2xpYi9jb21wb25lbnRzL3BhZ2VyL3BhZ2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3V0aWxzL3NyYy9saWIvY29tcG9uZW50cy9wYWdlci9wYWdlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztJQ1NuRSw2QkFBc0c7SUFDbEcsNEJBQWdEO0lBQTNCLHFQQUEwQjtJQUFDLFlBQVE7SUFBQSxpQkFBSTtJQUNoRSxpQkFBSzs7OztJQUYrQyx5R0FBaUQ7SUFDakQsZUFBUTtJQUFSLDZCQUFROzs7O0lBVnhFLDJCQUEyQjtJQUN2QiwyQkFBSztJQUNELDZCQUFpQztJQUM3Qiw2QkFBNEQ7SUFDeEQsNEJBQXdEO0lBQW5DLGdNQUFrQztJQUNuRCwrQkFBeUI7SUFBQSxzQkFBTztJQUFBLGlCQUFPO0lBQ3ZDLCtCQUFzQjtJQUFBLHdCQUFRO0lBQUEsaUJBQU87SUFDekMsaUJBQUk7SUFDUixpQkFBSztJQUNMLG1FQUVLO0lBQ0wsOEJBQTREO0lBQ3hELDZCQUFvRDtJQUEvQiw2TEFBOEI7SUFDL0MsZ0NBQXlCO0lBQUEsdUJBQU87SUFBQSxpQkFBTztJQUN2QyxnQ0FBc0I7SUFBQSxxQkFBSTtJQUFBLGlCQUFPO0lBQ3JDLGlCQUFJO0lBQ1IsaUJBQUs7SUFDVCxpQkFBSztJQUNULGlCQUFNO0lBQ1YsaUJBQU07OztJQWpCVSxlQUFxQztJQUFyQyxxREFBcUM7SUFNRixlQUFXO0lBQVgseUNBQVc7SUFHOUMsZUFBcUM7SUFBckMscURBQXFDOztBREpyRCxNQUFNLE9BQU8sY0FBYztJQUwzQjtRQVFFLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBRzlCLGlCQUFZLEdBQVcsRUFBRSxDQUFDO1FBRzFCLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUUxQyxhQUFRLEdBQWtCLEVBQUUsQ0FBQztLQXdDOUI7SUFyQ0MsSUFDSSxJQUFJLENBQUMsS0FBNEI7UUFDbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBRyxJQUFJLENBQUMsV0FBVztZQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUEsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLG1EQUFtRDtJQUNyRCxDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ0osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7SUFHRCxJQUFJLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELElBQUksWUFBWTtRQUNkLElBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQ3pFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDWixPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLElBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVU7WUFDbkcsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNaLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsUUFBUTtJQUNSLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBWTtRQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDOzs0RUFqRFUsY0FBYztpRUFBZCxjQUFjO1FDUjNCLGdFQW9CTTs7UUFwQkEsd0NBQW1COzt1RkRRWixjQUFjO2NBTDFCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsV0FBVyxFQUFFLHdCQUF3QjtnQkFDckMsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7YUFDdEM7Z0JBSUMsYUFBYTtrQkFEWixLQUFLO1lBSU4sWUFBWTtrQkFEWCxLQUFLO1lBSU4sWUFBWTtrQkFEWCxNQUFNO1lBT0gsSUFBSTtrQkFEUCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnZWFibGUsIFBhZ2VNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9wYWdlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXRpbHMtcGFnZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vcGFnZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9wYWdlci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKVxuICBwcmV2TmV4dExpbmtzOiBib29sZWFuID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBtYXhQYWdlTGlua3M6IG51bWJlciA9IDEwO1xuXG4gIEBPdXRwdXQoKSBcbiAgb25TZWxlY3RQYWdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgcGFnZUxpc3Q6IEFycmF5PG51bWJlcj4gPSBbXTtcbiAgY3VycmVudFBhZ2U6IFBhZ2VNb2RlbCB8IHVuZGVmaW5lZDtcblxuICBASW5wdXQoKSBcbiAgc2V0IHBhZ2UodmFsdWU6IFBhZ2VNb2RlbCB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuY3VycmVudFBhZ2UgPSB2YWx1ZTtcbiAgICB0aGlzLnBhZ2VMaXN0ID0gW107XG4gICAgaWYodGhpcy5jdXJyZW50UGFnZSlcbiAgICAgIHRoaXMucGFnZUxpc3QgPSBBcnJheS5mcm9tKHtsZW5ndGg6IHRoaXMubnVtYmVyT2ZQYWdlc30sKHYsayk9PmsrMSk7XG4gICAgLy9jb25zb2xlLmluZm8oXCJDdXJyZW50IHBhZ2UgXCIgKyB0aGlzLmN1cnJlbnRQYWdlKTtcbiAgfVxuIFxuICBnZXQgcGFnZSgpOiBQYWdlTW9kZWwgfCB1bmRlZmluZWQge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFBhZ2U7XG4gIH1cblxuXG4gIGdldCBudW1iZXJPZlBhZ2VzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFBhZ2UgPyB0aGlzLmN1cnJlbnRQYWdlLnRvdGFsUGFnZXMgOiAwO1xuICB9XG5cbiAgZ2V0IHByZXZpb3VzUGFnZSgpOiBudW1iZXIge1xuICAgIGlmKCF0aGlzLnByZXZOZXh0TGlua3MgfHwgIXRoaXMuY3VycmVudFBhZ2UgfHwgdGhpcy5jdXJyZW50UGFnZS5udW1iZXIgPT0gMClcbiAgICAgIHJldHVybiAtMTtcbiAgICByZXR1cm4gKHRoaXMuY3VycmVudFBhZ2UubnVtYmVyIC0gMSk7XG4gIH1cblxuICBnZXQgbmV4dFBhZ2UoKTogbnVtYmVyIHtcbiAgICBpZighdGhpcy5wcmV2TmV4dExpbmtzIHx8ICF0aGlzLmN1cnJlbnRQYWdlIHx8IHRoaXMuY3VycmVudFBhZ2UubnVtYmVyID49IHRoaXMuY3VycmVudFBhZ2UudG90YWxQYWdlcylcbiAgICAgIHJldHVybiAtMTtcbiAgICByZXR1cm4gKHRoaXMuY3VycmVudFBhZ2UubnVtYmVyICsgMSk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgfVxuICBcbiAgc2VsZWN0SXRlbShwYWdlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLm9uU2VsZWN0UGFnZS5lbWl0KHBhZ2UpO1xuICB9XG5cbn1cbiIsIjxkaXYgKm5nSWY9XCJudW1iZXJPZlBhZ2VzXCI+XG4gICAgPG5hdj5cbiAgICAgICAgPHVsIGNsYXNzPVwicGFnaW5hdGlvbiBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgIDxsaSBbY2xhc3MuZGlzYWJsZWRdPVwicHJldmlvdXNQYWdlID09IC0xXCIgY2xhc3M9XCJwYWdlLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICA8YSBjbGFzcz1cInBhZ2UtbGlua1wiIChjbGljayk9XCJzZWxlY3RJdGVtKHByZXZpb3VzUGFnZSlcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JmxhcXVvOzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCI+UHJldmlvdXM8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaSBjbGFzcz1cInBhZ2UtaXRlbVwiICpuZ0Zvcj1cImxldCBwYWdlIG9mIHBhZ2VMaXN0XCIgW2NsYXNzLmFjdGl2ZV09XCJjdXJyZW50UGFnZT8ubnVtYmVyID09PSAocGFnZS0xKVwiPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwicGFnZS1saW5rXCIgKGNsaWNrKT1cInNlbGVjdEl0ZW0ocGFnZSlcIj57e3BhZ2V9fTwvYT5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGkgW2NsYXNzLmRpc2FibGVkXT1cInByZXZpb3VzUGFnZSA9PSAtMVwiIGNsYXNzPVwicGFnZS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJwYWdlLWxpbmtcIiAoY2xpY2spPVwic2VsZWN0SXRlbShuZXh0UGFnZSlcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnJhcXVvOzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCI+TmV4dDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICA8L3VsPlxuICAgIDwvbmF2PlxuPC9kaXY+Il19