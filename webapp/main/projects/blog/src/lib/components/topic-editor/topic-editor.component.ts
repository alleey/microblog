import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
export class TopicEditorComponent implements OnInit, OnDestroy, OnChanges {

  @Input() topicId?: number;
  @Input() updateMode: boolean = true;

  form!: FormGroup;
  viewModel = new ViewModelHolder<TopicResponseModel>();
  destroyed$ = new Subject();

  constructor(private service: TopicsService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      "caption": new FormControl("", Validators.required)
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const changed = (changes['topicId']);
    if(changed && this.isUpdateMode) {
      this.fetchTopic(this.topicId!);
    }
  }

  get isUpdateMode(): boolean { return this.updateMode && this.topicId !== undefined;}
  get caption() { return this.form.get('caption'); }
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
