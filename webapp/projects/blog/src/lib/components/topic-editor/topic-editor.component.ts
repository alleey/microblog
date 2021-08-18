import { Location } from '@angular/common';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicModel, TopicResponseModel, TopicsResponseModel } from '../../models/topic';
import { TopicsService } from '../../services/topics.service';

@Component({
  selector: 'topic-editor',
  templateUrl: './topic-editor.component.html',
  styleUrls: ['./topic-editor.component.css']
})
export class TopicEditorComponent implements OnInit {

  @Input() headerTemplate: TemplateRef<any> | undefined;
  @Input("topicId") paramTopicId?: string;
  @Input() updateMode: boolean = true;

  topicId?: number;
  topic : TopicModel|null = null;

  errorDesc: any = "";
  loading: boolean = false;

  form!: FormGroup;

  constructor(
    private topicService: TopicsService,
    private router: Router, 
    private location: Location,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {

    this.form = new FormGroup({
      "caption": new FormControl("", Validators.required)
    });

    this.activatedRoute.params.subscribe(params => {
      this.topicId = params.topicId ?? this.paramTopicId;
      if(this.isUpdateMode)
        this.fetchTopic(this.topicId!);
    });
  }

  get isUpdateMode(): boolean { 
    return this.updateMode && this.topicId !== undefined; 
  }
  get caption() { return this.form.get('caption'); }

  set theTopic(item: TopicModel) {
    this.topic = this.updateMode ? item : null;
    this.topicId = this.updateMode ? this.topic?.id : undefined;
    console.info("Got post id: " + this.topicId!);
  }

  updateForm(): void {
    this.caption!.setValue (this.topic?.caption);
  }

  fetchResponseHandler = {
    next: (result: TopicResponseModel) => {
      this.theTopic = result;
      this.updateForm();
      this.loading = false;
    },
    error: (err: any) => {
      this.errorDesc = err.message;
      this.loading = false;
      return false;
    }
  };

  fetchTopic(topicId: number): void {
    this.loading = true;
    this.topicService
      .one("", topicId)
      .subscribe(this.fetchResponseHandler);
  }      

  createNewTopic(): void {
    this.topicService
      .create("", this.caption?.value)
      .subscribe(this.fetchResponseHandler);
  }

  updateTopic(): void {
    this.topicService
      .update("", this.topicId!, this.caption?.value)
      .subscribe(this.fetchResponseHandler);
  }

  cancel(): void {
    this.location.back();
  }
}
