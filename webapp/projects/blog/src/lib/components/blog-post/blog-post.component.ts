import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPostModel, BlogPostResponseModel } from '../../models/blog-post';
import { TopicModel } from '../../models/topic';
import { PostsService } from '../../services/posts.service';
import { BlogPostViewEvent } from '../blog-post-view/blog-post-view.component';

@Component({
  selector: 'blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  @Input() headerTemplate: TemplateRef<any> | undefined;
  @Input() contentTemplate: TemplateRef<any> | undefined;
  @Input() footerTemplate: TemplateRef<any> | undefined;

  postId?: number;
  postSlug?: string;
  permalink: string = "";

  response : BlogPostResponseModel|null;
  errorDesc: any = "";
  loading: boolean = false;

  constructor(
    private postService: PostsService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute) 
  { 
    this.response = null;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.fetchPost(params.postId, params.slug);
    });
  }

  fetchPost(postId: number, postSlug?: string): void {
    this.postId = postId;
    this.postSlug = postSlug;

    this.loading = true;
    this.postService.one("posts", this.postId)
      .subscribe(
      {
        next: (result: BlogPostResponseModel) => {
          this.postItem = result;
          this.loading = false;
        },
        error: (err: any) => {
          this.errorDesc = err.message;
          this.loading = false;
          console.log(this.errorDesc);
        }
      }
    );
  }

  set postItem(item: BlogPostResponseModel) {
    this.response = item;
    this.response.permalink = window.location.origin + this.router.url;
    this.postId = this.response.id;
    this.postSlug = this.response.slug;
  }

  get postItem(): BlogPostResponseModel {
    return this.response!;
  }

  get topicsList(): TopicModel[] {
    return this.response!.topics;
  }

  handleViewEvent(evt: BlogPostViewEvent) {
    switch(evt.opcode) {
      case 'edit': this.editPost(evt.item); break;
      case 'delete': this.deletePost(evt.item); break;
    }
  }

  editPost(post: BlogPostModel): void {
    this.router.navigate(['/posts', 'edit', post.id]);
  }

  deletePost(post: BlogPostModel): void {
    
  }
}
