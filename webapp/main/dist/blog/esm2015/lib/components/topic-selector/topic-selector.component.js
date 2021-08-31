import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../topic-list-view/topic-list-view.component";
import * as i2 from "utils";
import * as i3 from "../topic-list/topic-list.component";
import * as i4 from "@angular/common";
export class TopicSelectorComponent {
    constructor() {
        this.maxTopics = 10;
        this.maxTopicsError = false;
        this.initialTopics = [];
        this.selectedTopics = [];
        this.topicClicked = (item) => {
            if (this.isTopicSelected(item))
                this.unselectTopic(item);
            else
                this.selectTopic(item);
        };
    }
    ngOnInit() {
        this.selectedTopics = this.initialTopics;
    }
    isTopicSelected(topic) {
        return this.selectedTopics.findIndex(i => i.caption.toUpperCase() === topic.caption.toUpperCase()) > -1;
    }
    selectTopic(topic) {
        this.maxTopicsError = (!!this.maxTopics && this.selectedTopics.length >= this.maxTopics);
        if (this.maxTopicsError) {
            return;
        }
        this.selectedTopics.push(topic);
        this.selectedTopics.sort((a, b) => a.caption.toUpperCase().localeCompare(b.caption.toUpperCase()));
    }
    unselectTopic(topic) {
        this.selectedTopics = this.selectedTopics.filter(i => i.caption.toUpperCase() !== topic.caption.toUpperCase());
        this.maxTopicsError = (!!this.maxTopics && this.selectedTopics.length >= this.maxTopics);
    }
}
TopicSelectorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: TopicSelectorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TopicSelectorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: TopicSelectorComponent, selector: "topic-selector", inputs: { maxTopics: "maxTopics", initialTopics: "initialTopics", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate" }, ngImport: i0, template: "\n\n<label class=\"form-label\">Selected Topics:</label>\n<div>\n    <blog-topic-list-view [topics]=\"selectedTopics\"></blog-topic-list-view>\n    <utils-alert *ngIf=\"maxTopicsError\" [dismissable]=\"true\" [minimal]=\"true\">\n        Sorry, cannot select more than {{maxTopics}} topics for a post.\n    </utils-alert>\n</div>\n<label class=\"form-label\">Available Topics:</label>\n<blog-topic-list \n    [itemTemplate]=\"itemTemplate\"\n    [noContentsTemplate]=\"noContentsTemplate\"\n    [onSelectTopic]=\"topicClicked\">\n</blog-topic-list>\n", styles: [""], components: [{ type: i1.TopicListViewComponent, selector: "blog-topic-list-view", inputs: ["topics", "itemTemplate", "noContentsTemplate"], outputs: ["onSelectItem"] }, { type: i2.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: i3.TopicListComponent, selector: "blog-topic-list", inputs: ["enableSearch", "filterText", "itemTemplate", "noContentsTemplate", "headerTemplate", "footerTemplate", "onSelectTopic"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: TopicSelectorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'topic-selector',
                    templateUrl: './topic-selector.component.html',
                    styleUrls: ['./topic-selector.component.css']
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { maxTopics: [{
                type: Input
            }], initialTopics: [{
                type: Input
            }], itemTemplate: [{
                type: Input
            }], noContentsTemplate: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9waWMtc2VsZWN0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYmxvZy9zcmMvbGliL2NvbXBvbmVudHMvdG9waWMtc2VsZWN0b3IvdG9waWMtc2VsZWN0b3IuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYmxvZy9zcmMvbGliL2NvbXBvbmVudHMvdG9waWMtc2VsZWN0b3IvdG9waWMtc2VsZWN0b3IuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXVCLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFRdEUsTUFBTSxPQUFPLHNCQUFzQjtJQWFqQztRQVZBLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFDdkIsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFHaEMsa0JBQWEsR0FBaUIsRUFBRSxDQUFDO1FBQ2pDLG1CQUFjLEdBQWlCLEVBQUUsQ0FBQztRQVdsQyxpQkFBWSxHQUNWLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDUCxJQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO2dCQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDOztnQkFFekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUE7SUFaYSxDQUFDO0lBRWpCLFFBQVE7UUFDTixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDM0MsQ0FBQztJQVVELGVBQWUsQ0FBQyxLQUFpQjtRQUMvQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDMUcsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFpQjtRQUUzQixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pGLElBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN0QixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBRSxDQUMvQixDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQy9ELENBQUM7SUFDSixDQUFDO0lBRUQsYUFBYSxDQUFDLEtBQWlCO1FBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUMvRyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNGLENBQUM7O21IQS9DVSxzQkFBc0I7dUdBQXRCLHNCQUFzQixrTUNSbkMsd2lCQWVBOzJGRFBhLHNCQUFzQjtrQkFMbEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixXQUFXLEVBQUUsaUNBQWlDO29CQUM5QyxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztpQkFDOUM7MEVBSUMsU0FBUztzQkFEUixLQUFLO2dCQUtOLGFBQWE7c0JBRFosS0FBSztnQkFJRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRvcGljTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvdG9waWMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0b3BpYy1zZWxlY3RvcicsXG4gIHRlbXBsYXRlVXJsOiAnLi90b3BpYy1zZWxlY3Rvci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RvcGljLXNlbGVjdG9yLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUb3BpY1NlbGVjdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKVxuICBtYXhUb3BpY3M6IG51bWJlciA9IDEwO1xuICBtYXhUb3BpY3NFcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGluaXRpYWxUb3BpY3M6IFRvcGljTW9kZWxbXSA9IFtdO1xuICBzZWxlY3RlZFRvcGljczogVG9waWNNb2RlbFtdID0gW107XG5cbiAgQElucHV0KCkgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBub0NvbnRlbnRzVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkVG9waWNzID0gdGhpcy5pbml0aWFsVG9waWNzO1xuICB9XG5cbiAgdG9waWNDbGlja2VkOiAodG9waWM6IFRvcGljTW9kZWwpID0+IHZvaWQgPSBcbiAgICAoaXRlbSkgPT4ge1xuICAgICAgaWYodGhpcy5pc1RvcGljU2VsZWN0ZWQoaXRlbSkpXG4gICAgICAgIHRoaXMudW5zZWxlY3RUb3BpYyhpdGVtKTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGhpcy5zZWxlY3RUb3BpYyhpdGVtKTtcbiAgICB9XG5cbiAgaXNUb3BpY1NlbGVjdGVkKHRvcGljOiBUb3BpY01vZGVsKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRUb3BpY3MuZmluZEluZGV4KGkgPT4gaS5jYXB0aW9uLnRvVXBwZXJDYXNlKCkgPT09IHRvcGljLmNhcHRpb24udG9VcHBlckNhc2UoKSkgPiAtMTtcbiAgfVxuXG4gIHNlbGVjdFRvcGljKHRvcGljOiBUb3BpY01vZGVsKTogdm9pZCB7XG5cbiAgICB0aGlzLm1heFRvcGljc0Vycm9yID0gKCEhdGhpcy5tYXhUb3BpY3MgJiYgdGhpcy5zZWxlY3RlZFRvcGljcy5sZW5ndGggPj0gdGhpcy5tYXhUb3BpY3MpO1xuICAgIGlmKHRoaXMubWF4VG9waWNzRXJyb3IpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGVkVG9waWNzLnB1c2godG9waWMpO1xuICAgIHRoaXMuc2VsZWN0ZWRUb3BpY3Muc29ydCgoYSxiKSA9PiBcbiAgICAgIGEuY2FwdGlvbi50b1VwcGVyQ2FzZSgpLmxvY2FsZUNvbXBhcmUoYi5jYXB0aW9uLnRvVXBwZXJDYXNlKCkpXG4gICAgKTtcbiAgfVxuXG4gIHVuc2VsZWN0VG9waWModG9waWM6IFRvcGljTW9kZWwpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkVG9waWNzID0gdGhpcy5zZWxlY3RlZFRvcGljcy5maWx0ZXIoaSA9PiBpLmNhcHRpb24udG9VcHBlckNhc2UoKSAhPT0gdG9waWMuY2FwdGlvbi50b1VwcGVyQ2FzZSgpKTtcbiAgICB0aGlzLm1heFRvcGljc0Vycm9yID0gKCEhdGhpcy5tYXhUb3BpY3MgJiYgdGhpcy5zZWxlY3RlZFRvcGljcy5sZW5ndGggPj0gdGhpcy5tYXhUb3BpY3MpO1xuICB9XG59XG4iLCJcblxuPGxhYmVsIGNsYXNzPVwiZm9ybS1sYWJlbFwiPlNlbGVjdGVkIFRvcGljczo8L2xhYmVsPlxuPGRpdj5cbiAgICA8YmxvZy10b3BpYy1saXN0LXZpZXcgW3RvcGljc109XCJzZWxlY3RlZFRvcGljc1wiPjwvYmxvZy10b3BpYy1saXN0LXZpZXc+XG4gICAgPHV0aWxzLWFsZXJ0ICpuZ0lmPVwibWF4VG9waWNzRXJyb3JcIiBbZGlzbWlzc2FibGVdPVwidHJ1ZVwiIFttaW5pbWFsXT1cInRydWVcIj5cbiAgICAgICAgU29ycnksIGNhbm5vdCBzZWxlY3QgbW9yZSB0aGFuIHt7bWF4VG9waWNzfX0gdG9waWNzIGZvciBhIHBvc3QuXG4gICAgPC91dGlscy1hbGVydD5cbjwvZGl2PlxuPGxhYmVsIGNsYXNzPVwiZm9ybS1sYWJlbFwiPkF2YWlsYWJsZSBUb3BpY3M6PC9sYWJlbD5cbjxibG9nLXRvcGljLWxpc3QgXG4gICAgW2l0ZW1UZW1wbGF0ZV09XCJpdGVtVGVtcGxhdGVcIlxuICAgIFtub0NvbnRlbnRzVGVtcGxhdGVdPVwibm9Db250ZW50c1RlbXBsYXRlXCJcbiAgICBbb25TZWxlY3RUb3BpY109XCJ0b3BpY0NsaWNrZWRcIj5cbjwvYmxvZy10b3BpYy1saXN0PlxuIl19