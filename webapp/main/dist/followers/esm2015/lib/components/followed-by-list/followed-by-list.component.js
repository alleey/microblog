import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../services/following.service";
import * as i2 from "@angular/router";
import * as i3 from "utils";
import * as i4 from "../followed-by-list-view/followed-by-list-view.component";
import * as i5 from "@angular/common";
export class FollowersListComponent {
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
            this.followersService.findFollowedByMatching("", "", this.filterText, this.pageable).subscribe(this.responseHandler);
        }
        else {
            this.followersService.followedBy("", "", this.pageable).subscribe(this.responseHandler);
        }
    }
    get items() {
        var _a, _b;
        return (_b = (_a = this.response) === null || _a === void 0 ? void 0 : _a._embedded) === null || _b === void 0 ? void 0 : _b.followedBy;
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
FollowersListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowersListComponent, deps: [{ token: i1.FollowingService }, { token: i2.Router }, { token: i2.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
FollowersListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: FollowersListComponent, selector: "followed-by-list", inputs: { enableSearch: "enableSearch", filterText: "filterText", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate", headerTemplate: "headerTemplate", footerTemplate: "footerTemplate", onSelect: ["onSelectBookmark", "onSelect"] }, ngImport: i0, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #contents>\n    <utils-alert *ngIf=\"errorDesc;else itemsList\" [dismissable]=\"false\" [minimal]=\"true\">\n        <p>An error occurred fetching the bookmarks list: {{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #itemsList>\n\n    <ng-container\n        [ngTemplateOutlet]=\"headerTemplate || defaultHeaderTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n    <div class=\"py-1\">\n        <utils-search-box (onApplyFilter)=\"onApplyFilter\" *ngIf=\"enableSearch\"></utils-search-box>\n        <followed-by-list-view \n            [items]=\"items\" \n            [itemTemplate]=\"itemTemplate\"\n            [noContentsTemplate]=\"noContentsTemplate\"\n            (onSelectItem)=\"handleListViewEvent($event)\">\n        </followed-by-list-view>\n        <utils-pager [page]=\"page\" (onSelectPage)=\"gotoPage($event)\"></utils-pager>\n    </div>\n\n    <ng-container\n        [ngTemplateOutlet]=\"footerTemplate || defaultFooterTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n</ng-template>\n\n<ng-template #defaultHeaderTemplate>\n</ng-template>\n  \n<ng-template #defaultFooterTemplate>\n</ng-template>\n  ", styles: [""], components: [{ type: i3.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: i3.SearchBoxComponent, selector: "utils-search-box", inputs: ["debounceTime"], outputs: ["onApplyFilter"] }, { type: i4.FollowersListViewComponent, selector: "followed-by-list-view", inputs: ["items", "itemTemplate", "noContentsTemplate"], outputs: ["onSelectItem"] }, { type: i3.PagerComponent, selector: "utils-pager", inputs: ["prevNextLinks", "maxPageLinks", "page"], outputs: ["onSelectPage"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowersListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'followed-by-list',
                    templateUrl: './followed-by-list.component.html',
                    styleUrls: ['./followed-by-list.component.css']
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sbG93ZWQtYnktbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9mb2xsb3dlcnMvc3JjL2xpYi9jb21wb25lbnRzL2ZvbGxvd2VkLWJ5LWxpc3QvZm9sbG93ZWQtYnktbGlzdC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9mb2xsb3dlcnMvc3JjL2xpYi9jb21wb25lbnRzL2ZvbGxvd2VkLWJ5LWxpc3QvZm9sbG93ZWQtYnktbGlzdC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFFdEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7OztBQVdwQyxNQUFNLE9BQU8sc0JBQXNCO0lBb0JqQyxZQUNZLGdCQUFrQyxFQUNsQyxNQUFjLEVBQ2QsY0FBOEI7UUFGOUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBckJqQyxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUM5QixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBUWpDLGFBQVEsR0FDTixDQUFDLElBQUksRUFBRSxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBSWYsY0FBUyxHQUFRLEVBQUUsQ0FBQztRQUNwQixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLGlCQUFZLEdBQWlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFpQ2hELG9CQUFlLEdBQUc7WUFDaEIsSUFBSSxFQUFFLENBQUMsTUFBbUMsRUFBRSxFQUFFO2dCQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztnQkFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDdkIsQ0FBQztZQUNE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QztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixXQUFXLEVBQUUsbUNBQW1DO29CQUNoRCxTQUFTLEVBQUUsQ0FBQyxrQ0FBa0MsQ0FBQztpQkFDaEQ7eUpBR1UsWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUVHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csa0JBQWtCO3NCQUExQixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFHTixRQUFRO3NCQURQLEtBQUs7dUJBQUMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFBhZ2VhYmxlLCBQYWdlTW9kZWwgfSBmcm9tICd1dGlscyc7XG5pbXBvcnQgeyBGb2xsb3dpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZm9sbG93aW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9sbG93ZWRCeUxpc3RSZXNwb25zZU1vZGVsLCBGb2xsb3dlZEJ5TW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvZm9sbG93ZWQtYnknO1xuaW1wb3J0IHsgRm9sbG93ZXJMaXN0Vmlld0V2ZW50IH0gZnJvbSAnLi4vZm9sbG93ZWQtYnktbGlzdC12aWV3L2ZvbGxvd2VkLWJ5LWxpc3Qtdmlldy5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb2xsb3dlZC1ieS1saXN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZvbGxvd2VkLWJ5LWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9mb2xsb3dlZC1ieS1saXN0LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGb2xsb3dlcnNMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBlbmFibGVTZWFyY2g6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgZmlsdGVyVGV4dDogc3RyaW5nID0gJyc7XG5cbiAgQElucHV0KCkgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBub0NvbnRlbnRzVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIGhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBmb290ZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICBASW5wdXQoJ29uU2VsZWN0Qm9va21hcmsnKSBcbiAgb25TZWxlY3Q6ICh0b3BpYzogRm9sbG93ZWRCeU1vZGVsKSA9PiB2b2lkID0gXG4gICAgKGl0ZW0pID0+IHt9O1xuICAgICAgICBcbiAgcGFnZWFibGU6IFBhZ2VhYmxlOyBcbiAgcmVzcG9uc2UgOiBGb2xsb3dlZEJ5TGlzdFJlc3BvbnNlTW9kZWx8bnVsbDtcbiAgZXJyb3JEZXNjOiBhbnkgPSBcIlwiO1xuICBsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG4gIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBmb2xsb3dlcnNTZXJ2aWNlOiBGb2xsb3dpbmdTZXJ2aWNlLCBcbiAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIFxuICAgICAgcHJpdmF0ZSBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpIFxuICB7IFxuICAgIHRoaXMucmVzcG9uc2UgPSBudWxsO1xuICAgIHRoaXMucGFnZWFibGUgPSB7XG4gICAgICBwYWdlOiAwXG4gICAgfTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZhdGVkUm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgY29uc3QgcGFnZU51bSA9IHBhcmFtcy5wYWdlTnVtID8/IDA7XG4gICAgICB0aGlzLmZldGNoUGFnZShwYWdlTnVtKTtcbiAgICB9KTtcbiAgICAvLyBSZXF1ZXJ5IHdoZW4gdGhlIGJhY2tlbmQgZGF0YSBjaGFuZ2VzXG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy5mb2xsb3dlcnNTZXJ2aWNlLm9uQ2hhbmdlLnN1YnNjcmliZSh7IG5leHQ6ICgpID0+IHRoaXMuZmV0Y2hQYWdlKHRoaXMucGFnZWFibGUucGFnZSkgfSlcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIG9uQXBwbHlGaWx0ZXIodGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5maWx0ZXJUZXh0ID0gdGV4dDtcbiAgICB0aGlzLmZldGNoUGFnZSgwKTtcbiAgfVxuXG4gIHJlc3BvbnNlSGFuZGxlciA9IHtcbiAgICBuZXh0OiAocmVzdWx0OiBGb2xsb3dlZEJ5TGlzdFJlc3BvbnNlTW9kZWwpID0+IHtcbiAgICAgIHRoaXMucmVzcG9uc2UgPSByZXN1bHQ7XG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9LFxuICAgIGVycm9yOiAoZXJyOiBhbnkpID0+IHtcbiAgICAgIHRoaXMuZXJyb3JEZXNjID0gZXJyLm1lc3NhZ2U7XG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZXJyb3JEZXNjKTtcbiAgICB9XG4gIH1cblxuICBmZXRjaFBhZ2UocGFnZU51bTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5wYWdlYWJsZS5wYWdlID0gcGFnZU51bTtcbiAgICBpZighIXRoaXMuZmlsdGVyVGV4dClcbiAgICB7XG4gICAgICB0aGlzLmZvbGxvd2Vyc1NlcnZpY2UuZmluZEZvbGxvd2VkQnlNYXRjaGluZyhcIlwiLCBcIlwiLCB0aGlzLmZpbHRlclRleHQsIHRoaXMucGFnZWFibGUpLnN1YnNjcmliZSh0aGlzLnJlc3BvbnNlSGFuZGxlcik7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICB0aGlzLmZvbGxvd2Vyc1NlcnZpY2UuZm9sbG93ZWRCeShcIlwiLCBcIlwiLCB0aGlzLnBhZ2VhYmxlKS5zdWJzY3JpYmUodGhpcy5yZXNwb25zZUhhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBpdGVtcygpOiBGb2xsb3dlZEJ5TW9kZWxbXSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMucmVzcG9uc2U/Ll9lbWJlZGRlZD8uZm9sbG93ZWRCeTtcbiAgfVxuXG4gIGdldCBwYWdlKCk6IFBhZ2VNb2RlbHx1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnJlc3BvbnNlPy5wYWdlO1xuICB9XG5cbiAgZ2V0IGhhc0l0ZW1zKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhISh0aGlzLnBhZ2U/LnRvdGFsRWxlbWVudHMpO1xuICB9XG5cbiAgaGFuZGxlTGlzdFZpZXdFdmVudChldnQ6IEZvbGxvd2VyTGlzdFZpZXdFdmVudCkge1xuICAgIHN3aXRjaChldnQub3Bjb2RlKSB7XG4gICAgICBjYXNlICdzZWxlY3QnOiB0aGlzLm9uU2VsZWN0KGV2dC5pdGVtKTsgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZ290b1BhZ2UoZXZ0OmFueSk6IHZvaWQge1xuICAgIHRoaXMuZmV0Y2hQYWdlKGV2dC0xKTtcbiAgfVxufVxuIiwiPGRpdiAqbmdJZj1cImxvYWRpbmc7IGVsc2UgY29udGVudHNcIj5cbiAgICA8dXRpbHMtbG9hZGVyPjwvdXRpbHMtbG9hZGVyPlxuPC9kaXY+XG5cbjxuZy10ZW1wbGF0ZSAjY29udGVudHM+XG4gICAgPHV0aWxzLWFsZXJ0ICpuZ0lmPVwiZXJyb3JEZXNjO2Vsc2UgaXRlbXNMaXN0XCIgW2Rpc21pc3NhYmxlXT1cImZhbHNlXCIgW21pbmltYWxdPVwidHJ1ZVwiPlxuICAgICAgICA8cD5BbiBlcnJvciBvY2N1cnJlZCBmZXRjaGluZyB0aGUgYm9va21hcmtzIGxpc3Q6IHt7IGVycm9yRGVzYyB9fTwvcD5cbiAgICA8L3V0aWxzLWFsZXJ0PlxuPC9uZy10ZW1wbGF0ZT5cblxuPG5nLXRlbXBsYXRlICNpdGVtc0xpc3Q+XG5cbiAgICA8bmctY29udGFpbmVyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImhlYWRlclRlbXBsYXRlIHx8IGRlZmF1bHRIZWFkZXJUZW1wbGF0ZVwiXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogdGhpcyB9XCI+XG4gICAgPC9uZy1jb250YWluZXI+XG5cbiAgICA8ZGl2IGNsYXNzPVwicHktMVwiPlxuICAgICAgICA8dXRpbHMtc2VhcmNoLWJveCAob25BcHBseUZpbHRlcik9XCJvbkFwcGx5RmlsdGVyXCIgKm5nSWY9XCJlbmFibGVTZWFyY2hcIj48L3V0aWxzLXNlYXJjaC1ib3g+XG4gICAgICAgIDxmb2xsb3dlZC1ieS1saXN0LXZpZXcgXG4gICAgICAgICAgICBbaXRlbXNdPVwiaXRlbXNcIiBcbiAgICAgICAgICAgIFtpdGVtVGVtcGxhdGVdPVwiaXRlbVRlbXBsYXRlXCJcbiAgICAgICAgICAgIFtub0NvbnRlbnRzVGVtcGxhdGVdPVwibm9Db250ZW50c1RlbXBsYXRlXCJcbiAgICAgICAgICAgIChvblNlbGVjdEl0ZW0pPVwiaGFuZGxlTGlzdFZpZXdFdmVudCgkZXZlbnQpXCI+XG4gICAgICAgIDwvZm9sbG93ZWQtYnktbGlzdC12aWV3PlxuICAgICAgICA8dXRpbHMtcGFnZXIgW3BhZ2VdPVwicGFnZVwiIChvblNlbGVjdFBhZ2UpPVwiZ290b1BhZ2UoJGV2ZW50KVwiPjwvdXRpbHMtcGFnZXI+XG4gICAgPC9kaXY+XG5cbiAgICA8bmctY29udGFpbmVyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImZvb3RlclRlbXBsYXRlIHx8IGRlZmF1bHRGb290ZXJUZW1wbGF0ZVwiXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogdGhpcyB9XCI+XG4gICAgPC9uZy1jb250YWluZXI+XG5cbjwvbmctdGVtcGxhdGU+XG5cbjxuZy10ZW1wbGF0ZSAjZGVmYXVsdEhlYWRlclRlbXBsYXRlPlxuPC9uZy10ZW1wbGF0ZT5cbiAgXG48bmctdGVtcGxhdGUgI2RlZmF1bHRGb290ZXJUZW1wbGF0ZT5cbjwvbmctdGVtcGxhdGU+XG4gICJdfQ==