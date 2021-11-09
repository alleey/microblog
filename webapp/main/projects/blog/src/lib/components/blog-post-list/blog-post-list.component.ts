import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Pageable, PageModel, ViewModelHolder } from 'utils';
import { BlogPostListResponseModel, BlogPostModel } from '../../models/blog-post';
import { PostsService } from '../../services/posts.service';
import { BlogPostListViewEvent } from '../blog-post-list-view/blog-post-list-view.component';

export type BlogPostListEvent = BlogPostListViewEvent;

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

  @Output() onEvent = new EventEmitter<BlogPostListEvent>();

  state: any;

  pageable: Pageable;
  viewModel = new ViewModelHolder<BlogPostListResponseModel>();
  destroyed$ = new Subject();

  subscription: Subscription = new Subscription();

  constructor(
    private service: PostsService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute) 
  {
    this.state = this.router.getCurrentNavigation()?.extras.state;
    this.pageable = {
      page: 0
    };
    //console.log(this.state);
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const pageNum = <number> (params.get("pageNum") ?? 0);
      this.fetchPage(pageNum);
    });
    // Requery when the backend data changes
    this.subscription.add(
      this.service.onChange.subscribe({ next: () => this.fetchPage(0) })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  fetchPage(pageNum: number): void {
    //const routeParams = this.route.snapshot.paramMap;
    //this.organizationId = routeParams.get('orgId') as string;  
    this.pageable.page = pageNum;
    this.service
      .all(this.state?.endpoint ?? "", this.pageable)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectModel());
  }

  get items(): BlogPostModel[]|undefined {
    return this.viewModel.Model?._embedded?.posts;
  }

  get page(): PageModel|undefined {
    return this.viewModel.Model?.page;
  }

  get hasItems(): boolean {
    return !!(this.page?.totalElements);
  }

  handleListViewEvent(evt: BlogPostListViewEvent) {
    this.onEvent.emit(evt);
  }

  gotoPage(evt:any): void {
    this.fetchPage(evt-1);
  }
}
