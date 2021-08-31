import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as i0 from "@angular/core";
const _c0 = ["searchBox"];
export class SearchBoxComponent {
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
        i0.ɵɵviewQuery(_c0, 5);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJveC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy91dGlscy9zcmMvbGliL2NvbXBvbmVudHMvc2VhcmNoLWJveC9zZWFyY2gtYm94LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3V0aWxzL3NyYy9saWIvY29tcG9uZW50cy9zZWFyY2gtYm94L3NlYXJjaC1ib3guY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYyxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pILE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBT3BFLE1BQU0sT0FBTyxrQkFBa0I7SUFlN0I7UUFUQSxpQkFBWSxHQUFXLEdBQUcsQ0FBQztRQUczQixrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFcEMsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7SUFJdkIsQ0FBQztJQUVqQixRQUFRO1FBQ04sSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDbkMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFDL0Isb0JBQW9CLEVBQUUsQ0FDdkIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFtQixFQUFFLEVBQUU7WUFDbEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVELFFBQVE7UUFDTixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUE7UUFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDMUIsQ0FBQzs7b0ZBakNVLGtCQUFrQjtxRUFBbEIsa0JBQWtCOzs7Ozs7UUNUL0IsOEJBQXNDO1FBQ2xDLG1DQUMwRDtRQUF0Qiw4RkFBUyxjQUFVLElBQUM7UUFEeEQsaUJBQzBEO1FBQzFELCtCQUErRTtRQUFyQiw2RkFBUyxjQUFVLElBQUM7UUFDMUUsdUJBQTZCO1FBQ2pDLGlCQUFPO1FBQ1gsaUJBQU07O3VGREdPLGtCQUFrQjtjQUw5QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsV0FBVyxFQUFFLDZCQUE2QjtnQkFDMUMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7YUFDMUM7c0NBSUMsU0FBUztrQkFEUixTQUFTO21CQUFDLFdBQVc7WUFJdEIsWUFBWTtrQkFEWCxLQUFLO1lBSU4sYUFBYTtrQkFEWixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXRpbHMtc2VhcmNoLWJveCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWFyY2gtYm94LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2VhcmNoLWJveC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoQm94Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBWaWV3Q2hpbGQoJ3NlYXJjaEJveCcpXG4gIHNlYXJjaEJveCE6IEVsZW1lbnRSZWY7XG5cbiAgQElucHV0KClcbiAgZGVib3VuY2VUaW1lOiBudW1iZXIgPSA1MDA7XG5cbiAgQE91dHB1dCgpIFxuICBvbkFwcGx5RmlsdGVyID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgcHVibGljIGZpbHRlciQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cbiAgc3Vic2NyaXB0aW9uITogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmZpbHRlciQucGlwZShcbiAgICAgIGRlYm91bmNlVGltZSh0aGlzLmRlYm91bmNlVGltZSksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgKS5zdWJzY3JpYmUoKGZpbHRlclZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgIHRoaXMub25BcHBseUZpbHRlci5lbWl0KGZpbHRlclZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBkb1NlYXJjaCgpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuc2VhcmNoQm94Lm5hdGl2ZUVsZW1lbnQudmFsdWVcbiAgICB0aGlzLmZpbHRlciQubmV4dCh2YWx1ZSlcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIHJvdW5kZWQgcHktMlwiPlxuICAgIDxpbnB1dCB0eXBlPVwic2VhcmNoXCIgI3NlYXJjaEJveCBjbGFzcz1cImZvcm0tY29udHJvbCByb3VuZGVkXCIgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIiBhcmlhLWxhYmVsPVwiU2VhcmNoXCJcbiAgICAgICAgYXJpYS1kZXNjcmliZWRieT1cInNlYXJjaC1hZGRvblwiIChpbnB1dCk9XCJkb1NlYXJjaCgpXCIvPlxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dCBib3JkZXItMFwiIGlkPVwic2VhcmNoLWFkZG9uXCIgKGNsaWNrKT1cImRvU2VhcmNoKClcIj5cbiAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtc2VhcmNoXCI+PC9pPlxuICAgIDwvc3Bhbj5cbjwvZGl2PlxuIl19