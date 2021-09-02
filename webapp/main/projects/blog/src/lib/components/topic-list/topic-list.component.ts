import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pageable, PageModel } from 'utils';
import { TopicModel, TopicListResponseModel } from '../../models/topic';
import { TopicsService } from '../../services/topics.service';
import { TopicListViewEvent } from '../topic-list-view/topic-list-view.component';

@Component({
  selector: 'blog-topic-list',
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

  @Input() onSelect: (topic: TopicModel) => void = (item) => {};
      
  pageable: Pageable;
  response : TopicListResponseModel|null;
  errorDesc: any = "";
  loading: boolean = false;

  filter: string = "";

  subscription: Subscription = new Subscription();


  constructor(
    private topicsService: TopicsService, 
    private activatedRoute: ActivatedRoute) 
  { 
    this.response = null;
    this.pageable = {
      page: 0
    };
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const pageNum = params.pageNum ?? 0;
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

  responseHandler = {
    next: (result: TopicListResponseModel) => {
      this.response = result;
      this.loading = false;
    },
    error: (err: any) => {
      this.errorDesc = err.message;
      this.loading = false;
      console.log(this.errorDesc);
    }
  }

  onApplyFilter(text: string): void {
    this.filterText = text;
    this.fetchPage(0);
  }

  fetchPage(pageNum: number): void {
    this.pageable.page = pageNum;
    if(!!this.filterText) {
      this.topicsService.findMatchingCaption("", this.filterText, this.pageable).subscribe(this.responseHandler);
    }
    else {
      this.topicsService.all("", this.pageable).subscribe(this.responseHandler);
    }
  }

  get items(): TopicModel[] {
    if(!this.response?._embedded.topics)
      return [];
    return this.response?._embedded.topics;
  }

  get page(): PageModel|undefined {
    return this.response?.page;
  }

  get hasItems(): boolean {
    return !!(this.page?.totalElements);
  }

  handleListViewEvent(evt: TopicListViewEvent) {
    switch(evt.opcode) {
      case 'select': this.onSelect(evt.item); break;
    }
  }

  gotoPage(evt: any): void {
    this.fetchPage(evt-1);
  }
}
