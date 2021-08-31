import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ViewEvent } from 'utils';
import { FollowedByModel } from '../../models/followed-by';

export type FollowerListViewEvent = ViewEvent<FollowedByModel>;

@Component({
  selector: 'followed-by-list-view',
  templateUrl: './followed-by-list-view.component.html',
  styleUrls: ['./followed-by-list-view.component.css']
})
export class FollowersListViewComponent implements OnInit {

  @Input() items?: FollowedByModel[];
  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() noContentsTemplate: TemplateRef<any> | undefined;

  @Output() 
  onSelectItem = new EventEmitter<FollowerListViewEvent>();

  ngOnInit(): void {}
    
  selectItem(item: FollowedByModel, opcode: string): void {
    this.onSelectItem.emit({
      opcode: opcode,
      item: item
    });
  }
}
