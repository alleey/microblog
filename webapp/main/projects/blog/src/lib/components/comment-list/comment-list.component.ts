import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PageModel, ViewModelHolder } from 'utils';
import { CommentListResponseModel, CommentModel } from '../../models/comment';
import { CommentsService } from '../../services/comments.service';
import { CommentListViewEvent } from '../comment-list-view/comment-list-view.component';

export type CommentListEvent = CommentListViewEvent;

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit, OnDestroy, OnChanges {

  @Input() postId!: number;
  @Input() pageNum: number = 0;

  @Input() noContentsTemplate: TemplateRef<any> | undefined;
  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() headerTemplate: TemplateRef<any> | undefined;
  @Input() footerTemplate: TemplateRef<any> | undefined;

  @Output() onEvent = new EventEmitter<CommentListEvent>();

  state: any;
  viewModel = new ViewModelHolder<CommentListResponseModel>();
  destroyed$ = new Subject();
  subscription: Subscription = new Subscription();

  constructor(
    private service: CommentsService, 
    private router: Router) 
  { 
    this.state = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {
    // Requery when the backend data changes
    this.subscription.add(
      this.service.onChange.subscribe({ next: () =>  this.fetchPage(this.pageNum) })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const changed = (changes['pageNum']) ||
                    (changes['postId']);
    if(changed) {
      this.fetchPage(this.pageNum!);
    }
  }

  fetchPage(pageNum: number): void {
    //const routeParams = this.route.snapshot.paramMap;
    //this.organizationId = routeParams.get('orgId') as string;  
    this.service
      .all(this.state?.endpoint ?? "", this.postId, { page: pageNum })
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectModel());
  }

  get items(): CommentModel[]|undefined {
    return this.viewModel.Model?._embedded?.comments;
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
