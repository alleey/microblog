import { OnInit, TemplateRef } from '@angular/core';
import { TopicModel } from '../../models/topic';
import * as i0 from "@angular/core";
export declare class TopicSelectorComponent implements OnInit {
    maxTopics: number;
    maxTopicsError: boolean;
    initialTopics: TopicModel[];
    selectedTopics: TopicModel[];
    itemTemplate: TemplateRef<any> | undefined;
    noContentsTemplate: TemplateRef<any> | undefined;
    constructor();
    ngOnInit(): void;
    topicClicked: (topic: TopicModel) => void;
    isTopicSelected(topic: TopicModel): boolean;
    selectTopic(topic: TopicModel): void;
    unselectTopic(topic: TopicModel): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TopicSelectorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TopicSelectorComponent, "topic-selector", never, { "maxTopics": "maxTopics"; "initialTopics": "initialTopics"; "itemTemplate": "itemTemplate"; "noContentsTemplate": "noContentsTemplate"; }, {}, never, never>;
}
