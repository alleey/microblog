import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class BookmarkListViewComponent {
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
BookmarkListViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BookmarkListViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
BookmarkListViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: BookmarkListViewComponent, selector: "bookmark-list-view", inputs: { bookmarks: "bookmarks", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate" }, outputs: { onSelectItem: "onSelectItem" }, ngImport: i0, template: "<ng-container *ngIf=\"bookmarks\">\n    <ul class=\"list-group checked-list-box\">\n        <li class=\"list-group-item\" *ngFor=\"let x of bookmarks; index as i\">\n            <ng-container \n                [ngTemplateOutlet]=\"itemTemplate || defaultItemTemplate\"\n                [ngTemplateOutletContext]=\"{ $implicit: x, index: i, list: this }\">\n            </ng-container>\n        </li>\n    </ul>\n</ng-container>\n<ng-container *ngIf=\"!bookmarks\">\n    <ng-container \n        [ngTemplateOutlet]=\"noContentsTemplate || defaultNoContentsTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n</ng-container>\n\n<ng-template #defaultItemTemplate let-item let-parent=\"list\">\n    <i class=\"fa fa-times\" (click)=\"parent.selectItem(item, 'delete')\"></i>\n    <a class=\"ml-2\" class=\"ml-1 bookmark-list-bookmark-title\" (click)=\"parent.selectItem(item, 'select')\">{{item.caption}}</a>\n</ng-template>\n\n<ng-template #defaultNoContentsTemplate let-item>\n    No bookmark found!\n</ng-template>", styles: [".bookmark-list-bookmark-title{cursor:pointer}"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BookmarkListViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bookmark-list-view',
                    templateUrl: './bookmark-list-view.component.html',
                    styleUrls: ['./bookmark-list-view.component.scss']
                }]
        }], propDecorators: { bookmarks: [{
                type: Input
            }], itemTemplate: [{
                type: Input
            }], noContentsTemplate: [{
                type: Input
            }], onSelectItem: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9va21hcmstbGlzdC12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2Jvb2ttYXJrcy9zcmMvbGliL2NvbXBvbmVudHMvYm9va21hcmstbGlzdC12aWV3L2Jvb2ttYXJrLWxpc3Qtdmlldy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ib29rbWFya3Mvc3JjL2xpYi9jb21wb25lbnRzL2Jvb2ttYXJrLWxpc3Qtdmlldy9ib29rbWFyay1saXN0LXZpZXcuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBZ0IsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQWUsTUFBTSxlQUFlLENBQUM7OztBQVcxRyxNQUFNLE9BQU8seUJBQXlCO0lBTHRDO1FBWUUsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBeUIsQ0FBQztLQVUxRDtJQVJDLFFBQVEsS0FBVSxDQUFDO0lBRW5CLFVBQVUsQ0FBQyxJQUFtQixFQUFFLE1BQWM7UUFDNUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7WUFDckIsTUFBTSxFQUFFLE1BQU07WUFDZCxJQUFJLEVBQUUsSUFBSTtTQUNYLENBQUMsQ0FBQztJQUNMLENBQUM7O3NIQWhCVSx5QkFBeUI7MEdBQXpCLHlCQUF5QixpTkNYdEMsK2hDQXdCYzsyRkRiRCx5QkFBeUI7a0JBTHJDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsV0FBVyxFQUFFLHFDQUFxQztvQkFDbEQsU0FBUyxFQUFFLENBQUMscUNBQXFDLENBQUM7aUJBQ25EOzhCQUdVLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBR04sWUFBWTtzQkFEWCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmlld0V2ZW50IH0gZnJvbSAndXRpbHMnO1xuaW1wb3J0IHsgQm9va21hcmtNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9ib29rbWFyayc7XG5cbmV4cG9ydCB0eXBlIEJvb2ttYXJrTGlzdFZpZXdFdmVudCA9IFZpZXdFdmVudDxCb29rbWFya01vZGVsPjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYm9va21hcmstbGlzdC12aWV3JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Jvb2ttYXJrLWxpc3Qtdmlldy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Jvb2ttYXJrLWxpc3Qtdmlldy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEJvb2ttYXJrTGlzdFZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGJvb2ttYXJrcz86IEJvb2ttYXJrTW9kZWxbXTtcbiAgQElucHV0KCkgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBub0NvbnRlbnRzVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgQE91dHB1dCgpIFxuICBvblNlbGVjdEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPEJvb2ttYXJrTGlzdFZpZXdFdmVudD4oKTtcblxuICBuZ09uSW5pdCgpOiB2b2lkIHt9XG4gICAgXG4gIHNlbGVjdEl0ZW0oaXRlbTogQm9va21hcmtNb2RlbCwgb3Bjb2RlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLm9uU2VsZWN0SXRlbS5lbWl0KHtcbiAgICAgIG9wY29kZTogb3Bjb2RlLFxuICAgICAgaXRlbTogaXRlbVxuICAgIH0pO1xuICB9XG59IiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cImJvb2ttYXJrc1wiPlxuICAgIDx1bCBjbGFzcz1cImxpc3QtZ3JvdXAgY2hlY2tlZC1saXN0LWJveFwiPlxuICAgICAgICA8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIiAqbmdGb3I9XCJsZXQgeCBvZiBib29rbWFya3M7IGluZGV4IGFzIGlcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgXG4gICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiaXRlbVRlbXBsYXRlIHx8IGRlZmF1bHRJdGVtVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogeCwgaW5kZXg6IGksIGxpc3Q6IHRoaXMgfVwiPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbGk+XG4gICAgPC91bD5cbjwvbmctY29udGFpbmVyPlxuPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFib29rbWFya3NcIj5cbiAgICA8bmctY29udGFpbmVyIFxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJub0NvbnRlbnRzVGVtcGxhdGUgfHwgZGVmYXVsdE5vQ29udGVudHNUZW1wbGF0ZVwiXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogdGhpcyB9XCI+XG4gICAgPC9uZy1jb250YWluZXI+XG48L25nLWNvbnRhaW5lcj5cblxuPG5nLXRlbXBsYXRlICNkZWZhdWx0SXRlbVRlbXBsYXRlIGxldC1pdGVtIGxldC1wYXJlbnQ9XCJsaXN0XCI+XG4gICAgPGkgY2xhc3M9XCJmYSBmYS10aW1lc1wiIChjbGljayk9XCJwYXJlbnQuc2VsZWN0SXRlbShpdGVtLCAnZGVsZXRlJylcIj48L2k+XG4gICAgPGEgY2xhc3M9XCJtbC0yXCIgY2xhc3M9XCJtbC0xIGJvb2ttYXJrLWxpc3QtYm9va21hcmstdGl0bGVcIiAoY2xpY2spPVwicGFyZW50LnNlbGVjdEl0ZW0oaXRlbSwgJ3NlbGVjdCcpXCI+e3tpdGVtLmNhcHRpb259fTwvYT5cbjwvbmctdGVtcGxhdGU+XG5cbjxuZy10ZW1wbGF0ZSAjZGVmYXVsdE5vQ29udGVudHNUZW1wbGF0ZSBsZXQtaXRlbT5cbiAgICBObyBib29rbWFyayBmb3VuZCFcbjwvbmctdGVtcGxhdGU+Il19