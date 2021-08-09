import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { CommentModel } from '../../models/comment';

@Component({
  selector: 'comment-list-view',
  templateUrl: './comment-list-view.component.html',
  styleUrls: ['./comment-list-view.component.css']
})
export class CommentListViewComponent implements OnInit {

  @Input() comments!: CommentModel[];

  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() noContentsTemplate: TemplateRef<any> | undefined;

  @Output() onSelectItem = new EventEmitter<CommentModel>();

  ngOnInit(): void {}

  selectItem(entity: CommentModel): void {
    this.onSelectItem.emit(entity);
  }
}
