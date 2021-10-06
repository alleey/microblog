import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { TopicModel } from '../../models/topic';
import { TopicListEvent } from '../topic-list/topic-list.component';

@Component({
  selector: 'topic-selector',
  templateUrl: './topic-selector.component.html',
  styleUrls: ['./topic-selector.component.css']
})
export class TopicSelectorComponent implements OnInit {

  @Input() maxTopics: number = 10;
  @Input() initialTopics: TopicModel[] = [];

  maxTopicsError: boolean = false;
  selectedTopics: TopicModel[] = [];

  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() noContentsTemplate: TemplateRef<any> | undefined;

  constructor() { }

  ngOnInit(): void {
    this.selectedTopics = this.initialTopics;
  }

  isTopicSelected(topic: TopicModel): boolean {
    return this.selectedTopics.findIndex(i => i.caption.toUpperCase() === topic.caption.toUpperCase()) > -1;
  }

  selectTopic(topic: TopicModel): void {

    this.maxTopicsError = (!!this.maxTopics && this.selectedTopics.length >= this.maxTopics);
    if(this.maxTopicsError) {
      return;
    }

    this.selectedTopics.push(topic);
    this.selectedTopics.sort((a,b) => 
      a.caption.toUpperCase().localeCompare(b.caption.toUpperCase())
    );
  }

  unselectTopic(topic: TopicModel): void {
    this.selectedTopics = this.selectedTopics.filter(i => i.caption.toUpperCase() !== topic.caption.toUpperCase());
    this.maxTopicsError = (!!this.maxTopics && this.selectedTopics.length >= this.maxTopics);
  }

  topicClicked: (evt: TopicListEvent) => void = 
    (evt) => {
      if(this.isTopicSelected(evt.item))
        this.unselectTopic(evt.item);
      else
        this.selectTopic(evt.item);
    }
}
