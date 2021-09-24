import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPostModel, BlogPostListResponseModel } from '../../models/blog-post';
import { PostsService } from '../../services/posts.service';
import { Pageable, PageModel } from 'utils';
import { BlogPostListViewEvent } from '../blog-post-list-view/blog-post-list-view.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'blog-post-list',
  templateUrl: './blog-post-list.component.html',
  styleUrls: ['./blog-post-list.component.scss']
})
export class BlogPostListComponent implements OnInit, OnDestroy {

  @Input() noContentsTemplate: TemplateRef<any> | undefined;
  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() headerTemplate: TemplateRef<any> | undefined;
  @Input() footerTemplate: TemplateRef<any> | undefined;

  @Input() onSelect: (post: BlogPostModel) => void = (item) => {};

  state: any;

  pageable: Pageable;
  response : BlogPostListResponseModel|null;
  errorDesc: any = "";
  loading: boolean = false;

  subscription: Subscription = new Subscription();

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
    this.activatedRoute.paramMap.subscribe(params => {
      const pageNum = <number> (params.get("pageNum") ?? 0);
      this.fetchPage(pageNum);
    });
    // Requery when the backend data changes
    this.subscription.add(
      this.postService.onChange.subscribe({ next: () => this.fetchPage(0) })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchPage(pageNum: number): void {
    //const routeParams = this.route.snapshot.paramMap;
    //this.organizationId = routeParams.get('orgId') as string;  
    this.pageable.page = pageNum;
    this.loading = true;
    this.postService.all(this.state?.endpoint, this.pageable)
      .subscribe(
      {
        next: (result: BlogPostListResponseModel) => {
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

  get items(): BlogPostModel[] {
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

  gotoPage(evt:any): void {
    this.fetchPage(evt-1);
  }
}
