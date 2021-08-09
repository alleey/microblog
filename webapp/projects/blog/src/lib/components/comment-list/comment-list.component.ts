import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pageable, PageModel } from 'utils';
import { CommentModel, CommentsResponseModel } from '../../models/comment';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'blog-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @Input() postId!: number;

  @Input() noContentsTemplate: TemplateRef<any> | undefined;
  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() headerTemplate: TemplateRef<any> | undefined;
  @Input() footerTemplate: TemplateRef<any> | undefined;

  state: any;

  pageable: Pageable;
  response : CommentsResponseModel|null;
  errorDesc: any = "";
  loading: boolean = false;

  constructor(
    private postService: CommentsService, 
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
    this.activatedRoute.params.subscribe(params => {
      const pageNum = params.pageNum ?? 0;
      this.fetchPage(pageNum);
    });
  }

  fetchPage(pageNum: number): void {
    //const routeParams = this.route.snapshot.paramMap;
    //this.organizationId = routeParams.get('orgId') as string;  
    this.pageable.page = pageNum;
    this.loading = true;
    this.postService.all(this.state?.endpoint, this.postId, this.pageable)
      .subscribe(
      {
        next: (result: CommentsResponseModel) => {
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

  get commentList(): CommentModel[] {
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
