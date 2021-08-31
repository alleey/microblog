import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../services/bookmarks.service";
import * as i2 from "@angular/router";
import * as i3 from "utils";
import * as i4 from "../bookmark-list-view/bookmark-list-view.component";
import * as i5 from "@angular/common";
export class BookmarkListComponent {
    constructor(bookmarksService, router, activatedRoute) {
        this.bookmarksService = bookmarksService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.enableSearch = true;
        this.filterText = '';
        this.onSelect = (item) => this.navigateBookmark(item);
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
        this.subscription.add(this.bookmarksService.onChange.subscribe({ next: () => this.fetchPage(this.pageable.page) }));
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
            this.bookmarksService.findMatchingCaption("", this.filterText, this.pageable).subscribe(this.responseHandler);
        }
        else {
            this.bookmarksService.all("", this.pageable).subscribe(this.responseHandler);
        }
    }
    get items() {
        var _a, _b;
        return (_b = (_a = this.response) === null || _a === void 0 ? void 0 : _a._embedded) === null || _b === void 0 ? void 0 : _b.bookmarks;
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
            case 'delete':
                this.deleteBookmark(evt.item);
                break;
        }
    }
    navigateBookmark(bookmark) {
        console.info(`Navigate to ${bookmark.url}`);
        window.location.href = bookmark.url;
    }
    deleteBookmark(bookmark) {
        this.bookmarksService.delete("", bookmark.id)
            .subscribe({
            error: (err) => {
                this.errorDesc = err.message;
            }
        });
    }
    gotoPage(evt) {
        this.fetchPage(evt - 1);
    }
}
BookmarkListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BookmarkListComponent, deps: [{ token: i1.BookmarksService }, { token: i2.Router }, { token: i2.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
BookmarkListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: BookmarkListComponent, selector: "bookmark-list", inputs: { enableSearch: "enableSearch", filterText: "filterText", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate", headerTemplate: "headerTemplate", footerTemplate: "footerTemplate", onSelect: ["onSelectBookmark", "onSelect"] }, ngImport: i0, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #contents>\n    <utils-alert *ngIf=\"errorDesc;else itemsList\" [dismissable]=\"false\" [minimal]=\"true\">\n        <p>An error occurred fetching the bookmarks list: {{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #itemsList>\n\n    <ng-container\n        [ngTemplateOutlet]=\"headerTemplate || defaultHeaderTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n    <div class=\"py-1\">\n        <utils-search-box (onApplyFilter)=\"onApplyFilter\" *ngIf=\"enableSearch\"></utils-search-box>\n        <bookmark-list-view\n            [bookmarks]=\"items\"\n            [itemTemplate]=\"itemTemplate\"\n            [noContentsTemplate]=\"noContentsTemplate\"\n            (onSelectItem)=\"handleListViewEvent($event)\">\n        </bookmark-list-view>\n        <utils-pager [page]=\"page\" (onSelectPage)=\"gotoPage($event)\"></utils-pager>\n    </div>\n\n    <ng-container\n        [ngTemplateOutlet]=\"footerTemplate || defaultFooterTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n</ng-template>\n\n<ng-template #defaultHeaderTemplate>\n</ng-template>\n\n<ng-template #defaultFooterTemplate>\n</ng-template>\n", styles: [""], components: [{ type: i3.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: i3.SearchBoxComponent, selector: "utils-search-box", inputs: ["debounceTime"], outputs: ["onApplyFilter"] }, { type: i4.BookmarkListViewComponent, selector: "bookmark-list-view", inputs: ["bookmarks", "itemTemplate", "noContentsTemplate"], outputs: ["onSelectItem"] }, { type: i3.PagerComponent, selector: "utils-pager", inputs: ["prevNextLinks", "maxPageLinks", "page"], outputs: ["onSelectPage"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BookmarkListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bookmark-list',
                    templateUrl: './bookmark-list.component.html',
                    styleUrls: ['./bookmark-list.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.BookmarksService }, { type: i2.Router }, { type: i2.ActivatedRoute }]; }, propDecorators: { enableSearch: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9va21hcmstbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ib29rbWFya3Mvc3JjL2xpYi9jb21wb25lbnRzL2Jvb2ttYXJrLWxpc3QvYm9va21hcmstbGlzdC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ib29rbWFya3Mvc3JjL2xpYi9jb21wb25lbnRzL2Jvb2ttYXJrLWxpc3QvYm9va21hcmstbGlzdC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBa0MsTUFBTSxlQUFlLENBQUM7QUFFakYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7OztBQVdwQyxNQUFNLE9BQU8scUJBQXFCO0lBb0JoQyxZQUNZLGdCQUFrQyxFQUNsQyxNQUFjLEVBQ2QsY0FBOEI7UUFGOUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBckJqQyxpQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBUWpDLGFBQVEsR0FDTixDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBSXhDLGNBQVMsR0FBUSxFQUFFLENBQUM7UUFDcEIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixpQkFBWSxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBaUNoRCxvQkFBZSxHQUFHO1lBQ2hCLElBQUksRUFBRSxDQUFDLE1BQWlDLEVBQUUsRUFBRTtnQkFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lB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UUFDM0MsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQztJQUN0QyxDQUFDO0lBRUQsY0FBYyxDQUFDLFFBQXVCO1FBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUM7YUFDMUMsU0FBUyxDQUNSO1lBQ0UsS0FBSyxFQUFFLENBQUMsR0FBUSxFQUFFLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztZQUMvQixDQUFDO1NBQ0YsQ0FDRixDQUFDO0lBQ04sQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFPO1FBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEIsQ0FBQzs7a0hBaEhVLHFCQUFxQjtzR0FBckIscUJBQXFCLGlUQ2JsQyx5eUNBd0NBOzJGRDNCYSxxQkFBcUI7a0JBTGpDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFdBQVcsRUFBRSxnQ0FBZ0M7b0JBQzdDLFNBQVMsRUFBRSxDQUFDLGdDQUFnQyxDQUFDO2lCQUM5Qzt5SkFHVSxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUcsWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUdOLFFBQVE7c0JBRFAsS0FBSzt1QkFBQyxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBCb29rbWFya01vZGVsLCBCb29rbWFya0xpc3RSZXNwb25zZU1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2Jvb2ttYXJrJztcbmltcG9ydCB7IEJvb2ttYXJrc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ib29rbWFya3Muc2VydmljZSc7XG5pbXBvcnQgeyBQYWdlYWJsZSwgUGFnZU1vZGVsIH0gZnJvbSAndXRpbHMnO1xuaW1wb3J0IHsgQm9va21hcmtMaXN0Vmlld0V2ZW50IH0gZnJvbSAnLi4vYm9va21hcmstbGlzdC12aWV3L2Jvb2ttYXJrLWxpc3Qtdmlldy5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdib29rbWFyay1saXN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Jvb2ttYXJrLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9ib29rbWFyay1saXN0LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQm9va21hcmtMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIGVuYWJsZVNlYXJjaDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIGZpbHRlclRleHQ6IHN0cmluZyA9ICcnO1xuXG4gIEBJbnB1dCgpIGl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgbm9Db250ZW50c1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgZm9vdGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgQElucHV0KCdvblNlbGVjdEJvb2ttYXJrJykgXG4gIG9uU2VsZWN0OiAodG9waWM6IEJvb2ttYXJrTW9kZWwpID0+IHZvaWQgPSBcbiAgICAoaXRlbSkgPT4gdGhpcy5uYXZpZ2F0ZUJvb2ttYXJrKGl0ZW0pO1xuICAgICAgICBcbiAgcGFnZWFibGU6IFBhZ2VhYmxlOyBcbiAgcmVzcG9uc2UgOiBCb29rbWFya0xpc3RSZXNwb25zZU1vZGVsfG51bGw7XG4gIGVycm9yRGVzYzogYW55ID0gXCJcIjtcbiAgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgYm9va21hcmtzU2VydmljZTogQm9va21hcmtzU2VydmljZSwgXG4gICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBcbiAgICAgIHByaXZhdGUgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlKSBcbiAgeyBcbiAgICB0aGlzLnJlc3BvbnNlID0gbnVsbDtcbiAgICB0aGlzLnBhZ2VhYmxlID0ge1xuICAgICAgcGFnZTogMFxuICAgIH07XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2YXRlZFJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgICAgIGNvbnN0IHBhZ2VOdW0gPSBwYXJhbXMucGFnZU51bSA/PyAwO1xuICAgICAgdGhpcy5mZXRjaFBhZ2UocGFnZU51bSk7XG4gICAgfSk7XG4gICAgLy8gUmVxdWVyeSB3aGVuIHRoZSBiYWNrZW5kIGRhdGEgY2hhbmdlc1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMuYm9va21hcmtzU2VydmljZS5vbkNoYW5nZS5zdWJzY3JpYmUoeyBuZXh0OiAoKSA9PiB0aGlzLmZldGNoUGFnZSh0aGlzLnBhZ2VhYmxlLnBhZ2UpIH0pXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBvbkFwcGx5RmlsdGVyKHRleHQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZmlsdGVyVGV4dCA9IHRleHQ7XG4gICAgdGhpcy5mZXRjaFBhZ2UoMCk7XG4gIH1cblxuICByZXNwb25zZUhhbmRsZXIgPSB7XG4gICAgbmV4dDogKHJlc3VsdDogQm9va21hcmtMaXN0UmVzcG9uc2VNb2RlbCkgPT4ge1xuICAgICAgdGhpcy5yZXNwb25zZSA9IHJlc3VsdDtcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIH0sXG4gICAgZXJyb3I6IChlcnI6IGFueSkgPT4ge1xuICAgICAgdGhpcy5lcnJvckRlc2MgPSBlcnIubWVzc2FnZTtcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgY29uc29sZS5sb2codGhpcy5lcnJvckRlc2MpO1xuICAgIH1cbiAgfVxuXG4gIGZldGNoUGFnZShwYWdlTnVtOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnBhZ2VhYmxlLnBhZ2UgPSBwYWdlTnVtO1xuICAgIGlmKCEhdGhpcy5maWx0ZXJUZXh0KVxuICAgIHtcbiAgICAgIHRoaXMuYm9va21hcmtzU2VydmljZS5maW5kTWF0Y2hpbmdDYXB0aW9uKFwiXCIsIHRoaXMuZmlsdGVyVGV4dCwgdGhpcy5wYWdlYWJsZSkuc3Vic2NyaWJlKHRoaXMucmVzcG9uc2VIYW5kbGVyKTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIHRoaXMuYm9va21hcmtzU2VydmljZS5hbGwoXCJcIiwgdGhpcy5wYWdlYWJsZSkuc3Vic2NyaWJlKHRoaXMucmVzcG9uc2VIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICBnZXQgaXRlbXMoKTogQm9va21hcmtNb2RlbFtdfHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMucmVzcG9uc2U/Ll9lbWJlZGRlZD8uYm9va21hcmtzO1xuICB9XG5cbiAgZ2V0IHBhZ2UoKTogUGFnZU1vZGVsfHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMucmVzcG9uc2U/LnBhZ2U7XG4gIH1cblxuICBnZXQgaGFzSXRlbXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhKHRoaXMucGFnZT8udG90YWxFbGVtZW50cyk7XG4gIH1cblxuICBoYW5kbGVMaXN0Vmlld0V2ZW50KGV2dDogQm9va21hcmtMaXN0Vmlld0V2ZW50KSB7XG4gICAgc3dpdGNoKGV2dC5vcGNvZGUpIHtcbiAgICAgIGNhc2UgJ3NlbGVjdCc6IHRoaXMub25TZWxlY3QoZXZ0Lml0ZW0pOyBicmVhaztcbiAgICAgIGNhc2UgJ2RlbGV0ZSc6IHRoaXMuZGVsZXRlQm9va21hcmsoZXZ0Lml0ZW0pOyBicmVhaztcbiAgICB9XG4gIH1cblxuICBuYXZpZ2F0ZUJvb2ttYXJrKGJvb2ttYXJrOiBCb29rbWFya01vZGVsKTogdm9pZCB7XG4gICAgY29uc29sZS5pbmZvKGBOYXZpZ2F0ZSB0byAke2Jvb2ttYXJrLnVybH1gKVxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYm9va21hcmsudXJsO1xuICB9XG5cbiAgZGVsZXRlQm9va21hcmsoYm9va21hcms6IEJvb2ttYXJrTW9kZWwpOiB2b2lkIHtcbiAgICB0aGlzLmJvb2ttYXJrc1NlcnZpY2UuZGVsZXRlKFwiXCIsIGJvb2ttYXJrLmlkKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAge1xuICAgICAgICAgIGVycm9yOiAoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JEZXNjID0gZXJyLm1lc3NhZ2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApO1xuICB9XG5cbiAgZ290b1BhZ2UoZXZ0OmFueSk6IHZvaWQge1xuICAgIHRoaXMuZmV0Y2hQYWdlKGV2dC0xKTtcbiAgfVxufVxuIiwiPGRpdiAqbmdJZj1cImxvYWRpbmc7IGVsc2UgY29udGVudHNcIj5cbiAgICA8dXRpbHMtbG9hZGVyPjwvdXRpbHMtbG9hZGVyPlxuPC9kaXY+XG5cbjxuZy10ZW1wbGF0ZSAjY29udGVudHM+XG4gICAgPHV0aWxzLWFsZXJ0ICpuZ0lmPVwiZXJyb3JEZXNjO2Vsc2UgaXRlbXNMaXN0XCIgW2Rpc21pc3NhYmxlXT1cImZhbHNlXCIgW21pbmltYWxdPVwidHJ1ZVwiPlxuICAgICAgICA8cD5BbiBlcnJvciBvY2N1cnJlZCBmZXRjaGluZyB0aGUgYm9va21hcmtzIGxpc3Q6IHt7IGVycm9yRGVzYyB9fTwvcD5cbiAgICA8L3V0aWxzLWFsZXJ0PlxuPC9uZy10ZW1wbGF0ZT5cblxuPG5nLXRlbXBsYXRlICNpdGVtc0xpc3Q+XG5cbiAgICA8bmctY29udGFpbmVyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImhlYWRlclRlbXBsYXRlIHx8IGRlZmF1bHRIZWFkZXJUZW1wbGF0ZVwiXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogdGhpcyB9XCI+XG4gICAgPC9uZy1jb250YWluZXI+XG5cbiAgICA8ZGl2IGNsYXNzPVwicHktMVwiPlxuICAgICAgICA8dXRpbHMtc2VhcmNoLWJveCAob25BcHBseUZpbHRlcik9XCJvbkFwcGx5RmlsdGVyXCIgKm5nSWY9XCJlbmFibGVTZWFyY2hcIj48L3V0aWxzLXNlYXJjaC1ib3g+XG4gICAgICAgIDxib29rbWFyay1saXN0LXZpZXdcbiAgICAgICAgICAgIFtib29rbWFya3NdPVwiaXRlbXNcIlxuICAgICAgICAgICAgW2l0ZW1UZW1wbGF0ZV09XCJpdGVtVGVtcGxhdGVcIlxuICAgICAgICAgICAgW25vQ29udGVudHNUZW1wbGF0ZV09XCJub0NvbnRlbnRzVGVtcGxhdGVcIlxuICAgICAgICAgICAgKG9uU2VsZWN0SXRlbSk9XCJoYW5kbGVMaXN0Vmlld0V2ZW50KCRldmVudClcIj5cbiAgICAgICAgPC9ib29rbWFyay1saXN0LXZpZXc+XG4gICAgICAgIDx1dGlscy1wYWdlciBbcGFnZV09XCJwYWdlXCIgKG9uU2VsZWN0UGFnZSk9XCJnb3RvUGFnZSgkZXZlbnQpXCI+PC91dGlscy1wYWdlcj5cbiAgICA8L2Rpdj5cblxuICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiZm9vdGVyVGVtcGxhdGUgfHwgZGVmYXVsdEZvb3RlclRlbXBsYXRlXCJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiB0aGlzIH1cIj5cbiAgICA8L25nLWNvbnRhaW5lcj5cblxuPC9uZy10ZW1wbGF0ZT5cblxuPG5nLXRlbXBsYXRlICNkZWZhdWx0SGVhZGVyVGVtcGxhdGU+XG48L25nLXRlbXBsYXRlPlxuXG48bmctdGVtcGxhdGUgI2RlZmF1bHRGb290ZXJUZW1wbGF0ZT5cbjwvbmctdGVtcGxhdGU+XG4iXX0=