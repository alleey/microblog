import { OnInit, TemplateRef } from '@angular/core';
import { BookmarkModel, BookmarkResponseModel } from '../../models/bookmark';
import { BookmarksService } from '../../services/bookmarks.service';
import * as i0 from "@angular/core";
export declare class BookmarkBadgeComponent implements OnInit {
    private service;
    url: string;
    caption: string;
    activeControlTemplate: TemplateRef<any> | undefined;
    inactiveControlTemplate: TemplateRef<any> | undefined;
    item?: BookmarkModel;
    loading: boolean;
    constructor(service: BookmarksService);
    ngOnInit(): void;
    get isActive(): boolean;
    responseHandler: {
        next: (result: BookmarkResponseModel) => void;
        error: (err: any) => void;
    };
    checkStatus(): void;
    createBookmark(): void;
    deleteBookmark(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BookmarkBadgeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BookmarkBadgeComponent, "bookmark-badge", never, { "url": "url"; "caption": "caption"; "activeControlTemplate": "activeControlTemplate"; "inactiveControlTemplate": "inactiveControlTemplate"; }, {}, never, never>;
}
