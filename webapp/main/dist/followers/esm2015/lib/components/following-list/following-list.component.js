import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../services/following.service";
import * as i2 from "@angular/router";
import * as i3 from "utils";
import * as i4 from "../following-list-view/following-list-view.component";
import * as i5 from "@angular/common";
export class FollowingListComponent {
    constructor(followersService, router, activatedRoute) {
        this.followersService = followersService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.enableSearch = false;
        this.filterText = '';
        this.onSelect = (item) => { };
        this.errorDesc = "";
        this.loading = false;
        this.subscription = new Subscription();
        this.responseHandler = {
            next: (result) => {
                this.response = result;
                this.loading = false;
            },
            error: (err) => {
                this.errorDesc = err.message;
                this.loading = false;
                console.log(this.errorDesc);
            }
        };
        this.response = null;
        this.pageable = {
            page: 0
        };
    }
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            var _a;
            const pageNum = (_a = params.pageNum) !== null && _a !== void 0 ? _a : 0;
            this.fetchPage(pageNum);
        });
        // Requery when the backend data changes
        this.subscription.add(this.followersService.onChange.subscribe({ next: () => this.fetchPage(this.pageable.page) }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    onApplyFilter(text) {
        this.filterText = text;
        this.fetchPage(0);
    }
    fetchPage(pageNum) {
        this.pageable.page = pageNum;
        if (!!this.filterText) {
            this.followersService.findFollowingMatching("", "", this.filterText, this.pageable).subscribe(this.responseHandler);
        }
        else {
            this.followersService.following("", "", this.pageable).subscribe(this.responseHandler);
        }
    }
    get items() {
        var _a, _b;
        return (_b = (_a = this.response) === null || _a === void 0 ? void 0 : _a._embedded) === null || _b === void 0 ? void 0 : _b.following;
    }
    get page() {
        var _a;
        return (_a = this.response) === null || _a === void 0 ? void 0 : _a.page;
    }
    get hasItems() {
        var _a;
        return !!((_a = this.page) === null || _a === void 0 ? void 0 : _a.totalElements);
    }
    handleListViewEvent(evt) {
        switch (evt.opcode) {
            case 'select':
                this.onSelect(evt.item);
                break;
        }
    }
    gotoPage(evt) {
        this.fetchPage(evt - 1);
    }
}
FollowingListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowingListComponent, deps: [{ token: i1.FollowingService }, { token: i2.Router }, { token: i2.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
FollowingListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: FollowingListComponent, selector: "following-list", inputs: { enableSearch: "enableSearch", filterText: "filterText", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate", headerTemplate: "headerTemplate", footerTemplate: "footerTemplate", onSelect: ["onSelectBookmark", "onSelect"] }, ngImport: i0, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #contents>\n    <utils-alert *ngIf=\"errorDesc;else itemsList\" [dismissable]=\"false\" [minimal]=\"true\">\n        <p>An error occurred fetching the bookmarks list: {{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #itemsList>\n\n    <ng-container\n        [ngTemplateOutlet]=\"headerTemplate || defaultHeaderTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n    <div class=\"py-1\">\n        <utils-search-box (onApplyFilter)=\"onApplyFilter\" *ngIf=\"enableSearch\"></utils-search-box>\n        <following-list-view \n            [items]=\"items\" \n            [itemTemplate]=\"itemTemplate\"\n            [noContentsTemplate]=\"noContentsTemplate\"\n            (onSelectItem)=\"handleListViewEvent($event)\">\n        </following-list-view>\n        <utils-pager [page]=\"page\" (onSelectPage)=\"gotoPage($event)\"></utils-pager>\n    </div>\n\n    <ng-container\n        [ngTemplateOutlet]=\"footerTemplate || defaultFooterTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n</ng-template>\n\n<ng-template #defaultHeaderTemplate>\n</ng-template>\n  \n<ng-template #defaultFooterTemplate>\n</ng-template>\n  ", styles: [""], components: [{ type: i3.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: i3.SearchBoxComponent, selector: "utils-search-box", inputs: ["debounceTime"], outputs: ["onApplyFilter"] }, { type: i4.FollowingListViewComponent, selector: "following-list-view", inputs: ["items", "itemTemplate", "noContentsTemplate"], outputs: ["onSelectItem"] }, { type: i3.PagerComponent, selector: "utils-pager", inputs: ["prevNextLinks", "maxPageLinks", "page"], outputs: ["onSelectPage"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowingListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'following-list',
                    templateUrl: './following-list.component.html',
                    styleUrls: ['./following-list.component.css']
                }]
        }], ctorParameters: function () { return [{ type: i1.FollowingService }, { type: i2.Router }, { type: i2.ActivatedRoute }]; }, propDecorators: { enableSearch: [{
                type: Input
            }], filterText: [{
                type: Input
            }], itemTemplate: [{
                type: Input
            }], noContentsTemplate: [{
                type: Input
            }], headerTemplate: [{
                type: Input
            }], footerTemplate: [{
                type: Input
            }], onSelect: [{
                type: Input,
                args: ['onSelectBookmark']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sbG93aW5nLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZm9sbG93ZXJzL3NyYy9saWIvY29tcG9uZW50cy9mb2xsb3dpbmctbGlzdC9mb2xsb3dpbmctbGlzdC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9mb2xsb3dlcnMvc3JjL2xpYi9jb21wb25lbnRzL2ZvbGxvd2luZy1saXN0L2ZvbGxvd2luZy1saXN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUV0RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7Ozs7O0FBV3BDLE1BQU0sT0FBTyxzQkFBc0I7SUFvQmpDLFlBQ1ksZ0JBQWtDLEVBQ2xDLE1BQWMsRUFDZCxjQUE4QjtRQUY5QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFyQmpDLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFRakMsYUFBUSxHQUNOLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFJZixjQUFTLEdBQVEsRUFBRSxDQUFDO1FBQ3BCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsaUJBQVksR0FBaUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQWlDaEQsb0JBQWUsR0FBRztZQUNoQixJQUFJLEVBQUUsQ0FBQyxNQUFrQyxFQUFFLEVBQUU7Z0JBQzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO2dCQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUN2QixDQUFDO1lBQ0QsS0FBSyxFQUFF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QVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFdBQVcsRUFBRSxpQ0FBaUM7b0JBQzlDLFNBQVMsRUFBRSxDQUFDLGdDQUFnQyxDQUFDO2lCQUM5Qzt5SkFHVSxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUcsWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUdOLFFBQVE7c0JBRFAsS0FBSzt1QkFBQyxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUGFnZWFibGUsIFBhZ2VNb2RlbCB9IGZyb20gJ3V0aWxzJztcbmltcG9ydCB7IEZvbGxvd2luZ0xpc3RSZXNwb25zZU1vZGVsLCBGb2xsb3dpbmdNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9mb2xsb3dpbmcnO1xuaW1wb3J0IHsgRm9sbG93aW5nU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2ZvbGxvd2luZy5zZXJ2aWNlJztcbmltcG9ydCB7IEZvbGxvd2luZ0xpc3RWaWV3RXZlbnQgfSBmcm9tICcuLi9mb2xsb3dpbmctbGlzdC12aWV3L2ZvbGxvd2luZy1saXN0LXZpZXcuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9sbG93aW5nLWxpc3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vZm9sbG93aW5nLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9mb2xsb3dpbmctbGlzdC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRm9sbG93aW5nTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgZW5hYmxlU2VhcmNoOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGZpbHRlclRleHQ6IHN0cmluZyA9ICcnO1xuXG4gIEBJbnB1dCgpIGl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgbm9Db250ZW50c1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgZm9vdGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgQElucHV0KCdvblNlbGVjdEJvb2ttYXJrJykgXG4gIG9uU2VsZWN0OiAodG9waWM6IEZvbGxvd2luZ01vZGVsKSA9PiB2b2lkID0gXG4gICAgKGl0ZW0pID0+IHt9O1xuICAgICAgICBcbiAgcGFnZWFibGU6IFBhZ2VhYmxlOyBcbiAgcmVzcG9uc2UgOiBGb2xsb3dpbmdMaXN0UmVzcG9uc2VNb2RlbHxudWxsO1xuICBlcnJvckRlc2M6IGFueSA9IFwiXCI7XG4gIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGZvbGxvd2Vyc1NlcnZpY2U6IEZvbGxvd2luZ1NlcnZpY2UsIFxuICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgXG4gICAgICBwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkgXG4gIHsgXG4gICAgdGhpcy5yZXNwb25zZSA9IG51bGw7XG4gICAgdGhpcy5wYWdlYWJsZSA9IHtcbiAgICAgIHBhZ2U6IDBcbiAgICB9O1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG4gICAgICBjb25zdCBwYWdlTnVtID0gcGFyYW1zLnBhZ2VOdW0gPz8gMDtcbiAgICAgIHRoaXMuZmV0Y2hQYWdlKHBhZ2VOdW0pO1xuICAgIH0pO1xuICAgIC8vIFJlcXVlcnkgd2hlbiB0aGUgYmFja2VuZCBkYXRhIGNoYW5nZXNcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXG4gICAgICB0aGlzLmZvbGxvd2Vyc1NlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKHsgbmV4dDogKCkgPT4gdGhpcy5mZXRjaFBhZ2UodGhpcy5wYWdlYWJsZS5wYWdlKSB9KVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgb25BcHBseUZpbHRlcih0ZXh0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmZpbHRlclRleHQgPSB0ZXh0O1xuICAgIHRoaXMuZmV0Y2hQYWdlKDApO1xuICB9XG5cbiAgcmVzcG9uc2VIYW5kbGVyID0ge1xuICAgIG5leHQ6IChyZXN1bHQ6IEZvbGxvd2luZ0xpc3RSZXNwb25zZU1vZGVsKSA9PiB7XG4gICAgICB0aGlzLnJlc3BvbnNlID0gcmVzdWx0O1xuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgfSxcbiAgICBlcnJvcjogKGVycjogYW55KSA9PiB7XG4gICAgICB0aGlzLmVycm9yRGVzYyA9IGVyci5tZXNzYWdlO1xuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmVycm9yRGVzYyk7XG4gICAgfVxuICB9XG5cbiAgZmV0Y2hQYWdlKHBhZ2VOdW06IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucGFnZWFibGUucGFnZSA9IHBhZ2VOdW07XG4gICAgaWYoISF0aGlzLmZpbHRlclRleHQpXG4gICAge1xuICAgICAgdGhpcy5mb2xsb3dlcnNTZXJ2aWNlLmZpbmRGb2xsb3dpbmdNYXRjaGluZyhcIlwiLCBcIlwiLCB0aGlzLmZpbHRlclRleHQsIHRoaXMucGFnZWFibGUpLnN1YnNjcmliZSh0aGlzLnJlc3BvbnNlSGFuZGxlcik7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICB0aGlzLmZvbGxvd2Vyc1NlcnZpY2UuZm9sbG93aW5nKFwiXCIsIFwiXCIsIHRoaXMucGFnZWFibGUpLnN1YnNjcmliZSh0aGlzLnJlc3BvbnNlSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGl0ZW1zKCk6IEZvbGxvd2luZ01vZGVsW10gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnJlc3BvbnNlPy5fZW1iZWRkZWQ/LmZvbGxvd2luZztcbiAgfVxuXG4gIGdldCBwYWdlKCk6IFBhZ2VNb2RlbHx1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnJlc3BvbnNlPy5wYWdlO1xuICB9XG5cbiAgZ2V0IGhhc0l0ZW1zKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhISh0aGlzLnBhZ2U/LnRvdGFsRWxlbWVudHMpO1xuICB9XG5cbiAgaGFuZGxlTGlzdFZpZXdFdmVudChldnQ6IEZvbGxvd2luZ0xpc3RWaWV3RXZlbnQpIHtcbiAgICBzd2l0Y2goZXZ0Lm9wY29kZSkge1xuICAgICAgY2FzZSAnc2VsZWN0JzogdGhpcy5vblNlbGVjdChldnQuaXRlbSk7IGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGdvdG9QYWdlKGV2dDphbnkpOiB2b2lkIHtcbiAgICB0aGlzLmZldGNoUGFnZShldnQtMSk7XG4gIH19XG4iLCI8ZGl2ICpuZ0lmPVwibG9hZGluZzsgZWxzZSBjb250ZW50c1wiPlxuICAgIDx1dGlscy1sb2FkZXI+PC91dGlscy1sb2FkZXI+XG48L2Rpdj5cblxuPG5nLXRlbXBsYXRlICNjb250ZW50cz5cbiAgICA8dXRpbHMtYWxlcnQgKm5nSWY9XCJlcnJvckRlc2M7ZWxzZSBpdGVtc0xpc3RcIiBbZGlzbWlzc2FibGVdPVwiZmFsc2VcIiBbbWluaW1hbF09XCJ0cnVlXCI+XG4gICAgICAgIDxwPkFuIGVycm9yIG9jY3VycmVkIGZldGNoaW5nIHRoZSBib29rbWFya3MgbGlzdDoge3sgZXJyb3JEZXNjIH19PC9wPlxuICAgIDwvdXRpbHMtYWxlcnQ+XG48L25nLXRlbXBsYXRlPlxuXG48bmctdGVtcGxhdGUgI2l0ZW1zTGlzdD5cblxuICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiaGVhZGVyVGVtcGxhdGUgfHwgZGVmYXVsdEhlYWRlclRlbXBsYXRlXCJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiB0aGlzIH1cIj5cbiAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgIDxkaXYgY2xhc3M9XCJweS0xXCI+XG4gICAgICAgIDx1dGlscy1zZWFyY2gtYm94IChvbkFwcGx5RmlsdGVyKT1cIm9uQXBwbHlGaWx0ZXJcIiAqbmdJZj1cImVuYWJsZVNlYXJjaFwiPjwvdXRpbHMtc2VhcmNoLWJveD5cbiAgICAgICAgPGZvbGxvd2luZy1saXN0LXZpZXcgXG4gICAgICAgICAgICBbaXRlbXNdPVwiaXRlbXNcIiBcbiAgICAgICAgICAgIFtpdGVtVGVtcGxhdGVdPVwiaXRlbVRlbXBsYXRlXCJcbiAgICAgICAgICAgIFtub0NvbnRlbnRzVGVtcGxhdGVdPVwibm9Db250ZW50c1RlbXBsYXRlXCJcbiAgICAgICAgICAgIChvblNlbGVjdEl0ZW0pPVwiaGFuZGxlTGlzdFZpZXdFdmVudCgkZXZlbnQpXCI+XG4gICAgICAgIDwvZm9sbG93aW5nLWxpc3Qtdmlldz5cbiAgICAgICAgPHV0aWxzLXBhZ2VyIFtwYWdlXT1cInBhZ2VcIiAob25TZWxlY3RQYWdlKT1cImdvdG9QYWdlKCRldmVudClcIj48L3V0aWxzLXBhZ2VyPlxuICAgIDwvZGl2PlxuXG4gICAgPG5nLWNvbnRhaW5lclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJmb290ZXJUZW1wbGF0ZSB8fCBkZWZhdWx0Rm9vdGVyVGVtcGxhdGVcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IHRoaXMgfVwiPlxuICAgIDwvbmctY29udGFpbmVyPlxuXG48L25nLXRlbXBsYXRlPlxuXG48bmctdGVtcGxhdGUgI2RlZmF1bHRIZWFkZXJUZW1wbGF0ZT5cbjwvbmctdGVtcGxhdGU+XG4gIFxuPG5nLXRlbXBsYXRlICNkZWZhdWx0Rm9vdGVyVGVtcGxhdGU+XG48L25nLXRlbXBsYXRlPlxuICAiXX0=