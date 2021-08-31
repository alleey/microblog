import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pageable, PageModel } from 'utils';
import { FollowingListResponseModel, FollowingModel } from '../../models/following';
import { FollowingService } from '../../services/following.service';
import { FollowingListViewEvent } from '../following-list-view/following-list-view.component';

@Component({
  selector: 'following-list',
  templateUrl: './following-list.component.html',
  styleUrls: ['./following-list.component.css']
})
export class FollowingListComponent implements OnInit {

  @Input() enableSearch: boolean = false;
  @Input() filterText: string = '';

  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() noContentsTemplate: TemplateRef<any> | undefined;
  @Input() headerTemplate: TemplateRef<any> | undefined;
  @Input() footerTemplate: TemplateRef<any> | undefined;

  @Input('onSelectBookmark') 
  onSelect: (topic: FollowingModel) => void = 
    (item) => {};
        
  pageable: Pageable; 
  response : FollowingListResponseModel|null;
  errorDesc: any = "";
  loading: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(
      private followersService: FollowingService, 
      private router: Router, 
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
      this.followersService.onChange.subscribe({ next: () => this.fetchPage(this.pageable.page) })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onApplyFilter(text: string): void {
    this.filterText = text;
    this.fetchPage(0);
  }

  responseHandler = {
    next: (result: FollowingListResponseModel) => {
      this.response = result;
      this.loading = false;
    },
    error: (err: any) => {
      this.errorDesc = err.message;
      this.loading = false;
      console.log(this.errorDesc);
    }
  }

  fetchPage(pageNum: number): void {
    this.pageable.page = pageNum;
    if(!!this.filterText)
    {
      this.followersService.findFollowingMatching("", "", this.filterText, this.pageable).subscribe(this.responseHandler);
    }
    else
    {
      this.followersService.following("", "", this.pageable).subscribe(this.responseHandler);
    }
  }

  get items(): FollowingModel[] | undefined {
    return this.response?._embedded?.following;
  }

  get page(): PageModel|undefined {
    return this.response?.page;
  }

  get hasItems(): boolean {
    return !!(this.page?.totalElements);
  }

  handleListViewEvent(evt: FollowingListViewEvent) {
    switch(evt.opcode) {
      case 'select': this.onSelect(evt.item); break;
    }
  }

  gotoPage(evt:any): void {
    this.fetchPage(evt-1);
  }}
