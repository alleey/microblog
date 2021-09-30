import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ViewEvent } from 'utils';
import { BlogPostModel } from '../../models/blog-post';
import { TopicModel } from '../../models/topic';

export type BlogPostViewEvent = ViewEvent<BlogPostModel>;

@Component({
  selector: 'blog-post-view',
  templateUrl: './blog-post-view.component.html',
  styleUrls: ['./blog-post-view.component.scss']
})
export class BlogPostViewComponent implements OnInit {

  @Input() item!: BlogPostModel;
  @Input() topics!: TopicModel[];
  @Input() enableComments: boolean = true;

  @Input() headerTemplate: TemplateRef<any> | undefined;
  @Input() contentTemplate: TemplateRef<any> | undefined;
  @Input() footerTemplate: TemplateRef<any> | undefined;

  @Output() onSelectItem = new EventEmitter<BlogPostViewEvent>();

  constructor() { }

  ngOnInit(): void { }

  get postId(): number {
    return this.item.id;
  }

  selectItem(item: BlogPostModel, opcode: string): void {
    this.onSelectItem.emit({
      opcode: opcode,
      item: item
    });
  }
}
