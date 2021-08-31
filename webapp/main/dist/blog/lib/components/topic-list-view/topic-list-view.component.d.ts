import { OnInit, EventEmitter, TemplateRef } from '@angular/core';
import { ViewEvent } from 'utils';
import { TopicModel } from '../../models/topic';
import * as i0 from "@angular/core";
export declare type TopicListViewEvent = ViewEvent<TopicModel>;
export declare class TopicListViewComponent implements OnInit {
    topics: TopicModel[];
    itemTemplate: TemplateRef<any> | undefined;
    noContentsTemplate: TemplateRef<any> | undefined;
    onSelectItem: EventEmitter<TopicListViewEvent>;
    ngOnInit(): void;
    selectItem(item: TopicModel, opcode: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TopicListViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TopicListViewComponent, "blog-topic-list-view", never, { "topics": "topics"; "itemTemplate": "itemTemplate"; "noContentsTemplate": "noContentsTemplate"; }, { "onSelectItem": "onSelectItem"; }, never, never>;
}
