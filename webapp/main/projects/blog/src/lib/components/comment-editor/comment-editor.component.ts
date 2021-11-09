import { Location } from '@angular/common';
import { Component, Inject, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ViewModelHolder } from 'utils';
import { CommentsServiceConfig, CommentsServiceConfigToken } from '../../config/config';
import { CommentResponseModel } from '../../models/comment';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.css']
})
export class CommentEditorComponent implements OnInit, OnDestroy {

  @Input("postId") paramPostId?: number;
  @Input("commentId") paramCommentId?: number;
  @Input() updateMode: boolean = true;
  @Input() headerTemplate: TemplateRef<any> | undefined;

  form!: FormGroup;

  postId?: number;
  commentId?: number;
  viewModel = new ViewModelHolder<CommentResponseModel>();
  destroyed$ = new Subject();

  constructor(
    @Inject(CommentsServiceConfigToken) private config: CommentsServiceConfig,
    private service: CommentsService, 
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.form = new FormGroup(
    {
      "text": new FormControl("", [
          Validators.required,
          Validators.maxLength(this.config.maxContentLength)
      ]),
    });

    this.activatedRoute.paramMap.subscribe(params => {
      this.postId = <number> (params.get("postId") ?? this.paramPostId);
      this.commentId = <number> (params.get("commentId") ?? this.paramCommentId);
      if(this.isUpdateMode)
        this.fetchComment(this.postId!, this.commentId!);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  get isUpdateMode(): boolean { return this.updateMode && this.commentId !== undefined; }
  get text() { return this.form.get('text'); }
  get comment(): CommentResponseModel|undefined { return this.viewModel.Model; }

  updateForm(item: CommentResponseModel): void {
    if(this.isUpdateMode) {
      this.commentId = item.id;
      this.text!.setValue (item.text);
    } 
    else 
    {
    }
  }

  fetchComment(postId: number, commentId: number): void {
    this.service
      .one("", postId, commentId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectModel({
        nextObserver: {
          next: (i: CommentResponseModel) => this.updateForm(i)
        }
      }));
  }      

  createNewComment(): void {
    this.service
      .create("", this.postId!, this.text?.value)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectModel({
        nextObserver: {
          next: (i: CommentResponseModel) => this.updateForm(i)
        }
      }));
  }

  updateComment(): void {
    this.service
      .update("", this.postId!, this.commentId!, this.text?.value)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectNothing());
  }
}
