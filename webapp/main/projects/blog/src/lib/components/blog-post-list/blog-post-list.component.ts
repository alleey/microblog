import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PageModel, ViewModelHolder } from 'utils';
import { BlogPostListResponseModel, BlogPostModel } from '../../models/blog-post';
import { PostsService } from '../../services/posts.service';
import { BlogPostListViewEvent } from '../blog-post-list-view/blog-post-list-view.component';

export type BlogPostListEvent = BlogPostListViewEvent;

@Component({
  selector: 'blog-post-list',
  templateUrl: './blog-post-list.component.html',
  styleUrls: ['./blog-post-list.component.scss']
})
export class BlogPostListComponent implements OnInit, OnDestroy, OnChanges {

  @Input() pageNum: number = 0;

  @Input() noContentsTemplate: TemplateRef<any> | undefined;
  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() headerTemplate: TemplateRef<any> | undefined;
  @Input() footerTemplate: TemplateRef<any> | undefined;

  @Output() onEvent = new EventEmitter<BlogPostListEvent>();

  state: any;
  viewModel = new ViewModelHolder<BlogPostListResponseModel>();
  destroyed$ = new Subject();
  subscription: Subscription = new Subscription();

  constructor(
    private service: PostsService, 
    private router: Router) 
  {
    this.state = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {
    // Requery when the backend data changes
    this.subscription.add(
      this.service.onChange.subscribe({ next: () => this.fetchPage(this.pageNum) })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const changed = (changes['pageNum']);
    if(changed) {
      this.fetchPage(this.pageNum!);
    }
  }

  fetchPage(pageNum: number): void {
    //const routeParams = this.route.snapshot.paramMap;
    //this.organizationId = routeParams.get('orgId') as string;  
    this.service
      .all(this.state?.endpoint ?? "", { page: pageNum })
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
