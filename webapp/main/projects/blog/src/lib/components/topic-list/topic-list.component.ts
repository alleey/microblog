import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PageModel, ViewModelHolder } from 'utils';
import { TopicListResponseModel, TopicModel } from '../../models/topic';
import { TopicsService } from '../../services/topics.service';
import { TopicListViewEvent } from '../topic-list-view/topic-list-view.component';

export type TopicListEvent = TopicListViewEvent;

@Component({
  selector: 'topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit, OnDestroy, OnChanges {

  @Input() enableSearch: boolean = true;
  @Input() filter: string = '';
  @Input() pageNum: number = 0;

  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() noContentsTemplate: TemplateRef<any> | undefined;
  @Input() headerTemplate: TemplateRef<any> | undefined;
  @Input() footerTemplate: TemplateRef<any> | undefined;

  @Output() onEvent = new EventEmitter<TopicListEvent>();

  filterText: string = '';
  viewModel = new ViewModelHolder<TopicListResponseModel>();
  destroyed$ = new Subject();
  subscription: Subscription = new Subscription();

  constructor(private service: TopicsService) 
  { 
    this.filterText = this.filterText;
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

  onApplyFilter(text: string): void {
    this.filterText = text;
    this.fetchPage(0);
  }

  fetchPage(pageNum: number): void {
    if(!!this.filterText) {
      this.service
        .findMatchingCaption("", this.filterText, { page: pageNum })
        .pipe(takeUntil(this.destroyed$))
        .subscribe(this.viewModel.expectModel());
    }
    else {
      this.service
        .all("", { page: pageNum })
        .pipe(takeUntil(this.destroyed$))
        .subscribe(this.viewModel.expectModel());
    }
  }

  get items(): TopicModel[]|undefined {
    return this.viewModel.Model?._embedded?.topics;
  }

  get page(): PageModel|undefined {
    return this.viewModel.Model?.page;
  }

  get hasItems(): boolean {
    return !!(this.page?.totalElements);
  }

  handleListViewEvent(evt: TopicListViewEvent) {
    this.onEvent.emit(evt);
  }

  gotoPage(evt: any): void {
    this.fetchPage(evt-1);
  }
}
