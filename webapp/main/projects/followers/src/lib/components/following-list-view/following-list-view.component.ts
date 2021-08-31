import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ViewEvent } from 'utils';
import { FollowingModel } from '../../models/following';

export type FollowingListViewEvent = ViewEvent<FollowingModel>;

@Component({
  selector: 'following-list-view',
  templateUrl: './following-list-view.component.html',
  styleUrls: ['./following-list-view.component.css']
})
export class FollowingListViewComponent implements OnInit {

  @Input() items?: FollowingModel[];
  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() noContentsTemplate: TemplateRef<any> | undefined;

  @Output() 
  onSelectItem = new EventEmitter<FollowingListViewEvent>();

  ngOnInit(): void {}
    
  selectItem(item: FollowingModel, opcode: string): void {
    this.onSelectItem.emit({
      opcode: opcode,
      item: item
    });
  }
}
