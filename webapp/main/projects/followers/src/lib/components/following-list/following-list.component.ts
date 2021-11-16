import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PageModel, ViewModelHolder } from 'utils';
import { FollowsListResponseModel, FollowsModel } from '../../models/follows';
import { FollowingService } from '../../services/following.service';
import { FollowingListViewEvent } from '../following-list-view/following-list-view.component';

export type FollowingListEvent = FollowingListViewEvent;

@Component({
  selector: 'following-list',
  templateUrl: './following-list.component.html',
  styleUrls: ['./following-list.component.css']
})
export class FollowingListComponent implements OnInit, OnDestroy, OnChanges {

  @Input() pageNum: number = 0;

  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() noContentsTemplate: TemplateRef<any> | undefined;
  @Input() headerTemplate: TemplateRef<any> | undefined;
  @Input() footerTemplate: TemplateRef<any> | undefined;

  @Output() onEvent = new EventEmitter<FollowingListEvent>();
        
  viewModel = new ViewModelHolder<FollowsListResponseModel>();
  destroyed$ = new Subject();
  subscription: Subscription = new Subscription();

  constructor(private service: FollowingService) 
  { }

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
    this.service
      .following("", "", { page: pageNum })
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

  handleListViewEvent(evt: FollowingListViewEvent) {
    this.onEvent.emit(evt);
  }

  gotoPage(evt:any): void {
    this.fetchPage(evt-1);
  }
}
