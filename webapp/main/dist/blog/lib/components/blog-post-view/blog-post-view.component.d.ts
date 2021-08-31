import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { ViewEvent } from 'utils';
import { BlogPostModel } from '../../models/blog-post';
import { TopicModel } from '../../models/topic';
import * as i0 from "@angular/core";
export declare type BlogPostViewEvent = ViewEvent<BlogPostModel>;
export declare class BlogPostViewComponent implements OnInit {
    post: BlogPostModel;
    topics: TopicModel[];
    enableComments: boolean;
    headerTemplate: TemplateRef<any> | undefined;
    contentTemplate: TemplateRef<any> | undefined;
    footerTemplate: TemplateRef<any> | undefined;
    onSelectItem: EventEmitter<BlogPostViewEvent>;
    constructor();
    ngOnInit(): void;
    get postId(): number;
    selectItem(item: BlogPostModel, opcode: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BlogPostViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BlogPostViewComponent, "blog-post-view", never, { "post": "post"; "topics": "topics"; "enableComments": "enableComments"; "headerTemplate": "headerTemplate"; "contentTemplate": "contentTemplate"; "footerTemplate": "footerTemplate"; }, { "onSelectItem": "onSelectItem"; }, never, never>;
}
