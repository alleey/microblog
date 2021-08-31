import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class TopicListViewComponent {
    constructor() {
        this.onSelectItem = new EventEmitter();
    }
    ngOnInit() { }
    selectItem(item, opcode) {
        this.onSelectItem.emit({
            opcode: opcode,
            item: item
        });
    }
}
TopicListViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: TopicListViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TopicListViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: TopicListViewComponent, selector: "blog-topic-list-view", inputs: { topics: "topics", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate" }, outputs: { onSelectItem: "onSelectItem" }, ngImport: i0, template: "<ng-container *ngIf=\"topics\">\n    <ng-container *ngFor=\"let x of topics; index as i\">\n        <ng-container \n            [ngTemplateOutlet]=\"itemTemplate || defaultItemTemplate\"\n            [ngTemplateOutletContext]=\"{ $implicit: x, index: i, list: this }\">\n        </ng-container>\n    </ng-container>\n</ng-container>\n<ng-container *ngIf=\"!topics\">\n    <ng-container \n        [ngTemplateOutlet]=\"noContentsTemplate || defaultNoContentsTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n</ng-container>\n\n<ng-template #defaultItemTemplate let-item let-parent=\"list\">\n    <a class=\"btn btn-danger m-1\" role=\"button\" (click)=\"parent.selectItem(item, 'select')\">{{item.caption}}</a>\n</ng-template>\n\n<ng-template #defaultNoContentsTemplate let-item>\n    No topic found!\n</ng-template>", styles: [""], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: TopicListViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'blog-topic-list-view',
                    templateUrl: './topic-list-view.component.html',
                    styleUrls: ['./topic-list-view.component.scss']
                }]
        }], propDecorators: { topics: [{
                type: Input
            }], itemTemplate: [{
                type: Input
            }], noContentsTemplate: [{
                type: Input
            }], onSelectItem: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9waWMtbGlzdC12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2Jsb2cvc3JjL2xpYi9jb21wb25lbnRzL3RvcGljLWxpc3Qtdmlldy90b3BpYy1saXN0LXZpZXcuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYmxvZy9zcmMvbGliL2NvbXBvbmVudHMvdG9waWMtbGlzdC12aWV3L3RvcGljLWxpc3Qtdmlldy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUE2QixNQUFNLGVBQWUsQ0FBQzs7O0FBVzFHLE1BQU0sT0FBTyxzQkFBc0I7SUFMbkM7UUFhRSxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFzQixDQUFDO0tBVXZEO0lBUkMsUUFBUSxLQUFVLENBQUM7SUFFbkIsVUFBVSxDQUFDLElBQWdCLEVBQUUsTUFBYztRQUN6QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztZQUNyQixNQUFNLEVBQUUsTUFBTTtZQUNkLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7bUhBakJVLHNCQUFzQjt1R0FBdEIsc0JBQXNCLDZNQ1huQywyMUJBcUJjOzJGRFZELHNCQUFzQjtrQkFMbEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxXQUFXLEVBQUUsa0NBQWtDO29CQUMvQyxTQUFTLEVBQUUsQ0FBQyxrQ0FBa0MsQ0FBQztpQkFDaEQ7OEJBR1UsTUFBTTtzQkFBZCxLQUFLO2dCQUVHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csa0JBQWtCO3NCQUExQixLQUFLO2dCQUdOLFlBQVk7c0JBRFgsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENvbnRlbnRDaGlsZCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZpZXdFdmVudCB9IGZyb20gJ3V0aWxzJztcbmltcG9ydCB7IFRvcGljTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvdG9waWMnO1xuXG5leHBvcnQgdHlwZSBUb3BpY0xpc3RWaWV3RXZlbnQgPSBWaWV3RXZlbnQ8VG9waWNNb2RlbD47XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Jsb2ctdG9waWMtbGlzdC12aWV3JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RvcGljLWxpc3Qtdmlldy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RvcGljLWxpc3Qtdmlldy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRvcGljTGlzdFZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIHRvcGljcyE6IFRvcGljTW9kZWxbXTtcblxuICBASW5wdXQoKSBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIG5vQ29udGVudHNUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICBAT3V0cHV0KClcbiAgb25TZWxlY3RJdGVtID0gbmV3IEV2ZW50RW1pdHRlcjxUb3BpY0xpc3RWaWV3RXZlbnQ+KCk7XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7fVxuXG4gIHNlbGVjdEl0ZW0oaXRlbTogVG9waWNNb2RlbCwgb3Bjb2RlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLm9uU2VsZWN0SXRlbS5lbWl0KHtcbiAgICAgIG9wY29kZTogb3Bjb2RlLFxuICAgICAgaXRlbTogaXRlbVxuICAgIH0pO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwidG9waWNzXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgeCBvZiB0b3BpY3M7IGluZGV4IGFzIGlcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciBcbiAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIml0ZW1UZW1wbGF0ZSB8fCBkZWZhdWx0SXRlbVRlbXBsYXRlXCJcbiAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogeCwgaW5kZXg6IGksIGxpc3Q6IHRoaXMgfVwiPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbjwvbmctY29udGFpbmVyPlxuPG5nLWNvbnRhaW5lciAqbmdJZj1cIiF0b3BpY3NcIj5cbiAgICA8bmctY29udGFpbmVyIFxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJub0NvbnRlbnRzVGVtcGxhdGUgfHwgZGVmYXVsdE5vQ29udGVudHNUZW1wbGF0ZVwiXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogdGhpcyB9XCI+XG4gICAgPC9uZy1jb250YWluZXI+XG48L25nLWNvbnRhaW5lcj5cblxuPG5nLXRlbXBsYXRlICNkZWZhdWx0SXRlbVRlbXBsYXRlIGxldC1pdGVtIGxldC1wYXJlbnQ9XCJsaXN0XCI+XG4gICAgPGEgY2xhc3M9XCJidG4gYnRuLWRhbmdlciBtLTFcIiByb2xlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInBhcmVudC5zZWxlY3RJdGVtKGl0ZW0sICdzZWxlY3QnKVwiPnt7aXRlbS5jYXB0aW9ufX08L2E+XG48L25nLXRlbXBsYXRlPlxuXG48bmctdGVtcGxhdGUgI2RlZmF1bHROb0NvbnRlbnRzVGVtcGxhdGUgbGV0LWl0ZW0+XG4gICAgTm8gdG9waWMgZm91bmQhXG48L25nLXRlbXBsYXRlPiJdfQ==