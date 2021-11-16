import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ViewEvent } from 'utils';
import { FollowsModel } from '../../models/follows';

export type FollowingListViewEvent = ViewEvent<FollowsModel>;

@Component({
  selector: 'following-list-view',
  templateUrl: './following-list-view.component.html',
  styleUrls: ['./following-list-view.component.css']
})
export class FollowingListViewComponent implements OnInit {

  @Input() items?: FollowsModel[];
  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() noContentsTemplate: TemplateRef<any> | undefined;
  @Input() context: any = {};

  @Output() onEvent = new EventEmitter<FollowingListViewEvent>();

  ngOnInit(): void {}
    
  selectItem(item: FollowsModel, opcode: string): void {
    this.onEvent.emit({
      opcode: opcode,
      item: item
    });
  }
}
