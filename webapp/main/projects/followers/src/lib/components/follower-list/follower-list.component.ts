import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Pageable, PageModel, ViewModelHolder } from 'utils';
import { FollowsListResponseModel, FollowsModel } from '../../models/follows';
import { FollowingService } from '../../services/following.service';
import { FollowerListViewEvent } from '../follower-list-view/follower-list-view.component';

export type FollowerListEvent = FollowerListViewEvent;

@Component({
  selector: 'follower-list',
  templateUrl: './follower-list.component.html',
  styleUrls: ['./follower-list.component.css']
})
export class FollowersListComponent implements OnInit, OnDestroy {

  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() noContentsTemplate: TemplateRef<any> | undefined;
  @Input() headerTemplate: TemplateRef<any> | undefined;
  @Input() footerTemplate: TemplateRef<any> | undefined;

  @Output() onEvent = new EventEmitter<FollowerListEvent>();
        
  pageable: Pageable; 
  viewModel = new ViewModelHolder<FollowsListResponseModel>();
  destroyed$ = new Subject();
  subscription: Subscription = new Subscription();

  constructor(
      private service: FollowingService, 
      private activatedRoute: ActivatedRoute) 
  { 
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
      this.service.onChange.subscribe({ next: () => this.fetchPage(this.pageable.page) })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  fetchPage(pageNum: number): void {
    this.pageable.page = pageNum;
    this.service
      .followers("", "", this.pageable)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectModel());
  }

  get items(): FollowsModel[] | undefined {
    return this.viewModel.Model?._embedded?.follows;
  }

  get page(): PageModel|undefined {
    return this.viewModel.Model?.page;
  }

  get hasItems(): boolean {
    return !!(this.page?.totalElements);
  }

  handleListViewEvent(evt: FollowerListViewEvent) {
    this.onEvent.emit(evt);
  }

  gotoPage(evt:any): void {
    this.fetchPage(evt-1);
  }
}
