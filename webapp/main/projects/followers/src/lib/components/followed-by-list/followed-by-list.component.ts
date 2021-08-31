import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pageable, PageModel } from 'utils';
import { FollowingService } from '../../services/following.service';
import { FollowedByListResponseModel, FollowedByModel } from '../../models/followed-by';
import { FollowerListViewEvent } from '../followed-by-list-view/followed-by-list-view.component';

@Component({
  selector: 'followed-by-list',
  templateUrl: './followed-by-list.component.html',
  styleUrls: ['./followed-by-list.component.css']
})
export class FollowersListComponent implements OnInit {

  @Input() enableSearch: boolean = false;
  @Input() filterText: string = '';

  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() noContentsTemplate: TemplateRef<any> | undefined;
  @Input() headerTemplate: TemplateRef<any> | undefined;
  @Input() footerTemplate: TemplateRef<any> | undefined;

  @Input('onSelectBookmark') 
  onSelect: (topic: FollowedByModel) => void = 
    (item) => {};
        
  pageable: Pageable; 
  response : FollowedByListResponseModel|null;
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
    next: (result: FollowedByListResponseModel) => {
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
      this.followersService.findFollowedByMatching("", "", this.filterText, this.pageable).subscribe(this.responseHandler);
    }
    else
    {
      this.followersService.followedBy("", "", this.pageable).subscribe(this.responseHandler);
    }
  }

  get items(): FollowedByModel[] | undefined {
    return this.response?._embedded?.followedBy;
  }

  get page(): PageModel|undefined {
    return this.response?.page;
  }

  get hasItems(): boolean {
    return !!(this.page?.totalElements);
  }

  handleListViewEvent(evt: FollowerListViewEvent) {
    switch(evt.opcode) {
      case 'select': this.onSelect(evt.item); break;
    }
  }

  gotoPage(evt:any): void {
    this.fetchPage(evt-1);
  }
}
