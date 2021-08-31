import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { ViewEvent } from 'utils';
import { BookmarkModel } from '../../models/bookmark';
import * as i0 from "@angular/core";
export declare type BookmarkListViewEvent = ViewEvent<BookmarkModel>;
export declare class BookmarkListViewComponent implements OnInit {
    bookmarks?: BookmarkModel[];
    itemTemplate: TemplateRef<any> | undefined;
    noContentsTemplate: TemplateRef<any> | undefined;
    onSelectItem: EventEmitter<BookmarkListViewEvent>;
    ngOnInit(): void;
    selectItem(item: BookmarkModel, opcode: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BookmarkListViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BookmarkListViewComponent, "bookmark-list-view", never, { "bookmarks": "bookmarks"; "itemTemplate": "itemTemplate"; "noContentsTemplate": "noContentsTemplate"; }, { "onSelectItem": "onSelectItem"; }, never, never>;
}
