import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pageable, PageModel, ViewModelHolder } from 'utils';
import { CommentListResponseModel, CommentModel } from '../../models/comment';
import { CommentsService } from '../../services/comments.service';
import { CommentListViewEvent } from '../comment-list-view/comment-list-view.component';

export type CommentListEvent = CommentListViewEvent;

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit, OnDestroy {

  @Input() postId!: number;

  @Input() noContentsTemplate: TemplateRef<any> | undefined;
  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() headerTemplate: TemplateRef<any> | undefined;
  @Input() footerTemplate: TemplateRef<any> | undefined;

  @Output() onEvent = new EventEmitter<CommentListEvent>();

  state: any;
  pageable: Pageable;
  viewModel = new ViewModelHolder<CommentListResponseModel>();
  subscription: Subscription = new Subscription();

  constructor(
    private commentsService: CommentsService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute) 
  { 
    this.state = this.router.getCurrentNavigation()?.extras.state;
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
      this.commentsService.onChange.subscribe({ next: () =>  this.fetchPage(0) })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchPage(pageNum: number): void {
    //const routeParams = this.route.snapshot.paramMap;
    //this.organizationId = routeParams.get('orgId') as string;  
    this.pageable.page = pageNum;
    this.commentsService
      .all(this.state?.endpoint ?? "", this.postId, this.pageable)
      .subscribe(this.viewModel.expectModel());
  }

  get items(): CommentModel[]|undefined {
    return this.viewModel.Model?._embedded.comments;
  }

  get page(): PageModel|undefined {
    return this.viewModel.Model?.page;
  }

  get hasItems(): boolean {
    return !!(this.page?.totalElements);
  }

  gotoPage(evt:any): void {
    this.fetchPage(evt-1);
  }

  handleListViewEvent(evt: CommentListViewEvent) {
    this.onEvent.emit(evt);
  }
}
