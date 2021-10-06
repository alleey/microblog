import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pageable, PageModel, ViewModelHolder } from 'utils';
import { TopicListResponseModel, TopicModel } from '../../models/topic';
import { TopicsService } from '../../services/topics.service';
import { TopicListViewEvent } from '../topic-list-view/topic-list-view.component';

export type TopicListEvent = TopicListViewEvent;

@Component({
  selector: 'topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit, OnDestroy {

  @Input() enableSearch: boolean = true;
  @Input() filterText: string = '';

  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() noContentsTemplate: TemplateRef<any> | undefined;
  @Input() headerTemplate: TemplateRef<any> | undefined;
  @Input() footerTemplate: TemplateRef<any> | undefined;

  @Output() onEvent = new EventEmitter<TopicListEvent>();

  currentFilter: string = "";
  pageable: Pageable;
  viewModel = new ViewModelHolder<TopicListResponseModel>();
  subscription: Subscription = new Subscription();

  constructor(
    private topicsService: TopicsService, 
    private activatedRoute: ActivatedRoute) 
  { 
    this.currentFilter = this.filterText;
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
      this.topicsService.onChange.subscribe({ next: () => this.fetchPage(this.pageable.page) })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onApplyFilter(text: string): void {
    this.filterText = text;
    this.fetchPage(0);
  }

  fetchPage(pageNum: number): void {
    this.pageable.page = pageNum;
    if(!!this.filterText) {
      this.topicsService
        .findMatchingCaption("", this.filterText, this.pageable)
        .subscribe(this.viewModel.expectModel());
    }
    else {
      this.topicsService
        .all("", this.pageable)
        .subscribe(this.viewModel.expectModel());
    }
  }

  get items(): TopicModel[]|undefined {
    return this.viewModel.Model?._embedded.topics;
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
