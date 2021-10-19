import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ViewModelHolder } from 'utils';
import { TopicResponseModel } from '../../models/topic';
import { TopicsService } from '../../services/topics.service';

@Component({
  selector: 'topic-editor',
  templateUrl: './topic-editor.component.html',
  styleUrls: ['./topic-editor.component.css']
})
export class TopicEditorComponent implements OnInit, OnDestroy {

  @Input("topicId") paramTopicId?: number;
  @Input() updateMode: boolean = true;
  @Input() headerTemplate: TemplateRef<any> | undefined;

  form!: FormGroup;
  topicId?: number;
  viewModel = new ViewModelHolder<TopicResponseModel>();
  destroyed$ = new Subject();

  constructor(
    private service: TopicsService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {

    this.form = new FormGroup({
      "caption": new FormControl("", Validators.required)
    });

    this.activatedRoute.paramMap.subscribe(params => {
      this.topicId = <number> (params.get("topicId") ?? this.paramTopicId);
      if(this.isUpdateMode)
        this.fetchTopic(this.topicId!);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  get caption() { return this.form.get('caption'); }
  get isUpdateMode(): boolean { return this.updateMode && this.topicId !== undefined;}
  get topic(): TopicResponseModel|undefined { return this.viewModel.Model; }

  updateForm(): void {
    if(this.isUpdateMode) {
      this.topicId = this.viewModel.Model?.id;
      this.caption!.setValue (this.topic?.caption);
    } else {

    }
  }

  fetchTopic(topicId: number): void {
    this.service
      .one("", topicId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectModel({
        nextObserver: {
          next: (i: TopicResponseModel) => this.updateForm()
        }
      }));
  }

  createNewTopic(): void {
    this.service
      .create("", this.caption?.value)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectModel({
        nextObserver: {
          next: (i: TopicResponseModel) => this.updateForm()
        }
      }));
  }

  updateTopic(): void {
    this.service
      .update("", this.topicId!, this.caption?.value)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectNothing());
  }
}
