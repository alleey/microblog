import { Component, Input, OnInit, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';
import { ViewEvent } from 'utils';
import { TopicModel } from '../../models/topic';

export type TopicListViewEvent = ViewEvent<TopicModel>;

@Component({
  selector: 'topic-list-view',
  templateUrl: './topic-list-view.component.html',
  styleUrls: ['./topic-list-view.component.scss']
})
export class TopicListViewComponent implements OnInit {

  @Input() items?: TopicModel[];
  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() noContentsTemplate: TemplateRef<any> | undefined;

  @Output() onEvent = new EventEmitter<TopicListViewEvent>();

  ngOnInit(): void {}

  selectItem(item: TopicModel, opcode: string): void {
    this.onEvent.emit({
      opcode: opcode,
      item: item
    });
  }
}
