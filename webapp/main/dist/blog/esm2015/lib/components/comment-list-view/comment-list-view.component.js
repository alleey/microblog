import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "utils";
export class CommentListViewComponent {
    constructor() {
        this.onSelectItem = new EventEmitter();
    }
    ngOnInit() { }
    selectItem(entity) {
        this.onSelectItem.emit(entity);
    }
}
CommentListViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: CommentListViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CommentListViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: CommentListViewComponent, selector: "comment-list-view", inputs: { comments: "comments", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate" }, outputs: { onSelectItem: "onSelectItem" }, ngImport: i0, template: "<ng-container *ngIf=\"comments\">\n    <div *ngFor=\"let x of comments\" class=\"bg-light\">\n        <ng-container \n            [ngTemplateOutlet]=\"itemTemplate || defaultItemTemplate\"\n            [ngTemplateOutletContext]=\"{ $implicit: x, list: this }\">\n        </ng-container>\n    </div>\n</ng-container>\n<ng-container *ngIf=\"!comments\">\n    <ng-container \n        [ngTemplateOutlet]=\"noContentsTemplate || defaultNoContentsTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n</ng-container>\n\n<ng-template #defaultItemTemplate let-item>\n    <div class=\"created\"> {{item.owner}} commented on {{ item.createdOn | prettyDate }}.</div>\n    <p class=\"posttext \">\n      {{item.text}} \n    </p>\n    <hr class=\"my-4\">\n</ng-template>\n\n<ng-template #defaultNoContentsTemplate let-item>\n    No comments yet!\n</ng-template>\n", styles: [""], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], pipes: { "prettyDate": i2.PrettyDatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: CommentListViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'comment-list-view',
                    templateUrl: './comment-list-view.component.html',
                    styleUrls: ['./comment-list-view.component.css']
                }]
        }], propDecorators: { comments: [{
                type: Input
            }], itemTemplate: [{
                type: Input
            }], noContentsTemplate: [{
                type: Input
            }], onSelectItem: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC1saXN0LXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYmxvZy9zcmMvbGliL2NvbXBvbmVudHMvY29tbWVudC1saXN0LXZpZXcvY29tbWVudC1saXN0LXZpZXcuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYmxvZy9zcmMvbGliL2NvbXBvbmVudHMvY29tbWVudC1saXN0LXZpZXcvY29tbWVudC1saXN0LXZpZXcuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBZSxNQUFNLGVBQWUsQ0FBQzs7OztBQVE1RixNQUFNLE9BQU8sd0JBQXdCO0lBTHJDO1FBWVksaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBZ0IsQ0FBQztLQU8zRDtJQUxDLFFBQVEsS0FBVSxDQUFDO0lBRW5CLFVBQVUsQ0FBQyxNQUFvQjtRQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqQyxDQUFDOztxSEFiVSx3QkFBd0I7eUdBQXhCLHdCQUF3Qiw4TUNSckMsMjNCQTBCQTsyRkRsQmEsd0JBQXdCO2tCQUxwQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFdBQVcsRUFBRSxvQ0FBb0M7b0JBQ2pELFNBQVMsRUFBRSxDQUFDLG1DQUFtQyxDQUFDO2lCQUNqRDs4QkFHVSxRQUFRO3NCQUFoQixLQUFLO2dCQUVHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csa0JBQWtCO3NCQUExQixLQUFLO2dCQUVJLFlBQVk7c0JBQXJCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbWVudE1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2NvbW1lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjb21tZW50LWxpc3QtdmlldycsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb21tZW50LWxpc3Qtdmlldy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NvbW1lbnQtbGlzdC12aWV3LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDb21tZW50TGlzdFZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGNvbW1lbnRzITogQ29tbWVudE1vZGVsW107XG5cbiAgQElucHV0KCkgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBub0NvbnRlbnRzVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgQE91dHB1dCgpIG9uU2VsZWN0SXRlbSA9IG5ldyBFdmVudEVtaXR0ZXI8Q29tbWVudE1vZGVsPigpO1xuXG4gIG5nT25Jbml0KCk6IHZvaWQge31cblxuICBzZWxlY3RJdGVtKGVudGl0eTogQ29tbWVudE1vZGVsKTogdm9pZCB7XG4gICAgdGhpcy5vblNlbGVjdEl0ZW0uZW1pdChlbnRpdHkpO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiY29tbWVudHNcIj5cbiAgICA8ZGl2ICpuZ0Zvcj1cImxldCB4IG9mIGNvbW1lbnRzXCIgY2xhc3M9XCJiZy1saWdodFwiPlxuICAgICAgICA8bmctY29udGFpbmVyIFxuICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiaXRlbVRlbXBsYXRlIHx8IGRlZmF1bHRJdGVtVGVtcGxhdGVcIlxuICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiB4LCBsaXN0OiB0aGlzIH1cIj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cbjxuZy1jb250YWluZXIgKm5nSWY9XCIhY29tbWVudHNcIj5cbiAgICA8bmctY29udGFpbmVyIFxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJub0NvbnRlbnRzVGVtcGxhdGUgfHwgZGVmYXVsdE5vQ29udGVudHNUZW1wbGF0ZVwiXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogdGhpcyB9XCI+XG4gICAgPC9uZy1jb250YWluZXI+XG48L25nLWNvbnRhaW5lcj5cblxuPG5nLXRlbXBsYXRlICNkZWZhdWx0SXRlbVRlbXBsYXRlIGxldC1pdGVtPlxuICAgIDxkaXYgY2xhc3M9XCJjcmVhdGVkXCI+IHt7aXRlbS5vd25lcn19IGNvbW1lbnRlZCBvbiB7eyBpdGVtLmNyZWF0ZWRPbiB8IHByZXR0eURhdGUgfX0uPC9kaXY+XG4gICAgPHAgY2xhc3M9XCJwb3N0dGV4dCBcIj5cbiAgICAgIHt7aXRlbS50ZXh0fX0gXG4gICAgPC9wPlxuICAgIDxociBjbGFzcz1cIm15LTRcIj5cbjwvbmctdGVtcGxhdGU+XG5cbjxuZy10ZW1wbGF0ZSAjZGVmYXVsdE5vQ29udGVudHNUZW1wbGF0ZSBsZXQtaXRlbT5cbiAgICBObyBjb21tZW50cyB5ZXQhXG48L25nLXRlbXBsYXRlPlxuIl19