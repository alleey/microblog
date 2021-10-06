import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ViewEvent } from 'utils';
import { CommentModel } from '../../models/comment';

export type CommentListViewEvent = ViewEvent<CommentModel>;

@Component({
  selector: 'comment-list-view',
  templateUrl: './comment-list-view.component.html',
  styleUrls: ['./comment-list-view.component.css']
})
export class CommentListViewComponent implements OnInit {

  @Input() items?: CommentModel[];
  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() noContentsTemplate: TemplateRef<any> | undefined;

  @Output() onEvent = new EventEmitter<CommentListViewEvent>();

  ngOnInit(): void {}

  selectItem(item: CommentModel, opcode: string): void {
    this.onEvent.emit({
      opcode: opcode,
      item: item
    });
  }
}
