import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ViewModelHolder } from 'utils';
import { BlogPostModel, BlogPostResponseModel } from '../../models/blog-post';
import { PostsService } from '../../services/posts.service';
import { BlogPostViewEvent } from '../blog-post-view/blog-post-view.component';

export type BlogPostEvent = BlogPostViewEvent;

@Component({
  selector: 'blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit, OnDestroy, OnChanges {

  @Input() postId?: number;
  @Input() headerTemplate: TemplateRef<any> | undefined;
  @Input() contentTemplate: TemplateRef<any> | undefined;
  @Input() footerTemplate: TemplateRef<any> | undefined;

  @Output() onEvent = new EventEmitter<BlogPostEvent>();

  permalink: string = "";
  viewModel = new ViewModelHolder<BlogPostResponseModel>();
  destroyed$ = new Subject();
  subscription: Subscription = new Subscription();

  constructor(
    private service: PostsService, 
    private router: Router) 
  { }

  ngOnInit(): void {
    // Requery when the backend data changes
    this.subscription.add(
      this.service.onChange.subscribe({ 
        next: (notif) => {
          if(this.postId === notif.id) 
            this.fetchPost(this.postId!);
        } 
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    const changed = (changes['postId']);
    if(changed) {
      this.fetchPost(this.postId!);
    }
  }

  public get postItem(): BlogPostResponseModel {
    return this.viewModel.Model!;
  }

  public update(item: BlogPostResponseModel) {
    item.permalink = window.location.origin + this.router.url;
  }

  public deletePost(post: BlogPostModel): void {
    this.service
      .delete("", post.id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectNothing({
        nextObserver: 
        {
          next: (i:any) => this.handleViewEvent({
            opcode: 'deleted', item: post
          })
        }
      }));
  }

  fetchPost(postId: number): void {
    this.service
      .one("", postId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectModel({
        nextObserver: {
          next: (i: BlogPostResponseModel) => this.update(i)
        }
      }));
  }

  handleViewEvent(evt: BlogPostViewEvent) {
    this.onEvent.emit(evt);
  }
}
