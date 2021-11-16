import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ViewEvent } from 'utils';
import { FollowsModel } from '../../models/follows';

export type FollowerListViewEvent = ViewEvent<FollowsModel>;

@Component({
  selector: 'follower-list-view',
  templateUrl: './follower-list-view.component.html',
  styleUrls: ['./follower-list-view.component.css']
})
export class FollowersListViewComponent implements OnInit {

  @Input() items?: FollowsModel[];
  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() noContentsTemplate: TemplateRef<any> | undefined;
  @Input() context: any = {};

  @Output() onEvent = new EventEmitter<FollowerListViewEvent>();

  ngOnInit(): void {}
    
  selectItem(item: FollowsModel, opcode: string): void {
    this.onEvent.emit({
      opcode: opcode,
      item: item
    });
  }
}
