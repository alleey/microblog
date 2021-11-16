import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPostListEvent } from 'blog';

@Component({
  selector: 'app-posts-list',
  templateUrl: './app-posts-list.component.html',
  styleUrls: ['./app-posts-list.component.scss']
})
export class AppPostsListComponent implements OnInit {

  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() headerTemplate: TemplateRef<any> | undefined;
  @Input() footerTemplate: TemplateRef<any> | undefined;
  @Input() noContentsTemplate: TemplateRef<any> | undefined;

  pageNum: number = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void { 
    this.activatedRoute.paramMap.subscribe(params => {
      this.pageNum = Number(params.get("pageNum")) || 0;
    });
  }

  navigateToPost(evt: BlogPostListEvent): void {
    const post = evt.item;
    this.router.navigate(["/posts", post.id, post.slug]);
  }

}
