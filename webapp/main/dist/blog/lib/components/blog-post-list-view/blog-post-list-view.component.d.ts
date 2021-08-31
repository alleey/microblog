import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { ViewEvent } from 'utils';
import { BlogPostModel } from '../../models/blog-post';
import * as i0 from "@angular/core";
export declare type BlogPostListViewEvent = ViewEvent<BlogPostModel>;
export declare class BlogPostListViewComponent implements OnInit {
    posts: BlogPostModel[];
    itemTemplate: TemplateRef<any> | undefined;
    noContentsTemplate: TemplateRef<any> | undefined;
    onSelectItem: EventEmitter<BlogPostListViewEvent>;
    ngOnInit(): void;
    selectItem(item: BlogPostModel, opcode: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BlogPostListViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BlogPostListViewComponent, "blog-post-list-view", never, { "posts": "posts"; "itemTemplate": "itemTemplate"; "noContentsTemplate": "noContentsTemplate"; }, { "onSelectItem": "onSelectItem"; }, never, never>;
}
