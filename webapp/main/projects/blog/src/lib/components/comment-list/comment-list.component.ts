import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pageable, PageModel } from 'utils';
import { CommentModel, CommentListResponseModel } from '../../models/comment';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'blog-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit, OnDestroy {

  @Input() postId!: number;

  @Input() noContentsTemplate: TemplateRef<any> | undefined;
  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() headerTemplate: TemplateRef<any> | undefined;
  @Input() footerTemplate: TemplateRef<any> | undefined;

  state: any;

  pageable: Pageable;
  response : CommentListResponseModel|null;
  errorDesc: any = "";
  loading: boolean = false;

  subscription: Subscription = new Subscription();

  constructor(
    private commentsService: CommentsService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute) 
  { 
    this.state = this.router.getCurrentNavigation()?.extras.state;
    this.response = null;
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
    this.loading = true;
    this.commentsService.all(this.state?.endpoint, this.postId, this.pageable)
      .subscribe(
      {
        next: (result: CommentListResponseModel) => {
          this.response = result;
          this.loading = false;
        },
        error: (err: any) => {
          this.errorDesc = err.message;
          this.loading = false;
          console.log(this.errorDesc);
        }
      }
    );
  }

  get items(): CommentModel[] {
    if(!this.response?._embedded.comments)
      return [];
    return this.response?._embedded.comments;
  }

  get page(): PageModel|undefined {
    return this.response?.page;
  }

  gotoPage(evt:any): void {
    this.fetchPage(evt-1);
  }
}
