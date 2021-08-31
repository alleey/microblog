import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { ViewEvent } from 'utils';
import { FollowingModel } from '../../models/following';
import * as i0 from "@angular/core";
export declare type FollowingListViewEvent = ViewEvent<FollowingModel>;
export declare class FollowingListViewComponent implements OnInit {
    items?: FollowingModel[];
    itemTemplate: TemplateRef<any> | undefined;
    noContentsTemplate: TemplateRef<any> | undefined;
    onSelectItem: EventEmitter<FollowingListViewEvent>;
    ngOnInit(): void;
    selectItem(item: FollowingModel, opcode: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FollowingListViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FollowingListViewComponent, "following-list-view", never, { "items": "items"; "itemTemplate": "itemTemplate"; "noContentsTemplate": "noContentsTemplate"; }, { "onSelectItem": "onSelectItem"; }, never, never>;
}
