import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewModelHolder } from 'utils';
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

  @Input("postId") paramPostId?: number;

  @Input() headerTemplate: TemplateRef<any> | undefined;
  @Input() contentTemplate: TemplateRef<any> | undefined;
  @Input() footerTemplate: TemplateRef<any> | undefined;

  postId?: number;
  postSlug?: string;
  permalink: string = "";

  viewModel = new ViewModelHolder<BlogPostResponseModel>();

  constructor(
    private service: PostsService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute) 
  { 
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.postId = <number> (params.get("postId") ?? this.paramPostId);
      this.fetchPost(this.postId, params.get("slug") ?? "");
    });
  }

  fetchPost(postId: number, postSlug?: string): void {
    this.postId = postId;
    this.postSlug = postSlug;
    this.service
      .one("posts", this.postId)
      .subscribe(this.viewModel.expectModel({
        nextObserver: {
          next: (i: BlogPostResponseModel) => this.update(i)
        }
      }));
  }

  update(item: BlogPostResponseModel) {
    item.permalink = window.location.origin + this.router.url;
    this.postId = item.id;
    this.postSlug = item.slug;
  }

  get postItem(): BlogPostResponseModel {
    return this.viewModel.Model!;
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
