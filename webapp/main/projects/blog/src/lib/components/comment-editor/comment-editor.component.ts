import { Location } from '@angular/common';
import { Component, Inject, Input, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsServiceConfig, CommentsServiceConfigToken } from '../../config/config';
import { CommentModel, CommentResponseModel } from '../../models/comment';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.css']
})
export class CommentEditorComponent implements OnInit {

  @Input() headerTemplate: TemplateRef<any> | undefined;
  @Input("postId") paramPostId?: number;
  @Input("commentId") paramCommentId?: string;
  @Input() updateMode: boolean = true;

  postId?: number;
  commentId?: number;
  comment : CommentModel|null = null;

  successDesc: any = "";
  errorDesc: any = "";
  loading: boolean = false;

  form!: FormGroup;

  constructor(
    @Inject(CommentsServiceConfigToken) private config: CommentsServiceConfig,
    private commentsService: CommentsService, 
    private location: Location,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {

    this.form = new FormGroup(
    {
      "text": new FormControl("", [
          Validators.required,
          Validators.maxLength(this.config.maxContentLength)
      ]),
    });

    this.activatedRoute.params.subscribe(params => {
      this.postId = params.postId ?? this.paramPostId;
      this.commentId = params.commentId ?? this.paramCommentId;
      if(this.isUpdateMode)
        this.fetchComment(this.commentId!);
    });
  }

  get isUpdateMode(): boolean { 
    return this.updateMode && this.commentId !== undefined; 
  }

  get text() { return this.form.get('text'); }

  set blogComment(item: CommentModel) {
    this.comment = this.updateMode ? item : null;
    this.commentId = this.updateMode ? this.comment?.id : undefined;
    console.info("Got comment id: " + this.commentId!);
  }

  updateForm(): void {
    this.text!.setValue (this.comment?.text);
  }

  fetchResponseHandler = {
    next: (result: CommentResponseModel) => {
      this.blogComment = result;
      this.updateForm();
      this.loading = false;
    },
    error: (err: any) => {
      this.errorDesc = err.message;
      this.loading = false;
      return false;
    }
  };

  fetchComment(commentId: number): void {
    this.loading = true;
    this.commentsService
      .one("", this.postId!, commentId)
      .subscribe(this.fetchResponseHandler);
  }      

  createNewComment(): void {
    this.commentsService
      .create("", this.postId!, this.text?.value)
      .subscribe(this.fetchResponseHandler);
  }

  updateComment(): void {
    this.commentsService
      .update("", this.postId!, this.commentId!, this.text?.value)
      .subscribe(this.fetchResponseHandler);
  }

  cancel(): void {
    this.location.back();
  }
}
