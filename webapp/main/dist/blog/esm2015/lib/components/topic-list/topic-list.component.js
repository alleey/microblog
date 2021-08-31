import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../services/topics.service";
import * as i2 from "@angular/router";
import * as i3 from "utils";
import * as i4 from "../topic-list-view/topic-list-view.component";
import * as i5 from "@angular/common";
export class TopicListComponent {
    constructor(topicsService, router, activatedRoute) {
        this.topicsService = topicsService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.enableSearch = true;
        this.filterText = '';
        this.onSelect = (item) => this.navigateToTopicPosts(item);
        this.errorDesc = "";
        this.loading = false;
        this.filter = "";
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
        this.subscription.add(this.topicsService.onChange.subscribe({ next: () => this.fetchPage(this.pageable.page) }));
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
            this.topicsService.findMatchingCaption("", this.filterText, this.pageable).subscribe(this.responseHandler);
        }
        else {
            this.topicsService.all("", this.pageable).subscribe(this.responseHandler);
        }
    }
    get items() {
        var _a, _b;
        if (!((_a = this.response) === null || _a === void 0 ? void 0 : _a._embedded.topics))
            return [];
        return (_b = this.response) === null || _b === void 0 ? void 0 : _b._embedded.topics;
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
    navigateToTopicPosts(topic) {
        this.router.navigate(['/topics', topic.id, "posts"], {
            state: { "endpoint": `topics/${topic.id}/posts` }
        });
    }
    gotoPage(evt) {
        this.fetchPage(evt - 1);
    }
}
TopicListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: TopicListComponent, deps: [{ token: i1.TopicsService }, { token: i2.Router }, { token: i2.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
TopicListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: TopicListComponent, selector: "blog-topic-list", inputs: { enableSearch: "enableSearch", filterText: "filterText", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate", headerTemplate: "headerTemplate", footerTemplate: "footerTemplate", onSelect: ["onSelectTopic", "onSelect"] }, ngImport: i0, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #contents>\n    <utils-alert *ngIf=\"errorDesc;else itemsList\" [dismissable]=\"false\" [minimal]=\"true\">\n        <p>An error occurred fetching the topics list: {{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #itemsList>\n\n    <ng-container\n        [ngTemplateOutlet]=\"headerTemplate || defaultHeaderTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n    <utils-search-box (onApplyFilter)=\"onApplyFilter($event)\" *ngIf=\"enableSearch\">\n    </utils-search-box>\n    <blog-topic-list-view \n        [topics]=\"items\" \n        [itemTemplate]=\"itemTemplate\"\n        [noContentsTemplate]=\"noContentsTemplate\"\n        (onSelectItem)=\"handleListViewEvent($event)\">\n    </blog-topic-list-view>\n    <utils-pager [page]=\"page\" (onSelectPage)=\"gotoPage($event)\">\n    </utils-pager>\n\n    <ng-container\n        [ngTemplateOutlet]=\"footerTemplate || defaultFooterTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n</ng-template>\n\n<ng-template #defaultHeaderTemplate>\n</ng-template>\n  \n<ng-template #defaultFooterTemplate>\n</ng-template>\n  ", styles: [""], components: [{ type: i3.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: i3.SearchBoxComponent, selector: "utils-search-box", inputs: ["debounceTime"], outputs: ["onApplyFilter"] }, { type: i4.TopicListViewComponent, selector: "blog-topic-list-view", inputs: ["topics", "itemTemplate", "noContentsTemplate"], outputs: ["onSelectItem"] }, { type: i3.PagerComponent, selector: "utils-pager", inputs: ["prevNextLinks", "maxPageLinks", "page"], outputs: ["onSelectPage"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: TopicListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'blog-topic-list',
                    templateUrl: './topic-list.component.html',
                    styleUrls: ['./topic-list.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.TopicsService }, { type: i2.Router }, { type: i2.ActivatedRoute }]; }, propDecorators: { enableSearch: [{
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
                args: ['onSelectTopic']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9waWMtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ibG9nL3NyYy9saWIvY29tcG9uZW50cy90b3BpYy1saXN0L3RvcGljLWxpc3QuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYmxvZy9zcmMvbGliL2NvbXBvbmVudHMvdG9waWMtbGlzdC90b3BpYy1saXN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFrQyxNQUFNLGVBQWUsQ0FBQztBQUVqRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7Ozs7O0FBV3BDLE1BQU0sT0FBTyxrQkFBa0I7SUF3QjdCLFlBQ1UsYUFBNEIsRUFDNUIsTUFBYyxFQUNkLGNBQThCO1FBRjlCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUF6Qi9CLGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFRakMsYUFBUSxHQUNOLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFJNUMsY0FBUyxHQUFRLEVBQUUsQ0FBQztRQUNwQixZQUFPLEdBQVksS0FBSyxDQUFDO1FBRXpCLFdBQU0sR0FBVyxFQUFFLENBQUM7UUFFcEIsaUJBQVksR0FBaUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQTZCaEQsb0JBQWUsR0FBRztZQUNoQixJQUFJLEVBQUUsQ0FBQyxNQUE4QixFQUFFLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO2dCQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUN2QixD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RSxPQUFPLENBQUMsRUFDbkQ7WUFDRSxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQUUsVUFBVSxLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUU7U0FDbEQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFRO1FBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEIsQ0FBQzs7K0dBMUdVLGtCQUFrQjttR0FBbEIsa0JBQWtCLGdUQ2IvQiwydkNBd0NFOzJGRDNCVyxrQkFBa0I7a0JBTDlCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsV0FBVyxFQUFFLDZCQUE2QjtvQkFDMUMsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7aUJBQzNDO3NKQUdVLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFFRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBR04sUUFBUTtzQkFEUCxLQUFLO3VCQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBQYWdlYWJsZSwgUGFnZU1vZGVsIH0gZnJvbSAndXRpbHMnO1xuaW1wb3J0IHsgVG9waWNNb2RlbCwgVG9waWNMaXN0UmVzcG9uc2VNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy90b3BpYyc7XG5pbXBvcnQgeyBUb3BpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdG9waWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgVG9waWNMaXN0Vmlld0V2ZW50IH0gZnJvbSAnLi4vdG9waWMtbGlzdC12aWV3L3RvcGljLWxpc3Qtdmlldy5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdibG9nLXRvcGljLWxpc3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vdG9waWMtbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RvcGljLWxpc3QuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUb3BpY0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KCkgZW5hYmxlU2VhcmNoOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgZmlsdGVyVGV4dDogc3RyaW5nID0gJyc7XG5cbiAgQElucHV0KCkgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBub0NvbnRlbnRzVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIGhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBmb290ZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICBASW5wdXQoJ29uU2VsZWN0VG9waWMnKSBcbiAgb25TZWxlY3Q6ICh0b3BpYzogVG9waWNNb2RlbCkgPT4gdm9pZCA9IFxuICAgIChpdGVtKSA9PiB0aGlzLm5hdmlnYXRlVG9Ub3BpY1Bvc3RzKGl0ZW0pO1xuICAgICAgXG4gIHBhZ2VhYmxlOiBQYWdlYWJsZTtcbiAgcmVzcG9uc2UgOiBUb3BpY0xpc3RSZXNwb25zZU1vZGVsfG51bGw7XG4gIGVycm9yRGVzYzogYW55ID0gXCJcIjtcbiAgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGZpbHRlcjogc3RyaW5nID0gXCJcIjtcblxuICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdG9waWNzU2VydmljZTogVG9waWNzU2VydmljZSwgXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgXG4gICAgcHJpdmF0ZSBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpIFxuICB7IFxuICAgIHRoaXMucmVzcG9uc2UgPSBudWxsO1xuICAgIHRoaXMucGFnZWFibGUgPSB7XG4gICAgICBwYWdlOiAwXG4gICAgfTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZhdGVkUm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgY29uc3QgcGFnZU51bSA9IHBhcmFtcy5wYWdlTnVtID8/IDA7XG4gICAgICB0aGlzLmZldGNoUGFnZShwYWdlTnVtKTtcbiAgICB9KTsgXG4gICAgLy8gUmVxdWVyeSB3aGVuIHRoZSBiYWNrZW5kIGRhdGEgY2hhbmdlc1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMudG9waWNzU2VydmljZS5vbkNoYW5nZS5zdWJzY3JpYmUoeyBuZXh0OiAoKSA9PiB0aGlzLmZldGNoUGFnZSh0aGlzLnBhZ2VhYmxlLnBhZ2UpIH0pXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICByZXNwb25zZUhhbmRsZXIgPSB7XG4gICAgbmV4dDogKHJlc3VsdDogVG9waWNMaXN0UmVzcG9uc2VNb2RlbCkgPT4ge1xuICAgICAgdGhpcy5yZXNwb25zZSA9IHJlc3VsdDtcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIH0sXG4gICAgZXJyb3I6IChlcnI6IGFueSkgPT4ge1xuICAgICAgdGhpcy5lcnJvckRlc2MgPSBlcnIubWVzc2FnZTtcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgY29uc29sZS5sb2codGhpcy5lcnJvckRlc2MpO1xuICAgIH1cbiAgfVxuXG4gIG9uQXBwbHlGaWx0ZXIodGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5maWx0ZXJUZXh0ID0gdGV4dDtcbiAgICB0aGlzLmZldGNoUGFnZSgwKTtcbiAgfVxuXG4gIGZldGNoUGFnZShwYWdlTnVtOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnBhZ2VhYmxlLnBhZ2UgPSBwYWdlTnVtO1xuICAgIGlmKCEhdGhpcy5maWx0ZXJUZXh0KSB7XG4gICAgICB0aGlzLnRvcGljc1NlcnZpY2UuZmluZE1hdGNoaW5nQ2FwdGlvbihcIlwiLCB0aGlzLmZpbHRlclRleHQsIHRoaXMucGFnZWFibGUpLnN1YnNjcmliZSh0aGlzLnJlc3BvbnNlSGFuZGxlcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy50b3BpY3NTZXJ2aWNlLmFsbChcIlwiLCB0aGlzLnBhZ2VhYmxlKS5zdWJzY3JpYmUodGhpcy5yZXNwb25zZUhhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBpdGVtcygpOiBUb3BpY01vZGVsW10ge1xuICAgIGlmKCF0aGlzLnJlc3BvbnNlPy5fZW1iZWRkZWQudG9waWNzKVxuICAgICAgcmV0dXJuIFtdO1xuICAgIHJldHVybiB0aGlzLnJlc3BvbnNlPy5fZW1iZWRkZWQudG9waWNzO1xuICB9XG5cbiAgZ2V0IHBhZ2UoKTogUGFnZU1vZGVsfHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMucmVzcG9uc2U/LnBhZ2U7XG4gIH1cblxuICBnZXQgaGFzSXRlbXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhKHRoaXMucGFnZT8udG90YWxFbGVtZW50cyk7XG4gIH1cblxuICBoYW5kbGVMaXN0Vmlld0V2ZW50KGV2dDogVG9waWNMaXN0Vmlld0V2ZW50KSB7XG4gICAgc3dpdGNoKGV2dC5vcGNvZGUpIHtcbiAgICAgIGNhc2UgJ3NlbGVjdCc6IHRoaXMub25TZWxlY3QoZXZ0Lml0ZW0pOyBicmVhaztcbiAgICB9XG4gIH1cblxuICBuYXZpZ2F0ZVRvVG9waWNQb3N0cyh0b3BpYzogVG9waWNNb2RlbCk6IHZvaWQge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3RvcGljcycsIHRvcGljLmlkLCBcInBvc3RzXCJdLCBcbiAgICB7IFxuICAgICAgc3RhdGU6IHsgXCJlbmRwb2ludFwiOiBgdG9waWNzLyR7dG9waWMuaWR9L3Bvc3RzYCB9XG4gICAgfSk7XG4gIH1cblxuICBnb3RvUGFnZShldnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuZmV0Y2hQYWdlKGV2dC0xKTtcbiAgfVxufVxuIiwiPGRpdiAqbmdJZj1cImxvYWRpbmc7IGVsc2UgY29udGVudHNcIj5cbiAgICA8dXRpbHMtbG9hZGVyPjwvdXRpbHMtbG9hZGVyPlxuPC9kaXY+XG5cbjxuZy10ZW1wbGF0ZSAjY29udGVudHM+XG4gICAgPHV0aWxzLWFsZXJ0ICpuZ0lmPVwiZXJyb3JEZXNjO2Vsc2UgaXRlbXNMaXN0XCIgW2Rpc21pc3NhYmxlXT1cImZhbHNlXCIgW21pbmltYWxdPVwidHJ1ZVwiPlxuICAgICAgICA8cD5BbiBlcnJvciBvY2N1cnJlZCBmZXRjaGluZyB0aGUgdG9waWNzIGxpc3Q6IHt7IGVycm9yRGVzYyB9fTwvcD5cbiAgICA8L3V0aWxzLWFsZXJ0PlxuPC9uZy10ZW1wbGF0ZT5cblxuPG5nLXRlbXBsYXRlICNpdGVtc0xpc3Q+XG5cbiAgICA8bmctY29udGFpbmVyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImhlYWRlclRlbXBsYXRlIHx8IGRlZmF1bHRIZWFkZXJUZW1wbGF0ZVwiXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogdGhpcyB9XCI+XG4gICAgPC9uZy1jb250YWluZXI+XG5cbiAgICA8dXRpbHMtc2VhcmNoLWJveCAob25BcHBseUZpbHRlcik9XCJvbkFwcGx5RmlsdGVyKCRldmVudClcIiAqbmdJZj1cImVuYWJsZVNlYXJjaFwiPlxuICAgIDwvdXRpbHMtc2VhcmNoLWJveD5cbiAgICA8YmxvZy10b3BpYy1saXN0LXZpZXcgXG4gICAgICAgIFt0b3BpY3NdPVwiaXRlbXNcIiBcbiAgICAgICAgW2l0ZW1UZW1wbGF0ZV09XCJpdGVtVGVtcGxhdGVcIlxuICAgICAgICBbbm9Db250ZW50c1RlbXBsYXRlXT1cIm5vQ29udGVudHNUZW1wbGF0ZVwiXG4gICAgICAgIChvblNlbGVjdEl0ZW0pPVwiaGFuZGxlTGlzdFZpZXdFdmVudCgkZXZlbnQpXCI+XG4gICAgPC9ibG9nLXRvcGljLWxpc3Qtdmlldz5cbiAgICA8dXRpbHMtcGFnZXIgW3BhZ2VdPVwicGFnZVwiIChvblNlbGVjdFBhZ2UpPVwiZ290b1BhZ2UoJGV2ZW50KVwiPlxuICAgIDwvdXRpbHMtcGFnZXI+XG5cbiAgICA8bmctY29udGFpbmVyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImZvb3RlclRlbXBsYXRlIHx8IGRlZmF1bHRGb290ZXJUZW1wbGF0ZVwiXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogdGhpcyB9XCI+XG4gICAgPC9uZy1jb250YWluZXI+XG5cbjwvbmctdGVtcGxhdGU+XG5cbjxuZy10ZW1wbGF0ZSAjZGVmYXVsdEhlYWRlclRlbXBsYXRlPlxuPC9uZy10ZW1wbGF0ZT5cbiAgXG48bmctdGVtcGxhdGUgI2RlZmF1bHRGb290ZXJUZW1wbGF0ZT5cbjwvbmctdGVtcGxhdGU+XG4gICJdfQ==