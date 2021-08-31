import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { CommentModel } from '../../models/comment';
import * as i0 from "@angular/core";
export declare class CommentListViewComponent implements OnInit {
    comments: CommentModel[];
    itemTemplate: TemplateRef<any> | undefined;
    noContentsTemplate: TemplateRef<any> | undefined;
    onSelectItem: EventEmitter<CommentModel>;
    ngOnInit(): void;
    selectItem(entity: CommentModel): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CommentListViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CommentListViewComponent, "comment-list-view", never, { "comments": "comments"; "itemTemplate": "itemTemplate"; "noContentsTemplate": "noContentsTemplate"; }, { "onSelectItem": "onSelectItem"; }, never, never>;
}
