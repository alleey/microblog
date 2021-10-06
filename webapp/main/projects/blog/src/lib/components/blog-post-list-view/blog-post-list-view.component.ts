import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ViewEvent } from 'utils';
import { BlogPostModel } from '../../models/blog-post';

export type BlogPostListViewEvent = ViewEvent<BlogPostModel>;

@Component({
  selector: 'blog-post-list-view',
  templateUrl: './blog-post-list-view.component.html',
  styleUrls: ['./blog-post-list-view.component.scss'],
})
export class BlogPostListViewComponent implements OnInit {

  @Input() items?: BlogPostModel[];
  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() noContentsTemplate: TemplateRef<any> | undefined;

  @Output() onEvent = new EventEmitter<BlogPostListViewEvent>();

  ngOnInit(): void {}

  selectItem(item: BlogPostModel, opcode: string): void {
    this.onEvent.emit({
      opcode: opcode,
      item: item
    });
  }
}
