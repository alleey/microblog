import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Pageable, PageModel, ViewModelHolder } from 'utils';
import { BookmarkListResponseModel, BookmarkModel } from '../../models/bookmark';
import { BookmarksService } from '../../services/bookmarks.service';
import { BookmarkListViewEvent } from '../bookmark-list-view/bookmark-list-view.component';

export type BookmarkListEvent = BookmarkListViewEvent;

@Component({
  selector: 'bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss']
})
export class BookmarkListComponent implements OnInit, OnDestroy {

  @Input() enableSearch: boolean = true;
  @Input() filterText: string = '';

  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() noContentsTemplate: TemplateRef<any> | undefined;
  @Input() headerTemplate: TemplateRef<any> | undefined;
  @Input() footerTemplate: TemplateRef<any> | undefined;

  @Output() onEvent = new EventEmitter<BookmarkListEvent>();

  pageable: Pageable; 
  viewModel = new ViewModelHolder<BookmarkListResponseModel>();
  destroyed$ = new Subject();
  subscription: Subscription = new Subscription();

  constructor(
      private service: BookmarksService, 
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

  onApplyFilter(text: string): void {
    this.filterText = text;
    this.fetchPage(0);
  }

  fetchPage(pageNum: number): void {
    this.pageable.page = pageNum;
    if(!!this.filterText)
    {
      this.service
        .findMatchingCaption("", this.filterText, this.pageable)
        .pipe(takeUntil(this.destroyed$))
        .subscribe(this.viewModel.expectModel());
    }
    else
    {
      this.service
        .all("", this.pageable)
        .pipe(takeUntil(this.destroyed$))
        .subscribe(this.viewModel.expectModel());
    }
  }

  get items(): BookmarkModel[]|undefined {
    return this.viewModel.Model?._embedded?.bookmarks;
  }

  get page(): PageModel|undefined {
    return this.viewModel.Model?.page;
  }

  get hasItems(): boolean {
    return !!(this.page?.totalElements);
  }

  handleListViewEvent(evt: BookmarkListViewEvent) {
    this.onEvent.emit(evt);
  }

  gotoPage(evt:any): void {
    this.fetchPage(evt-1);
  }
}
