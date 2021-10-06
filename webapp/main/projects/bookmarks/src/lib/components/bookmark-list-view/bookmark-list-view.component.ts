import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ViewEvent } from 'utils';
import { BookmarkModel } from '../../models/bookmark';

export type BookmarkListViewEvent = ViewEvent<BookmarkModel>;

@Component({
  selector: 'bookmark-list-view',
  templateUrl: './bookmark-list-view.component.html',
  styleUrls: ['./bookmark-list-view.component.scss']
})
export class BookmarkListViewComponent implements OnInit {

  @Input() bookmarks?: BookmarkModel[];
  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() noContentsTemplate: TemplateRef<any> | undefined;

  @Output() onEvent = new EventEmitter<BookmarkListViewEvent>();

  ngOnInit(): void {}
    
  selectItem(item: BookmarkModel, opcode: string): void {
    this.onEvent.emit({
      opcode: opcode,
      item: item
    });
  }
}