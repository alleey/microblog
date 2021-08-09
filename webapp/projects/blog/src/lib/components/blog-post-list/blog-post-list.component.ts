import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPostModel, BlogPostsResponseModel } from '../../models/blog-post';
import { PostsService } from '../../services/posts.service';
import { Pageable, PageModel } from 'utils';
import { BlogPostListViewEvent } from '../blog-post-list-view/blog-post-list-view.component';

@Component({
  selector: 'blog-post-list',
  templateUrl: './blog-post-list.component.html',
  styleUrls: ['./blog-post-list.component.scss']
})
export class BlogPostListComponent implements OnInit {

  @Input() noContentsTemplate: TemplateRef<any> | undefined;
  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() headerTemplate: TemplateRef<any> | undefined;
  @Input() footerTemplate: TemplateRef<any> | undefined;

  @Input('onSelectPost') 
  onSelect: (post: BlogPostModel) => void = 
    (item) => this.navigateToPost(item);

  state: any;

  pageable: Pageable;
  response : BlogPostsResponseModel|null;
  errorDesc: any = "";
  loading: boolean = false;

  constructor(
    private postService: PostsService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute) 
  { 
    this.state = this.router.getCurrentNavigation()?.extras.state;
    this.response = null;
    this.pageable = {
      page: 0
    };
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const pageNum = params.pageNum ?? 0;
      this.fetchPage(pageNum);
    });
  }

  fetchPage(pageNum: number): void {
    //const routeParams = this.route.snapshot.paramMap;
    //this.organizationId = routeParams.get('orgId') as string;  
    this.pageable.page = pageNum;
    this.loading = true;
    this.postService.all(this.state?.endpoint, this.pageable)
      .subscribe(
      {
        next: (result: BlogPostsResponseModel) => {
          this.response = result;
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

  get postList(): BlogPostModel[] {
    if(!this.response?._embedded.posts)
      return [];
    return this.response?._embedded.posts;
  }

  get page(): PageModel|undefined {
    return this.response?.page;
  }

  handleListViewEvent(evt: BlogPostListViewEvent) {
    switch(evt.opcode) {
      case 'select': this.onSelect(evt.item); break;
    }
  }

  navigateToPost(post: BlogPostModel): void {
    this.router.navigate(["/posts", post.id, post.slug]);
  }

  gotoPage(evt:any): void {
    this.fetchPage(evt-1);
  }
}