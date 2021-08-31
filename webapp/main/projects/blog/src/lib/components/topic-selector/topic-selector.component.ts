import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { TopicModel } from '../../models/topic';

@Component({
  selector: 'topic-selector',
  templateUrl: './topic-selector.component.html',
  styleUrls: ['./topic-selector.component.css']
})
export class TopicSelectorComponent implements OnInit {

  @Input()
  maxTopics: number = 10;
  maxTopicsError: boolean = false;

  @Input()
  initialTopics: TopicModel[] = [];
  selectedTopics: TopicModel[] = [];

  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() noContentsTemplate: TemplateRef<any> | undefined;

  constructor() { }

  ngOnInit(): void {
    this.selectedTopics = this.initialTopics;
  }

  topicClicked: (topic: TopicModel) => void = 
    (item) => {
      if(this.isTopicSelected(item))
        this.unselectTopic(item);
      else
        this.selectTopic(item);
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
}
