import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { ViewEvent } from 'utils';
import { FollowedByModel } from '../../models/followed-by';
import * as i0 from "@angular/core";
export declare type FollowerListViewEvent = ViewEvent<FollowedByModel>;
export declare class FollowersListViewComponent implements OnInit {
    items?: FollowedByModel[];
    itemTemplate: TemplateRef<any> | undefined;
    noContentsTemplate: TemplateRef<any> | undefined;
    onSelectItem: EventEmitter<FollowerListViewEvent>;
    ngOnInit(): void;
    selectItem(item: FollowedByModel, opcode: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FollowersListViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FollowersListViewComponent, "followed-by-list-view", never, { "items": "items"; "itemTemplate": "itemTemplate"; "noContentsTemplate": "noContentsTemplate"; }, { "onSelectItem": "onSelectItem"; }, never, never>;
}
