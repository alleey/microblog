import { Location } from '@angular/common';
import { OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicModel, TopicResponseModel } from '../../models/topic';
import { TopicsService } from '../../services/topics.service';
import * as i0 from "@angular/core";
export declare class TopicEditorComponent implements OnInit {
    private topicService;
    private router;
    private location;
    private activatedRoute;
    headerTemplate: TemplateRef<any> | undefined;
    paramTopicId?: string;
    updateMode: boolean;
    topicId?: number;
    topic: TopicModel | null;
    errorDesc: any;
    loading: boolean;
    form: FormGroup;
    constructor(topicService: TopicsService, router: Router, location: Location, activatedRoute: ActivatedRoute);
    ngOnInit(): void;
    get isUpdateMode(): boolean;
    get caption(): import("@angular/forms").AbstractControl | null;
    set theTopic(item: TopicModel);
    updateForm(): void;
    fetchResponseHandler: {
        next: (result: TopicResponseModel) => void;
        error: (err: any) => boolean;
    };
    fetchTopic(topicId: number): void;
    createNewTopic(): void;
    updateTopic(): void;
    cancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TopicEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TopicEditorComponent, "topic-editor", never, { "headerTemplate": "headerTemplate"; "paramTopicId": "topicId"; "updateMode": "updateMode"; }, {}, never, never>;
}
